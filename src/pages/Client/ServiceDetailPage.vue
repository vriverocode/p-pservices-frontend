<template>
  <div class="service-detail">
    <div class="service-detail__image">
      <img v-if="service?.thumbnail_url" :src="service.thumbnail_url" :alt="service?.name" />
      <div v-else class="service-detail__placeholder">
        <q-icon name="image" size="48px" color="grey-4" />
      </div>
      <q-btn
        flat
        dense
        icon="arrow_back"
        class="service-detail__back"
        color="white"
        @click="$router.back()"
      />
    </div>

    <div class="service-detail__body">
      <h1 class="service-detail__name">{{ service?.name }}</h1>
      <p class="service-detail__desc">{{ service?.description }}</p>

      <div class="service-detail__section">
        <h3 class="service-detail__section-title">{{ t('services_page.select_vehicle') }}</h3>
        <q-select
          v-model="selectedVehicle"
          :options="vehicles"
          option-label="label"
          option-value="id"
          emit-value
          map-options
          :placeholder="t('services_page.select_vehicle')"
          clearable
          @update:model-value="onVehicleChange"
        />
      </div>

      <div v-if="priceInfo" class="service-detail__price-card">
        <div class="service-detail__price-label">{{ t('services_page.price_for') }} {{ selectedVehicleLabel }}</div>
        <div class="service-detail__price-value">
          <template v-if="service?.requires_quote">
            {{ t('services_page.quote') }}
          </template>
          <template v-else>
            ${{ priceInfo.price }}
          </template>
        </div>
        <div class="service-detail__duration">
          {{ t('admin.services.duration') }}: {{ priceInfo.duration_minutes }} min
        </div>
        <q-btn
          unelevated
          no-caps
          class="service-detail__book-btn"
          :label="t('services_page.book')"
          icon-right="calendar_month"
          @click="bookService"
        />
      </div>

      <div v-else-if="selectedVehicle" class="service-detail__no-price">
        <q-icon name="info" size="20px" color="warning" />
        <span>{{ t('services_page.not_found') }}</span>
      </div>
    </div>

    <div class="tw:h-24" />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useServicesStore } from 'src/stores/services.store'
import { useVehiclesStore } from 'src/stores/vehicles.store'

const store = useServicesStore()
const vehiclesStore = useVehiclesStore()
const route = useRoute()
const { t } = useI18n()

const service = computed(() => store.currentService)
const selectedVehicle = ref(null)
const priceInfo = ref(null)

const vehicles = computed(() =>
  vehiclesStore.vehicles.map(v => ({
    id: v.id,
    label: `${v.plate || ''} ${v.make?.name || ''} ${v.model?.name || ''}`.trim(),
    categoryId: v.model?.category?.id || v.model?.category_id
  }))
)

const selectedVehicleLabel = computed(() => {
  const v = vehicles.value.find(v => v.id === selectedVehicle.value)
  return v?.label || ''
})

const onVehicleChange = async (val) => {
  if (!val) {
    priceInfo.value = null
    return
  }
  const vehicle = vehicles.value.find(v => v.id === val)
  if (!vehicle?.categoryId) {
    priceInfo.value = null
    return
  }
  const result = await store.fetchServicePrice(route.params.id, vehicle.categoryId)
  priceInfo.value = result
}

const bookService = () => {
  console.log('Book service:', service.value?.id, 'vehicle:', selectedVehicle.value)
}

onMounted(async () => {
  await store.fetchService(route.params.id)
  vehiclesStore.fetchVehicles()
})
</script>

<style scoped lang="scss">
.service-detail {
  background: #f9fafb;
  min-height: 100vh;

  &__image {
    position: relative;
    width: 100%;
    height: 240px;
    background: #d1d5db;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  }

  &__back {
    position: absolute;
    top: 12px;
    left: 12px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
  }

  &__body {
    padding: 20px;
  }

  &__name {
    font-size: 22px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 8px;
  }

  &__desc {
    font-size: 14px;
    line-height: 1.6;
    color: #6b7280;
    margin: 0 0 24px;
  }

  &__section {
    margin-bottom: 20px;

    &-title {
      font-size: 14px;
      font-weight: 600;
      color: #111827;
      margin: 0 0 10px;
    }
  }

  &__price-card {
    background: #ffffff;
    border-radius: 14px;
    padding: 20px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    text-align: center;
  }

  &__price-label {
    font-size: 13px;
    color: #6b7280;
    margin-bottom: 8px;
  }

  &__price-value {
    font-size: 32px;
    font-weight: 800;
    color: #111827;
    margin-bottom: 4px;
  }

  &__duration {
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 20px;
  }

  &__book-btn {
    width: 100%;
    background-color: #162438;
    color: #ffffff;
    font-weight: 600;
    font-size: 15px;
    padding: 12px;
    border-radius: 10px;
  }

  &__no-price {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 20px;
    color: #6b7280;
    font-size: 14px;
  }
}
</style>
