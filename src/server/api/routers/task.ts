import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { TaskService } from '../services/task.service'
import { TaskCreateInputSchema, TaskUpdateInputSchema } from '../dto/task.dto'
import { z } from 'zod'

export const taskRouter = createTRPCRouter({
  findOne: publicProcedure
    .input(
      z.object({
        id: z.string().uuid(),
      }),
    )
    .query(({ input }) => {
      return TaskService.findOne(input.id)
    }),
  find: publicProcedure.query(() => {
    return TaskService.find()
  }),
  create: publicProcedure.input(TaskCreateInputSchema).mutation(({ input }) => {
    return TaskService.create(input)
  }),
  update: publicProcedure.input(TaskUpdateInputSchema).mutation(({ input }) => {
    return TaskService.update(input.id, input)
  }),
})
