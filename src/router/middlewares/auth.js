import { useAuthStore } from 'src/stores/auth.store';
import { Platform } from 'quasar';

export default async function auth(_to, _from, next) {
    document.title = _to.meta.title + ' - P&P Services';
    const store = useAuthStore();

    if (store.isAuthenticated) {
        return next();
    }

    if (Platform.is.capacitor && !store.token) {
        return next('/login');
    }

    const success = await store.fetchUser();
    if (success) {
        next();
    } else {
        next('/login');
    }
}