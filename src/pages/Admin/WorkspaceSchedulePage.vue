<template>
  <div class="tw:p-4">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Horarios: {{ workspaceName }}</div>
        <q-space />
        <q-btn dense flat icon="add" color="primary" label="Agregar Bloque" @click="openDialog()" />
      </q-card-section>
      <q-separator />

      <div v-for="day in daysOfWeek" :key="day.value" class="tw:border-b tw:border-gray-200">
        <div class="row items-center tw:px-4 tw:py-3">
          <div class="col-2 text-weight-bold">{{ day.label }}</div>
          <div class="col">
            <div v-if="getBlocksForDay(day.value).length === 0" class="text-grey">— Sin horario</div>
            <div v-for="block in getBlocksForDay(day.value)" :key="block.id"
              class="row items-center tw:gap-2 tw:mb-1">
              <q-chip :color="block.is_active ? 'positive' : 'grey'" text-color="white" size="sm">
                {{ block.start_time }} - {{ block.end_time }}
              </q-chip>
              <q-btn flat dense icon="edit" size="sm" @click="openDialog(block)" />
              <q-btn flat dense icon="delete" size="sm" color="negative" @click="confirmDelete(block)" />
            </div>
          </div>
        </div>
      </div>
    </q-card>

    <q-dialog v-model="dialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ dialog.isEdit ? 'Editar Bloque' : 'Nuevo Bloque' }}</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-select v-model="dialog.form.day_of_week" :options="daysOfWeek" option-label="label"
            option-value="value" emit-value map-options label="Día" />
          <q-input v-model="dialog.form.start_time" label="Hora inicio" type="time" />
          <q-input v-model="dialog.form.end_time" label="Hora fin" type="time" />
          <q-select v-model="dialog.form.is_active" :options="statusOptions" option-label="label"
            option-value="value" emit-value map-options label="Estado" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="save" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useQuasar } from 'quasar'
import { useWorkspacesStore } from 'src/stores/workspaces.store'

const store = useWorkspacesStore()
const route = useRoute()
const $q = useQuasar()

const workspaceId = route.params.id
const workspaceName = ref('')

const daysOfWeek = [
  { label: 'Domingo', value: 0 },
  { label: 'Lunes', value: 1 },
  { label: 'Martes', value: 2 },
  { label: 'Miércoles', value: 3 },
  { label: 'Jueves', value: 4 },
  { label: 'Viernes', value: 5 },
  { label: 'Sábado', value: 6 },
]

const statusOptions = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false }
]

const dialog = reactive({
  show: false,
  isEdit: false,
  editingId: null,
  form: { day_of_week: 1, start_time: '09:00', end_time: '18:00', is_active: true }
})

const getBlocksForDay = (dayValue) => {
  return store.currentSchedules.filter(s => s.day_of_week === dayValue)
}

const openDialog = (block = null) => {
  dialog.isEdit = !!block
  dialog.editingId = block?.id || null
  dialog.form = {
    day_of_week: block?.day_of_week ?? 1,
    start_time: block?.start_time ?? '09:00',
    end_time: block?.end_time ?? '18:00',
    is_active: block?.is_active ?? true
  }
  dialog.show = true
}

const save = async () => {
  try {
    if (dialog.isEdit) {
      await store.updateSchedule(workspaceId, dialog.editingId, dialog.form)
    } else {
      await store.createSchedule(workspaceId, dialog.form)
    }
    await loadData()
    $q.notify({ type: 'positive', message: 'Guardado' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error' })
  }
}

const confirmDelete = (block) => {
  $q.dialog({
    title: 'Eliminar bloque',
    message: `${block.start_time} - ${block.end_time}`,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await store.deleteSchedule(workspaceId, block.id)
    await loadData()
    $q.notify({ type: 'positive', message: 'Eliminado' })
  })
}

const loadData = async () => {
  const ws = store.workspaces.find(w => w.id === workspaceId)
  if (ws) workspaceName.value = ws.name
  await store.fetchSchedules(workspaceId)
}

onMounted(() => {
  store.fetchWorkspaces()
  loadData()
})
</script>
