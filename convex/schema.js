import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    fullName: v.string(),
    avatar: v.optional(v.string()),
    password: v.string(), // In production, this should be hashed
    role: v.union(
      v.literal("admin"),
      v.literal("manager"),
      v.literal("employee")
    ),
  })
    .index("by_email", ["email"]),

  guests: defineTable({
    fullName: v.string(),
    email: v.string(),
    nationality: v.string(),
    nationalID: v.string(),
    countryFlag: v.string(),
  }),

  cabins: defineTable({
    name: v.string(),
    maxCapacity: v.number(),
    regularPrice: v.number(),
    discount: v.number(),
    image: v.string(),
    description: v.string(),
  }),

  bookings: defineTable({
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
    .index("by_status", ["status"])
    .index("by_startDate", ["startDate"])
    .index("by_endDate", ["endDate"])
    .index("by_created_at", ["created_at"]),

  settings: defineTable({
    minBookingLength: v.number(),
    maxBookingLength: v.number(),
    maxGuestsPerBooking: v.number(),
    breakfastPrice: v.number(),
  }),
});

