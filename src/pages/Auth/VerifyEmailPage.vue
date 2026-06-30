<template>
  <q-layout view="lHh Lpr lFf" class="auth-layout bg-grey-1">
    <q-page-container>
      <q-page class="flex flex-center tw:px-5 tw:md:px-20">
          <div class="column items-center justify-center tw:md:mx-auto tw:md:w-2/4">
            <!-- Header/Title -->
            <div class="text-h5 text-weight-bold text-grey-9 q-mb-xl text-center">
              {{ isSuccess ? 'Verificación Completada :)' : (hasError ? 'Error de Verificación' : 'Verificando tu correo...') }} 
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="column items-center q-gutter-y-md">
              <q-spinner-tail color="blue-light" size="3em" />
              <div class="text-body2 text-grey-7">Estamos validando tu enlace, por favor espera...</div>
            </div>

            <!-- Success State -->
            <div v-else-if="isSuccess" class="column items-center q-gutter-y-md full-width">
              <q-icon name="check_circle" color="positive" size="4rem" />
              <div class="text-h6 text-weight-bold text-grey-9 text-center">¡Correo Verificado!</div>
              <div class="text-body2 text-grey-7 text-center q-mb-md">
                Tu cuenta está lista para ser utilizada. Te redirigiremos al login en unos segundos.
              </div>
              
              <q-btn 
                @click="goToLogin" 
                class="full-width q-py-sm text-white login-btn" 
                unelevated
                color="blue-light"
              >
                <span class="text-weight-bold">Iniciar sesión ahora</span>
              </q-btn>
            </div>

            <!-- Error State -->
            <div v-else class="column items-center q-gutter-y-md full-width">
              <q-icon name="error_outline" color="negative" size="4rem" />
              <div class="text-h6 text-weight-bold text-grey-9 text-center">Enlace Inválido</div>
              <div class="text-body2 text-grey-7 text-center q-mb-md">
                {{ errorMessage || 'El enlace es inválido o ha expirado. Por favor, solicita uno nuevo.' }}
              </div>
              
              <q-btn 
                @click="goToLogin" 
                class="full-width q-py-sm text-white login-btn" 
                unelevated
                color="blue-light"
              >
                <span class="text-weight-bold">Volver al Login</span>
              </q-btn>
            </div>
          </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { api } from 'boot/axios';

const route = useRoute();
const router = useRouter();

const loading = ref(true);
const isSuccess = ref(false);
const hasError = ref(false);
const errorMessage = ref('');

onMounted(async () => {
    const verifyUrl = route.query.verify_url;
    
    if (verifyUrl) {
        try {
            // Hacemos un GET a la URL firmada del backend
            await api.get(verifyUrl);
            
            loading.value = false;
            isSuccess.value = true;
            
            // Redirigir al login automáticamente después de 3 segundos
            setTimeout(() => {
                goToLogin();
            }, 30000000);
            
        } catch (error) {
            loading.value = false;
            hasError.value = true;
            errorMessage.value = error.response?.data?.message || 'Ocurrió un error inesperado al validar el correo.';
        }
    } else {
        loading.value = false;
        hasError.value = true;
        errorMessage.value = 'No se encontró la URL de verificación.';
    }
});

const goToLogin = () => {
    router.push('/login');
};
</script>