import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { TaskService } from '../services/task.service'
import { TaskCreateInputSchema } from '../dto/task.dto'

export const taskRouter = createTRPCRouter({
  find: publicProcedure.query(() => {
    return TaskService.find()
  }),
  create: publicProcedure.input(TaskCreateInputSchema).mutation(({ input }) => {
    return TaskService.create(input)
  }),
})
