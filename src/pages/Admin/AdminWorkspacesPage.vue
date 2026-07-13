<template>
  <div class="tw:p-4">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">Talleres / Bahías</div>
        <q-space />
        <q-btn dense flat icon="add" color="primary" label="Nuevo" @click="openDialog()" />
      </q-card-section>
      <q-separator />
      <q-list bordered separator>
        <q-item v-for="ws in store.workspaces" :key="ws.id">
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ ws.name }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle :model-value="ws.is_active" @update:model-value="toggleActive(ws)" />
          </q-item-section>
          <q-item-section side class="tw:gap-1">
            <q-btn flat dense icon="schedule" color="primary" @click="goToSchedules(ws)">
              <q-tooltip>Horarios</q-tooltip>
            </q-btn>
            <q-btn flat dense icon="edit" @click="openDialog(ws)" />
            <q-btn flat dense icon="delete" color="negative" @click="confirmDelete(ws)" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-section v-if="store.workspaces.length === 0" class="text-center text-grey q-py-xl">
        No hay talleres configurados
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ dialog.isEdit ? 'Editar Taller' : 'Nuevo Taller' }}</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-input v-model="dialog.form.name" label="Nombre" :rules="[v => !!v || 'Requerido']" />
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
import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useWorkspacesStore } from 'src/stores/workspaces.store'

const store = useWorkspacesStore()
const router = useRouter()
const $q = useQuasar()

const dialog = reactive({
  show: false,
  isEdit: false,
  editingId: null,
  form: { name: '', is_active: true }
})

const statusOptions = [
  { label: 'Activo', value: true },
  { label: 'Inactivo', value: false }
]

const openDialog = (ws = null) => {
  dialog.isEdit = !!ws
  dialog.editingId = ws?.id || null
  dialog.form = { name: ws?.name || '', is_active: ws?.is_active ?? true }
  dialog.show = true
}

const save = async () => {
  try {
    if (dialog.isEdit) {
      await store.updateWorkspace(dialog.editingId, dialog.form)
    } else {
      await store.createWorkspace(dialog.form)
    }
    await store.fetchWorkspaces()
    $q.notify({ type: 'positive', message: 'Guardado' })
  } catch {
    $q.notify({ type: 'negative', message: 'Error' })
  }
}

const toggleActive = async (ws) => {
  try {
    await store.updateWorkspace(ws.id, { is_active: !ws.is_active })
    await store.fetchWorkspaces()
  } catch {
    $q.notify({ type: 'negative', message: 'Error' })
  }
}

const confirmDelete = (ws) => {
  $q.dialog({
    title: 'Eliminar taller',
    message: ws.name,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await store.deleteWorkspace(ws.id)
    await store.fetchWorkspaces()
    $q.notify({ type: 'positive', message: 'Eliminado' })
  })
}

const goToSchedules = (ws) => {
  router.push(`/admin/workspaces/${ws.id}/schedules`)
}

onMounted(() => {
  store.fetchWorkspaces()
})
</script>
