<script setup>
import { Card } from '@common/ui/card'
import BarChart from '@components/charts/BarChart.vue'
import Doughnut from '@components/charts/Doughnut.vue'
import LineChart from '@components/charts/LineChart.vue'

import { defineAsyncComponent, ref, watch, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useQuery } from '@tanstack/vue-query'
import { adminService } from '@service/admin.service'

import TrackingIcon from '@assets/icons/tracking-icon.svg?component'
import SchedulingIcon from '@assets/icons/scheduling-icon.svg?component'
import LayoutUser from './LayoutUser.vue'

const route = useRoute()
const router = useRouter()
const selectedPeriod = ref('month')
const periodOptions = [
  { value: 'week', label: 'Last Week' },
  { value: 'month', label: 'Last Month' },
  { value: 'quarter', label: 'Last Quarter' },
  { value: 'year', label: 'Last Year' }
]

// Fetch dashboard overview data
const {
  data: overviewData,
  isLoading: overviewLoading,
  error: overviewError,
  refetch: refetchOverview
} = useQuery({
  queryKey: ['dashboard-overview'],
  queryFn: () => adminService.getDashboardOverview(),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000 // 10 minutes
})

// Fetch new users chart data
const {
  data: newUsersChartData,
  isLoading: chartLoading,
  error: chartError,
  refetch: refetchChart
} = useQuery({
  queryKey: ['new-users-chart', selectedPeriod.value],
  queryFn: () => adminService.getNewUsersChart({ period: selectedPeriod.value }),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000 // 10 minutes
})

// Fetch tasks created chart data
const {
  data: tasksCreatedChartData,
  isLoading: tasksChartLoading,
  error: tasksChartError,
  refetch: refetchTasksChart
} = useQuery({
  queryKey: ['tasks-created-chart', selectedPeriod.value],
  queryFn: () => adminService.getTasksCreatedChart({ period: selectedPeriod.value }),
  staleTime: 5 * 60 * 1000, // 5 minutes
  cacheTime: 10 * 60 * 1000 // 10 minutes
})

const nutdata = {
  labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }
  ]
}

const tabOption = [
  {
    id: 0,
    name: 'Recent Users',
    icon: TrackingIcon,
    param: 'users'
  },
  {
    id: 1,
    name: 'Recent Tasks',
    icon: SchedulingIcon,
    param: 'tasks'
  }
]

const selected = ref(0)

const UserChild = computed(() => {
  if (selected.value === 0) {
    return defineAsyncComponent(() => import('@views/admin/users/usersInfor/index.vue'))
  } else {
    return defineAsyncComponent(() => import(`@views/admin/tasks/index.vue`))
  }
})

watch(
  () => route?.query,
  (v) => {
    if (v && v?.tab === 'tasks') {
      return (selected.value = 1)
    }
    router.replace(route?.fullPath)
    return (selected.value = 0)
  },
  {
    immediate: true,
    deep: true
  }
)

// Computed dashboard cards data
const dashboardCards = computed(() => {
  if (!overviewData.value?.data?.success) {
    return [
      {
        id: 1,
        title: 'Total Users',
        count: 0,
        change: 0,
        isLoading: true
      },
      {
        id: 2,
        title: 'Total Tasks',
        count: 0,
        change: 0,
        isLoading: true
      },
      {
        id: 3,
        title: 'Active Users',
        count: 0,
        change: 0,
        isLoading: true
      },
      {
        id: 4,
        title: 'Completed Tasks',
        count: 0,
        change: 0,
        isLoading: true
      }
    ]
  }

  const data = overviewData.value.data.data
  console.log(`Dashboard Overview Data: ${JSON.stringify(data)}`)
  return [
    {
      id: 1,
      title: 'Total Users',
      count: data.totalUsers.current,
      change: data.totalUsers.percentageChange,
      previous: data.totalUsers.previous,
      isLoading: false
    },
    {
      id: 2,
      title: 'Total Tasks',
      count: data.totalTasks.current,
      change: data.totalTasks.percentageChange,
      previous: data.totalTasks.previous,
      isLoading: false
    },
    {
      id: 3,
      title: 'Active Users',
      count: data.totalActiveUsers.current,
      change: data.totalActiveUsers.percentageChange,
      previous: data.totalActiveUsers.previous,
      isLoading: false
    },
    {
      id: 4,
      title: 'Completed Tasks',
      count: data.totalCompletedTasks.current,
      change: data.totalCompletedTasks.percentageChange,
      previous: data.totalCompletedTasks.previous,
      isLoading: false
    }
  ]
})

// Computed chart data for LineChart
const lineChartData = computed(() => {
  if (!newUsersChartData.value?.data?.success) {
    return {
      labels: [],
      datasets: []
    }
  }

  const chartData = newUsersChartData.value.data.data
  console.log(`New Users Chart Data: ${JSON.stringify(chartData)}`)
  return {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      label: 'New Users',
      borderColor: '#3b82f6',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4
    }))
  }
})

// Computed chart data for BarChart
const barChartData = computed(() => {
  if (!tasksCreatedChartData.value?.data?.success) {
    return {
      labels: [],
      datasets: []
    }
  }

  const chartData = tasksCreatedChartData.value.data.data
  return {
    labels: chartData.labels,
    datasets: chartData.datasets.map((dataset) => ({
      ...dataset,
      label: 'Tasks Created',
      backgroundColor: '#f87979'
    }))
  }
})

