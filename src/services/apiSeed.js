import { convexHttpClient } from "./convexClient.js";
import { api } from "../../convex/_generated/api";

export async function createInitialAdmin() {
  const result = await convexHttpClient.mutation(api.seedAdmin.createInitialAdmin);
  return result;
}

