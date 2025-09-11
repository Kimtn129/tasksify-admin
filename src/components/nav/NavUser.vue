<script setup>
import { ref } from 'vue'
import { useRouter, useRoute, RouterLink } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'

import { useAuthStore } from '@store'
import { authService, signOut } from '@service/auth.service'
import { calculateDays } from '@utils/datetime.util.js'
import Icon from '@components/Icon.vue'
import DropDownComponent from '@components/dropdown-menu/DropdownComponent.vue'
import DialogComponent from '@components/dialog/DialogComponent.vue'
import { Button } from '@common/ui'

const props = defineProps({
  user: { type: Object, required: false },
  isSuperAdmin: { type: Boolean, required: false }
})

const { t } = useI18n()
const { currentUser } = storeToRefs(useAuthStore())
const { logout: logoutStore } = useAuthStore()
const isLogout = ref(false)
const days = ref(calculateDays(currentUser?.value?.login_at))

const router = useRouter()
const route = useRoute()
const { mutateAsync: logout } = authService.logout()

const handleLogout = () => {
  signOut()
  logoutStore()
  logout()
  isLogout.value = false
  router.push({ path: '/user/login' })
}
</script>
<template>
  <DropDownComponent contentClass="w-[320px]">
    <template #trigger>
      <div class="w-100 truncate h-12 flex justify-end items-center gap-4">
        <Icon
          icon="avatar"
          :size="26"
          class="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300"
        />
      </div>
    </template>
    <template #default>
      <div class="p-4">
        <p class="mb-3">Hi</p>
        <p class="mb-3 font-bold truncate leading-6">
          {{ currentUser?.usernam ?? currentUser?.user_email.split('@')[0] }}
        </p>
        <p class="mb-3" v-if="days > 1">It's been {{ days }} days since you last logged in</p>
        <div class="flex gap-3" :class="isSuperAdmin ? '' : 'justify-center'">
          <RouterLink v-if="route.path == '/' && isSuperAdmin" to="/admin">
            <Button variant="landing">{{ t('nav.admin') }}</Button>
          </RouterLink>
          <RouterLink v-else-if="isSuperAdmin" to="/">
            <Button variant="landing">{{ t('nav.landing') }}</Button>
          </RouterLink>

          <Button variant="outline" @click="isLogout = true">{{ t('nav.logout') }}</Button>
        </div>
      </div>
    </template>
  </DropDownComponent>
  <DialogComponent
    v-model="isLogout"
    :title="t('nav.logout')"
    :description="t('nav.confirm')"
    @cancel="isLogout = false"
    @confirm="handleLogout"
  />
</template>
