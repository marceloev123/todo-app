import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().min(1, 'Description is required'),
  priority: z.enum(['Urgent', 'High', 'Normal', 'Low']),
  storyPoints: z
    .number()
    .int()
    .min(0, 'Story points must be a positive number'),
  assigneeId: z.string().uuid('Assignee is required'),
})

export type TaskFormValues = z.infer<typeof formSchema>

export function useTaskForm() {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
  })

  return form
}
