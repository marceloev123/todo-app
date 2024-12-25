import { supabaseClient } from '@/server/supabase-client/client'
import { type TaskCreateInput, type TaskUpdateInput } from '../dto/task.dto'

export const TaskService = {
  async create(task: TaskCreateInput) {
    return await supabaseClient.from('task').insert(task)
  },
  async find() {
    try {
      return (await supabaseClient.from('task').select()).data
    } catch (error) {
      console.error('error', error)
    }
  },
  async makeStateUpdater(id: string, task: TaskUpdateInput) {
    return await supabaseClient.from('task').update(task).match({ id })
  },
  async delete(id: string) {
    return await supabaseClient.from('task').delete().match({ id })
  },
}
