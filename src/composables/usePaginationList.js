import { ref, watch } from 'vue'
import { createPagination } from './usePagination'

export const usePaginationList = (
  data,
  { pagination, itemsProperty = 'data', paginationProperty = 'meta', defaultItems = () => [] } = {}
) => {
  const items = ref([])

  watch(
    data,
    () => {
      items.value = data.value?.[itemsProperty] ?? defaultItems()

      if (pagination == null) return

      const apiPagy = data.value?.[paginationProperty] || null

      if (apiPagy == null) return

      pagination.value = createPagination(apiPagy)
    },
    { immediate: true }
  )

  return {
    items
  }
}
