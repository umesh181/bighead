
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getDocuments = query({
    async handler(ctx) {
        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        console.log(userId);
        
        if (!userId) {
          return [];
        }
      return await ctx.db.query('documnets')
      .withIndex('by_tokenIdentifier', (q) => q.eq('tokenIdentifier',
        userId
      )).collect()
    },
  })

export const createDocument = mutation({
    args:{
        title:v.string()
    },

    async handler(ctx, args) {

        const userId = (await ctx.auth.getUserIdentity())?.tokenIdentifier
        
        if (!userId) {
          throw new ConvexError('Not authenticated')
        }
        
        await ctx.db.insert('documnets',{
            title: args.title,
            tokenIdentifier:userId
        })
    },
})