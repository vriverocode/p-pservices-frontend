<template>
  <q-layout view="lHh Lpr lFf" class="tw:h-screen tw:overflow-hidden">
    <q-page-container class="tw:h-full">
      <div 
        class="client-header tw:py-4 tw:px-3" 
        :style="{ height: '10%', backgroundColor: route.name === 'profile' ? '#162438' : '#f9fafb' }"
      >
        <div style="width: 10%;">
          <BackButton :color="route.name === 'profile' ? 'white' : undefined" />
        </div>
        <span 
          class="client-header__title"
          :style="{ color: route.name === 'profile' ? 'white' : '#111827' }"
        >{{ route.meta.title }}</span>
      </div>
      <div class="layout-wrapper" style="height: 90%;">
         <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup>

import BackButton from 'src/components/layout/BackButton.vue'
import { useRoute } from 'vue-router';
const route = useRoute()

</script>

<style lang="scss">
.client-header {
  display: flex;
  align-items: center;
  max-width: 100%;

  @media (min-width: 768px) {
    max-width: 480px;
  }

  &__title {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    justify-content: center;
    width: 90%;
  }
}

.layout-wrapper {
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 480px;
    min-height: 100vh;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
    background: #f9fafb;
  }
}
</style>
