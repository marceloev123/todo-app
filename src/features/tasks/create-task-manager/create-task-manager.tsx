import React, { useState } from 'react'
import { SideSheetForm } from './side-sheet-form'
import { api } from '@/utils/api'
import { type TaskFormValues } from './useTaskForm'
import { useToast } from '@/hooks/use-toast'

export const CreateTaskManager = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { toast } = useToast()

  const utils = api.useUtils()

  const { data: assigneesData } = api.assignee.find.useQuery()

  const createTaskMutation = api.task.create.useMutation({
    onSuccess: async () => {
      setIsOpen(false)
      toast({
        title: 'Success',
        description: 'Task has been created successfully',
        variant: 'default',
      })
      await utils.task.find.invalidate()
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive',
      })
    },
  })

  const onSubmit = async (formData: TaskFormValues) => {
    try {
      await createTaskMutation.mutateAsync({
        assignee_id: formData.assigneeId,
        taskname: formData.name,
        description: formData.description,
        priority: formData.priority,
        storypoints: formData.storyPoints,
      })
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: 'Error',
          description: error.message,
          variant: 'destructive',
        })
      }
    }
  }

  if (!assigneesData) {
    return null
  }

  return (
    <SideSheetForm
      onSubmit={onSubmit}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      assigneesData={assigneesData}
      isSubmitting={createTaskMutation.isPending}
    />
  )
}
