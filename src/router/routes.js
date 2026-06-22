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
        path: 'login', component: () => import('pages/Auth/LoginPage.vue'),
        meta: {
          title: 'Bienvenido'
        },
      },
      {
        path: 'register', component: () => import('pages/Auth/RegisterPage.vue'),
        meta: {
          title: 'Bienvenido'
        },
      }
    ],

  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter: auth,
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },

  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
