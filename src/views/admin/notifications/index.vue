<script setup>
import { computed, ref } from 'vue'
import { Form, useForm } from 'vee-validate'
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
import DialogComponent from '@components/dialog/DialogComponent.vue'
import FormItemInput from '@components/form-item/FormItemInput.vue'
import FormFieldTextArea from '@components/form-field/FormFieldTextArea.vue'
import { schema } from './addNewNotification.schema'
import VeeSingleSelect from '@components/single-select/VeeSingleSelect.vue'
import DatePicker from '@components/date-picker/DatePicker.vue'
import { convertToISOString } from '@utils/datetime.util'
import { useSearch } from '@composables/useSearch'
import SearchField from '@components/SearchField.vue'

const notificationTypes = [
  {
    id: 1,
    value: 'system',
    label: 'System'
  },
  {
    id: 2,
    value: 'features',
    label: 'Features'
  },
  {
    id: 3,
    value: 'maps',
    label: 'Maps'
  },
  {
    id: 4,
    value: 'events',
    label: 'Events'
  }
]

const searchParams = ref('')
const isShowAdNotification = ref(false)
const isShowEdit = ref(false)
const isShowConfirm = ref(false)
const rowRef = ref(null)

const toast = useToast()
const route = useRoute()
const { sort, sortParams } = useSort({ isMultiSort: false, sortBy: 'createdAt', orderBy: 'desc' })
const { search, searchBy } = useSearch({ search: '', searchBy: 'notifications' })
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
  data: notifications,
  isFetching: isFetchingNotifications,
  refetch: refetchNotifications
} = adminService.getNotifications(queryParams)
const { mutateAsync: addNotification, isLoading } = adminService.addNotification()
const updateNotification = adminService.updateNotification()
const deleteNotification = adminService.deleteNotification()
const { items: notificationsData } = usePaginationList(notifications, {
  pagination
})

const initialValues = computed(() => {
  if (rowRef.value) return { ...rowRef.value, remind_start: '', remind_end: '' }
  return {
    notification_type: '',
    title: '',
    message: '',
    remind_start: '',
    remind_end: ''
  }
})

const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValues
})

const setId = (rowData) => {
  rowRef.value = rowData
}

const setOpenPopup = (value) => {
  if (value === 'edit') isShowEdit.value = true
  if (value === 'confirm') isShowConfirm.value = true
}
const columns = useColumns({ setOpenPopup, setId })

const addNewNotification = handleSubmit((values) => {
  const data = {
    ...values,
    remind_start: convertToISOString(values.remind_start),
    remind_end: convertToISOString(values.remind_end)
  }
  addNotification({ bodyPayload: data })
    .then((response) => {
      toast.success(response?.data?.message || 'Notification has been successfully created')
      isShowAdNotification.value = false
      refetchNotifications()
    })
    .catch((error) => {
      toast.danger(error?.data?.error || 'Failed to create notification')
    })
})

const handleEditNotification = (values) => {
  const id = rowRef?.value?.id
  if (!id) {
    return toast.danger('Invalid ID. Unable to update notification')
  }
  const data = {
    ...values,
    remind_start: convertToISOString(values.remind_start),
    remind_end: convertToISOString(values.remind_end)
  }
  updateNotification
    .mutateAsync({ bodyPayload: data, pathParams: { id } })
    .then((response) => {
      toast.success(response.data?.message || 'Notification has been successfully updated')
      isShowEdit.value = false
      refetchNotifications()
    })
    .catch((error) => {
      toast.danger(error.data?.error || 'Failed to update notification')
    })
}

const handleDelete = (value) => {
  const id = rowRef?.value?.id
  if (!id) {
    return toast.danger('Invalid ID. Unable to delete the notification.')
  }
  deleteNotification
    .mutateAsync({ bodyPayload: value, pathParams: { id } })
    .then((response) => {
      toast.success(response.data?.message || 'Notification has been successfully deleted')
      isShowConfirm.value = false
      refetchNotifications()
    })
    .catch((error) => {
      toast.danger(error.data?.error || 'Failed to delete notification')
    })
}
const handleSearch = (event) => {
  const _searchValue = event.target.value
  router.replace({
    path: '/admin/notifications',
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
  <h2 class="mt-2">Notifcations</h2>
  <div class="flex justify-between items-center mb-5">
    <Button variant="destructive" class="mt-2" @click="isShowAdNotification = true">
      <Plus class="mr-2s" />
      Add Notification
    </Button>
    <SearchField placeholder="Search notification" :handleSearch="handleSearch" />
  </div>
  <div class="mt-[32px]">
    <DataTable
      v-model:page="page"
      v-model:perPage="perPage"
      v-model:sort="sort"
      :searching="!!searchParams"
      :enable-hover-on-row="false"
      :header-height="58"
      :enable-row-selection="false"
      table-height="100vh - 300px"
      item-name="member"
      :data="notificationsData"
      :columns="columns"
      :pagination="pagination"
      :default-rows-per-page="10"
      :isLoading="isFetchingNotifications"
    />
  </div>
  <DialogComponent
    v-model="isShowAdNotification"
    :is-show-footer="false"
    title="Create Notification"
  >
    <template #default>
      <form @submit.prevent>
        <VeeSingleSelect
          label="Notification Type"
          name="notification_type"
          placeholder="Select"
          :options="notificationTypes"
        />
        <FormItemInput label="Title" name="title" />
        <FormFieldTextArea label="Message" name="message" />
        <div class="flex justify-between items-center">
          <DatePicker label="Start Date" name="remind_start" />
          <DatePicker label="End Date" name="remind_end" />
        </div>
      </form>
    </template>
    <template #footer>
      <Button @click="addNewNotification" variant="destructive" :loading="isLoading">
        Create Notification
      </Button>
      <Button @click="isShowAdNotification = false"> Cancel </Button>
    </template>
  </DialogComponent>
  <DialogComponent v-model="isShowEdit" :is-show-footer="false" title="Modify Map">
    <template #default>
      <Form
        :initial-values="initialValues"
        :validation-schema="schema"
        @submit="handleEditNotification"
      >
        <VeeSingleSelect
          label="Notification Type"
          name="notification_type"
          placeholder="Select"
          :options="notificationTypes"
        />
        <FormItemInput label="Title" name="title" />
        <FormFieldTextArea label="Message" name="message" />
        <DatePicker label="Start Date" name="remind_start" />
        <DatePicker label="End Date" name="remind_end" />
        <div class="mt-4 flex justify-end items-center">
          <Button type="submit" variant="destructive" class="mr-4" :loading="false">
            Save Changes
          </Button>
          <Button type="button" @click="isShowEdit = false" variant="outline"> Cancel </Button>
        </div>
      </Form>
    </template>
  </DialogComponent>
  <DialogComponent
    v-model="isShowConfirm"
    title="Delete this notification?"
    description="Are you sure you want to delete this notification?"
    @confirm="handleDelete"
  >
  </DialogComponent>
</template>
