import { convexHttpClient } from "./convexClient.js";
import { api } from "../../convex/_generated/api";
import { transformConvexDoc } from "./convexHelpers.js";

export async function getSettings() {
  const result = await convexHttpClient.query(api.settings.getSettings);
  return transformConvexDoc(result);
}

export async function updateSetting(newSetting) {
  const result = await convexHttpClient.mutation(api.settings.updateSetting, {
    updates: newSetting,
  });
  return transformConvexDoc(result);
}
