import { computed, ref } from 'vue'
import _isEmpty from 'lodash-es/isEmpty'
import { useRoute } from 'vue-router'

const DEFAULT_SORT_BY = 'createdAt'
const DEFAULT_ORDER_BY = 'desc'

export const useSort = ({ isMultiSort = false, sortBy, orderBy } = {}) => {
  const route = useRoute()
  const sort = ref([])

  const sortParams = computed(() => {
    if (_isEmpty(sort.value)) {
      return {
        sortBy: route.query.sortBy || sortBy || DEFAULT_SORT_BY,
        orderBy: route.query.orderBy || orderBy || DEFAULT_ORDER_BY
      }
    }

    const sortValue = sort.value.map((item) => {
      return {
        sortBy: item.id,
        orderBy: item.desc ? 'desc' : 'asc'
      }
    })

    return isMultiSort ? sortValue : sortValue[0]
  })

  return {
    sort,
    sortParams
  }
}
