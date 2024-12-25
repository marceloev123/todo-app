import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TaskService } from "../services/task.service";

export const postRouter = createTRPCRouter({
  find: publicProcedure.query(() => {
    return TaskService.find();
  }),
});
