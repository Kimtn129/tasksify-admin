import { h } from 'vue'

import DataTableColumnHeader from '@components/table/ColumnHeader.vue'
import TableActionCell from '@components/table/TableActionCell.vue'
import Text from '@components/text/Text.vue'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@store'
import { format } from 'date-fns'
import { upperFirst } from 'lodash-es'

export const useColumns = ({ setOpenPopup, setId }) => {
  const { isSuperAdmin } = storeToRefs(useAuthStore())

  return [
    {
      accessorKey: 'remind_start',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Start Date' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => {
          if (row.original?.notification_settings.length)
            return format(row.original.notification_settings[0]?.remind_start, 'dd MMM yyyy')
        }),
      enableSorting: true
    },
    {
      accessorKey: 'remind_end',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'End Date' }),
      cell: ({ row }) =>
        h(Text, { truncated: true }, () => {
          if (row.original?.notification_settings.length)
            return [format(row.original.notification_settings[0]?.remind_end, 'dd MMM yyyy')]
        }),
      enableSorting: true
    },
    {
      accessorKey: 'notification_type',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Notification Type' }),
      cell: ({ row }) =>
        h(Text, { truncated: true, type: 'primary' }, () => [
          upperFirst(row.getValue('notification_type'))
        ]),
      enableSorting: false,
      cellClass: 'w-[150px]'
    },
    {
      accessorKey: 'message',
      header: ({ column }) => h(DataTableColumnHeader, { column, title: 'Notification' }),
      cell: ({ row }) => h(Text, { truncated: true }, () => row.getValue('message')),
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
