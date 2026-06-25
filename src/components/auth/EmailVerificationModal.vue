<template>
  <q-dialog v-model="show" persistent>
    <q-card class="verification-modal">
      <q-card-section class="row items-center q-pb-none">
        <q-avatar icon="mark_email_unread" color="blue-light" text-color="white" size="60px" />
        <q-space />
        <q-btn icon="close" flat round dense @click="close" />
      </q-card-section>

      <q-card-section class="q-pt-lg">
        <div class="text-h6 text-weight-bold text-dark-blue text-center">
          {{ $t('login.verification_modal.title') }}
        </div>
        <div class="text-body1 text-secondary text-center q-mt-sm">
          {{ $t('login.verification_modal.description') }}
        </div>
        <div class="text-body2 text-weight-bold text-dark-blue text-center q-mt-md">
          {{ email }}
        </div>
      </q-card-section>

      <q-card-actions class="q-pa-md q-pt-none">
        <q-btn
          :label="$t('login.verification_modal.resend_btn')"
          class="full-width login-btn text-white"
          color="blue-light"
          unelevated
          :loading="loading"
          @click="resendCode"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from 'src/stores/auth.store'

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  email: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update:modelValue'])

const $q = useQuasar()
const { t } = useI18n()
const authStore = useAuthStore()

const show = ref(props.modelValue)
const loading = ref(false)

watch(() => props.modelValue, (val) => {
  show.value = val
})

watch(show, (val) => {
  emit('update:modelValue', val)
})

const close = () => {
  show.value = false
}

const resendCode = async () => {
  try {
    loading.value = true
    await authStore.resendVerificationEmail(props.email)
    $q.notify({
      type: 'positive',
      message: t('login.verification_modal.success_msg'),
      position: 'top-right'
    })
    close()
  } catch {
    $q.notify({
      type: 'negative',
      message: t('login.verification_modal.error_msg'),
      position: 'bottom'
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.verification-modal {
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
}
</style>
