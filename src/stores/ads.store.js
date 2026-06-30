import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useAdsStore = defineStore('ads', () => {
  const ads = ref([])
  const loading = ref(false)

  const fetchAds = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/ads')
      ads.value = response.data.data
    } catch (error) {
      console.error('Error fetching ads:', error)
    } finally {
      loading.value = false
    }
  }

  return {
    ads,
    loading,
    fetchAds
  }
})
