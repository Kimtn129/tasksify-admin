<script setup>
import { computed, ref } from 'vue'
import { Plus } from 'lucide-vue-next'
import router from '@router'
import { useRoute } from 'vue-router'

import { useToast } from '@composables/useToast'
import { usePagination } from '@composables/usePagination'
import { useSort } from '@composables/useSort'
import { usePaginationList } from '@composables/usePaginationList'
import { adminService } from '@service'
import { useColumns } from './columns'
import DataTable from '@components/data-table/DataTable.vue'
import { Button } from '@common/ui'
import { useSearch } from '@composables/useSearch'
import SearchField from '@components/SearchField.vue'

const props = defineProps({
  isRecent: {
    type: Boolean,
    default: false
  }
})

const searchParams = ref('')
const idTask = ref('')
const isShowEdit = ref(false)
const isShowConfirm = ref(false)
const rowRef = ref(null)

const route = useRoute()
const { sort, sortParams } = useSort({ isMultiSort: false, sortBy: 'joinedDate', orderBy: 'desc' })
const { search, searchBy } = useSearch({ search: '', searchBy: 'name' })
const { pagination, page, perPage } = usePagination({
  writeQuery: true
})

const searchValue = ref(search.value)

const queryParams = computed(() => {
  return {
    page: props.isRecent ? 1 : page,
    take: props.isRecent ? 10 : perPage,
    sort: props.isRecent ? 'asc' : sortParams?.value?.orderBy,
    sortBy: props.isRecent ? 'createdAt' : sortParams?.value?.sortBy,
    search: props.isRecent ? '' : searchValue,
    searchBy: props.isRecent ? '' : searchBy.value
  }
})
const {
  data: tasks,
  isFetching: isFetchingTasks,
  refetch: refetchTasks
} = adminService.getTasks(queryParams)
const { items: tasksData } = usePaginationList(tasks, {
  pagination
})

const setId = (rowData) => {
  rowRef.value = rowData
}

const setOpenPopup = (value) => {
  if (value === 'edit') isShowEdit.value = true
  if (value === 'confirm') isShowConfirm.value = true
}
const columns = useColumns({ setOpenPopup, setId })

const handleSearch = (event) => {
  const _searchValue = event.target.value
  router.replace({
    path: '/tasks',
    query: {
      ...route.query,
      page: 1,
      search: _searchValue
    }
  })
  searchValue.value = _searchValue
}
</script>
<template>
  <div>
    <div v-if="!props.isRecent" class="flex justify-between items-center mb-5">
      <Button variant="destructive" class="mt-2" @click="() => console.log('add task')">
        <Plus class="mr-2s" />
        Add Task
      </Button>
      <SearchField placeholder="Search notification" :handle-search="handleSearch" />
    </div>
    <div class="mt-[32px]">
      <DataTable
        :page="page"
        :per-page="perPage"
        :sort="sort"
        :active-row-id="idTask"
        :searching="!!searchParams"
        :enable-hover-on-row="false"
        :header-height="58"
        :enable-row-selection="false"
        table-height="100vh - 300px"
        item-name="task"
        :data="tasksData"
        :columns="columns"
        :pagination="pagination"
        :default-rows-per-page="10"
        :is-loading="isFetchingTasks"
        :show-pagination="!props.isRecent"
        @update:page="page = $event"
        @update:per-page="perPage = $event"
        @update:sort="sort = $event"
      />
    </div>
  </div>
</template>
