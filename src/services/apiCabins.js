import { convexHttpClient } from "./convexClient.js";
import { api } from "../../convex/_generated/api";
import { transformConvexDoc } from "./convexHelpers.js";

export async function getCabins() {
  const result = await convexHttpClient.query(api.cabins.getCabins);
  return transformConvexDoc(result);
}

export async function createEditCabin(newCabin, id) {
  const isEditSession = Boolean(id);
  const hasImagePath = Boolean(typeof newCabin.image === "string");

  let imageUrl = newCabin.image;

  // If image is a file, upload it
  if (!hasImagePath && newCabin.image) {
    // Convex accepts Blob
    const fileBlob = newCabin.image instanceof Blob 
      ? newCabin.image 
      : new Blob([newCabin.image]);
    imageUrl = await convexHttpClient.mutation(api.files.uploadCabinImage, {
      file: fileBlob,
    });
  }

  const cabinData = {
    name: newCabin.name,
    maxCapacity: newCabin.maxCapacity,
    regularPrice: newCabin.regularPrice,
    discount: newCabin.discount,
    image: imageUrl,
    description: newCabin.description,
  };

  const result = await convexHttpClient.mutation(api.cabins.createEditCabin, {
    cabin: cabinData,
    id: id || undefined,
  });

  return transformConvexDoc(result);
}

export async function deleteCabin(id) {
  await convexHttpClient.mutation(api.cabins.deleteCabin, {
    id,
  });
}
