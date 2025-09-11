import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { DEFAULT_PER_PAGE } from '@constants/api.constant'

export const createPagination = (meta) => {
  const page = meta?.currentPage ?? 1
  const perPage = meta?.take ?? DEFAULT_PER_PAGE
  const totalPages = meta?.totalPages ?? 0
  const totalRecords = meta?.totalCount ?? 0

  return {
    page,
    perPage,
    totalPages,
    totalRecords
  }
}

export const usePagination = ({
  defaultPage = 1,
  writeQuery = false,
  readQuery = 'page',
  limitQuery = 'limit'
} = {}) => {
  const route = useRoute()
  const router = useRouter()
  const currentPage = ref(defaultPage)
  const currentPerPage = ref(DEFAULT_PER_PAGE)

  const page = computed({
    get() {
      if (writeQuery) {
        return Number(route.query[readQuery]) || defaultPage
      }
      return currentPage.value
    },
    set(value) {
      currentPage.value = value
      if (writeQuery) {
        router.push({
          query: {
            ...route.query,
            [limitQuery]: currentPerPage.value,
            [readQuery]: value
          }
        })
      }
    }
  })

  const perPage = computed({
    get() {
      if (writeQuery) {
        return Number(route.query[limitQuery]) || DEFAULT_PER_PAGE
      }
      return currentPerPage.value
    },
    set(value) {
      currentPerPage.value = value
      if (writeQuery) {
        router.push({
          query: {
            ...route.query,
            [limitQuery]: value,
            [readQuery]: defaultPage
          }
        })
      }
    }
  })

  const pagination = ref(
    createPagination({
      page
    })
  )

  return {
    page,
    perPage,
    pagination
  }
}
