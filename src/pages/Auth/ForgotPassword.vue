<template>
  <div class="">
    <template v-if="!emailSent">
      <div class="text-subtitle1 text-grey-8 q-mb-xl">
       {{ $t('forgot.subtitle') }}
      </div>

      <q-form @submit.prevent="sendResetLink" class="q-gutter-y-md">

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

        <div class="row">
          <div class="col-6 tw:px-2">
            <q-btn
              class="full-width q-py-sm q-mt-xl text-white login-btn"
              unelevated
              color="grey-6"
              :loading="loading"
              @click="goTo('/login')"
            >
              <div class="row items-center justify-center full-width">
                <q-icon name="arrow_back" size="sm" />
                <span class="q-ml-sm text-weight-bold">{{ $t('forgot.back') }}</span>
              </div>
            </q-btn>
          </div>
          <div class="col-6 tw:px-2">
            <q-btn
              type="submit"
              class="full-width q-py-sm q-mt-xl text-white login-btn"
              unelevated
              color="blue-light"
              :loading="loading"
            >
              <div class="row items-center justify-center full-width">
                <span class="q-mr-sm text-weight-bold">{{ $t('forgot.submit') }}</span>
                <q-icon name="arrow_forward" size="sm" />
              </div>
            </q-btn>
          </div>
        </div>
      </q-form>
    </template>

    <template v-else>
      <div class="text-center q-pa-lg">
        <q-icon name="mark_email_read" size="80px" color="blue-light" />
        <div class="text-h6 text-weight-bold q-mt-lg text-dark-blue">
          {{ $t('forgot.success_title') }}
        </div>
        <div class="text-subtitle1 text-grey-8 q-mt-sm q-mb-lg">
          {{ $t('forgot.success_message') }}
        </div>
        <q-btn
          class="q-py-sm q-px-xl text-white login-btn"
          unelevated
          color="blue-light"
          @click="goTo('/login')"
        >
          <div class="row items-center justify-center full-width">
            <q-icon name="arrow_back" size="sm" />
            <span class="q-ml-sm text-weight-bold">{{ $t('forgot.back_to_login') }}</span>
          </div>
        </q-btn>
      </div>
    </template>
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
const emailSent = ref(false)

const form = reactive({
  email: ''
})

const sendResetLink = async () => {
  try {
    loading.value = true
    await authStore.forgotPassword(form.email)
    emailSent.value = true
  } catch (error) {
    const notificationMessage = t(error.response?.data?.error ?? 'forgot.error_network');
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
