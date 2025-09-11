import {
  API_LOGIN,
  API_LOGOUT,
  API_FORGOT_PASSWORD,
  API_SET_PASSWORD,
  API_REFRESH_TOKEN
} from '@constants/api.constant'
import { clearAuthToken } from '@helpers/storage.helper'
import { usePost } from '@utils/vue-query.util'

export const authService = {
  login: (params) => usePost(API_LOGIN, { params }),
  logout: (params) => usePost(API_LOGOUT, { params }),
  forgotPassword: (params) => usePost(API_FORGOT_PASSWORD, { params }),
  setPassword: (params) => usePost(API_SET_PASSWORD, { params }),
  refreshToken: (params) => usePost(API_REFRESH_TOKEN, { params })
}

export const signOut = () => {
  clearAuthToken()
  localStorage.clear()
}

export const msalConfig = {
  auth: {
    clientId: '3199c9e8-88fe-4074-88e3-b15d8e996267',
    authority: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize',
    redirectUrl: window.location.origin,
    navigateToLoginRequestUrl: true
  },
  cache: {
    cacheLocation: 'localStorage'
  }
}

export const loginRequest = { scopes: ['user.read'] }
