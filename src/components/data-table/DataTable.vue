<script setup>
import {
  FlexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useVueTable
} from '@tanstack/vue-table'
import { ref, h, computed, watch } from 'vue'
import { LoaderCircle } from 'lucide-vue-next'

import Text from '@components/text/Text.vue'
import { Checkbox } from '@common/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@common/ui/radio-group'
import EmptyData from '@components/EmptyData.vue'
import { valueUpdater } from '@utils/ui-shadcn.util'
import { DEFAULT_PER_PAGE } from '@constants/api.constant'
import DataTablePagination from './DataTablePagination.vue'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@common/ui/table'

const props = defineProps({
  headerHeight: { type: Number, required: false },
  type: { type: String, required: false },
  columns: { type: Array, required: true },
  data: { type: Array, required: false },
  dataStatus: { type: String, required: false },
  enableRowSelection: { type: Boolean, required: false, default: false },
  enableHoverOnRow: { type: Boolean, required: false, default: false },
  rowIdKey: { type: String, required: false, default: '_id' },
  activeRowId: { type: String, required: false },
  defaultRowsPerPage: { type: Number, required: false, default: DEFAULT_PER_PAGE },
  enableRowsPerPageSelection: { type: Boolean, required: false, default: false },
  tableHeight: { type: String, required: false, default: null },
  showPagination: { type: Boolean, required: false, default: true },
  pagination: { type: Object, default: () => ({}) },
  searching: {
    type: Boolean,
    default: false
  },
  isLoading: {
    type: Boolean,
    default: false
  },
  itemName: {
    type: String,
    default: ''
  },
  tableClass: { type: String, default: '' },
  showIndex: { type: Boolean, default: false },
  enableMultiRowSelection: { type: Boolean, default: false },
  dataNotFoundMessage: { type: String, default: '' },
  searchDataNotFoundMessage: { type: String, default: '' },
  // Props for two-way binding
  page: { type: [Number, String], default: 1 },
  perPage: { type: [Number, String], default: DEFAULT_PER_PAGE },
  sort: { type: Array, default: () => [] },
  rowSelection: { type: Object, default: () => ({}) }
})

const emits = defineEmits([
  'handleRowClick',
  'update:page',
  'update:perPage',
  'update:sort',
  'update:rowSelection'
])

const handleRowClick = (id) => {
  emits('handleRowClick', id)
}

const theadHeight = 39

// Use computed properties with setters for two-way binding
const sorting = computed({
  get() {
    return props.sort
  },
  set(value) {
    emits('update:sort', value)
  }
})

const currentPage = computed({
  get() {
    return props.page
  },
  set(value) {
    emits('update:page', value)
  }
})

const currentPerPage = computed({
  get() {
    return props.perPage
  },
  set(value) {
    emits('update:perPage', value)
  }
})

const currentRowSelection = computed({
  get() {
    return props.rowSelection
  },
  set(value) {
    emits('update:rowSelection', value)
  }
})

const columnFilters = ref([])
const columnVisibility = ref({})

const checkboxColumn = {
  id: 'select',
  header: ({ table }) =>
    h(Checkbox, {
      checked:
        table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate'),
      'onUpdate:checked': (value) => table.toggleAllPageRowsSelected(!!value),
      ariaLabel: 'Select all',
      class: 'translate-y-0.5'
    }),
  cell: ({ row }) =>
    h(Checkbox, {
      checked: row.getIsSelected(),
      'onUpdate:checked': (value) => row.toggleSelected(!!value),
      ariaLabel: 'Select row',
      class: 'translate-y-0.5'
    }),
  enableSorting: false,
  enableHiding: false
}

const radioSelectColumn = {
  id: 'select',
  header: '',
  cell: ({ row }) =>
    h(RadioGroupItem, {
      value: row.id,
      ariaLabel: 'Select row'
    }),
  enableSorting: false,
  enableHiding: false
}

const tableColumns = computed(() =>
  props.enableRowSelection
    ? [props.enableMultiRowSelection ? checkboxColumn : radioSelectColumn, ...props.columns]
    : props.columns
)

const emptyRowWidth = computed(() =>
  props.showIndex ? tableColumns.value?.length + 1 : tableColumns.value?.length
)

const table = useVueTable({
  get data() {
    return props.data
  },
  get columns() {
    return tableColumns.value
  },
  state: {
    get sorting() {
      return sorting.value
    },
    get columnFilters() {
      return columnFilters.value
    },
    get columnVisibility() {
      return columnVisibility.value
    },
    get rowSelection() {
      return currentRowSelection.value
    }
  },
  initialState: {
    pagination: {
      pageSize: props.defaultRowsPerPage
    }
  },
  manualPagination: true,
  manualSorting: true,
  enableRowSelection: props.enableRowSelection,
  enableMultiRowSelection: props.enableMultiRowSelection,
  getCoreRowModel: getCoreRowModel(),
  getFilteredRowModel: getFilteredRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getFacetedRowModel: getFacetedRowModel(),
  getFacetedUniqueValues: getFacetedUniqueValues(),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  onColumnFiltersChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnFilters),
  onColumnVisibilityChange: (updaterOrValue) => valueUpdater(updaterOrValue, columnVisibility),
  onRowSelectionChange: (updaterOrValue) => valueUpdater(updaterOrValue, currentRowSelection),
  getRowId: (row) => row[props.rowIdKey]
})

