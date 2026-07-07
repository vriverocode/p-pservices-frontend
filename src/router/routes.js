import auth from './middlewares/auth'
import admin from './middlewares/admin'
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
        meta: { title: 'Bienvenido' },
      },
      {
        path: '/register', component: () => import('pages/Auth/RegisterPage.vue'),
        meta: { title: 'Bienvenido' },
      },
    ],
  },
  {
    path: '/verify-email', component: () => import('pages/Auth/VerifyEmailPage.vue'),
    beforeEnter: guest,
    meta: { title: 'Verificar Email' },
  },
  {
    path: '/',
    component: () => import('layouts/AppLayout.vue'),
    beforeEnter: auth,
    children: [
      {
        path: '/dashboard',
        component: () => import('pages/Client/Dashboard/Dashboard.vue'),
        meta: { title: 'Inicio' },
      },
      {
        path: '/vehicles',
        component: () => import('pages/Client/Vehicles/MyVehiclesPage.vue'),
        meta: { title: 'Mis Vehículos' },
      },
      {
        path: '/vehicles/new',
        component: () => import('pages/Client/Vehicles/VehicleFormPage.vue'),
        meta: { title: 'Registrar Vehículo' },
      },
      {
        path: '/vehicles/:id/edit',
        component: () => import('pages/Client/Vehicles/VehicleFormPage.vue'),
        meta: { title: 'Editar Vehículo' },
      },
      {
        path: 'admin/dashboard',
        component: () => import('pages/Admin/AdminDashboardPage.vue'),
        meta: { title: 'Panel Admin' },
        beforeEnter: admin,
      },
      {
        path: 'admin/agenda',
        component: () => import('pages/Admin/AdminAgendaPage.vue'),
        meta: { title: 'Agenda' },
        beforeEnter: admin,
      },
      {
        path: 'admin/vehicle-catalog',
        component: () => import('pages/Admin/AdminVehicleCatalogPage.vue'),
        meta: { title: 'Catálogo Vehículos' },
        beforeEnter: admin,
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
    meta: { title: '404 - Página No Encontrada' },
  },
]

export default routes
