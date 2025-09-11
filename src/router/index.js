import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useAuthStore } from '@store'

import auth from './auth'
import admin from './admin'
import Noutfound from '@views/not-found/index.vue'
import { isPermitted } from '@utils/common.util'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    ...auth,
    ...admin,
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: Noutfound
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  const { isAuthenticated, permissions, isSuperAdmin } = storeToRefs(useAuthStore())

  const { path, meta } = to

  if (to?.meta?.freeAccess) {
    next()
    return
  }
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!isAuthenticated.value) {
      next('/user/login')
    } else if (!to?.meta?.freeAccess) {
      const isAccess = isPermitted(isSuperAdmin.value, path, permissions.value, meta?.roleAccess)
      if (!isAccess) {
        next('/forbidden')
      }
    }
  }
  next()
})

export default router
