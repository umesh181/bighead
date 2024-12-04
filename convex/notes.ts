import { GoogleGenerativeAI } from "@google/generative-ai";
import { ConvexError, v } from "convex/values";
import { internal } from "./_generated/api";
import {
  internalAction,
  internalMutation,
  mutation,
  query,
} from "./_generated/server";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

export const createNote = mutation({
  args: {
    text: v.string(),
    content: v.string(),
    plainTextContent: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You must be logged in to create a note");
    }

    const noteId = await ctx.db.insert("notes", {
      text: args.text,
      content: args.content,
      plainTextContent: args.plainTextContent,
      tokenIdentifier: userId,
    });

    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId,
      text: args.plainTextContent,
    });

    return noteId;
  },
});

export const deleteNote = mutation({
  args: {
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;
    if (!userId) {
      throw new ConvexError("You must be logged in to delete a note");
    }
    const note = await ctx.db.get(args.noteId);
    if (!note) {
      throw new ConvexError("Note not found");
    }
    if (note.tokenIdentifier !== userId) {
      throw new ConvexError("You do not have permission to delete this note");
    }
    await ctx.db.delete(args.noteId);
    // No need to delete the embedding separately, as it's part of the note document
  },
});

export const updateNoteContent = mutation({
  args: {
    noteId: v.id("notes"),
    content: v.string(),
    plainTextContent: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You must be logged in to update note content");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.tokenIdentifier !== userId) {
      throw new ConvexError("Note not found or you don't have permission to edit this note");
    }

    await ctx.db.patch(args.noteId, {
      content: args.content,
      plainTextContent: args.plainTextContent,
    });

    // Update embedding after content change
    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId: args.noteId,
      text: args.plainTextContent,
    });

    return "saved";
  },
});

export const getNotes = query({
  async handler(ctx) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const notes = await ctx.db
      .query("notes")
      .withIndex("by_tokenIdentifier", (q) => q.eq("tokenIdentifier", userId))
      .order("desc")
      .collect();

    return notes;
  },
});

export const getNote = query({
  args: {
    noteId: v.optional(v.id("notes")),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId || !args.noteId) {
      return null;
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.tokenIdentifier !== userId) {
      return null;
    }

    return note;
  },
});

// embeddings:
export async function embed(text: string): Promise<number[]> {
  const model = genAI.getGenerativeModel({ model: "embedding-001" });
  const result = await model.embedContent(text);
  
  const embeddingArray = result.embedding.values;
  
  if (!Array.isArray(embeddingArray)) {
    throw new Error("Unexpected embedding format");
  }
  
  return embeddingArray;
}

export const setNoteEmbedding = internalMutation({
  args: {
    noteId: v.id("notes"),
    embedding: v.array(v.number()),
  },
  async handler(ctx, args) {
    await ctx.db.patch(args.noteId, {
      embedding: args.embedding,
    });
  },
});

export const createNoteEmbedding = internalAction({
  args: {
    noteId: v.id("notes"),
    text: v.string(),
  },
  async handler(ctx, args) {
    const embedding = await embed(args.text);
    await ctx.runMutation(internal.notes.setNoteEmbedding, {
      noteId: args.noteId,
      embedding,
    });
  },
});

// New function to update embeddings in real-time
export const updateNoteEmbeddingRealTime = mutation({
  args: {
    noteId: v.id("notes"),
    plainTextContent: v.string(),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You must be logged in to update note embeddings");
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.tokenIdentifier !== userId) {
      throw new ConvexError("Note not found or you don't have permission to edit this note");
    }

    // Update the plainTextContent
    await ctx.db.patch(args.noteId, {
      plainTextContent: args.plainTextContent,
    });

    // Generate and update the embedding
    await ctx.scheduler.runAfter(0, internal.notes.createNoteEmbedding, {
      noteId: args.noteId,
      text: args.plainTextContent,
    });

    return "embedding updated";
  },
});