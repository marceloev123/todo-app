import { type Database } from '@/server/supabase-client/database.types'

export type Assignee = Database['public']['Tables']['assignee']['Row']
