import { ConvexHttpClient } from "convex/browser";
import { ConvexReactClient } from "convex/react";

// Get Convex URL from environment variable
// This will be set when you run `npx convex dev` or deploy
const CONVEX_URL = import.meta.env.VITE_CONVEX_URL || "";

if (!CONVEX_URL) {
  console.warn(
    "VITE_CONVEX_URL is not set. Please run 'npx convex dev' and set the VITE_CONVEX_URL environment variable."
  );
}

export const convexHttpClient = new ConvexHttpClient(CONVEX_URL);
export const convexReactClient = new ConvexReactClient(CONVEX_URL);
