import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { type Task } from '@/server/api/dto/task.dto'
import { useModalStore } from '@/stores/modal-store'
import { Checkbox } from '@radix-ui/react-checkbox'
import {
  type ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  type VisibilityState,
  type ColumnDef,
} from '@tanstack/react-table'
import { ArrowUpDown } from 'lucide-react'
import React, { useState } from 'react'

const columns: ColumnDef<Task>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'taskname',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Name
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('taskname')}</div>
    ),
  },
  {
    accessorKey: 'description',
    header: 'Description',
    cell: ({ row }) => <div>{row.getValue('description')}</div>,
  },
  {
    accessorKey: 'priority',
    header: 'Priority',
    cell: ({ row }) => {
      return <Badge>{row.getValue('priority')}</Badge>
    },
  },
  {
    accessorKey: 'storypoints',
    header: () => {
      return <div className="text-center">Story Points</div>
    },

    cell: ({ row }) => {
      return <div className="text-center">{row.getValue('storypoints')}</div>
    },
  },
]

export const useTasksTable = (data: Task[]) => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const seIsOpen = useModalStore((state) => state.setIsOpen)

  const table = useReactTable<Task>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      seIsOpen,
    },
  })

  return {
    table,
    columnsLength: columns.length,
  }
}
