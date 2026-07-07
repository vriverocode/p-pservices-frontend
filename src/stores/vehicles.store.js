import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useVehiclesStore = defineStore('vehicles', () => {
  const vehicles = ref([])
  const vehicleTypes = ref([])
  const vehicleMakes = ref([])
  const vehicleModels = ref([])
  const loading = ref(false)
  const selectedVehicle = ref(null)

  // --- Client: vehicles ---
  const fetchVehicles = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/vehicles')
      vehicles.value = response.data.data
    } catch (error) {
      console.error('Error fetching vehicles:', error)
    } finally {
      loading.value = false
    }
  }

  const createVehicle = async (vehicleData) => {
    const response = await api.post('/api/vehicles', vehicleData)
    return response.data.data
  }

  const updateVehicle = async (id, vehicleData) => {
    const response = await api.put(`/api/vehicles/${id}`, vehicleData)
    return response.data.data
  }

  const deleteVehicle = async (id) => {
    await api.delete(`/api/vehicles/${id}`)
  }

  const setPrimaryVehicle = async (id) => {
    const response = await api.patch(`/api/vehicles/${id}/primary`)
    return response.data.data
  }

  // --- Admin: catalog ---
  const fetchVehicleTypes = async () => {
    try {
      const response = await api.get('/api/admin/vehicle-types')
      vehicleTypes.value = response.data.data
    } catch (error) {
      console.error('Error fetching vehicle types:', error)
    }
  }

  const createVehicleType = async (data) => {
    const response = await api.post('/api/admin/vehicle-types', data)
    return response.data.data
  }

  const updateVehicleType = async (id, data) => {
    const response = await api.put(`/api/admin/vehicle-types/${id}`, data)
    return response.data.data
  }

  const deleteVehicleType = async (id) => {
    await api.delete(`/api/admin/vehicle-types/${id}`)
  }

  const fetchVehicleMakes = async () => {
    try {
      const response = await api.get('/api/admin/vehicle-makes')
      vehicleMakes.value = response.data.data
    } catch (error) {
      console.error('Error fetching vehicle makes:', error)
    }
  }

  const createVehicleMake = async (data) => {
    const response = await api.post('/api/admin/vehicle-makes', data)
    return response.data.data
  }

  const updateVehicleMake = async (id, data) => {
    const response = await api.put(`/api/admin/vehicle-makes/${id}`, data)
    return response.data.data
  }

  const deleteVehicleMake = async (id) => {
    await api.delete(`/api/admin/vehicle-makes/${id}`)
  }

  const fetchVehicleModels = async (filters = {}) => {
    try {
      const params = new URLSearchParams()
      if (filters.make_id) params.append('make_id', filters.make_id)
      if (filters.type_id) params.append('type_id', filters.type_id)
      const response = await api.get(`/api/admin/vehicle-models?${params}`)
      vehicleModels.value = response.data.data
    } catch (error) {
      console.error('Error fetching vehicle models:', error)
    }
  }

  const createVehicleModel = async (data) => {
    const response = await api.post('/api/admin/vehicle-models', data)
    return response.data.data
  }

  const updateVehicleModel = async (id, data) => {
    const response = await api.put(`/api/admin/vehicle-models/${id}`, data)
    return response.data.data
  }

  const deleteVehicleModel = async (id) => {
    await api.delete(`/api/admin/vehicle-models/${id}`)
  }

  return {
    vehicles, vehicleTypes, vehicleMakes, vehicleModels, loading, selectedVehicle,
    fetchVehicles, createVehicle, updateVehicle, deleteVehicle, setPrimaryVehicle,
    fetchVehicleTypes, createVehicleType, updateVehicleType, deleteVehicleType,
    fetchVehicleMakes, createVehicleMake, updateVehicleMake, deleteVehicleMake,
    fetchVehicleModels, createVehicleModel, updateVehicleModel, deleteVehicleModel,
  }
})
