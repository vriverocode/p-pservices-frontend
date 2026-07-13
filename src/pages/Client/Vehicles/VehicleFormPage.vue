<template>
  <div class="vehicle-form q-pa-md">
    <div class="text-h6 q-mb-md">{{ isEdit ? 'Editar Vehículo' : 'Registrar Vehículo' }}</div>

    <q-stepper v-model="step" ref="stepper" color="primary" animated flat>
      <q-step :name="1" title="Tipo" icon="category" :done="step > 1">
        <q-select v-model="form.vehicle_type_id" :options="store.vehicleTypes"
          option-label="name" option-value="id" label="Tipo de vehículo" emit-value map-options
          class="q-mb-md" @update:model-value="onTypeChange" />
      </q-step>

      <q-step :name="2" title="Marca" icon="directions_car" :done="step > 2">
        <q-select v-model="form.vehicle_make_id" :options="store.vehicleMakes"
          option-label="name" option-value="id" label="Marca" emit-value map-options
          class="q-mb-md" @update:model-value="onMakeChange" />
      </q-step>

      <q-step :name="3" title="Modelo" icon="model_training" :done="step > 3">
        <q-select v-model="form.vehicle_model_id" :options="filteredModels"
          option-label="name" option-value="id" label="Modelo" emit-value map-options
          class="q-mb-md" />
      </q-step>

      <q-step :name="4" title="Detalles" icon="edit_note" :done="step > 4">
        <q-input v-model="form.year" label="Año" type="number" class="q-mb-md" />
        <q-input v-model="form.plate" label="Placa" class="q-mb-md" />
        <q-input v-model="form.color" label="Color" class="q-mb-md" />
        <q-input v-model="form.alias" label="Alias (opcional)" hint="Ej: Mi auto favorito" class="q-mb-md" />
        <q-checkbox v-model="form.is_primary" label="Marcar como principal" />
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation>
          <q-btn v-if="step > 1" flat color="primary" label="Atrás" @click="stepper.prev()" class="q-mr-sm" />
          <q-btn v-if="step < 4" color="primary" label="Siguiente" @click="stepper.next()" />
          <q-btn v-if="step === 4" color="primary" label="Guardar" @click="saveVehicle" :loading="saving" />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useVehiclesStore } from 'src/stores/vehicles.store'
import { useQuasar } from 'quasar'

const router = useRouter()
const route = useRoute()
const store = useVehiclesStore()
const $q = useQuasar()

const step = ref(1)
const stepper = ref(null)
const saving = ref(false)
const isEdit = computed(() => !!route.params.id)

const form = reactive({
  vehicle_type_id: null,
  vehicle_make_id: null,
  vehicle_model_id: null,
  year: new Date().getFullYear(),
  plate: '',
  color: '',
  alias: '',
  is_primary: false,
})

const filteredModels = computed(() => {
  let models = store.vehicleModels
  if (form.vehicle_make_id) {
    models = models.filter(m => m.vehicle_make_id === form.vehicle_make_id)
  }
  if (form.vehicle_type_id) {
    models = models.filter(m => m.vehicle_type_id === form.vehicle_type_id)
  }
  return models
})

const onTypeChange = () => {
  form.vehicle_type_id = Number(form.vehicle_type_id)
  form.vehicle_make_id = null
  form.vehicle_model_id = null
  store.fetchVehicleModels({ type_id: form.vehicle_type_id })
}

const onMakeChange = () => {
  form.vehicle_model_id = null
  store.fetchVehicleModels({ make_id: form.vehicle_make_id, type_id: form.vehicle_type_id })
}

const saveVehicle = async () => {
  saving.value = true
  try {
    if (isEdit.value) {
      await store.updateVehicle(route.params.id, form)
      $q.notify({ type: 'positive', message: 'Vehículo actualizado' })
    } else {
      await store.createVehicle(form)
      $q.notify({ type: 'positive', message: 'Vehículo registrado' })
    }
    router.push('/vehicles')
  } catch (e) {
    console.log(e)
    $q.notify({ type: 'negative', message: 'Error al guardar vehículo' })
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  store.fetchVehicleTypes()
  store.fetchVehicleMakes()
  store.fetchVehicleModels()
})
</script>
