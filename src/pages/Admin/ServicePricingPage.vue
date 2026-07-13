<template>
  <div class="service-pricing">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">{{ t('admin.services.pricing_title') }}: {{ serviceName }}</div>
        <q-space />
        <q-btn dense flat icon="add" color="primary" :label="t('admin.services.add_pricing')" @click="openDialog()" />
      </q-card-section>
      <q-separator />
      <q-list bordered separator>
        <q-item v-for="pricing in pricings" :key="pricing.id">
          <q-item-section>
            <q-item-label>{{ pricing.vehicle_category?.name }}</q-item-label>
            <q-item-label caption>
              {{ t('admin.services.price') }}: ${{ pricing.price }} · {{ t('admin.services.duration') }}: {{ pricing.duration_minutes }}min
            </q-item-label>
          </q-item-section>
          <q-item-section side class="tw:gap-1">
            <q-btn flat dense icon="edit" @click="openDialog(pricing)" />
            <q-btn flat dense icon="delete" color="negative" @click="confirmDelete(pricing)" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-section v-if="pricings.length === 0" class="text-center text-grey q-py-xl">
        {{ t('admin.services.no_pricing') }}
      </q-card-section>
    </q-card>

    <q-dialog v-model="dialog.show" persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">{{ dialog.isEdit ? t('admin.services.edit_service') : t('admin.services.add_pricing') }}</div>
        </q-card-section>
        <q-card-section class="q-gutter-md">
          <q-select v-model="dialog.form.vehicle_category_id" :options="categories" option-label="name"
            option-value="id" emit-value map-options :label="t('admin.services.vehicle_category')" />
          <q-input v-model.number="dialog.form.price" :label="t('admin.services.price')" type="number" prefix="$" min="0" />
          <q-input v-model.number="dialog.form.duration_minutes" :label="t('admin.services.duration')" type="number"
            suffix="min" min="1" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat :label="t('admin.services.cancel')" v-close-popup />
          <q-btn color="primary" :label="t('admin.services.save')" @click="savePricing" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useServicesStore } from 'src/stores/services.store'
import { useVehiclesStore } from 'src/stores/vehicles.store'

const store = useServicesStore()
const vehiclesStore = useVehiclesStore()
const route = useRoute()
const { t } = useI18n()
const $q = useQuasar()

const serviceId = route.params.id
const serviceName = ref('')
const pricings = ref([])
const categories = ref([])

const dialog = reactive({
  show: false,
  isEdit: false,
  editingId: null,
  form: { vehicle_category_id: null, price: null, duration_minutes: 60 }
})

const loadData = async () => {
  const service = await store.fetchAdminService(serviceId)
  if (service) serviceName.value = service.name

  const pricingData = await store.fetchServicePricing(serviceId)
  pricings.value = pricingData || []

  try {
    const res = await vehiclesStore.fetchVehicleCategories()
    categories.value = res || []
  } catch {
    categories.value = []
  }
}

const openDialog = (pricing = null) => {
  dialog.isEdit = !!pricing
  dialog.editingId = pricing?.id || null
  dialog.form = {
    vehicle_category_id: pricing?.vehicle_category?.id || null,
    price: pricing?.price || null,
    duration_minutes: pricing?.duration_minutes || 60
  }
  dialog.show = true
}

const savePricing = async () => {
  try {
    if (dialog.isEdit) {
      await store.updatePricing(serviceId, dialog.editingId, dialog.form)
    } else {
      await store.createPricing(serviceId, dialog.form)
    }
    await loadData()
    $q.notify({ type: 'positive', message: t('admin.services.saved') })
  } catch {
    $q.notify({ type: 'negative', message: 'Error' })
  }
}

const confirmDelete = (pricing) => {
  $q.dialog({
    title: t('admin.services.delete_confirm'),
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await store.deletePricing(serviceId, pricing.id)
    await loadData()
    $q.notify({ type: 'positive', message: t('admin.services.deleted') })
  })
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="scss">
.service-pricing {
  padding: 16px;
}
</style>
