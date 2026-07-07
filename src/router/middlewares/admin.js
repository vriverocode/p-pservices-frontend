import { useAuthStore } from 'src/stores/auth.store'

export default async function admin(_to, _from, next) {
  const store = useAuthStore()

  if (!store.isAuthenticated) {
    return next('/login')
  }

  if (store.userRole !== 'Admin') {
    return next('/dashboard')
  }

  return next()
}
