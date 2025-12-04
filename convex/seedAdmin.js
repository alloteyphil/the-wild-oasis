import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Simple password hashing (in production, use bcrypt or similar)
function hashPassword(password) {
  return btoa(password);
}

// Seed function to create initial admin user with demo credentials
export const createInitialAdmin = mutation({
  handler: async (ctx) => {
    // Check if any users exist
    const existingUsers = await ctx.db.query("users").collect();
    
    if (existingUsers.length > 0) {
      throw new Error("Users already exist. Cannot create initial admin.");
    }

    // Create admin user with demo credentials from Login page
    const adminEmail = "wibih77293@fna6.com";
    const adminPassword = "purple1234";
    const adminFullName = "Admin User";

    // Check if admin already exists
    const existingAdmin = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", adminEmail))
      .first();

    if (existingAdmin) {
      return { message: "Admin user already exists", userId: existingAdmin._id };
    }

    // Create admin user
    const userId = await ctx.db.insert("users", {
      email: adminEmail,
      password: hashPassword(adminPassword),
      fullName: adminFullName,
      avatar: "",
      role: "admin",
    });

    return {
      message: "Initial admin user created successfully",
      userId,
      email: adminEmail,
    };
  },
});

