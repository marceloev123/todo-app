import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(env.DATABASE_URL, env.API_KEY);
