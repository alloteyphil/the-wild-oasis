import { convexHttpClient } from "./convexClient.js";
import { api } from "../../convex/_generated/api";
import { transformConvexDoc } from "./convexHelpers.js";

export async function hasAnyUsers() {
  const result = await convexHttpClient.query(api.auth.hasAnyUsers);
  return result;
}

export async function signup({ fullName, email, password, role }) {
  // Get current user email (admin creating the user)
  const currentUserEmail = localStorage.getItem("userEmail");
  
  const result = await convexHttpClient.mutation(api.auth.signup, {
    email,
    password,
        fullName,
    role: role || undefined,
    createdByEmail: currentUserEmail || undefined,
  });

  // Store user email for subsequent requests (only if this is the current user signing up)
  // For admin creating other users, don't change the session
  if (result && result.email && email === currentUserEmail) {
    localStorage.setItem("userEmail", email);
    if (result.userId) {
      localStorage.setItem("userId", result.userId);
    }
    // Return in format expected by useSignup hook
    return { user: { ...result, role: result.role || "authenticated" } };
  }
  
  // Return result for admin creating other users
  return result;
}

export async function login({ email, password }) {
  try {
    const result = await convexHttpClient.mutation(api.auth.login, {
    email,
    password,
  });

    // Store user email for subsequent requests
    if (result && result.user) {
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userId", result.user._id || "");
    }
    
    return result;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
}

export async function getCurrentUser() {
  const userEmail = localStorage.getItem("userEmail");
  if (!userEmail) return null;

  const user = await convexHttpClient.query(api.auth.getCurrentUser, {
    email: userEmail,
  });
  return transformConvexDoc(user);
}

export async function logout() {
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userId");
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  const userEmail = localStorage.getItem("userEmail");
  const userId = localStorage.getItem("userId");

  if (!userEmail) {
    throw new Error("User not authenticated");
  }

  // Handle avatar upload if provided
  let avatarUrl = avatar;
  if (avatar && typeof avatar !== "string" && userId) {
    // Upload avatar file - Convex accepts Blob
    avatarUrl = await convexHttpClient.mutation(api.files.uploadAvatar, {
      file: avatar instanceof Blob ? avatar : new Blob([avatar]),
      userId: userId,
    });
  }

  const result = await convexHttpClient.mutation(api.auth.updateUser, {
    email: userEmail,
    password,
    fullName,
    avatar: avatarUrl,
  });

  return { user: transformConvexDoc(result) };
}
