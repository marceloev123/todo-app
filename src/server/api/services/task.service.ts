import { supabaseClient } from '@/server/supabase-client/client'
import { type TaskCreateInput, type TaskUpdateInput } from '../dto/task.dto'

export const TaskService = {
  async find() {
    return (
      await supabaseClient
        .from('task')
        .select()
        .order('created_at', { ascending: false })
    ).data
  },
  async findOne(id: string) {
    return (await supabaseClient.from('task').select().eq('id', id)).data?.[0]
  },
  async create(task: TaskCreateInput) {
    return await supabaseClient.from('task').insert(task)
  },
  async update(id: string, task: TaskUpdateInput) {
    return await supabaseClient.from('task').update(task).match({ id })
  },
  async delete(id: string) {
    return await supabaseClient.from('task').delete().match({ id })
  },
}
