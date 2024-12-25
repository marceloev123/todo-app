import { type Database } from "@/server/supabase-client/database.types";

export type TaskCreateInput = Database["public"]["Tables"]["task"]["Insert"];
export type TaskUpdateInput = Database["public"]["Tables"]["task"]["Update"];
export type TaskDeleteInput = { id: string };
export type Task = Database["public"]["Tables"]["task"]["Row"];
