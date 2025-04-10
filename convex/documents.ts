import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  action,
  internalMutation,
  internalQuery,
  mutation,
  query
} from "./_generated/server";


import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
import { embed } from "./notes";
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export async function hasAccessToDocument(
  ctx: MutationCtx | QueryCtx,
  documentId: Id<"documents">
) {
  const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

  if (!userId) {
    return null;
  }

  const document = await ctx.db.get(documentId);

  if (!document) {
    return null;
  }

  if (document.tokenIdentifier !== userId) {
    return null;
  }

  return { document, userId };
}

export const hasAccessToDocumentQuery = internalQuery({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await hasAccessToDocument(ctx, args.documentId);
  },
});





export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const getDocuments = query({
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        console.log(userId);
        
        if (!userId) {
          return undefined;
        }
        return await ctx.db
        .query("documents")
        .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
        .collect();
    },
  });
  
  export const getDocument = query({
    args: {
      documentId: v.id("documents"),
    },
    async handler(ctx, args) {
      const accessObj = await hasAccessToDocument(ctx, args.documentId);
  
      if (!accessObj) {
        return null;
      }
      console.log("Fetched document:", accessObj.document); 
  
      return {
        ...accessObj.document,
      documentUrl: await ctx.storage.getUrl(accessObj.document.fileId),
      };
      
    },
  })

export const createDocument = mutation({
    args:{
        title:v.string(),
        fileId: v.id("_storage"),
        description:v.string(),
    },

    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        
        if (!userId) {
          throw new ConvexError('Not authenticated')
        }
        console.log("Creating document with:", args);
        const documentId = await ctx.db.insert("documents", {
            title: args.title,
            tokenIdentifier:userId,
            fileId: args.fileId,
            description: args.description,
        });
        
      
    },
});

export const updateDocumentDescription = internalMutation({
  args: {
    documentId: v.id("documents"),
    description: v.string(),
    embedding: v.array(v.float64()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.documentId, {
      description: args.description,
      embedding: args.embedding,
    });
  },
});







// chat with docs 

export const askQuestion = action({
  args: {
    question: v.string(),
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await ctx.runQuery(
      internal.documents.hasAccessToDocumentQuery,
      {
        documentId: args.documentId,
      }
    );

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }

    const file = await ctx.storage.get(accessObj.document.fileId);

    if (!file) {
      throw new ConvexError("File not found");
    }

    
    
    const text = await extractTextFromFile(file);

    const embedding = await embed(text);

    const doc = await ctx.runQuery(internal.documents.hasAccessToDocumentQuery, {
      documentId: args.documentId,
    });
    
    if (!doc) {
      throw new ConvexError("Document not found");
    }
    
    await ctx.runMutation(internal.documents.updateDocumentDescription, {
      documentId: args.documentId,
      description:doc.document.description,
      embedding,
    });
    

    const { question } = args;

    const modelName = "gemini-2.0-flash";
    
    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: args.question,
      isHuman: true,
      tokenIdentifier: accessObj.userId,
    });

    const response =
    await handleQuestionWithGemini(question, modelName,text)??
      "could not generate a response";

    await ctx.runMutation(internal.chats.createChatRecord, {
      documentId: args.documentId,
      text: response,
      isHuman: false,
      tokenIdentifier: accessObj.userId,
    });

    return response;
    
  },
});


async function extractTextFromFile(file: Blob) {
  const fileType = file.type;
  
  if (fileType === 'application/pdf') {
    return "";
  }

  return await file.text();
}



async function handleQuestionWithGemini(question: string, modelName: string, text: string,) {
  const model = genAI.getGenerativeModel({ model: modelName });

  const generationConfig = {
    temperature: 0.9, // Controls randomness in the response
    topK: 1, // Selects the top K most likely completions
    topP: 1, // Adjusts the probability distribution (higher favors more common words)
    maxOutputTokens: 2048, // Maximum length of the generated response
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  // No history is needed in this case as the question is directly posed
  const chat = model.startChat({
    generationConfig,
    safetySettings,
  });

  const questionPrompt = `Here is a text file:${text} What is the answer to: ${question}`;

  const result = await chat.sendMessage([{ text: questionPrompt }]);
  const response = result.response;
  console.log(response.text);
  return response.text();
}

//deleting the document:
export const deleteDocument = mutation({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    const accessObj = await hasAccessToDocument(ctx, args.documentId);

    if (!accessObj) {
      throw new ConvexError("You do not have access to this document");
    }
    await ctx.storage.delete(accessObj.document.fileId);
    // Fetch the chats associated with the document using the correct Convex API
    const chats = await ctx.db.query("chats")
      .withIndex("by_documentId_tokenIdentifier", q => q.eq("documentId", args.documentId))
      .collect();

    // Delete the associated chats
    for (const chat of chats) {
      await ctx.db.delete(chat._id);
    }

   
    await ctx.db.delete(args.documentId);
  },
});

export const getChatsByDocumentId = query({
  args: {
    documentId: v.id("documents"),
  },
  async handler(ctx, args) {
    return await ctx.db.query("chats")
      .withIndex("by_documentId_tokenIdentifier", q => q.eq("documentId", args.documentId))
      .collect();
  },
});
