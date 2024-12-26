import React from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const TasksListSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <Skeleton className="h-[36px] w-[100px] rounded-md" />

      <div className="flex flex-row gap-4 justify-between">
        <Skeleton className="h-[36px] w-[300px] rounded-md" />
        <Skeleton className="h-[36px] w-[150px] rounded-md" />
      </div>

      <div className="flex flex-row gap-4">
        <Skeleton className="h-[36px] w-full rounded-md" />
        <Skeleton className="h-[36px] w-full rounded-md" />
        <Skeleton className="h-[36px] w-full rounded-md" />
        <Skeleton className="h-[36px] w-full rounded-md" />
      </div>
      <Skeleton className="h-[36px] w-full rounded-md" />
      <Skeleton className="h-[36px] w-full rounded-md" />
      <Skeleton className="h-[36px] w-full rounded-md" />
      <Skeleton className="h-[36px] w-full rounded-md" />
    </div>
  )
}
