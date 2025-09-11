import { h } from 'vue'

import DataTableColumnHeader from '@components/table/ColumnHeader.vue'
import TableActionCell from '@components/table/TableActionCell.vue'
import Text from '@components/text/Text.vue'
import { format, isValid, parseISO } from 'date-fns'

export const useColumns = ({ setOpenPopup, setId }) => {
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

  return [
    {
      accessorKey: 'name',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
      cell: ({ row }) =>
        h(Text, { truncated: true, type: 'primary' }, () => [row.getValue('name') || 'N/A']),
      enableSorting: true,
      cellClass: 'max-w-[300px] truncate'
    },
    {
      accessorKey: 'email',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Email' }),
      cell: ({ row }) =>
        h(Text, { truncated: true, type: 'primary', title: row.getValue('email') }, () => [
          row.getValue('email')
        ]),
      enableSorting: false,
      cellClass: 'max-w-[350px] truncate'
    },
    {
      accessorKey: 'tier',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Tier' }),
      cell: ({ row }) => {
        const tier = row.getValue('tier')
        return h(Text, { truncated: true, type: 'primary', title: tier?.name }, () => [
          tier?.name || 'N/A'
        ])
      },
      enableSorting: false,
      cellClass: 'w-[150px]'
    },
    {
      accessorKey: 'numberOfGroups',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Groups' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => [row.getValue('numberOfGroups')?.toString() || '0']),
      enableSorting: true,
      cellClass: 'w-[100px] text-center'
    },
    {
      accessorKey: 'numberOfOpeningTasks',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Open Tasks' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => [
          row.getValue('numberOfOpeningTasks')?.toString() || '0'
        ]),
      enableSorting: true,
      cellClass: 'w-[120px] text-center'
    },
    {
      accessorKey: 'joinedDate',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Joined Date' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => [formatDate(row.getValue('joinedDate'))]),
      enableSorting: true,
      cellClass: 'w-[130px]'
    },
    {
      accessorKey: 'isActive',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Status' }),
      cell: ({ row }) => {
        const isActive = row.getValue('isActive')
        return h(
          'span',
          {
            class: `inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`
          },
          isActive ? 'Active' : 'Inactive'
        )
      },
      enableSorting: false,
      cellClass: 'w-[100px]'
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
