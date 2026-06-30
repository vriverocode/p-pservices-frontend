import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useServicesStore = defineStore('services', () => {
  const services = ref([])
  const recentHistory = ref([])
  const loading = ref(false)

  const fetchServices = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/services')
      services.value = response.data.data
    } catch (error) {
      console.error('Error fetching services:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchRecentHistory = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/history/recent')
      recentHistory.value = response.data.data
    } catch (error) {
      console.error('Error fetching recent history:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    services,
    recentHistory,
    loading,
    fetchServices,
    fetchRecentHistory
  }
})
