import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create note mutation
export const createNote = mutation({
  args: {
    text: v.string(),  
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      throw new ConvexError("You must be logged in to create a note");
    }

    const note = await ctx.db.insert("notes", {
      text: args.text,
       // Save content
      tokenIdentifier: userId,
    });

    return note;
  },
});

// Update note content mutation for auto-saving
export const updateNoteContent = mutation({
  args: {
    noteId: v.id("notes"),
    content: v.string(),
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
      
    });
  },
});

// Get all notes for a user
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
    noteId: v.id("notes"),
  },
  async handler(ctx, args) {
    const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier;

    if (!userId) {
      return null;
    }

    const note = await ctx.db.get(args.noteId);

    if (!note || note.tokenIdentifier !== userId) {
      return null;
    }

    return note;
  },
});
