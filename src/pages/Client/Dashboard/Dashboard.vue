<template>
  <div class="dashboard">
    <WelcomeHeader :user-name="userName" :avatar="userAvatar" />

    <NewProjectCard @start-quote="handleStartQuote" />

    <PremiumServicesSection
      :services="servicesStore.services"
      @view-all="handleViewAll"
    />

    <RecentHistorySection :items="servicesStore.recentHistory" />

    <div class="dashboard__spacer" />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useAuthStore } from 'src/stores/auth.store'
import { useServicesStore } from 'src/stores/services.store'
import WelcomeHeader from 'src/components/dashboard/WelcomeHeader.vue'
import NewProjectCard from 'src/components/dashboard/NewProjectCard.vue'
import PremiumServicesSection from 'src/components/dashboard/PremiumServicesSection.vue'
import RecentHistorySection from 'src/components/dashboard/RecentHistorySection.vue'

const authStore = useAuthStore()
const servicesStore = useServicesStore()

const userName = computed(() => authStore.getUser?.name || 'Cliente')
const userAvatar = computed(() => authStore.getUser?.avatar || '')

const handleStartQuote = () => {
  console.log('Iniciar cotización')
}

const handleViewAll = () => {
  console.log('Ver todos los servicios')
}

onMounted(async () => {
  await Promise.all([
    servicesStore.fetchServices(),
    servicesStore.fetchRecentHistory()
  ])
})
</script>

<style scoped lang="scss">
.dashboard {
  min-height: 100vh;
  background: #f9fafb;

  &__spacer {
    height: 80px;
  }
}
</style>
