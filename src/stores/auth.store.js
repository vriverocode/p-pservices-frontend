import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from 'boot/axios'; // Estricto: tu instancia de Axios configurada
import { Platform } from 'quasar'; // Para detectar el entorno (Web vs Capacitor)

export const useAuthStore = defineStore('auth', () => {
    // ==========================================
    // 1. ESTADO (State)
    // ==========================================
    const user = ref(null);
    const token = ref(localStorage.getItem('auth_token') || null);

    // ==========================================
    // 2. GETTERS (Computed)
    // ==========================================
    const isAuthenticated = computed(() => !!user.value);
    const getUser = computed(() => user.value);
    const getToken = computed(() => token.value);

    // ==========================================
    // 3. MÉTODOS PRIVADOS (Encapsulación)
    // ==========================================

    // Guardamos el token solo si es móvil. Si es SPA, usamos la Cookie HttpOnly.
    const setToken = (newToken) => {
        if (newToken) {
            token.value = newToken;
            localStorage.setItem('auth_token', newToken);
            // Inyectamos el header en Axios para las siguientes peticiones móviles
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } else {
            token.value = null;
            localStorage.removeItem('auth_token');
            delete api.defaults.headers.common['Authorization'];
        }
    };

    const clearSession = () => {
        user.value = null;
        setToken(null);
    };

    // ==========================================
    // 4. ACCIONES (Actions)
    // ==========================================

    /**
     * Login Dual: Gestiona Cookies (SPA) o Tokens (Capacitor)
     */
    const login = async (credentials) => {
        try {
            // 1. Si NO es Capacitor (es web), requerimos la cookie CSRF de Sanctum primero.
            // Si es móvil nativo, Sanctum ignora esto porque usaremos Tokens.
            if (!Platform.is.capacitor) {
                await api.get('/sanctum/csrf-cookie');
            }

            // 2. Enviamos las credenciales. 
            // Opcional: Le pasamos 'is_mobile' al backend para ayudar a tu AuthController
            const payload = {
                ...credentials,
                is_mobile: Platform.is.capacitor
            };

            const response = await api.post('/api/login', payload);

            // 3. Estricto a tu regla de Backend: returnSuccess($code, $data)
            // Axios envuelve la respuesta en 'data', y tu backend envía la carga en 'data'.
            const responseData = response.data.data;

            user.value = responseData.user;

            // 4. Si el backend emitió un token (Capacitor), lo guardamos en el estado y localStorage
            if (responseData.token) {
                setToken(responseData.token);
            }

            return responseData; // Retornamos para que la UI (componente) sepa que fue un éxito
        } catch (error) {
            // Defensa en profundidad: El store no muestra notificaciones visuales, eso rompe el SRP.
            // Limpiamos por si acaso y propagamos el error a la vista.
            clearSession();
            throw error;
        }
    };

    /**
     * Validar sesión y traer el usuario actual
     */
    const fetchUser = async () => {
        try {
            // Si es móvil y no hay token guardado, ni siquiera golpeamos el backend.
            if (Platform.is.capacitor && !token.value) {
                clearSession();
                return false;
            }

            // Si es móvil y tenemos token en localStorage, nos aseguramos de que Axios lo tenga
            if (Platform.is.capacitor && token.value) {
                api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;
            }

            const response = await api.get('/api/user');
            user.value = response.data.data; // Mapeado estricto de tu returnSuccess
            return true;
        } catch (error) {
            // Si falla (ej. 401 Unauthenticated), destruimos la sesión local.
            clearSession();
            return false;
        }
    };

    /**
     * Cierre de sesión seguro en Frontend y Backend
     */
    const logout = async () => {
        try {
            await api.post('/api/logout');
        } catch (error) {
            console.warn('Error en backend durante logout, forzando cierre local...', error);
        } finally {
            clearSession(); // Sin importar lo que diga el servidor, matamos la sesión en el cliente.
        }
    };

    // Retornamos la API pública del Store
    return {
        user,
        token,
        isAuthenticated,
        getUser,
        getToken,
        login,
        fetchUser,
        logout
    };
});