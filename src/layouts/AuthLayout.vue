<template>
  <q-layout view="lHh Lpr lFf" class="auth-layout bg-grey-1">
    <q-page-container>
      <q-page class="flex flex-center tw:px-5 tw:md:px-0">
        <div class="auth-wrapper q-pa-md">
          <!-- Header / Logo & Language Selector -->
          <div class="row items-center justify-between q-mb-md">
            <div class="row items-center flex-center">
              <!-- <q-icon name="precision_manufacturing" size="2.5rem" class="text-dark-blue q-mr-sm" />-->
              <img :src="logo" alt="logo_p_and_p_services" 
              class="tw:w-1/4 imgAuth">
              <div class="text-h5 text-weight-bolder text-dark-blue tw:ml-2 tw:pt-5 brandTitle" style="letter-spacing: 0.5px;">P&P Services</div> 
            </div>
            <div class="tw:my-2 flex justify-end tw:w-full">
              <q-select 
                v-model="currentLocale" 
                :options="localeOptions" 
                dense ºººº
                emit-value 
                outlined
                map-options 
                options-dense
                @update:model-value="changeLanguage"
                style="min-width: 60px;"
              >
                <template v-slot:selected>
                  <div class="text-dark-blue text-weight-bold" style="font-size: 0.9rem;">
                    {{ currentLocale === 'es' ? 'ES 🇪🇸' : 'EN 🇺🇸' }}
                  </div>
                </template>
              </q-select>
            </div>
          </div>

          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import logo from '@/assets/images/logo/logo.webp'

const { locale } = useI18n()

// Configuración de Idioma
const currentLocale = ref(locale.value)
const localeOptions = [
  { value: 'es', label: 'Español' },
  { value: 'en-US', label: 'English' }
]

const changeLanguage = (val) => {
  locale.value = val
  localStorage.setItem('locale', val)
}
</script>

<style>
.imgAuth{
    filter: drop-shadow(0px 5px 5px rgba(0, 0, 0, 0.096));
}
.brandTitle {
  background-image: linear-gradient(90deg,rgba(235, 6, 6, 1) 0%, rgba(157, 10, 14, 1) 29%, rgba(3, 95, 200, 1) 49%, rgba(0, 91, 196, 1) 62%, rgba(31, 138, 235, 1) 82%, rgba(46, 161, 255, 1) 100%);
  text-shadow: 0px 8px 5px rgba(0, 0, 0, 0.158);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.auth-layout {
  min-height: 100vh;
  background-color: #fafbfc !important; /* Color de fondo claro como en la imagen */
}
.auth-wrapper {
  width: 100%;
  max-width: 440px;
}
.text-dark-blue {
  color: #162438 !important;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>