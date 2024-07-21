import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  documnets: defineTable({ 
    title: v.string(),
    tokenIdentifier:v.string(),

   }).index('by_tokenIdentifier',['tokenIdentifier'])
});