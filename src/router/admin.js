const admin = [
  {
    path: '/',
    name: 'Admin',
    component: () => import('@layouts/admin-layout/index.vue'),
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        displayName: 'Dashboard',
        displayOnSidebar: true,
        icon: 'dashboard',
        component: () => import('@views/admin/dashboard/index.vue')
        // children: [
        //   {
        //     path: '/dashboard/:id',
        //     name: 'Details',
        //     component: () => import('@views/admin/ModelsList.vue')
        //   }
        // ]
      },
      {
        path: 'tasks',
        name: 'Tasks',
        displayName: 'Tasks',
        displayOnSidebar: true,
        icon: 'shield',
        component: () => import('@views/admin/tasks/index.vue')
      },
      {
        path: 'users',
        name: 'Users',
        displayName: 'Users',
        displayOnSidebar: true,
        icon: 'users',
        component: () => import('@views/admin/users/index.vue')
        // children: [
        //   {
        //     path: '/dashboard/:id',
        //     name: 'Details',
        //     component: () => import('@views/admin/ModelsList.vue')
        //   }
        // ]
      },
      {
        path: 'notifications',
        name: 'Notification',
        displayName: 'Notification',
        displayOnSidebar: true,
        icon: 'shield',
        component: () => import('@views/admin/notifications/index.vue')
        // children: [
        //   {
        //     path: '/dashboard/:id',
        //     name: 'Details',
        //     component: () => import('@views/admin/ModelsList.vue')
        //   }
        // ]
      }
    ],
    meta: { requiresAuth: true },
    main: true
  }
]

export default admin