// Format number with commas
const formatNumber = (num) => {
  if (num === null || num === undefined) return '0'
  return num.toLocaleString()
}

// Format percentage change
const formatPercentageChange = (change) => {
  if (change === null || change === undefined || change === 0) return '0%'
  const sign = change > 0 ? '+' : ''
  return `${sign}${change}%`
}

// Get change color class
const getChangeColorClass = (change) => {
  if (change > 0) return 'text-green-600'
  if (change < 0) return 'text-red-600'
  return 'text-gray-500'
}

// Refresh data function
const refreshData = () => {
  refetchOverview()
  refetchChart()
  refetchTasksChart()
}

// New user chart data
const newUserChartData = ref({
  labels: [],
  datasets: []
})

const fetchNewUserChartData = async () => {
  try {
    const response = await adminService.getNewUsersChart()
    if (response.success) {
      newUserChartData.value = response.data.data
    }
  } catch (error) {
    console.error('Error fetching new user chart data:', error)
  }
}

onMounted(() => {
  fetchNewUserChartData()
})

// onMounted(() => {
//   // Auto refresh every 5 minutes
//   const interval = setInterval(
//     () => {
//       refetch()
//     },
//     5 * 60 * 1000
//   )

//   // Cleanup interval on unmount
//   return () => clearInterval(interval)
// })
</script>

<template>
  <div class="flex flex-col gap-8">
    <!-- Header with refresh button -->
    <div class="flex items-center justify-between">
      <h1 class="mt-5 mb-3 text-2xl font-bold">Dashboard</h1>
      <button
        :disabled="overviewLoading || usersChartLoading || tasksChartLoading"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="refreshData"
      >
        <svg
          class="w-4 h-4 mr-2 inline-block"
          :class="{ 'animate-spin': overviewLoading || usersChartLoading || tasksChartLoading }"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        {{
          overviewLoading || usersChartLoading || tasksChartLoading ? 'Refreshing...' : 'Refresh'
        }}
      </button>
    </div>

    <!-- Error state -->
    <div v-if="overviewError" class="p-4 bg-red-50 border border-red-200 rounded-md">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg class="w-5 h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path
              fill-rule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L10 8.586 8.707 7.293z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <h3 class="text-sm font-medium text-red-800">Error loading dashboard data</h3>
          <p class="mt-1 text-sm text-red-700">
            {{ overviewError.message || 'Failed to fetch dashboard overview' }}
          </p>
          <button
            class="mt-2 text-sm font-medium text-red-800 underline hover:text-red-900"
            @click="refreshData"
          >
            Try again
          </button>
        </div>
      </div>
    </div>

    <!-- Dashboard Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card
        v-for="item in dashboardCards"
        :key="item.id"
        class="p-6 min-w-[200px] flex flex-col gap-4 hover:shadow-lg transition-shadow duration-200"
      >
        <!-- Loading skeleton -->
        <template v-if="item.isLoading">
          <div class="animate-pulse">
            <div class="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>
            <div class="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
            <div class="h-3 bg-gray-200 rounded w-2/3"></div>
          </div>
        </template>

        <!-- Actual content -->
        <template v-else>
          <p class="text-sm font-medium text-gray-600">{{ item.title }}</p>
          <p class="font-bold text-3xl text-gray-900">{{ formatNumber(item.count) }}</p>
          <div class="flex items-center text-xs">
            <span :class="getChangeColorClass(item.change)" class="font-medium">
              {{ formatPercentageChange(item.change) }}
            </span>
            <span class="text-gray-500 ml-1">from last period</span>
          </div>
          <div class="text-xs text-gray-400">Previous: {{ formatNumber(item.previous) }}</div>
        </template>
      </Card>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- New Users Chart -->
      <Card class="w-full p-6">
        <template #header>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">New Users</h3>
              <p class="text-sm text-gray-600">Daily new user registration</p>
            </div>
            <div class="flex items-center space-x-2">
              <select
                v-model="selectedPeriod"
                class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @change="changePeriod(selectedPeriod)"
              >
                <option v-for="option in periodOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </template>
        <LineChart
          :data="lineChartData"
          :loading="chartLoading"
          :error="chartError?.message"
          :height="300"
        />
      </Card>

      <!-- Tasks Created Chart -->
      <Card class="w-full p-6">
        <template #header>
          <div class="flex items-center justify-between mb-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">Tasks Created</h3>
              <p class="text-sm text-gray-600">Daily new tasks created</p>
            </div>
            <div class="flex items-center space-x-2">
              <select
                v-model="selectedTasksPeriod"
                class="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                @change="changeTasksPeriod(selectedTasksPeriod)"
              >
                <option v-for="option in periodOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
          </div>
        </template>
        <BarChart
          :data="barChartData"
          :loading="tasksChartLoading"
          :error="tasksChartError?.message"
          :height="300"
          @retry="retryTasksChart"
        />
      </Card>
    </div>

    <!-- Recent Users/Tasks Section -->
    <LayoutUser :option="tabOption" :selected="selected" @click-item="selected = $event">
      <UserChild :isRecent="true" />
    </LayoutUser>
  </div>
</template>

<style scoped>
.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