const getRowNo = (index) => {
  if (props.pagination && props.pagination?.perPage) {
    return props.pagination.perPage * (currentPage.value - 1) + (index + 1)
  }
  return index + 1
}

const radioSelectValue = computed({
  get() {
    return Object.keys(table.getState().rowSelection)[0]
  },
  set(newValue) {
    table.setRowSelection(() => ({
      [newValue]: true
    }))
  }
})
</script>

<template>
  <div class="w-full">
    <div
      class="w-full border-b border-b-grey-400 pb-2"
      :class="[
        'border-b-grey-400 pb-2',
        data?.length && showPagination ? 'border-b' : 'border-b-0'
      ]"
    >
      <div
        :class="[data?.length ? 'overflow-y-auto' : 'overflow-y-hidden']"
        :style="{
          height: `calc(${tableHeight})` || 'auto'
        }"
      >
        <RadioGroup v-model="radioSelectValue">
          <Table class="relative border-b border-b-grey-100" :class="[tableClass]">
            <TableHeader
              :class="props.type === 'primary' ? 'bg-grey-50' : 'bg-white'"
              class="sticky top-0 z-10"
            >
              <slot name="thead"></slot>

              <TableRow
                v-for="headerGroup in table.getHeaderGroups()"
                :key="headerGroup.id"
                :class="props.type === 'primary' ? '' : 'border-b border-b-grey-400 '"
              >
                <TableHead v-if="showIndex" class="font-semibold" width="60px">
                  <Text size="lg" type="primary" font="semi"> No </Text>
                </TableHead>
                <TableHead
                  v-for="header in headerGroup.headers"
                  :key="header.id"
                  class="font-semibold"
                  :class="[
                    headerHeight ? `h-[${headerHeight}px]` : '',
                    header.column.columnDef.headerClass
                  ]"
                  :align="header.column.columnDef.align || header.column.columnDef.headerAlign"
                  :width="header.column.columnDef.width"
                >
                  <FlexRender
                    v-if="!header.isPlaceholder"
                    :render="header.column.columnDef.header"
                    :props="header.getContext()"
                  />
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody class="relative">
              <template v-if="table.getRowModel().rows?.length">
                <TableRow
                  v-for="(row, index) in table.getRowModel().rows"
                  :key="row.id"
                  class="border-b border-b-grey-100 truncate max-w-[200px] max-h-[200px]"
                  :class="{
                    'hover:bg-grey-50 cursor-pointer': enableHoverOnRow,
                    'bg-grey-50': activeRowId && activeRowId === row.original[rowIdKey]
                  }"
                  :data-state="row.getIsSelected() && 'selected'"
                  @click="handleRowClick(row.original._id)"
                >
                  <TableCell v-if="showIndex">
                    <Text type="primary">
                      {{ getRowNo(index) }}
                    </Text>
                  </TableCell>

                  <TableCell
                    v-for="cell in row.getVisibleCells()"
                    :key="cell.id"
                    :class="cell.column.columnDef.cellClass"
                    :align="cell.column.columnDef.align"
                  >
                    <slot :name="cell.column.columnDef.accessorKey">
                      <FlexRender :render="cell.column.columnDef.cell" :props="cell.getContext()" />
                    </slot>
                  </TableCell>
                </TableRow>
              </template>

              <TableRow v-else-if="isLoading">
                <TableCell
                  :colspan="emptyRowWidth"
                  :class="['text-center']"
                  :style="{
                    height: `calc(${tableHeight} - ${theadHeight}px)` || 'auto'
                  }"
                >
                  <div class="flex justify-center">
                    <LoaderCircle class="animate-spin text-destructive" />
                  </div>
                </TableCell>
              </TableRow>

              <TableRow v-else>
                <TableCell class="px-0 h-24 text-center" :colspan="emptyRowWidth">
                  <div class="w-full flex flex-col items-center justify-center gap-y-[20px]">
                    <EmptyData
                      class="h-full"
                      :searching="searching"
                      :item-name="itemName"
                      :custom-message="dataNotFoundMessage"
                      :custom-search-message="searchDataNotFoundMessage"
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </RadioGroup>
      </div>
    </div>

    <DataTablePagination
      v-if="data?.length && showPagination"
      :page="currentPage"
      :rows-per-page="currentPerPage"
      :table="table"
      :pagination="pagination"
      :number-of-selected-row="Object.keys(currentRowSelection)?.length"
      :enable-row-selection="enableRowSelection"
      :enable-rows-per-page-selection="enableRowsPerPageSelection"
      @update:page="currentPage = $event"
      @update:rows-per-page="currentPerPage = $event"
    />
  </div>
</template>
