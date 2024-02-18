import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      // Define environment variables that you want to access in your application code
      "process.env.VITE_SUPABASE_API_KEY": JSON.stringify(
        process.env.VITE_SUPABASE_API_KEY
      ),
    },
  };
});
