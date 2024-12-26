import React, { useState } from 'react'
import { TasksList } from './tasks-list/tasks-list'
import { api } from '@/utils/api'
import { useToast } from '@/hooks/use-toast'
import { useModalStore } from '@/stores/modal-store'
import { type TaskFormValues } from './task-manager/useTaskForm'
import { TaskManager } from './task-manager/task-manager'
import { TasksListSkeleton } from './tasks-list/tasks-list.skeleton'

export const TasksPage = () => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('')
  const { data, isLoading } = api.task.find.useQuery()

  const { data: taskData, isLoading: isTaskDataLoading } =
    api.task.findOne.useQuery(
      {
        id: selectedTaskId,
      },
      {
        enabled: !!selectedTaskId,
      },
    )

  const utils = api.useUtils()
  const setIsOpen = useModalStore((state) => state.setIsOpen)
  const { toast } = useToast()

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

  const updateTaskMutation = api.task.update.useMutation({
    onSuccess: async () => {
      setIsOpen(false)
      toast({
        title: 'Success',
        description: 'Task has been updated successfully',
        variant: 'default',
      })
      await utils.task.find.invalidate()
    },
  })

  const onSubmit = async (formData: TaskFormValues) => {
    console.log({ formData })
    try {
      if (selectedTaskId) {
        await updateTaskMutation.mutateAsync({
          id: selectedTaskId,
          assignee_id: formData.assigneeId,
          taskname: formData.name,
          description: formData.description,
          priority: formData.priority,
          storypoints: formData.storyPoints,
        })
        setSelectedTaskId('')
        return
      }

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

  const onSelectTask = (id: string) => {
    setSelectedTaskId(id)
    setIsOpen(true)
  }

  return (
    <div className="flex w-full justify-center">
      <div className="p-4 w-4/5">
        {isLoading ? <TasksListSkeleton /> : null}

        {data && !isLoading ? (
          <>
            <TaskManager
              isTaskDataLoading={isTaskDataLoading}
              defaultValues={taskData}
              isSubmitting={
                createTaskMutation.isPending || updateTaskMutation.isPending
              }
              onSubmit={onSubmit}
            />
            <TasksList data={data} onSelectTask={onSelectTask} />
          </>
        ) : null}
      </div>
    </div>
  )
}
