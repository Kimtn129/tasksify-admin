import {
  API_GET_SERVER_METRICS,
  API_GET_DISK_SPACES,
  API_GET_REGISTERED_USERS,
  API_GET_MAPS,
  API_ADD_MAP,
  API_GET_PROJECTS,
  API_DELETE_MAP,
  API_GET_USERS,
  API_ADD_USER,
  API_UPDATE_USER,
  API_DELETE_USER,
  API_UPDATE_MAP,
  API_GET_SHOWCASES,
  API_ADD_SHOWCASE,
  API_UPDATE_SHOWCASE,
  API_DELETE_SHOWCASE,
  API_GET_STORYMAPS,
  API_ADD_STORYMAP,
  API_UPDATE_STORYMAP,
  API_DELETE_STORYMAP,
  API_GET_CATEGORIES,
  API_GET_NOTIFICATIONS,
  API_ADD_NOTIFICATION,
  API_UPDATE_NOTIFICATION,
  API_DELETE_NOTIFICATION,
  API_GET_ACCESS_REQUEST,
  API_GET_USER_NOTIFICATIONS,
  API_UPDATE_REQUEST,
  API_SEEN_NOTIFICATIONS,
  API_GET_COUNTRIES,
  API_GET_COUNTRY_PROJECTS,
  API_GET_PROJECT_MAPS,
  API_REQUEST_ACCESS,
  API_GET_FAQS,
  API_GET_CATEGORY_STORYMAP,
  API_COUNT_VISITED,
  API_GET_SERVER_LOCATION,
  API_GET_TASKS,
  API_GET_DASHBOARD_OVERVIEW,
  API_GET_NEW_USERS_CHART,
  API_GET_TASKS_CREATED_CHART
} from '@constants/api.constant'

import { useFetch, usePost, usePut } from '@utils/vue-query.util'

export const adminService = {
  // Dashboard
  getDashboardOverview: () => useFetch(API_GET_DASHBOARD_OVERVIEW),
  getMetrics: (params) => useFetch(API_GET_SERVER_METRICS, { params }),
  getDisk: (params) => useFetch(API_GET_DISK_SPACES, { params }),
  getServerLocations: (params) => useFetch(API_GET_SERVER_LOCATION, { params }),
  getRegisteredUsers: (params) => useFetch(API_GET_REGISTERED_USERS, { params }),

  //Maps Management
  getMaps: (params) => useFetch(API_GET_MAPS, { params }),
  getProjects: (params) => useFetch(API_GET_PROJECTS, { params }),
  addMap: () =>
    usePost(API_ADD_MAP, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  updateMap: () =>
    usePut(API_UPDATE_MAP, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  deleteMap: () => usePut(API_DELETE_MAP),

  //Users Management
  getUsers: (params) => useFetch(API_GET_USERS, { params }),
  addUser: () => usePost(API_ADD_USER),
  updateUser: () => usePut(API_UPDATE_USER),
  deleteUser: () => usePut(API_DELETE_USER),

  //User Access Requests
  getAccessRequests: (params) => useFetch(API_GET_ACCESS_REQUEST, { params }),
  updateAccessRequest: () => usePut(API_UPDATE_REQUEST),

  //CMS Showcases Management
  getShowcases: (params) => useFetch(API_GET_SHOWCASES, { params }),
  addShowcase: () =>
    usePost(API_ADD_SHOWCASE, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  updateShowcase: () =>
    usePut(API_UPDATE_SHOWCASE, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  deleteShowcase: () => usePut(API_DELETE_SHOWCASE),

  //CMS Storymaps Management
  getStorymaps: (params) => useFetch(API_GET_STORYMAPS, { params }),
  getCategories: (params) => useFetch(API_GET_CATEGORIES, { params }),
  addStorymap: () =>
    usePost(API_ADD_STORYMAP, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  updateStorymap: () =>
    usePut(API_UPDATE_STORYMAP, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }),
  deleteStorymap: () => usePut(API_DELETE_STORYMAP),

  //Tasks Management
  getTasks: (params) => useFetch(API_GET_TASKS, { params }),
  getTasksCreatedChart: () => useFetch(API_GET_TASKS_CREATED_CHART),

  //Notifications Management
  getNotifications: (params) => useFetch(API_GET_NOTIFICATIONS, { params }),
  addNotification: () => usePost(API_ADD_NOTIFICATION),
  updateNotification: () => usePut(API_UPDATE_NOTIFICATION),
  deleteNotification: () => usePut(API_DELETE_NOTIFICATION),

  getUserNotifications: (params) => useFetch(API_GET_USER_NOTIFICATIONS, { params }),
  seenNotifications: () => usePut(API_SEEN_NOTIFICATIONS),

  //Landing page
  getCountries: (params) => useFetch(API_GET_COUNTRIES, { params }),
  getStorymapsByCategory: (id) => useFetch(API_GET_CATEGORY_STORYMAP, null, null, { id }),
  getCountryProjects: (id) => useFetch(API_GET_COUNTRY_PROJECTS, null, null, { id }),
  getProjectMaps: (id) => useFetch(API_GET_PROJECT_MAPS, null, null, { id }),
  requestAccess: () => usePost(API_REQUEST_ACCESS),
  countVisited: () => usePut(API_COUNT_VISITED),
  getFAQs: () => useFetch(API_GET_FAQS),
  getNewUsersChart: () => useFetch(API_GET_NEW_USERS_CHART)
}
