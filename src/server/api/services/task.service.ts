import { supabaseClient } from "@/server/supabase-client/client";
import { type TaskCreateInput, type TaskUpdateInput } from "../dto/task.dto";

export const TaskService = {
  async create(task: TaskCreateInput) {
    return await supabaseClient.from("tasks").insert(task);
  },
  async find() {
    return await supabaseClient.from("tasks").select();
  },
  async makeStateUpdater(id: string, task: TaskUpdateInput) {
    return await supabaseClient.from("tasks").update(task).match({ id });
  },
  async delete(id: string) {
    return await supabaseClient.from("tasks").delete().match({ id });
  },
};
