import React from 'react'
import { CreateTaskManager } from './create-task-manager/create-task-manager'
import { TasksList } from './tasks-list/tasks-list'
import { api } from '@/utils/api'

export const TasksPage = () => {
  const { data, isLoading } = api.task.find.useQuery()

  return (
    <div className="flex w-full justify-center">
      <div className="p-4 w-4/5">
        <CreateTaskManager />
        {isLoading && <div>Loading...</div>}
        {data && !isLoading ? <TasksList data={data} /> : null}
      </div>
    </div>
  )
}
