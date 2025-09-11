<script setup>
import { ref, computed, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'

import adminRoutes from '@router/admin'
import { useAuthStore } from '@store'
import { signOut } from '@service/auth.service'
import { authService } from '@service'
import DialogComponent from '@components/dialog/DialogComponent.vue'
import Icon from '@components/Icon.vue'
import NavSideItem from './NavSideItem.vue'

const router = useRouter()
const isShowSidebar = ref(true)
const isLogout = ref(false)

const { logout: logoutStore } = useAuthStore()
const { permissions, isSuperAdmin } = storeToRefs(useAuthStore())

const { mutateAsync: logout } = authService.logout()

onUnmounted(() => {
  document.body.classList.remove('no-scroll')
})

const routesData = computed(() => {
  if (permissions?.value) {
    const menuAvailable = []
    const _mainRoutes = adminRoutes.filter((m) => m.main)[0].children
    for (let i = 0; i < _mainRoutes.length; i++) {
      if (_mainRoutes[i].displayOnSidebar || _mainRoutes[i].path === '/') {
        menuAvailable.push(_mainRoutes[i])
      }
    }
    return menuAvailable
  }
  return {}
})

async function handleLogout() {
  signOut()
  logoutStore()
  logout()
  isLogout.value = false
  router.push({ path: '/user/login' })
}
</script>

<template>
  <!-- <Transition name="slide" mode="out-in"> -->
  <aside
    class="bg-background z-99 h-screen flex flex-col flex-shrink-0 flex-col transition border-r border-secondary-foreground"
    aria-label="Sidebar"
  >
    <div class="relative flex-1 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden">
      <RouterLink
        to="/"
        v-if="isShowSidebar"
        class="flex justify-between items-center w-[223px] py-[18px] px-5"
      >
        <Icon
          icon="vertex-logo"
          class="cursor-pointer grow-0 shrink-0 basis-28px group-hover:text-gray-900 transition duration-25"
          :size="30"
        />
        <p class="uppercase text-2xl font-semibold">Taskify</p>
        <Icon
          icon="closeMenu"
          class="cursor-pointer grow-0 shrink-0 basis-24px group-hover:text-gray-900 transition duration-25"
          :size="24"
          @click="isShowSidebar = false"
        />
      </RouterLink>
      <div
        v-else
        class="flex flex-col justify-between items-center w-[71px] py-[18px] px-5 gap-6 mb-2"
      >
        <Icon
          icon="vertex-logo"
          class="cursor-pointer grow-0 shrink-0 basis-28px group-hover:text-gray-900 transition duration-25"
          :size="30"
        />
        <Icon
          icon="openMenu"
          class="cursor-pointer grow-0 shrink-0 basis-24px group-hover:text-gray-900 transition duration-25"
          :size="24"
          @click="isShowSidebar = true"
        />
      </div>
      <ul class="px-2">
        <NavSideItem
          v-for="nav in routesData"
          :key="nav.name"
          :title="nav.displayName"
          :icon="nav.icon"
          :to="nav.path"
          :is-show-sidebar="isShowSidebar"
        />
      </ul>
    </div>
    <div
      class="h-[46px] flex items-center m-2 px-4 cursor-pointer overflow-y-auto overflow-x-hidden"
      @click="isLogout = true"
    >
      <Icon icon="log-out" :size="24" />
      <p v-if="isShowSidebar" class="ml-4 text-primary text-lg">Log out</p>
    </div>
  </aside>
  <DialogComponent
    title="Log out"
    description="Are you sure you want to log out?"
    @cancel="isLogout = false"
    @confirm="handleLogout"
    v-model="isLogout"
  />
  <!-- </Transition> -->
</template>

<style scoped>
body.no-scroll {
  overflow: hidden;
}
</style>
