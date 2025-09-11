import { CURRENT_PERMISSIONS, USER_PROFILE_INFOR } from '@constants/storage.constant'
import { getCookie, removeAllCookies, setCookie } from './cookies.helper'
import { REFRESH_TOKEN_VARIABLE_NAME, TOKEN_VARIABLE_NAME } from '@constants/cookies.constant'

export const getStorage = (key) => {
  let value = null

  try {
    const result = window.localStorage.getItem(key)

    if (result) {
      value = JSON.parse(result)
    }
  } catch (error) {
    console.error(error)
  }

  return value
}

export const setStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    console.error(error)
  }
}

export const removeStorage = (key) => {
  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    console.error(error)
  }
}

export const clearStorage = () => {
  try {
    window.localStorage.clear()
  } catch (error) {
    console.error(error)
  }
}

export const clearSession = () => {
  try {
    window.sessionStorage.clear()
  } catch (error) {
    console.log(error)
  }
}

export const setAuthToken = (token, refresh_token) => {
  setCookie(TOKEN_VARIABLE_NAME, token)
  setCookie(REFRESH_TOKEN_VARIABLE_NAME, refresh_token)
}

export const getAuthToken = () => {
  return getCookie(TOKEN_VARIABLE_NAME)
}

export const clearAuthToken = () => {
  removeAllCookies()
  removeStorage(USER_PROFILE_INFOR)
  removeStorage(CURRENT_PERMISSIONS)
}
