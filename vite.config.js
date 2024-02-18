import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      "process.env.REACT_APP_API_KEY": JSON.stringify(
        // eslint-disable-next-line no-undef
        process.env.REACT_APP_API_KEY
      ),
      // Add other environment variables here as needed
    },
  };
});
