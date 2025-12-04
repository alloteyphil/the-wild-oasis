import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    // Convex URL will be set via VITE_CONVEX_URL environment variable
  };
});
