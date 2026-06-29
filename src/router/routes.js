import auth from './middlewares/auth'
import guest from './middlewares/guest'
const routes = [
  {
    path: '/',
    component: () => import('layouts/AuthLayout.vue'),
    redirect: '/login',
    beforeEnter: guest,
    children: [
      {
        path: '/login', component: () => import('pages/Auth/LoginPage.vue'),
        meta: {
          title: 'Bienvenido'
        },
      },
      {
        path: '/register', component: () => import('pages/Auth/RegisterPage.vue'),
        meta: {
          title: 'Bienvenido'
        },
      },

    ],

  },
  {
    path: '/verify-email', component: () => import('pages/Auth/VerifyEmailPage.vue'),
    beforeEnter: guest,
    meta: {
      title: 'Verificar Email'
    },
  },
  {
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    beforeEnter: auth,
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/Client/Dashboard/Dashboard.vue'),
        meta: {
          title: 'Inicio'
        },
      }
    ],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
