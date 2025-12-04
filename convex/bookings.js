import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const PAGE_SIZE = 10;

export const getBookings = query({
  args: {
    filter: v.optional(
      v.object({
        field: v.string(),
        value: v.any(),
        method: v.optional(v.string()),
      })
    ),
    sortBy: v.optional(
      v.object({
        field: v.string(),
        direction: v.string(),
      })
    ),
    page: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let bookings = await ctx.db.query("bookings").collect();

    // Apply filter
    if (args.filter) {
      const { field, value, method = "eq" } = args.filter;
      bookings = bookings.filter((booking) => {
        const fieldValue = booking[field];
        switch (method) {
          case "eq":
            return fieldValue === value;
          case "gte":
            return fieldValue >= value;
          case "lte":
            return fieldValue <= value;
          default:
            return fieldValue === value;
        }
      });
    }

    // Apply sort
    if (args.sortBy) {
      const { field, direction } = args.sortBy;
      bookings.sort((a, b) => {
        const aVal = a[field];
        const bVal = b[field];
        if (aVal < bVal) return direction === "asc" ? -1 : 1;
        if (aVal > bVal) return direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    // Get related data
    const bookingsWithRelations = await Promise.all(
      bookings.map(async (booking) => {
        const cabin = await ctx.db.get(booking.cabinId);
        const guest = await ctx.db.get(booking.guestId);
        return {
          ...booking,
          cabins: cabin ? { name: cabin.name } : null,
          guests: guest
            ? {
                fullName: guest.fullName,
                email: guest.email,
              }
            : null,
        };
      })
    );

    // Apply pagination
    const count = bookingsWithRelations.length;
    if (args.page) {
      const from = (args.page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE;
      return {
        data: bookingsWithRelations.slice(from, to),
        count,
      };
    }

    return { data: bookingsWithRelations, count };
  },
});

export const getBooking = query({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) {
      throw new Error("Booking not found");
    }

    const cabin = await ctx.db.get(booking.cabinId);
    const guest = await ctx.db.get(booking.guestId);

    return {
      ...booking,
      cabins: cabin || null,
      guests: guest || null,
    };
  },
});

export const getBookingsAfterDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_created_at", (q) => q.gte("created_at", args.date))
      .collect();

    return bookings.map((booking) => ({
      created_at: booking.created_at,
      totalPrice: booking.totalPrice,
      extrasPrice: booking.extrasPrice,
    }));
  },
});

export const getStaysAfterDate = query({
  args: { date: v.string() },
  handler: async (ctx, args) => {
    const bookings = await ctx.db
      .query("bookings")
      .withIndex("by_startDate", (q) => q.gte("startDate", args.date))
      .collect();

    const stays = await Promise.all(
      bookings.map(async (booking) => {
        const guest = await ctx.db.get(booking.guestId);
        return {
          ...booking,
          guests: guest ? { fullName: guest.fullName } : null,
        };
      })
    );

    return stays;
  },
});

export const getStaysTodayActivity = query({
  args: { today: v.string() },
  handler: async (ctx, args) => {
    const allBookings = await ctx.db.query("bookings").collect();

    const todayBookings = allBookings.filter((booking) => {
      const isUnconfirmedToday =
        booking.status === "unconfirmed" && booking.startDate === args.today;
      const isCheckoutToday =
        booking.status === "checked-in" && booking.endDate === args.today;
      return isUnconfirmedToday || isCheckoutToday;
    });

    const activities = await Promise.all(
      todayBookings.map(async (booking) => {
        const guest = await ctx.db.get(booking.guestId);
        return {
          ...booking,
          guests: guest
            ? {
                fullName: guest.fullName,
                nationality: guest.nationality,
                countryFlag: guest.countryFlag,
              }
            : null,
        };
      })
    );

    return activities.sort(
      (a, b) =>
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
    );
  },
});

export const updateBooking = mutation({
  args: {
    id: v.id("bookings"),
    updates: v.any(),
  },
  handler: async (ctx, args) => {
    const booking = await ctx.db.get(args.id);
    if (!booking) {
      throw new Error("Booking not found");
    }

    await ctx.db.patch(args.id, args.updates);
    return await ctx.db.get(args.id);
  },
});

export const deleteBooking = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

