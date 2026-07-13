import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from 'boot/axios'

export const useWorkspacesStore = defineStore('workspaces', () => {
  const workspaces = ref([])
  const currentSchedules = ref([])
  const loading = ref(false)

  const fetchWorkspaces = async () => {
    try {
      loading.value = true
      const response = await api.get('/api/admin/workspaces')
      workspaces.value = response.data.data
    } catch (error) {
      console.error('Error fetching workspaces:', error)
    } finally {
      loading.value = false
    }
  }

  const createWorkspace = async (data) => {
    const response = await api.post('/api/admin/workspaces', data)
    return response.data.data
  }

  const updateWorkspace = async (id, data) => {
    const response = await api.put(`/api/admin/workspaces/${id}`, data)
    return response.data.data
  }

  const deleteWorkspace = async (id) => {
    await api.delete(`/api/admin/workspaces/${id}`)
  }

  const fetchSchedules = async (workspaceId) => {
    try {
      loading.value = true
      const response = await api.get(`/api/admin/workspaces/${workspaceId}/schedules`)
      currentSchedules.value = response.data.data
    } catch (error) {
      console.error('Error fetching schedules:', error)
    } finally {
      loading.value = false
    }
  }

  const createSchedule = async (workspaceId, data) => {
    const response = await api.post(`/api/admin/workspaces/${workspaceId}/schedules`, data)
    return response.data.data
  }

  const updateSchedule = async (workspaceId, scheduleId, data) => {
    const response = await api.put(`/api/admin/workspaces/${workspaceId}/schedules/${scheduleId}`, data)
    return response.data.data
  }

  const deleteSchedule = async (workspaceId, scheduleId) => {
    await api.delete(`/api/admin/workspaces/${workspaceId}/schedules/${scheduleId}`)
  }

  const fetchSlots = async (date, workspaceId, serviceId) => {
    try {
      const response = await api.get('/api/appointments/slots', {
        params: { date, workspace_id: workspaceId, service_id: serviceId }
      })
      return response.data.data
    } catch (error) {
      console.error('Error fetching slots:', error)
      return null
    }
  }

  return {
    workspaces, currentSchedules, loading,
    fetchWorkspaces, createWorkspace, updateWorkspace, deleteWorkspace,
    fetchSchedules, createSchedule, updateSchedule, deleteSchedule,
    fetchSlots,
  }
})
