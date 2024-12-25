import { supabaseClient } from '@/server/supabase-client/client'

export const AssigneeService = {
  async find() {
    try {
      return (await supabaseClient.from('assignee').select()).data
    } catch (error) {
      console.error('error', error)
    }
  },
}
