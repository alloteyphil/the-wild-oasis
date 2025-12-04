import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCabins = query({
  handler: async (ctx) => {
    return await ctx.db.query("cabins").collect();
  },
});

export const createEditCabin = mutation({
  args: {
    cabin: v.object({
      name: v.string(),
      maxCapacity: v.number(),
      regularPrice: v.number(),
      discount: v.number(),
      image: v.string(),
      description: v.string(),
    }),
    id: v.optional(v.id("cabins")),
  },
  handler: async (ctx, args) => {
    if (args.id) {
      // Edit existing cabin
      await ctx.db.patch(args.id, args.cabin);
      return await ctx.db.get(args.id);
    } else {
      // Create new cabin
      const cabinId = await ctx.db.insert("cabins", args.cabin);
      return await ctx.db.get(cabinId);
    }
  },
});

export const deleteCabin = mutation({
  args: { id: v.id("cabins") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

