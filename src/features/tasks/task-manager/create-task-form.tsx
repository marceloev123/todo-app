import React from 'react'
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

interface CreateTaskFormProps {
  isSubmitting: boolean
  onSubmit: (formData: TaskFormValues) => void
}

export const CreateTaskForm = ({
  isSubmitting,
  onSubmit,
}: CreateTaskFormProps) => {
  const form = useTaskForm()
  const onCloseSheet = () => {
    form.reset()
  }

  return (
    <SheetContent onInteractOutside={onCloseSheet} onCloseSheet={onCloseSheet}>
      <SheetHeader>
        <SheetTitle>Create Task</SheetTitle>
      </SheetHeader>
      <TaskForm form={form} onSubmit={onSubmit} isSubmitting={isSubmitting} />
      <SheetFooter>
        <Button type="submit" form="taskForm" disabled={isSubmitting}>
          {isSubmitting ? <Loader2 className="animate-spin" /> : null}
          Submit
        </Button>
      </SheetFooter>
    </SheetContent>
  )
}
