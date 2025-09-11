<script setup>
import { ref, computed } from 'vue'
import router from '@router'
import { useRoute } from 'vue-router'

import { useSort } from '@composables/useSort'
import { useToast } from '@composables/useToast'
import { usePagination } from '@composables/usePagination'
import { usePaginationList } from '@composables/usePaginationList'
import { adminService } from '@service'
import { useColumns } from './userAccessColumns'
import DialogComponent from '@components/dialog/DialogComponent.vue'
import DataTable from '@components/data-table/DataTable.vue'
import { useSearch } from '@composables/useSearch'
import SearchField from '@components/SearchField.vue'

const searchParams = ref('')
const isShowConfirm = ref(false)
const rowRef = ref(null)

const toast = useToast()
const route = useRoute()

const { sort, sortParams } = useSort({ isMultiSort: false, sortBy: 'createdAt', orderBy: 'desc' })
const { search, searchBy } = useSearch({ search: '', searchBy: 'name' })
const { pagination, page, perPage } = usePagination({
  writeQuery: true
})

const searchValue = ref(search.value)

const queryParams = computed(() => {
  return {
    page: page,
    take: perPage,
    sort: sortParams?.value?.orderBy,
    sortBy: sortParams?.value?.sortBy,
    search: searchValue,
    searchBy: searchBy.value
  }
})
const {
  data: accessRequests,
  isFetching: isFetchingRequests,
  refetch
} = adminService.getAccessRequests(queryParams)
const updateRequest = adminService.updateAccessRequest()
const { items: accessRequestsData } = usePaginationList(accessRequests, {
  pagination
})

const setId = (rowData) => {
  rowRef.value = rowData
}

const setOpenPopup = (value) => {
  if (value === 'confirm') isShowConfirm.value = true
}

const handleApprove = (status) => {
  const id = rowRef?.value?.id
  if (!id) {
    return toast.danger('Invalid ID. Unable to approve request.')
  }
  updateRequest
    .mutateAsync({ bodyPayload: { action: status }, pathParams: { id } })
    .then((response) => {
      toast.success(response.message || 'User request has been successfully updated')
      isShowConfirm.value = false
      refetch()
    })
    .catch((error) => {
      toast.danger(error?.error || 'Failed to approve user request')
    })
}
const columns = useColumns({ setOpenPopup, setId, handleApprove })

const handleSearch = (event) => {
  const _searchValue = event.target.value
  router.replace({
    path: '/admin/users',
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
  <div class="mt-[32px]">
    <div class="flex justify-end items-center">
      <SearchField placeholder="Search users name" :handleSearch="handleSearch" />
    </div>

    <DataTable
      v-model:page="page"
      v-model:sort="sort"
      :searching="!!searchParams"
      :enable-hover-on-row="false"
      :header-height="58"
      :enable-row-selection="false"
      table-height="100vh - 350px"
      item-name="member"
      :data="accessRequestsData"
      :columns="columns"
      :pagination="pagination"
      :default-rows-per-page="15"
      :isLoading="isFetchingRequests"
    />
  </div>

  <DialogComponent
    v-model="isShowConfirm"
    title="Reject this request?"
    description="Are you sure you want to reject this user request?"
    @confirm="handleApprove('rejected')"
  >
  </DialogComponent>
</template>
