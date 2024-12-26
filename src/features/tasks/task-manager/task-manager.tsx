import { type Task } from '@/server/api/dto/task.dto'
import React from 'react'
import { UpdateTaskForm } from './update-task-form'
import { CreateTaskForm } from './create-task-form'
import { type TaskFormValues } from './useTaskForm'
import { useModalStore } from '@/stores/modal-store'
import { Sheet, SheetTrigger } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'

interface TaskManagerProps {
  defaultValues: Task | undefined
  isSubmitting: boolean
  isTaskDataLoading: boolean
  onSubmit: (formData: TaskFormValues) => Promise<void>
}

export const TaskManager = ({
  defaultValues,
  isSubmitting,
  isTaskDataLoading,
  onSubmit,
}: TaskManagerProps) => {
  const mode = useModalStore((state) => state.mode)
  const isOpen = useModalStore((state) => state.isOpen)
  const setIsOpen = useModalStore((state) => state.setIsOpen)
  const setMode = useModalStore((state) => state.setMode)

  const onOpenSheet = () => {
    setIsOpen(true)
    setMode('create')
  }

  let content = <div />

  if (isTaskDataLoading) {
    content = <div />
  }

  if (mode === 'update' && defaultValues?.id) {
    content = (
      <UpdateTaskForm
        key={defaultValues.id}
        defaultValues={defaultValues}
        isSubmitting={isSubmitting}
        onSubmit={onSubmit}
      />
    )
  }

  if (mode === 'create') {
    content = <CreateTaskForm isSubmitting={isSubmitting} onSubmit={onSubmit} />
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" onClick={onOpenSheet}>
          Add Task
        </Button>
      </SheetTrigger>
      {content}
    </Sheet>
  )
}
