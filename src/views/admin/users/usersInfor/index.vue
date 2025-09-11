<script setup>
import { computed, ref } from 'vue'
import { Form, useField, useForm } from 'vee-validate'
import { Plus } from 'lucide-vue-next'
import router from '@router'
import { useRoute } from 'vue-router'

import { useSort } from '@composables/useSort'
import { usePagination } from '@composables/usePagination'
import { useToast } from '@composables/useToast'
import { adminService } from '@service'
import { usePaginationList } from '@composables/usePaginationList'
import { useColumns } from './columns'
import { schema } from './addNewUser.schema'
import { Button } from '@common/ui'
import DataTable from '@components/data-table/DataTable.vue'
import DialogComponent from '@components/dialog/DialogComponent.vue'
import FormItemInput from '@components/form-item/FormItemInput.vue'
import FormFieldRadio from '@components/form-field/FormFieldRadio.vue'
import FormFieldMultiSelect from '@components/form-field/FormFieldMultiSelect.vue'
import { useSearch } from '@composables/useSearch'
import SearchField from '@components/SearchField.vue'

const props = defineProps({
  isRecent: {
    type: Boolean,
    default: false
  }
})

const radioOptions = [
  {
    id: 1,
    value: 1,
    label: 'Administrator'
  },
  {
    id: 2,
    value: 2,
    label: 'Normal User'
  }
]
const searchParams = ref('')
const idMember = ref('')
const isShowAdUser = ref(false)
const isShowEdit = ref(false)
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
    page: props.isRecent ? 1 : page,
    take: props.isRecent ? 10 : perPage,
    sort: props.isRecent ? 'asc' : sortParams?.value?.orderBy,
    sortBy: props.isRecent ? 'createdAt' : sortParams?.value?.sortBy,
    search: props.isRecent ? '' : searchValue,
    searchBy: props.isRecent ? '' : searchBy.value
  }
})
const {
  data: users,
  isFetching: isFetchingUsers,
  refetch: refetchUsers
} = adminService.getUsers(queryParams)

const { mutateAsync: addUser, isLoading: isAddingUser } = adminService.addUser()
const updateUser = adminService.updateUser()
const deleteUser = adminService.deleteUser()
const { items: usersData } = usePaginationList(users, {
  pagination
})

const initialValues = computed(() => {
  if (rowRef.value) return rowRef.value
  return {
    email: ''
  }
})

const { errors, handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: initialValues
})

const setId = (rowData) => {
  rowRef.value = {
    ...rowData,
    user_password: '',
    confirm_password: '',
    role_id: rowData.role_id,
    map_id: rowData.map_id?.split(',')
  }
}
const role_id = useField('role_id').value
const setOpenPopup = (value) => {
  if (value === 'edit') isShowEdit.value = true
  if (value === 'confirm') isShowConfirm.value = true
}
const columns = useColumns({ setOpenPopup, setId })

const onSubmit = handleSubmit((values) => {
  addUser({ bodyPayload: values })
    .then((response) => {
      toast.success(response.message || 'User has been successfully added')
      isShowAdUser.value = false
      refetchUsers()
    })
    .catch((error) => {
      toast.danger(error?.error || 'Failed to add new user')
    })
})

const handleEditUser = (user) => {
  const id = rowRef?.value?.employee_id
  if (!id) {
    return toast.danger('Invalid ID. Unable to update user.')
  }
  updateUser
    .mutateAsync({ bodyPayload: user, pathParams: { id } })
    .then((response) => {
      toast.success(response.message || 'User has been successfully updated')
      isShowEdit.value = false
      refetchUsers()
    })
    .catch((error) => {
      toast.danger(error?.data?.error || 'Failed to update user')
    })
}

const handleDelete = (value) => {
  const id = rowRef?.value?.employee_id
  if (!id) {
    return toast.danger('Invalid ID. Unable to delete user.')
  }

  deleteUser
    .mutateAsync({ bodyPayload: value, pathParams: { id } })
    .then((response) => {
      toast.success(response.message || 'User has been successfully deleted')
      isShowConfirm.value = false
      refetchUsers()
    })
    .catch((error) => {
      toast.danger(error?.error || 'Failed to delete user')
    })
}

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
  <div>
    <div v-if="!props.isRecent" class="flex justify-between items-center mb-5">
      <Button variant="destructive" class="mt-2" @click="isShowAdUser = true">
        <Plus class="mr-2s" />
        Add User
      </Button>
      <SearchField placeholder="Search users name" :handle-search="handleSearch" />
    </div>
    <div class="mt-[32px]">
      <DataTable
        :page="page"
        :per-page="perPage"
        :sort="sort"
        :active-row-id="idMember"
        :searching="!!searchParams"
        :enable-hover-on-row="false"
        :header-height="58"
        :enable-row-selection="false"
        table-height="100vh - 350px"
        item-name="member"
        :data="usersData"
        :columns="columns"
        :pagination="pagination"
        :show-pagination="!props.isRecent"
        :default-rows-per-page="10"
        :is-loading="isFetchingUsers"
        @update:page="page = $event"
        @update:per-page="perPage = $event"
        @update:sort="sort = $event"
      />
    </div>
    <DialogComponent v-model="isShowAdUser" :is-show-footer="false" title="Add New User">
      <template #default>
        <form class="max-w-[400px]" @submit.prevent>
          <!-- <FormItemInput label="User Name" name="username" /> -->
          <FormItemInput label="User Email" name="email" />

          <!-- <FormFieldRadio
          v-model="role_id"
          name="role_id"
          label="Role"
          :options="radioOptions"
          required
          :errors="errors"
        /> -->
        </form>
      </template>
      <template #footer>
        <Button variant="destructive" :loading="isAddingUser" @click="onSubmit"> Add User </Button>
        <Button @click="isShowAdUser = false"> Cancel </Button>
      </template>
    </DialogComponent>
    <DialogComponent v-model="isShowEdit" :is-show-footer="false" title="Modify User">
      <template #default>
        <Form :initial-values="initialValues" :validation-schema="schema" @submit="handleEditUser">
          <FormItemInput label="User Name" name="username" />
          <FormItemInput label="Business Email" name="user_email" />
          <FormItemInput label="Password" name="user_password" />
          <FormItemInput label="Confirm Password" name="confirm_password" />
          <FormFieldRadio
            v-model="role_id"
            name="role_id"
            label="Role"
            :options="radioOptions"
            required
            :errors="errors"
          />
          <FormFieldMultiSelect name="map_id" label="Map Access" :options="mapsList" />
          <div class="mt-4 flex justify-end items-center">
            <Button type="submit" variant="destructive" class="mr-4" :loading="isUpdatingUser">
              Save Changes
            </Button>
            <Button type="button" variant="outline" @click="isShowEdit = false"> Cancel </Button>
          </div>
        </Form>
      </template>
    </DialogComponent>
    <DialogComponent
      v-model="isShowConfirm"
      title="Delete this user?"
      description="Are you sure you want to delete this user?"
      @confirm="handleDelete"
    >
    </DialogComponent>
  </div>
</template>
