<script setup>
import { computed } from 'vue'

import {
  Pagination,
  PaginationEllipsis,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev
} from '@common/ui/pagination'
import { Button } from '@common/ui/button'
import Text from '@components/text/Text.vue'
import { DEFAULT_PER_PAGE } from '@constants/api.constant'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@common/ui/select'

const props = defineProps({
  table: { type: Object, required: true },
  rowsPerPageOptions: {
    type: Array,
    required: false,
    default: () => [5, 10, 20, 30, 50]
  },
  defaultRowsPerPage: { type: [Number, String], required: false, default: DEFAULT_PER_PAGE },
  numberOfSelectedRow: { type: Number, required: false },
  enableRowsPerPageSelection: { type: Boolean, required: false, default: false },
  pagination: { type: Object, required: true },
  page: { type: [String, Number], required: true },
  perPage: { type: [Number, String], default: DEFAULT_PER_PAGE }
})

const emits = defineEmits(['update:page', 'update:per-page'])

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
    emits('update:per-page', value)
  }
})

const tablePagination = computed(() => props.table.getState().pagination)

const dataRange = computed(() => {
  return {
    from: tablePagination.value.pageSize * (props.pagination.page - 1) + 1,
    to:
      tablePagination.value.pageSize * props.pagination.page < props.pagination.totalRecords
        ? tablePagination.value.pageSize * props.pagination.page
        : props.pagination.totalRecords,
    total: props.pagination.totalRecords
  }
})

const handleChange = (val) => {
  props.table.setPageSize(val)
  currentPerPage.value = val
}
</script>

<template>
  <div class="flex items-center justify-between px-[10px] w-full pt-[8px] pb-[17px]">
    <div v-if="enableRowsPerPageSelection" class="flex items-center space-x-2">
      <Text class="font-medium whitespace-nowrap">Item per page</Text>
      <Select :model-value="currentPerPage" @update:model-value="handleChange">
        <SelectTrigger
          class="border border-border rounded-[4px] py-2 h-10 min-w-[56px] max-w-[70px] text-primary"
        >
          <SelectValue class="!overflow-visible" :placeholder="String(tablePagination.pageSize)" />
        </SelectTrigger>
        <SelectContent side="top">
          <SelectItem v-for="pageSize in rowsPerPageOptions" :key="pageSize" :value="pageSize">
            {{ pageSize }}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
    <div class="flex-1 text-sm text-muted-foreground ml-[24px] text-left">
      <Text class="text-grey-700">{{
        dataRange.from + '-' + dataRange.to + ' of ' + dataRange.total
      }}</Text>
    </div>
    <div class="flex items-center space-x-2">
      <Pagination
        v-slot="{ page: paginationPage }"
        :model-value="currentPage"
        show-edges
        :total="pagination.totalRecords"
        :sibling-count="1"
        :items-per-page="Number(tablePagination.pageSize)"
        @update:model-value="currentPage = $event"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev />
          <template v-for="(item, index) in items">
            <PaginationListItem
              v-if="item.type === 'page'"
              :key="index"
              :value="item.value"
              as-child
            >
              <Button
                class="w-8 h-9 p-0 border-border"
                :variant="item.value === paginationPage ? 'destructive' : 'outline1'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" class="text-primary" />
          </template>
          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>
  </div>
</template>
