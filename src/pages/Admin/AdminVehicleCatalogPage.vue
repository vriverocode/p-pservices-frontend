<template>
  <div class="admin-catalog">
    <q-card>
      <q-tabs v-model="activeTab" class="text-grey" active-color="primary" indicator-color="primary"
        align="justify" narrow-indicator>
        <q-tab name="types" label="Tipos" icon="category" />
        <q-tab name="makes" label="Marcas" icon="directions_car" />
        <q-tab name="models" label="Modelos" icon="model_training" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="activeTab" animated>
        <q-tab-panel name="types">
          <div class="row items-center q-mb-md">
            <div class="text-h6">Tipos de Vehículo</div>
            <q-space />
            <q-btn dense flat icon="add" color="primary" label="Agregar" @click="openTypeDialog()" />
          </div>
          <q-list bordered separator>
            <q-item v-for="type in store.vehicleTypes" :key="type.id">
              <q-item-section>
                <q-item-label>{{ type.name }}</q-item-label>
                <q-item-label caption>{{ type.slug }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle :model-value="type.is_active" @update:model-value="toggleTypeActive(type)" />
              </q-item-section>
              <q-item-section side>
                <q-btn flat dense icon="edit" @click="openTypeDialog(type)" />
                <q-btn flat dense icon="delete" color="negative" @click="deleteType(type)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="makes">
          <div class="row items-center q-mb-md">
            <div class="text-h6">Marcas</div>
            <q-space />
            <q-btn dense flat icon="add" color="primary" label="Agregar" @click="openMakeDialog()" />
          </div>
          <q-list bordered separator>
            <q-item v-for="make in store.vehicleMakes" :key="make.id">
              <q-item-section>
                <q-item-label>{{ make.name }}</q-item-label>
                <q-item-label caption>{{ make.slug }}</q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle :model-value="make.is_active" @update:model-value="toggleMakeActive(make)" />
              </q-item-section>
              <q-item-section side>
                <q-btn flat dense icon="edit" @click="openMakeDialog(make)" />
                <q-btn flat dense icon="delete" color="negative" @click="deleteMake(make)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>

        <q-tab-panel name="models">
          <div class="row items-center q-mb-md">
            <div class="text-h6">Modelos</div>
            <q-space />
            <q-btn dense flat icon="add" color="primary" label="Agregar" @click="openModelDialog()" />
          </div>

          <div class="row q-col-gutter-sm q-mb-md">
            <div class="col-6">
              <q-select v-model="filterType" :options="store.vehicleTypes" option-label="name" option-value="id"
                label="Filtrar por tipo" clearable @update:model-value="onFilterChange" />
            </div>
            <div class="col-6">
              <q-select v-model="filterMake" :options="filteredMakes" option-label="name" option-value="id"
                label="Filtrar por marca" clearable @update:model-value="onFilterChange" />
            </div>
          </div>

          <q-list bordered separator>
            <q-item v-for="model in store.vehicleModels" :key="model.id">
              <q-item-section>
                <q-item-label>{{ model.name }}</q-item-label>
                <q-item-label caption>
                  {{ model.make?.name }} · {{ model.type?.name }} · {{ model.category?.name }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-toggle :model-value="model.is_active" @update:model-value="toggleModelActive(model)" />
              </q-item-section>
              <q-item-section side>
                <q-btn flat dense icon="edit" @click="openModelDialog(model)" />
                <q-btn flat dense icon="delete" color="negative" @click="deleteModel(model)" />
              </q-item-section>
            </q-item>
          </q-list>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-dialog v-model="typeDialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ typeDialog.isEdit ? 'Editar Tipo' : 'Nuevo Tipo' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="typeDialog.form.name" label="Nombre" class="q-mb-sm" />
          <q-input v-model="typeDialog.form.slug" label="Slug" hint="Identificador único" class="q-mb-sm" />
          <q-input v-model="typeDialog.form.icon" label="Icono" hint="Nombre del icono (opcional)" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="saveType" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="makeDialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ makeDialog.isEdit ? 'Editar Marca' : 'Nueva Marca' }}</div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="makeDialog.form.name" label="Nombre" class="q-mb-sm" />
          <q-input v-model="makeDialog.form.slug" label="Slug" hint="Identificador único" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="saveMake" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="modelDialog.show" persistent maximized>
      <q-card>
        <q-card-section>
          <div class="text-h6">{{ modelDialog.isEdit ? 'Editar Modelo' : 'Nuevo Modelo' }}</div>
        </q-card-section>
        <q-card-section>
          <q-select v-model="modelDialog.form.vehicle_type_id" :options="store.vehicleTypes"
            option-label="name" option-value="id" label="Tipo" emit-value map-options class="q-mb-sm" />
          <q-select v-model="modelDialog.form.vehicle_make_id" :options="filteredMakesForModel"
            option-label="name" option-value="id" label="Marca" emit-value map-options class="q-mb-sm" />
          <q-select v-model="modelDialog.form.vehicle_category_id" :options="categories"
            option-label="name" option-value="id" label="Categoría" emit-value map-options class="q-mb-sm" />
          <q-input v-model="modelDialog.form.name" label="Nombre" class="q-mb-sm" />
          <q-input v-model="modelDialog.form.slug" label="Slug" hint="Identificador único" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancelar" v-close-popup />
          <q-btn color="primary" label="Guardar" @click="saveModel" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useVehiclesStore } from 'src/stores/vehicles.store'
import { useQuasar } from 'quasar'

const store = useVehiclesStore()
const $q = useQuasar()
const activeTab = ref('types')
const categories = ref([])

const filterType = ref(null)
const filterMake = ref(null)

const typeDialog = reactive({ show: false, isEdit: false, form: { name: '', slug: '', icon: '' }, editingId: null })
const makeDialog = reactive({ show: false, isEdit: false, form: { name: '', slug: '' }, editingId: null })
const modelDialog = reactive({
  show: false, isEdit: false,
  form: { name: '', slug: '', vehicle_make_id: null, vehicle_type_id: null, vehicle_category_id: null },
  editingId: null
})

const filteredMakes = computed(() => {
  if (!filterType.value) return store.vehicleMakes
  return store.vehicleMakes
})

const filteredMakesForModel = computed(() => {
  if (!modelDialog.form.vehicle_type_id) return store.vehicleMakes
  return store.vehicleMakes
})

const onFilterChange = () => {
  store.fetchVehicleModels({
    make_id: filterMake.value?.id,
    type_id: filterType.value?.id,
  })
}

const openTypeDialog = (type = null) => {
  typeDialog.isEdit = !!type
  typeDialog.editingId = type?.id || null
  typeDialog.form = { name: type?.name || '', slug: type?.slug || '', icon: type?.icon || '' }
  typeDialog.show = true
}

const saveType = async () => {
  try {
    if (typeDialog.isEdit) {
      await store.updateVehicleType(typeDialog.editingId, typeDialog.form)
    } else {
      await store.createVehicleType(typeDialog.form)
    }
    await store.fetchVehicleTypes()
    $q.notify({ type: 'positive', message: 'Tipo guardado' })
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Error al guardar tipo' })
  }
}

const toggleTypeActive = async (type) => {
  await store.updateVehicleType(type.id, { is_active: !type.is_active })
  await store.fetchVehicleTypes()
}

const deleteType = async (type) => {
  $q.dialog({ title: 'Eliminar', message: `¿Eliminar tipo "${type.name}"?`, cancel: true, persistent: true })
    .onOk(async () => {
      await store.deleteVehicleType(type.id)
      await store.fetchVehicleTypes()
      $q.notify({ type: 'positive', message: 'Tipo eliminado' })
    })
}

const openMakeDialog = (make = null) => {
  makeDialog.isEdit = !!make
  makeDialog.editingId = make?.id || null
  makeDialog.form = { name: make?.name || '', slug: make?.slug || '' }
  makeDialog.show = true
}

const saveMake = async () => {
  try {
    if (makeDialog.isEdit) {
      await store.updateVehicleMake(makeDialog.editingId, makeDialog.form)
    } else {
      await store.createVehicleMake(makeDialog.form)
    }
    await store.fetchVehicleMakes()
    $q.notify({ type: 'positive', message: 'Marca guardada' })
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Error al guardar marca' })
  }
}

const toggleMakeActive = async (make) => {
  await store.updateVehicleMake(make.id, { is_active: !make.is_active })
  await store.fetchVehicleMakes()
}

const deleteMake = async (make) => {
  $q.dialog({ title: 'Eliminar', message: `¿Eliminar marca "${make.name}"?`, cancel: true, persistent: true })
    .onOk(async () => {
      await store.deleteVehicleMake(make.id)
      await store.fetchVehicleMakes()
      $q.notify({ type: 'positive', message: 'Marca eliminada' })
    })
}

const openModelDialog = (model = null) => {
  modelDialog.isEdit = !!model
  modelDialog.editingId = model?.id || null
  modelDialog.form = {
    name: model?.name || '',
    slug: model?.slug || '',
    vehicle_make_id: model?.vehicle_make_id || null,
    vehicle_type_id: model?.vehicle_type_id || null,
    vehicle_category_id: model?.vehicle_category_id || null,
  }
  modelDialog.show = true
}

const saveModel = async () => {
  try {
    if (modelDialog.isEdit) {
      await store.updateVehicleModel(modelDialog.editingId, modelDialog.form)
    } else {
      await store.createVehicleModel(modelDialog.form)
    }
    await store.fetchVehicleModels()
    $q.notify({ type: 'positive', message: 'Modelo guardado' })
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Error al guardar modelo' })
  }
}

const toggleModelActive = async (model) => {
  await store.updateVehicleModel(model.id, { is_active: !model.is_active })
  await store.fetchVehicleModels()
}

const deleteModel = async (model) => {
  $q.dialog({ title: 'Eliminar', message: `¿Eliminar modelo "${model.name}"?`, cancel: true, persistent: true })
    .onOk(async () => {
      await store.deleteVehicleModel(model.id)
      await store.fetchVehicleModels()
      $q.notify({ type: 'positive', message: 'Modelo eliminado' })
    })
}

onMounted(() => {
  store.fetchVehicleTypes()
  store.fetchVehicleMakes()
  store.fetchVehicleModels()
})
</script>
