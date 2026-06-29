<template>
  <LoadingSpinner v-if="authStore.loading" />

  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import LoadingSpinner from 'src/components/layout/LoadingSpinner.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.fetchUser()
})
</script>
