# Vue.js Admin Panel - Development Instructions

## Project Overview

This is a Vue.js 3 admin panel application built with modern web technologies. The project uses Vue 3 Composition API, Vite as the build tool, and includes a comprehensive UI component library based on shadcn/ui principles.

### Tech Stack
- **Frontend Framework**: Vue.js 3 with Composition API
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom theme configuration
- **UI Components**: Custom shadcn/ui-inspired component library
- **State Management**: Pinia
- **Data Fetching**: Vue Query (TanStack Query)
- **Form Validation**: VeeValidate
- **Routing**: Vue Router
- **Authentication**: Firebase Auth
- **Internationalization**: Vue i18n
- **Icons**: Lucide Vue (implied from shadcn/ui usage)

## Project Structure

\`\`\`
src/
├── components/          # Reusable Vue components
├── common/ui/          # UI component library (shadcn/ui style)
├── views/              # Page components
├── layouts/            # Layout components
├── router/             # Vue Router configuration
├── store/              # Pinia stores
├── service/            # API service layer
├── helpers/            # Utility helper functions
├── utils/              # General utility functions
├── composables/        # Vue composables
├── constants/          # Application constants
├── config/             # Configuration files
├── directives/         # Custom Vue directives
└── plugins/            # Vue plugins
\`\`\`

## Coding Standards

### 1. Vue Component Standards

#### File Naming
- Use **PascalCase** for component files: `UserProfile.vue`, `DataTable.vue`
- Use **kebab-case** for component folders: `user-profile/`, `data-table/`
- Page components should be in `index.vue` within feature folders

#### Component Structure
\`\`\`vue
<script setup>
// 1. Imports (external libraries first, then internal)
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/common/ui'
import { useAuthStore } from '@/store/auth.store'

// 2. Props definition
const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    default: () => []
  }
})

// 3. Emits definition
const emit = defineEmits(['update', 'delete'])

// 4. Composables and stores
const router = useRouter()
const authStore = useAuthStore()

// 5. Reactive data
const isLoading = ref(false)
const selectedItem = ref(null)

// 6. Computed properties
const filteredItems = computed(() => {
  return props.items.filter(item => item.active)
})

// 7. Methods
const handleUpdate = (item) => {
  emit('update', item)
}

// 8. Lifecycle hooks
onMounted(() => {
  // Initialization logic
})
</script>

<template>
  <!-- Use semantic HTML and proper accessibility -->
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">{{ title }}</h1>
    
    <!-- Use custom UI components -->
    <Button 
      variant="primary" 
      @click="handleUpdate"
      :disabled="isLoading"
    >
      Update
    </Button>
  </div>
</template>

<style scoped>
/* Prefer Tailwind classes over custom CSS */
/* Only add custom styles when necessary */
</style>
\`\`\`

### 2. TypeScript/JavaScript Standards

#### Import Organization
\`\`\`javascript
// 1. Vue core imports
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

// 2. External library imports
import { useQuery } from '@tanstack/vue-query'

// 3. Internal imports (absolute paths with @/ alias)
import { Button } from '@/common/ui'
import { useAuthStore } from '@/store/auth.store'
import { API_ENDPOINTS } from '@/constants/api.constant'
\`\`\`

#### Variable Naming
- Use **camelCase** for variables and functions: `userData`, `handleSubmit`
- Use **UPPER_SNAKE_CASE** for constants: `API_ENDPOINTS`, `USER_ROLES`
- Use **PascalCase** for constructors and classes: `UserService`, `ApiClient`

#### Function Standards
\`\`\`javascript
// Prefer arrow functions for simple operations
const calculateTotal = (items) => items.reduce((sum, item) => sum + item.price, 0)

// Use regular functions for complex logic
function processUserData(userData) {
  // Complex processing logic
  return processedData
}

// Use async/await instead of promises
const fetchUserData = async (userId) => {
  try {
    const response = await userService.getUser(userId)
    return response.data
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw error
  }
}
\`\`\`

### 3. UI Component Standards

#### Using the UI Component Library
\`\`\`vue
<script setup>
import { 
  Button, 
  Card, 
  CardHeader, 
  CardContent,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/common/ui'
</script>

<template>
  <Card>
    <CardHeader>
      <CardTitle>User Information</CardTitle>
    </CardHeader>
    <CardContent>
      <Button variant="primary" size="lg">
        Save Changes
      </Button>
    </CardContent>
  </Card>
</template>
\`\`\`

#### Custom Component Props
\`\`\`javascript
// Always define prop types and defaults
const props = defineProps({
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'primary', 'secondary'].includes(value)
  },
  size: {
    type: String,
    default: 'md'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})
\`\`\`

### 4. Styling Standards

#### Tailwind CSS Usage
\`\`\`vue
<template>
  <!-- Use Tailwind utility classes -->
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md">
    <h2 class="text-xl font-semibold text-gray-900">Title</h2>
    <Button class="ml-4">Action</Button>
  </div>
  
  <!-- Use responsive design -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Grid items -->
  </div>
</template>
\`\`\`

#### Custom CSS (when necessary)
\`\`\`vue
<style scoped>
/* Use CSS modules for complex styling */
.custom-component {
  @apply flex items-center space-x-2;
  
  /* Custom properties when Tailwind is insufficient */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
</style>
\`\`\`

### 5. State Management (Pinia)

#### Store Structure
\`\`\`javascript
// store/user.store.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userService } from '@/service'

export const useUserStore = defineStore('user', () => {
  // State
  const users = ref([])
  const currentUser = ref(null)
  const isLoading = ref(false)
  
  // Getters
  const activeUsers = computed(() => 
    users.value.filter(user => user.status === 'active')
  )
  
  // Actions
  const fetchUsers = async () => {
    isLoading.value = true
    try {
      const response = await userService.getUsers()
      users.value = response.data
    } catch (error) {
      console.error('Failed to fetch users:', error)
    } finally {
      isLoading.value = false
    }
  }
  
  const updateUser = async (userId, userData) => {
    try {
      const response = await userService.updateUser(userId, userData)
      const index = users.value.findIndex(user => user.id === userId)
      if (index !== -1) {
        users.value[index] = response.data
      }
    } catch (error) {
      console.error('Failed to update user:', error)
      throw error
    }
  }
  
  return {
    // State
    users,
    currentUser,
    isLoading,
    // Getters
    activeUsers,
    // Actions
    fetchUsers,
    updateUser
  }
})
\`\`\`

### 6. API Service Layer

#### Service Structure
\`\`\`javascript
// service/user.service.js
import { apiClient } from '@/helpers/fetch.helper'
import { API_ENDPOINTS } from '@/constants/api.constant'

export const userService = {
  async getUsers(params = {}) {
    return apiClient.get(API_ENDPOINTS.USERS, { params })
  },
  
  async getUser(id) {
    return apiClient.get(`${API_ENDPOINTS.USERS}/${id}`)
  },
  
  async createUser(userData) {
    return apiClient.post(API_ENDPOINTS.USERS, userData)
  },
  
  async updateUser(id, userData) {
    return apiClient.put(`${API_ENDPOINTS.USERS}/${id}`, userData)
  },
  
  async deleteUser(id) {
    return apiClient.delete(`${API_ENDPOINTS.USERS}/${id}`)
  }
}
\`\`\`

### 7. Form Handling with VeeValidate

#### Form Component Structure
\`\`\`vue
<script setup>
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/yup'
import * as yup from 'yup'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/common/ui/form'
import { Input, Button } from '@/common/ui'

// Validation schema
const schema = toTypedSchema(yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  role: yup.string().required('Role is required')
}))

// Form setup
const { handleSubmit, isSubmitting } = useForm({
  validationSchema: schema
})

// Submit handler
const onSubmit = handleSubmit(async (values) => {
  try {
    await userService.createUser(values)
    // Handle success
  } catch (error) {
    // Handle error
  }
})
</script>

<template>
  <form @submit="onSubmit" class="space-y-4">
    <FormField v-slot="{ componentField }" name="name">
      <FormItem>
        <FormLabel>Name</FormLabel>
        <FormControl>
          <Input v-bind="componentField" placeholder="Enter name" />
        </FormControl>
        <FormMessage />
      </FormItem>
    </FormField>
    
    <Button type="submit" :disabled="isSubmitting">
      {{ isSubmitting ? 'Creating...' : 'Create User' }}
    </Button>
  </form>
</template>
\`\`\`

### 8. Data Fetching with Vue Query

#### Query Usage
\`\`\`vue
<script setup>
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { userService } from '@/service'
import { useToast } from '@/composables/useToast'

const { toast } = useToast()
const queryClient = useQueryClient()

// Fetch users
const { data: users, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: () => userService.getUsers()
})

// Create user mutation
const createUserMutation = useMutation({
  mutationFn: userService.createUser,
  onSuccess: () => {
    queryClient.invalidateQueries(['users'])
    toast.success('User created successfully')
  },
  onError: (error) => {
    toast.error('Failed to create user')
  }
})

const handleCreateUser = (userData) => {
  createUserMutation.mutate(userData)
}
</script>
\`\`\`

### 9. Routing Standards

#### Route Definition
\`\`\`javascript
// router/admin.js
export const adminRoutes = [
  {
    path: '/admin',
    component: () => import('@/layouts/admin-layout/index.vue'),
    meta: { requiresAuth: true, role: 'admin' },
    children: [
      {
        path: '',
        redirect: '/admin/dashboard'
      },
      {
        path: 'dashboard',
        name: 'AdminDashboard',
        component: () => import('@/views/admin/dashboard/index.vue'),
        meta: { title: 'Dashboard' }
      },
      {
        path: 'users',
        name: 'AdminUsers',
        component: () => import('@/views/admin/users/index.vue'),
        meta: { title: 'Users Management' }
      }
    ]
  }
]
\`\`\`

### 10. Error Handling

#### Global Error Handling
\`\`\`javascript
// Use try-catch for async operations
const handleAsyncOperation = async () => {
  try {
    const result = await someAsyncFunction()
    return result
  } catch (error) {
    console.error('Operation failed:', error)
    toast.error('Something went wrong')
    throw error
  }
}

// Use error boundaries for component errors
const { data, error, isLoading } = useQuery({
  queryKey: ['data'],
  queryFn: fetchData,
  onError: (error) => {
    console.error('Query failed:', error)
  }
})
\`\`\`

### 11. Accessibility Standards

\`\`\`vue
<template>
  <!-- Use semantic HTML -->
  <main role="main">
    <h1>Page Title</h1>
    
    <!-- Proper form labels -->
    <form>
      <label for="email">Email Address</label>
      <input id="email" type="email" required />
    </form>
    
    <!-- Button accessibility -->
    <button 
      type="button"
      :aria-label="isExpanded ? 'Collapse menu' : 'Expand menu'"
      :aria-expanded="isExpanded"
    >
      Menu
    </button>
    
    <!-- Image alt text -->
    <img src="/logo.png" alt="Company Logo" />
  </main>
</template>
\`\`\`

### 12. Performance Best Practices

#### Lazy Loading
\`\`\`javascript
// Lazy load components
const LazyComponent = defineAsyncComponent(() => import('./HeavyComponent.vue'))

// Lazy load routes
const routes = [
  {
    path: '/admin',
    component: () => import('@/views/admin/index.vue')
  }
]
\`\`\`

#### Computed Properties and Watchers
\`\`\`vue
<script setup>
// Use computed for derived state
const filteredUsers = computed(() => {
  return users.value.filter(user => user.active)
})

// Use watchers for side effects
watch(searchQuery, (newQuery) => {
  if (newQuery.length > 2) {
    debouncedSearch(newQuery)
  }
}, { debounce: 300 })
</script>
\`\`\`

## Development Workflow

### 1. Feature Development
1. Create feature branch from `main`
2. Implement feature following coding standards
3. Write/update tests if applicable
4. Update documentation
5. Create pull request

### 2. Code Review Checklist
- [ ] Follows Vue.js best practices
- [ ] Uses TypeScript properly (if applicable)
- [ ] Implements proper error handling
- [ ] Follows accessibility guidelines
- [ ] Uses consistent naming conventions
- [ ] Includes proper documentation

### 3. Testing Standards
\`\`\`javascript
// Component testing example
import { mount } from '@vue/test-utils'
import UserCard from '@/components/UserCard.vue'

describe('UserCard', () => {
  it('renders user information correctly', () => {
    const user = { name: 'John Doe', email: 'john@example.com' }
    const wrapper = mount(UserCard, { props: { user } })
    
    expect(wrapper.text()).toContain('John Doe')
    expect(wrapper.text()).toContain('john@example.com')
  })
})
\`\`\`

## Environment Configuration

### Development Setup
\`\`\`bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm run test
\`\`\`

### Environment Variables
\`\`\`env
# .env.local
VITE_API_BASE_URL=http://localhost:3000/api
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
\`\`\`

## Common Patterns and Anti-Patterns

### ✅ Good Practices
- Use Composition API consistently
- Implement proper TypeScript types
- Use semantic HTML elements
- Implement proper error boundaries
- Use consistent naming conventions
- Implement proper loading states
- Use proper form validation

### ❌ Anti-Patterns
- Mixing Options API with Composition API
- Direct DOM manipulation
- Inline styles instead of Tailwind classes
- Missing error handling
- Inconsistent naming conventions
- Missing accessibility attributes
- Unhandled promise rejections

## Conclusion

This instruction file serves as a comprehensive guide for maintaining consistency and quality in the Vue.js admin panel project. All team members and AI agents should follow these standards to ensure a maintainable and scalable codebase.

For questions or clarifications, refer to the official Vue.js documentation and the project's existing codebase for examples.
