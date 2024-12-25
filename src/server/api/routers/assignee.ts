import { createTRPCRouter, publicProcedure } from '@/server/api/trpc'
import { AssigneeService } from '../services/assignee.service';

export const assigneeRouter = createTRPCRouter({
  find: publicProcedure.query(() => {
    return AssigneeService.find()
  }),
})
