import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useServicesStore = defineStore('services', () => {
  const services = ref([])
  const recentHistory = ref([])
  const currentService = ref(null)
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

  const fetchService = async (id) => {
    try {
      loading.value = true
      const response = await api.get(`/api/services/${id}`)
      currentService.value = response.data.data
      return response.data.data
    } catch (error) {
      console.error('Error fetching service:', error)
      return null
    } finally {
      loading.value = false
    }
  }

  const fetchServicePrice = async (serviceId, vehicleCategoryId) => {
    try {
      const response = await api.get(`/api/services/${serviceId}/price`, {
        params: { vehicle_category_id: vehicleCategoryId }
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching price:', error)
      return null
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

  const createService = async (formData) => {
    const response = await api.post('/api/admin/services', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data.data
  }

  const updateService = async (id, formData) => {
    formData.append('_method', 'PUT')
    const response = await api.post(`/api/admin/services/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return response.data.data
  }

  const deleteService = async (id) => {
    await api.delete(`/api/admin/services/${id}`)
  }

  const fetchAdminServices = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/admin/services')
      services.value = response.data.data
    } catch (error) {
      console.error('Error fetching admin services:', error)
    } finally {
      loading.value = false
    }
  }

  const fetchServicePricing = async (serviceId) => {
    const response = await api.get(`/api/admin/services/${serviceId}/pricing`)
    return response.data.data
  }

  const createPricing = async (serviceId, data) => {
    const response = await api.post(`/api/admin/services/${serviceId}/pricing`, data)
    return response.data.data
  }

  const updatePricing = async (serviceId, pricingId, data) => {
    const response = await api.put(`/api/admin/services/${serviceId}/pricing/${pricingId}`, data)
    return response.data.data
  }

  const fetchAdminService = async (id) => {
    try {
      loading.value = true
      const response = await api.get(`/api/admin/services/${id}`)
      currentService.value = response.data.data
      return response.data.data
    } catch (error) {
      console.error('Error fetching admin service:', error)
      return null
    } finally {
      loading.value = false
    }
  }

    const deletePricing = async (serviceId, pricingId) => {
    await api.delete(`/api/admin/services/${serviceId}/pricing/${pricingId}`)
  }

  return {
    services,
    recentHistory,
    currentService,
    loading,
    fetchServices,
    fetchService,
    fetchServicePrice,
    fetchRecentHistory,
    createService,
    updateService,
    deleteService,
    fetchAdminServices,
    fetchAdminService,
    fetchServicePricing,
    createPricing,
    updatePricing,
    deletePricing
  }
})
