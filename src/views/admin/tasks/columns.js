import { h } from 'vue'
import { isValid, parseISO } from 'date-fns'

import DataTableColumnHeader from '@components/table/ColumnHeader.vue'
import TableActionCell from '@components/table/TableActionCell.vue'
import Text from '@components/text/Text.vue'
import { format } from 'date-fns'
import { upperFirst } from 'lodash-es'

const formatDate = (dateString) => {
  if (!dateString) return 'N/A'

  try {
    const date = parseISO(dateString)
    if (!isValid(date)) return 'N/A'
    return format(date, 'dd MMM yyyy')
  } catch (error) {
    console.error('Date formatting error:', error)
    return 'N/A'
  }
}

export const useColumns = ({ setOpenPopup, setId }) => {
  return [
    {
      accessorKey: 'startDate',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Start Date' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => {
          return formatDate(row.original.startDate)
        }),
      enableSorting: true
    },
    {
      accessorKey: 'endDate',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'End Date' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => {
          return formatDate(row.original.endDate)
        }),
      enableSorting: true
    },
    {
      accessorKey: 'taskType',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Task Type' }),
      cell: ({ row }) =>
        h(Text, { truncated: true, type: 'primary' }, () => [upperFirst(row.getValue('taskType'))]),
      enableSorting: false,
      cellClass: 'w-[150px]'
    },
    {
      accessorKey: 'taskDetails',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Task Details' }),
      cell: ({ row }) => h(Text, { truncated: true }, () => row.getValue('taskDetails')),
      enableSorting: false
    },
    {
      accessorKey: 'actions',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Actions' }),
      cellClass: 'w-[47px]',
      cell: ({ row }) =>
        h(TableActionCell, {
          actions: ['edit', 'delete'],
          setOpenPopup,
          setId: () => setId(row.original)
        }),
      enableSorting: false
    }
  ]
}
