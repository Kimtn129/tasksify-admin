import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getCookie } from '@helpers/cookies.helper'
import { clearAuthToken, getStorage } from '@helpers/storage.helper'
import { TOKEN_VARIABLE_NAME } from '@constants/cookies.constant'
import { USER_PROFILE_INFOR } from '@constants/storage.constant'

export const useAuthStore = defineStore('auth', () => {
  const isAuthenticated = ref(getCookie(TOKEN_VARIABLE_NAME))
  const _parseMe = getStorage(USER_PROFILE_INFOR)
  const currentUser = ref(_parseMe)
  const isSuperAdmin = ref(currentUser?.value?.role_id === 1)
  //TODO: create an API for admin role permissions if needed or can remove this
  const permissions = ref([
    {
      name: 'dashboard'
    },
    { name: 'tasks' },
    {
      name: 'users'
    },
    {
      name: 'notifications'
    }
  ])

  const login = () => {
    isAuthenticated.value = true
    currentUser.value = getStorage(USER_PROFILE_INFOR)
    isSuperAdmin.value = currentUser?.value?.role_id === 1
  }

  const logout = () => {
    isAuthenticated.value = false
    currentUser.value = null
    clearAuthToken()
  }
  return {
    isAuthenticated,
    isSuperAdmin,
    permissions,
    currentUser,
    login,
    logout
  }
})
