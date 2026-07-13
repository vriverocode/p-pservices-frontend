<template>
  <div class="my-vehicles">
    <div class="row items-center q-pa-md">
      <div class="text-h6">Mis Vehículos</div>
      <q-space />
      <q-btn dense flat icon="add" color="primary" label="Agregar" :to="'/vehicles/new'" />
    </div>

    <q-list bordered separator class="q-mx-md q-mb-md">
      <q-item v-for="vehicle in store.vehicles" :key="vehicle.id" clickable :to="`/vehicles/${vehicle.id}/edit`">
        <q-item-section avatar>
          <q-icon :name="vehicle.model?.type?.icon || 'directions_car'" size="32px" color="primary" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ vehicle.model?.make?.name }} {{ vehicle.model?.name }}
            <q-badge v-if="vehicle.is_primary" color="primary" class="q-ml-sm">Principal</q-badge>
          </q-item-label>
          <q-item-label caption>
            {{ vehicle.year }} · {{ vehicle.color }} · {{ vehicle.plate }}
          </q-item-label>
          <q-item-label v-if="vehicle.alias" caption>
            "{{ vehicle.alias }}"
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-btn flat dense icon="star" :color="vehicle.is_primary ? 'primary' : 'grey'"
            @click.prevent="setPrimary(vehicle)" />
        </q-item-section>
      </q-item>
    </q-list>

    <div v-if="!store.vehicles.length && !store.loading" class="text-center q-pa-xl text-grey">
      <q-icon name="directions_car" size="48px" />
      <p>Aún no has registrado vehículos</p>
      <q-btn color="primary" label="Registrar vehículo" :to="'/vehicles/new'" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useVehiclesStore } from 'src/stores/vehicles.store'
import { useQuasar } from 'quasar'

const store = useVehiclesStore()
const $q = useQuasar()

const setPrimary = async (vehicle) => {
  try {
    await store.setPrimaryVehicle(vehicle.id)
    await store.fetchVehicles()
    $q.notify({ type: 'positive', message: 'Vehículo principal actualizado' })
  } catch (e) {
    console.log(e)
    $q.notify({ type: 'negative', message: 'Error al actualizar' })
  }
}

onMounted(() => {
  store.fetchVehicles()
})
</script>
