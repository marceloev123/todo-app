import { type Task } from '@/server/api/dto/task.dto'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const formSchema = z.object({
  id: z.string().uuid().optional(),
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

export function useTaskForm(defaultValues?: Task) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues?.id,
      assigneeId: defaultValues?.assignee_id ?? '',
      name: defaultValues?.taskname ?? '',
      description: defaultValues?.description ?? '',
      priority: defaultValues?.priority as TaskFormValues['priority'],
      storyPoints: defaultValues?.storypoints ?? 0,
    },
  })

  return form
}
