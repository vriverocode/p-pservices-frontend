import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { api } from 'boot/axios'; // Estricto: tu instancia de Axios configurada
import { Platform } from 'quasar'; // Para detectar el entorno (Web vs Capacitor)

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('auth_token') || null);
    const loading = ref(true);
    const isAuthenticated = computed(() => !!user.value);
    const getUser = computed(() => user.value);
    const getToken = computed(() => token.value);
    const userRole = computed(() => user.value?.rol?.name || null);
    const setToken = (newToken) => {
        if (newToken) {
            token.value = newToken;
            localStorage.setItem('auth_token', newToken);
            api.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        } else {
            token.value = null;
            localStorage.removeItem('auth_token');
            delete api.defaults.headers.common['Authorization'];
        }
    };
    const rememberUserLogin = (credentials) => {
        if (credentials.remember) {
            localStorage.setItem('remember_email', credentials.email);
        }
    }
    const clearSession = () => {
        user.value = null;
        setToken(null);
    };
    const login = async (credentials) => {
        try {
            const response = await api.post('/api/login', credentials);

            console.log(response)
            rememberUserLogin(credentials);
            const responseData = response.data.data;
            user.value = responseData.user;
            if (responseData.token) {
                setToken(responseData.token);
            }

            return responseData;
        } catch (error) {
            console.log(error)

            clearSession();
            throw error;
        }
    };
    const fetchUser = async () => {
        try {
            if (!token.value) {
                clearSession();
                return false;
            }

            api.defaults.headers.common['Authorization'] = `Bearer ${token.value}`;

            const response = await api.get('/api/user');
            user.value = response.data.data;
            return true;
        } catch (error) {
            clearSession();
            console.log('Error al obtener el usuario:', error);
            return false;
        } finally {
            loading.value = false;
        }
    };
    const logout = async () => {
        try {
            const reponse = await api.post('/api/logout');
            return reponse.data;
        } catch (error) {
            console.warn('Error en backend durante logout, forzando cierre local...', error);
        } finally {
            clearSession();
        }
    };

    const register = async (userData) => {
        try {
            if (!Platform.is.capacitor) {
                await api.get('/sanctum/csrf-cookie');
            }
            const payload = {
                ...userData,
                is_mobile: Platform.is.capacitor
            };

            const response = await api.post('/api/register', payload);

            const responseData = response.data.data || response.data;

            user.value = responseData.user;

            if (responseData.token) {
                setToken(responseData.token);
            }

            return responseData;
        } catch (error) {
            clearSession();
            throw error;
        }
    };

    const resendVerificationEmail = async (email) => {
        await api.post('/api/email/resend', { email });
        return true;
    }

    return {
        user,
        token,
        loading,
        isAuthenticated,
        getUser,
        getToken,
        userRole,
        login,
        register,
        fetchUser,
        logout,
        resendVerificationEmail
    };
});