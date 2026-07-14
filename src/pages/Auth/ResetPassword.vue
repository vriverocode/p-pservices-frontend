<template>
  <div class="">
    <div class="text-subtitle1 text-grey-8 q-mb-xl">
     {{ $t('reset.subtitle') }}
    </div>

    <q-form @submit.prevent="submitReset" class="q-gutter-y-md">

      <div>
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('reset.password_label') }}</div>
        <q-input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="••••••••"
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('register.password_required'),
            val => val.length >= 8 || $t('register.password_min'),
            val => /[a-z]/.test(val) || $t('register.password_lowercase'),
            val => /[A-Z]/.test(val) || $t('register.password_uppercase'),
            val => /[0-9]/.test(val) || $t('register.password_digit'),
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

      <div class="q-mt-xl">
        <div class="text-subtitle2 text-weight-bold q-mb-xs text-grey-9" style="font-size: 0.85rem; letter-spacing: 0.5px;">{{ $t('reset.password_confirm_label') }}</div>
        <q-input
          v-model="form.password_confirmation"
          :type="showConfirm ? 'text' : 'password'"
          :placeholder="$t('reset.password_confirm_placeholder')"
          dense
          class="custom-input"
          :rules="[
            val => !!val || $t('register.password_required'),
            val => val === form.password || $t('register.password_confirmation_mismatch')
          ]"
          hide-bottom-space
          borderless
        >
          <template v-slot:append>
            <q-icon
              :name="showConfirm ? 'visibility_off' : 'visibility'"
              class="cursor-pointer text-grey-6"
              @click="showConfirm = !showConfirm"
              size="xs"
            />
          </template>
        </q-input>
      </div>

      <q-btn
        type="submit"
        class="full-width q-py-sm q-mt-xl text-white login-btn"
        unelevated
        color="blue-light"
        :loading="loading"
      >
        <span class="text-weight-bold">{{ $t('reset.submit') }}</span>
      </q-btn>
    </q-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth.store'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const route = useRoute()
const $q = useQuasar()
const authStore = useAuthStore()
const { t } = useI18n()

const loading = ref(false)
const showPassword = ref(false)
const showConfirm = ref(false)

const form = reactive({
  email: '',
  token: '',
  password: '',
  password_confirmation: ''
})

onMounted(() => {
  form.email = route.query.email || ''
  form.token = route.query.token || ''

  if (!form.token || !form.email) {
    $q.notify({
      type: 'negative',
      message: t('reset.invalid_token'),
      position: 'bottom'
    })
    router.push('/login')
  }
})

const submitReset = async () => {
  try {
    loading.value = true
    await authStore.resetPassword({
      email: form.email,
      token: form.token,
      password: form.password,
      password_confirmation: form.password_confirmation
    })
    $q.notify({
      type: 'positive',
      message: t('reset.success_msg'),
      position: 'top-right'
    })
    setTimeout(() => {
      router.push('/login')
    }, 1500)
  } catch (error) {
    const notificationMessage = t(error.response?.data?.error ?? 'reset.error_msg');
    $q.notify({
      type: 'negative',
      message: notificationMessage,
      position: 'bottom'
    })
  } finally {
    loading.value = false
  }
}
</script>
