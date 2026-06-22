<template>
  <div class="">
    <div class="text-h5 text-weight-bolder text-dark-blue q-mb-sm">
      {{ $t('register.title') }}
    </div>
    <div class="text-body1 text-primary-soft q-mb-xl" style="font-size: 1rem;">
      {{ $t('register.subtitle') }}
    </div>

    <!-- Form -->
    <q-form @submit.prevent="registerAction" class="q-gutter-y-md">
      
      <!-- Nombre Completo -->
      <div>
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('register.name_label') }}</div>
        <q-input 
          v-model="form.name" 
          type="text"
          :placeholder="$t('register.name_placeholder')" 
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('register.name_required'),
            val => val.length >= 2 || $t('register.name_min'),
            val => /^[\p{L}\s\-]+$/u.test(val) || $t('register.name_invalid')
          ]"
          hide-bottom-space
          borderless
        >
          <template v-slot:prepend>
            <q-icon name="person_outline" color="grey-5" size="1.3rem" />
          </template>
        </q-input>
      </div>

      <!-- Correo Electrónico -->
      <div class="q-mt-lg">
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('register.email_label') }}</div>
        <q-input 
          v-model="form.email" 
          type="email"
          :placeholder="$t('register.email_placeholder')" 
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('register.email_required'),
            val => /.+@.+\..+/.test(val) || $t('register.email_invalid')
          ]"
          hide-bottom-space
          borderless
        >
          <template v-slot:prepend>
            <q-icon name="mail_outline" color="grey-5" size="1.3rem" />
          </template>
        </q-input>
      </div>

      <!-- Teléfono -->
      <div class="q-mt-lg">
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('register.phone_label') }}</div>
        <q-input 
          v-model="form.phone" 
          type="tel"
          :placeholder="$t('register.phone_placeholder')" 
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('register.phone_required'),
            val => /^\+?[\d\s\-().]+$/.test(val) || $t('register.phone_invalid'),
            val => val.replace(/\D/g, '').length >= 7 || $t('register.phone_min')
          ]"
          hide-bottom-space
          borderless
        >
          <template v-slot:prepend>
            <q-icon name="call" color="grey-5" size="1.3rem" />
          </template>
        </q-input>
      </div>

      <!-- Contraseña -->
      <div class="q-mt-lg">
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('register.password_label') }}</div>
        <q-input 
          v-model="form.password" 
          :type="showPassword ? 'text' : 'password'"
          :placeholder="$t('register.password_placeholder')" 
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('register.password_required'),
            val => val.length >= 8 || $t('register.password_min'),
            val => /[a-z]/.test(val) || $t('register.password_lowercase'),
            val => /[A-Z]/.test(val) || $t('register.password_uppercase'),
            val => /[0-9]/.test(val) || $t('register.password_digit'),
            val => /[!@#%^&*()\-_+=[\]{}|,.?~]/.test(val) || $t('register.password_special'),
            val => /^[A-Za-z0-9!@#%^&*()\-_+=[\]{}|,.?~]+$/.test(val) || $t('register.password_invalid_chars')
          ]"
          hide-bottom-space
          borderless
        >
          <template v-slot:prepend>
            <q-icon name="lock_outline" color="grey-5" size="1.3rem" />
          </template>
          <template v-slot:append>
            <q-icon 
              :name="showPassword ? 'visibility_off' : 'visibility'" 
              class="cursor-pointer" 
              color="grey-5"
              size="1.2rem"
              @click="showPassword = !showPassword" 
            />
          </template>
        </q-input>
      </div>

      <!-- Submit Button -->
      <div class="q-mt-xl">
        <q-btn 
          type="submit" 
          color="dark" 
          text-color="white" 
          class="full-width login-btn"
          :label="$t('register.submit_btn')"
          :loading="loading"
          unelevated
        />
      </div>
    </q-form>

    <!-- Footer Links -->
    <div class="text-center q-mt-xl text-primary-soft">
      {{ $t('register.already_have_account') }}
      <span @click="goTo('/login')" class="text-weight-bold text-dark text-decoration-none cursor-pointer q-ml-xs">
        {{ $t('register.login') }}
      </span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth.store'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()
const { t } = useI18n()

const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: ''
})

const registerAction = async () => {
  try {
    loading.value = true
    
    await authStore.register({
      name: form.name,
      email: form.email,
      phone: form.phone,
      password: form.password,
      password_confirmation: form.password
    })
    
    $q.notify({
      type: 'positive',
      message: t('register.success_msg'),
      position: 'top-right'
    })
    
    router.push('/')

  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: error.response?.data?.message || t('register.error_msg'),
      position: 'top-right'
    })
  } finally {
    loading.value = false
  }
}

const goTo = (url) => {
    router.push(url)
}
</script>
