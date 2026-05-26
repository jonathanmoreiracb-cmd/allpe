import { createClient } from "@supabase/supabase-js";

let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";

// Bulletproof validation: if the env variable is missing, empty, or set to a non-URL placeholder,
// we override it with a valid HTTP/HTTPS URL fallback to prevent build-time crashes.
if (!supabaseUrl || !supabaseUrl.startsWith("http")) {
  supabaseUrl = "https://placeholder-url.supabase.co";
}

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
