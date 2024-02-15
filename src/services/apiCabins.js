import supabase, { supabaseUrl } from "./supabase.js";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be loaded.");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const isEditSession = Boolean(id);
  const hasImagePath = Boolean(typeof newCabin.image === "string");

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );
  const imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create or edit the cabin
  let query = supabase.from("cabins");
  const newImage = hasImagePath ? newCabin.image : imagePath;

  //A. CREATE
  if (!isEditSession) query = query.insert([{ ...newCabin, image: newImage }]);

  //B.EDIT
  if (isEditSession)
    query = query
      .update({ ...newCabin, image: newImage })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error(
      `Cabins could not be ${isEditSession ? "edited" : "created"}!`
    );
  }

  // 2) Upload the image if it isn't already uploaded
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, newCabin.image);

  //3.Delete the cabin if there was an error uploading image.
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(storageError);
    throw new Error(
      "Cabin image could not be uploaded and the cabin could not be created."
    );
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabins could not be deleted.");
  }

  return data;
}
