import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ensnatkqbqhnmzuhrdho.supabase.co";

// eslint-disable-next-line no-undef
const supabaseKey = process.env.REACT_APP_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
