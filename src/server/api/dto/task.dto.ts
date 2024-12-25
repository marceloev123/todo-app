import { type Database } from '@/server/supabase-client/database.types'
import { z } from 'zod'

export type TaskCreateInput = Database['public']['Tables']['task']['Insert']
export type TaskUpdateInput = Database['public']['Tables']['task']['Update']
export type TaskDeleteInput = { id: string }
export type Task = Database['public']['Tables']['task']['Row']

export const TaskCreateInputSchema = z.object({
  assignee_id: z.string().uuid(),
  description: z.string(),
  priority: z.enum(['Urgent', 'High', 'Normal', 'Low']),
  storypoints: z.number(),
  taskname: z.string(),
})

export const TaskUpdateInputSchema = TaskCreateInputSchema.extend({
  id: z.string().uuid(),
})
