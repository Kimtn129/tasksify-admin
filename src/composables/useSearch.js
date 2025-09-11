import { ref } from 'vue'
import { useRoute } from 'vue-router'

export const useSearch = ({ search, searchBy }) => {
  const route = useRoute()

  const _search = ref(route.query.search || search)
  const _searchBy = ref(route.query.searchBy || searchBy)

  return {
    search: _search,
    searchBy: _searchBy
  }
}
