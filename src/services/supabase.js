import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://ensnatkqbqhnmzuhrdho.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVuc25hdGtxYnFobm16dWhyZGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDcxNTM1NDAsImV4cCI6MjAyMjcyOTU0MH0.MdF2U6gL3POWwf0XrGJ9N1k6kgLCHbzD6Un3BW1JE94";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
