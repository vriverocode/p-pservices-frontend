<template>
  <div class="">
    <div class="text-subtitle1 text-grey-8 q-mb-xl">
     {{ $t('login.subtitle') }}
    </div>

    <!-- Form -->
    <q-form @submit.prevent="login" class="q-gutter-y-md">
      
      <!-- Email -->
      <div>
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('login.email_label') }}</div>
        <q-input 
          v-model="form.email" 
          type="email"
          :placeholder="$t('login.email_placeholder')" 
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('login.email_required'),
            val => /.+@.+\..+/.test(val) || $t('login.email_invalid')
          ]"
          hide-bottom-space
          borderless
        />
      </div>

      <!-- Password -->
      <div class="q-mt-xl">
        <div class="row justify-between items-center q-mb-xs">
          <div class="text-subtitle2 text-weight-bold text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('login.password_label') }}</div>
          <div @click="router.push('/forgot-password')" class="text-caption text-primary cursor-pointer text-decoration-none">
            {{ $t('login.forgot_password') }}
          </div>
        </div>
        <q-input 
          v-model="form.password" 
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••" 
          dense
          class="custom-input "
          :rules="[
            val => !!val || $t('login.password_required'),
            val => val.length >= 6 || $t('login.password_min')
          ]"
          hide-bottom-space
          borderless
        >
          <template v-slot:append>
            <q-icon 
              :name="showPassword ? 'visibility_off' : 'visibility'" 
              class="cursor-pointer text-grey-6" 
              @click="showPassword = !showPassword"
              size="xs"
            />
          </template>
        </q-input>
      </div>

      <!-- Remember Me -->
      <div class="row items-center q-mt-xl">
        <q-checkbox v-model="form.remember" :label="$t('login.remember_me')" color="primary" class="text-grey-8 text-body2" dense />
      </div>

      <!-- Submit Button -->
      <q-btn 
        type="submit" 
        class="full-width q-py-sm q-mt-xl text-white login-btn" 
        unelevated
        color="blue-light"
        :loading="loading"
      >
        <div class="row items-center justify-center full-width">
          <span class="q-mr-sm text-weight-bold">{{ $t('login.submit_btn') }}</span>
          <q-icon name="arrow_forward" size="sm" />
        </div>
      </q-btn>
    </q-form>

    <!-- Footer -->
    <div class="text-center text-body2 text-grey-8" style="margin-top: 4rem;">
      {{ $t('login.new_user') }}
      <span @click="goTo('/register')" class="text-weight-bold text-dark text-decoration-none cursor-pointer q-ml-xs">
        {{ $t('login.create_account') }}
      </span>
    </div>

    <!-- Email Verification Modal -->
    <EmailVerificationModal 
      v-model="showVerificationModal"
      :email="unverifiedEmail"
    />
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth.store'
import { useI18n } from 'vue-i18n'
import EmailVerificationModal from 'src/components/auth/EmailVerificationModal.vue'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const { t } = useI18n()


const loading = ref(false)
const showPassword = ref(false)
const showVerificationModal = ref(false)
const unverifiedEmail = ref('')

const form = reactive({
  email: localStorage.getItem('remember_email') || '',
  password: '',
  remember: localStorage.getItem('remember_email') ? true : false
})

const login = async () => {
  try {
    loading.value = true
    
    const credentials = {
      email: form.email,
      password: form.password,
      remember: form.remember
    }

    await authStore.login(credentials)
    
    $q.notify({
      type: 'positive',
      message: t('login.success_msg'),
      position: 'top-right'
    })
    setTimeout(() => {
      router.push('/dashboard')
    }, 1000);

  } catch (error) {
    console.log('Error de Axios:', error.response)
    if(error.response && error.response?.status == 403 && error.response?.data?.error == 'login.unverified_email') {
      unverifiedEmail.value = form.email
      showVerificationModal.value = true
      return
    }
    const notificationMessage = t(error.response?.data?.error ?? 'login.error_network');
    $q.notify({
      type: 'negative',
      message: notificationMessage,
      position: 'bottom'
    })
  } finally {
    loading.value = false
  }
}

const goTo = (url) => {
    router.push(url)
}
</script>
