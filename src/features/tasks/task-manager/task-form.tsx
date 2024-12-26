import React from 'react'
import { Input } from '../../../components/ui/input'
import { type TaskFormValues } from './useTaskForm'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { type UseFormReturn } from 'react-hook-form'
import { api } from '@/utils/api'
import { TaskFormSkeleton } from './task-form.skeleton'

interface TaskFormProps {
  form: UseFormReturn<TaskFormValues>
  isSubmitting: boolean
  onSubmit: (formData: TaskFormValues) => void
}

export const TaskForm = ({ form, isSubmitting, onSubmit }: TaskFormProps) => {
  const { handleSubmit, control } = form

  const { data: assigneesData, isLoading } = api.assignee.find.useQuery()

  if (isLoading) {
    return <TaskFormSkeleton />
  }

  return (
    <Form {...form}>
      <form
        id="taskForm"
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 py-4"
      >
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} disabled={isSubmitting} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Description"
                  {...field}
                  disabled={isSubmitting}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="assigneeId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assignee</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {assigneesData?.map((assignee) => (
                    <SelectItem key={assignee.id} value={assignee.id}>
                      {assignee.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="storyPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Story Points</FormLabel>
              <FormControl>
                <Input
                  placeholder="Story Points"
                  type="number"
                  {...field}
                  disabled={isSubmitting}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
                disabled={isSubmitting}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {['Low', 'Normal', 'High', 'Urgent'].map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
