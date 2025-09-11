export const DEFAULT_PER_PAGE = 10
export const API_BASE = process.env.VITE_TASKIFY_BE_API || 'http://10.10.51.192:3000' // API URL
export const DOMAIN_BASE = process.env.VITE_TASKIFY_DOMAIN || 'http://10.10.51.192:3000' // DOMAIN URL

// Authentication const
export const API_LOGIN = '/admin/authorize'
export const API_LOGOUT = '/admin/logout'
export const API_FORGOT_PASSWORD = '/admin/forgot-password'
export const API_SET_PASSWORD = '/admin/set-password'
export const API_REFRESH_TOKEN = '/admin/refresh-token'

//Dashboard
export const API_GET_DASHBOARD_OVERVIEW = '/admin/dashboard/overview'
export const API_GET_SERVER_METRICS = '/api/servers'
export const API_GET_SERVER_LOCATION = '/api/servers/dropdown'
export const API_GET_DISK_SPACES = '/api/servers/storage-usage'
export const API_GET_REGISTERED_USERS = '/api/registered-users'
export const API_GET_VISITED_MAPS = '/api/maps/top-visited'
export const API_GET_NEW_USERS_CHART = '/admin/dashboard/charts/new-users?period=month'
export const API_GET_TASKS_CREATED_CHART = '/admin/dashboard/charts/tasks-created?period=month'

//Maps management
export const API_GET_MAPS = '/api/maps'
export const API_GET_PROJECTS = '/api/projects'
export const API_ADD_MAP = '/api/map/add'
export const API_UPDATE_MAP = '/api/map/:id/update'
export const API_DELETE_MAP = '/api/map/:id/delete'

//CMS Showcases management
export const API_GET_SHOWCASES = '/api/showcases'
export const API_ADD_SHOWCASE = '/api/showcase/add'
export const API_UPDATE_SHOWCASE = '/api/showcase/:id/update'
export const API_DELETE_SHOWCASE = '/api/showcase/:id/delete'
//CMS Storymaps management
export const API_GET_STORYMAPS = '/api/storymaps'
export const API_GET_CATEGORIES = '/api/categories'
export const API_ADD_STORYMAP = '/api/storymap/add'
export const API_UPDATE_STORYMAP = '/api/storymap/:id/update'
export const API_DELETE_STORYMAP = '/api/storymap/:id/delete'

//Users management
export const API_GET_USERS = '/admin/users'
export const API_ADD_USER = '/admin/invite'
export const API_UPDATE_USER = '/admin/:id/update'
export const API_DELETE_USER = '/admin/:id/delete'

//Users management
export const API_GET_ACCESS_REQUEST = '/api/user-access'
export const API_UPDATE_REQUEST = '/api/user-access/:id/update'

//Tasks management
export const API_GET_TASKS = '/admin/tasks'

//Notifications management
export const API_GET_NOTIFICATIONS = '/api/notifications'
export const API_GET_USER_NOTIFICATIONS = '/api/notifications-user'
export const API_SEEN_NOTIFICATIONS = '/api/notifications/seen'
export const API_ADD_NOTIFICATION = '/api/notification/add'
export const API_UPDATE_NOTIFICATION = '/api/notification/:id/update'
export const API_DELETE_NOTIFICATION = '/api/notification/:id/delete'

//Landing page
export const API_GET_COUNTRIES = '/api/countries'
export const API_GET_CATEGORY_STORYMAP = '/api/categories/:id/storymaps'
export const API_GET_COUNTRY_PROJECTS = '/api/countries/:id/projects'
export const API_GET_PROJECT_MAPS = '/api/projects/:id/maps'
export const API_REQUEST_ACCESS = '/api/user-access/add'
export const API_COUNT_VISITED = '/api/maps/:id'
export const API_GET_FAQS = '/api/faq/questions'
