<script setup>
import { defineAsyncComponent, ref, watch, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import TrackingIcon from '@assets/icons/tracking-icon.svg?component'
import SchedulingIcon from '@assets/icons/scheduling-icon.svg?component'
import LayoutUser from './LayoutUser.vue'

const tabOption = [
  {
    id: 0,
    name: 'Users Information',
    icon: TrackingIcon,
    param: 'users'
  },
  {
    id: 1,
    name: 'Access Requests',
    icon: SchedulingIcon,
    param: 'requests'
  }
]

const selected = ref(0)

const route = useRoute()
const router = useRouter()

const UserChild = computed(() => {
  if (selected.value === 0) {
    return defineAsyncComponent(() => import('./usersInfor/index.vue'))
  } else {
    return defineAsyncComponent(() => import(`./accessRequest/index.vue`))
  }
})

watch(
  () => route?.query,
  (v) => {
    if (v && v?.tab === 'requests') {
      selected.value = 1
    } else {
      router.replace(route?.fullPath)
      selected.value = 0
    }
  },
  {
    immediate: true,
    deep: true
  }
)
</script>

<template>
  <LayoutUser :option="tabOption" :selected="selected" @click-item="selected = $event">
    <UserChild />
  </LayoutUser>
</template>
