import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const uploadAvatar = mutation({
  args: {
    file: v.any(), // File object
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Store file and get storage ID
    const storageId = await ctx.storage.store(args.file);
    
    // Get file URL
    const fileUrl = await ctx.storage.getUrl(storageId);
    
    // Update user with avatar URL
    await ctx.db.patch(args.userId, { avatar: fileUrl });
    
    return fileUrl;
  },
});

export const uploadCabinImage = mutation({
  args: {
    file: v.any(), // File object
  },
  handler: async (ctx, args) => {
    // Store file and get storage ID
    const storageId = await ctx.storage.store(args.file);
    
    // Get file URL
    const fileUrl = await ctx.storage.getUrl(storageId);
    
    return fileUrl;
  },
});

export const getFileUrl = query({
  args: { storageId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.storageId);
  },
});

