import { h } from 'vue'
import { format } from 'date-fns'

import DataTableColumnHeader from '@components/table/ColumnHeader.vue'
import DataTableColumnHeaderFilter from '@components/table/ColumnHeaderFilter.vue'
import TableActionCell from '@components/table/TableActionCell.vue'
import Text from '@components/text/Text.vue'
import RequestStatus from './RequestStatus.vue'

export const useColumns = ({ setOpenPopup, setId, handleApprove }) => {
  return [
    {
      accessorKey: 'userName',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Name' }),
      cell: ({ row }) =>
        h(
          Text,
          { truncated: true, type: 'primary' },
          () => row.original.user_request?.username || 'N/A'
        ),
      enableSorting: true,
      cellClass: 'max-w-[300px] truncate'
    },
    {
      accessorKey: 'userEmail',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Email' }),
      cell: ({ row }) =>
        h(
          Text,
          { truncated: true, type: 'primary' },
          () => row.original.user_request?.user_email || 'N/A'
        ),
      enableSorting: false,
      cellClass: 'max-w-[300px] truncate'
    },
    {
      accessorKey: 'map_id',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Map ID' }),
      cell: ({ row }) =>
        h(Text, { truncated: true, type: 'primary' }, () => row.getValue('map_id')),
      enableSorting: false,
      cellClass: 'w-[150px]'
    },
    {
      accessorKey: 'message',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Message' }),
      cell: ({ row }) =>
        h(Text, { truncated: true, type: 'primary' }, () => row.getValue('message')),
      enableSorting: false,
      cellClass: 'w-[350px] truncate'
    },
    {
      accessorKey: 'request_status',
      header: ({ column }) =>
        h(DataTableColumnHeaderFilter, {
          column,
          title: 'STATUS',
          class: 'text-center w-auto'
        }),
      cell: ({ row }) => h(RequestStatus, { status: row.getValue('request_status') }),
      align: 'center',
      headerAlign: 'center',
      enableSorting: false
    },
    {
      accessorKey: 'created_at',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Create Date' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => {
          return format(row.getValue('created_at'), 'dd MMM yyyy')
        }),
      enableSorting: true
    },

    {
      accessorKey: 'actions',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Actions' }),
      cellClass: 'w-[47px]',
      cell: ({ row }) =>
        h(TableActionCell, {
          actions: ['approve', 'reject'],
          setOpenPopup,
          handleApprove,
          setId: () => setId(row.original)
        }),
      enableSorting: false
    }
  ]
}
