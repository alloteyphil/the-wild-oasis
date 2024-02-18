import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ensnatkqbqhnmzuhrdho.supabase.co";

const supabaseKey = process.env.VITE_SUPABASE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
