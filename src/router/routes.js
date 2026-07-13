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
        path: 'admin/dashboard',
        component: () => import('pages/Admin/AdminDashboardPage.vue'),
        meta: { title: 'Panel Admin' },
        beforeEnter: admin,
      },
      {
        path: 'admin/services',
        component: () => import('pages/Admin/AdminServicesPage.vue'),
        meta: { title: 'Servicios' },
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
    path: '/',
    component: () => import('layouts/ClientLayout.vue'),
    beforeEnter: auth,
    children: [
      {
        path: '/services',
        component: () => import('pages/Client/ServicesPage.vue'),
        meta: { title: 'Servicios' },
      },
      {
        path: '/vehicles',
        component: () => import('pages/Client/Vehicles/MyVehiclesPage.vue'),
        meta: { title: 'Mis Vehículos' },
      },
      {
        path: '/services/:id',
        component: () => import('pages/Client/ServiceDetailPage.vue'),
        meta: { title: 'Servicio' },
      },
      {
        path: '/vehicles/new',
        component: () => import('pages/Client/Vehicles/VehicleFormPage.vue'),
        meta: { title: 'Registrar Vehículo' },
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import('pages/Client/Profile/ProfilePage.vue'),
        meta: { title: 'Perfil de usuario' },
      },
      {
        path: '/vehicles/:id/edit',
        component: () => import('pages/Client/Vehicles/VehicleFormPage.vue'),
        meta: { title: 'Editar Vehículo' },
      },
      {
        path: 'admin/services/new',
        component: () => import('pages/Admin/ServiceFormPage.vue'),
        meta: { title: 'Nuevo Servicio' },
        beforeEnter: admin,
      },
      {
        path: 'admin/services/:id/edit',
        component: () => import('pages/Admin/ServiceFormPage.vue'),
        meta: { title: 'Editar Servicio' },
        beforeEnter: admin,
      },
      {
        path: 'admin/services/:id/pricing',
        component: () => import('pages/Admin/ServicePricingPage.vue'),
        meta: { title: 'Precios' },
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
