import React from 'react'
import { type Task } from '@/server/api/dto/task.dto'
import { type TaskFormValues, useTaskForm } from './useTaskForm'
import { TaskForm } from './task-form'
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

interface UpdateTaskFormProps {
  isSubmitting: boolean
  onSubmit: (formData: TaskFormValues) => Promise<void>
  defaultValues: Task
}

export const UpdateTaskForm = ({
  defaultValues,
  isSubmitting,
  onSubmit,
}: UpdateTaskFormProps) => {
  const form = useTaskForm(defaultValues)

  const onCloseSheet = () => {
    form.reset()
  }

  return (
    <SheetContent onInteractOutside={onCloseSheet} onCloseSheet={onCloseSheet}>
      <SheetHeader>
        <SheetTitle>Update Task</SheetTitle>
      </SheetHeader>
      <TaskForm form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      <SheetFooter>
        <Button type="submit" form="taskForm" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : null}
          Save changes
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
