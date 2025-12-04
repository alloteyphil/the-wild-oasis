import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getSettings = query({
  handler: async (ctx) => {
    // Get the first (and only) settings record
    const settings = await ctx.db.query("settings").first();
    
    if (!settings) {
      // Return default settings if none exist
      return {
        id: "default",
        minBookingLength: 3,
        maxBookingLength: 30,
        maxGuestsPerBooking: 10,
        breakfastPrice: 15,
      };
    }
    
    return settings;
  },
});

export const updateSetting = mutation({
  args: {
    updates: v.object({
      minBookingLength: v.optional(v.number()),
      maxBookingLength: v.optional(v.number()),
      maxGuestsPerBooking: v.optional(v.number()),
      breakfastPrice: v.optional(v.number()),
    }),
  },
  handler: async (ctx, args) => {
    // Get the first settings record
    let settings = await ctx.db.query("settings").first();
    
    if (!settings) {
      // Create default settings if none exist
      const defaultSettings = {
        minBookingLength: 3,
        maxBookingLength: 30,
        maxGuestsPerBooking: 10,
        breakfastPrice: 15,
      };
      const settingsId = await ctx.db.insert("settings", defaultSettings);
      settings = await ctx.db.get(settingsId);
    }
    
    // Update settings
    await ctx.db.patch(settings._id, args.updates);
    return await ctx.db.get(settings._id);
  },
});

