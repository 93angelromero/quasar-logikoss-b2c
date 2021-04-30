
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('pages/Home.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'reset-password',
        name: 'ResetPassword',
        component: () => import('pages/ResetPassword.vue')
      },
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/Login.vue')
      },
      {
        path: '',
        name: 'Dashboard',
        component: () => import('pages/Dashboard.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'notifications',
        name: 'Notifications',
        component: () => import('pages/ShowNotifications.vue'),
        meta: {
          requiresAuth: true
        }
      },
      {
        path: 'invoices',
        name: 'Invoices',
        component: () => import('pages/Invoices.vue'),
        meta: {
          requiresAuth: true
        }
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
