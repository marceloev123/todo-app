import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

export const TaskFormSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 mt-4">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <Skeleton className="h-[16px] w-[150px]" />
          <Skeleton className="h-[36px] w-full" />
        </div>
      ))}
    </div>
  )
}
