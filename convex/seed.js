import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const deleteAllGuests = mutation({
  handler: async (ctx) => {
    const guests = await ctx.db.query("guests").collect();
    for (const guest of guests) {
      await ctx.db.delete(guest._id);
    }
  },
});

export const deleteAllCabins = mutation({
  handler: async (ctx) => {
    const cabins = await ctx.db.query("cabins").collect();
    for (const cabin of cabins) {
      await ctx.db.delete(cabin._id);
    }
  },
});

export const deleteAllBookings = mutation({
  handler: async (ctx) => {
    const bookings = await ctx.db.query("bookings").collect();
    for (const booking of bookings) {
      await ctx.db.delete(booking._id);
    }
  },
});

export const createGuests = mutation({
  args: {
    guests: v.array(
      v.object({
        fullName: v.string(),
        email: v.string(),
        nationality: v.string(),
        nationalID: v.string(),
        countryFlag: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const guestIds = [];
    for (const guest of args.guests) {
      const id = await ctx.db.insert("guests", guest);
      guestIds.push(id);
    }
    return guestIds;
  },
});

export const createCabins = mutation({
  args: {
    cabins: v.array(
      v.object({
        name: v.string(),
        maxCapacity: v.number(),
        regularPrice: v.number(),
        discount: v.number(),
        image: v.string(),
        description: v.string(),
      })
    ),
  },
  handler: async (ctx, args) => {
    const cabinIds = [];
    for (const cabin of args.cabins) {
      const id = await ctx.db.insert("cabins", cabin);
      cabinIds.push(id);
    }
    return cabinIds;
  },
});

export const createBookings = mutation({
  args: {
    bookings: v.array(
      v.object({
        created_at: v.string(),
        startDate: v.string(),
        endDate: v.string(),
        numNights: v.number(),
        numGuests: v.number(),
        cabinPrice: v.number(),
        extrasPrice: v.number(),
        totalPrice: v.number(),
        status: v.union(
          v.literal("unconfirmed"),
          v.literal("checked-in"),
          v.literal("checked-out")
        ),
        hasBreakfast: v.boolean(),
        isPaid: v.boolean(),
        observations: v.optional(v.string()),
        cabinId: v.id("cabins"),
        guestId: v.id("guests"),
      })
    ),
  },
  handler: async (ctx, args) => {
    for (const booking of args.bookings) {
      await ctx.db.insert("bookings", booking);
    }
  },
});

