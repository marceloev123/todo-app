import { env } from '@/env'
import { createClient } from '@supabase/supabase-js'
import { type Database } from './database.types'

export const supabaseClient = createClient<Database>(
  env.DATABASE_URL,
  env.API_KEY,
)
