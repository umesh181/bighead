
import { ConvexError, v } from "convex/values";
import {
  MutationCtx,
  QueryCtx,
  action,
  internalQuery,
  mutation,
  query,
} from "./_generated/server";

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";


import { internal } from "./_generated/api";
import { Id } from "./_generated/dataModel";
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });


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
          return [];
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
    },

    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        
        if (!userId) {
          throw new ConvexError('Not authenticated')
        }
        
        await ctx.db.insert('documents',{
            title: args.title,
            tokenIdentifier:userId,
            fileId: args.fileId,
        })
    },
})



const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
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



    const { question } = args;

    const modelName = "gemini-1.0-pro"; 

    // Utilize Google Generative AI here
    // const response = await handleQuestionWithGemini(question, modelName,text);
    
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
    const arrayBuffer = await file.arrayBuffer();
    const data = Buffer.from(new Uint8Array(arrayBuffer));
    // const pdfData = await pdf(data);
    // console.log(pdfData.text);
    return "1234";
  }
  
  
// Add additional conditions for other file types if necessary
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