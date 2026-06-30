import { useAuthStore } from 'src/stores/auth.store';
import { Platform } from 'quasar';

export default async function guest(_to, _from, next) {
    document.title = _to.meta.title + ' - P&P Services';
    const store = useAuthStore();

    // Si ya está autenticado en la store local, redirigir al dashboard
    if (store.isAuthenticated) {
        return next('/dashboard');
    }

    // Si es móvil (Capacitor)
    if (Platform.is.capacitor) {
        if (store.token) {
            // Intentar recuperar el usuario si hay un token guardado
            const success = await store.fetchUser();
            if (success) {
                return next('/dashboard');
            }
        }
        return next();
    }

    // Si es web (Cookies), intentamos traer el usuario para ver si la sesión sigue activa
    const success = await store.fetchUser();
    if (success) {
        next('/dashboard');
    } else {
        next();
    }
}