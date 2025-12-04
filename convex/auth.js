import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Simple password hashing (in production, use bcrypt or similar)
function hashPassword(password) {
  // This is a placeholder - in production use proper hashing
  return btoa(password);
}

function verifyPassword(password, hash) {
  return btoa(password) === hash;
}

export const signup = mutation({
  args: {
    email: v.string(),
    password: v.string(),
    fullName: v.string(),
    role: v.optional(
      v.union(v.literal("admin"), v.literal("manager"), v.literal("employee"))
    ),
    createdByEmail: v.optional(v.string()), // Email of admin creating this user
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existingUser) {
      throw new Error("User already exists");
    }

    // Check if this is the first user (allow admin creation)
    const allUsers = await ctx.db.query("users").collect();
    const isFirstUser = allUsers.length === 0;

    // If not first user, require admin role
    if (!isFirstUser) {
      if (!args.createdByEmail) {
        throw new Error("Only admins can create new users");
      }

      const creator = await ctx.db
        .query("users")
        .withIndex("by_email", (q) => q.eq("email", args.createdByEmail))
        .first();

      if (!creator || creator.role !== "admin") {
        throw new Error("Only admins can create new users");
      }
    }

    // Determine role: first user is admin, otherwise use provided role or default to employee
    const userRole = isFirstUser ? "admin" : args.role || "employee";

    // Create new user
    const userId = await ctx.db.insert("users", {
      email: args.email,
      password: hashPassword(args.password),
      fullName: args.fullName,
      avatar: "",
      role: userRole,
    });

    const user = await ctx.db.get(userId);
    const { password: _, ...userWithoutPassword } = user;
    return {
      userId: user._id,
      email: args.email,
      fullName: args.fullName,
      _id: user._id,
      ...userWithoutPassword,
    };
  },
});

export const login = mutation({
  args: {
    email: v.string(),
    password: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user || !verifyPassword(args.password, user.password)) {
      throw new Error("Invalid email or password");
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword };
  },
});

export const getCurrentUser = query({
  args: {
    email: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args.email) return null;

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) return null;

    const { password: _, ...userWithoutPassword } = user;
    return { ...userWithoutPassword, role: "authenticated" };
  },
});

export const hasAnyUsers = query({
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    return users.length > 0;
  },
});

export const updateUser = mutation({
  args: {
    email: v.string(),
    password: v.optional(v.string()),
    fullName: v.optional(v.string()),
    avatar: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    const updates = {};
    if (args.password) {
      updates.password = hashPassword(args.password);
    }
    if (args.fullName) {
      updates.fullName = args.fullName;
    }
    if (args.avatar !== undefined) {
      updates.avatar = args.avatar;
    }

    await ctx.db.patch(user._id, updates);

    const updatedUser = await ctx.db.get(user._id);
    const { password: _, ...userWithoutPassword } = updatedUser;
    return { ...userWithoutPassword, role: "authenticated" };
  },
});
