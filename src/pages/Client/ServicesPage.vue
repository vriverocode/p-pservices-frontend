<template>
  <div class="services-page">
    <div class="services-page__header">
      <div class="services-page__title">{{ t('services_page.title') }}</div>
      <p class="services-page__subtitle">{{ t('services_page.subtitle') }}</p>
    </div>

    <div v-if="store.loading" class="tw:flex tw:justify-center tw:py-12">
      <q-spinner color="primary" size="40px" />
    </div>

    <div v-else-if="store.services.length === 0" class="tw:text-center tw:py-12 tw:text-grey">
      {{ t('services_page.not_found') }}
    </div>

    <div v-else class="services-page__grid">
      <div
        v-for="service in store.services"
        :key="service.id"
        class="services-page__card"
        @click="goToDetail(service)"
      >
        <div class="services-page__card-image">
          <img v-if="service.thumbnail_url" :src="service.thumbnail_url" :alt="service.name" />
          <div v-else class="services-page__card-placeholder">
            <q-icon name="image" size="36px" color="grey-4" />
          </div>
        </div>
        <div class="services-page__card-body">
          <h3 class="services-page__card-title">{{ service.name }}</h3>
          <p class="services-page__card-desc">{{ service.description }}</p>
          <div class="services-page__card-footer">
            <span class="services-page__from">{{ t('services_page.from') }}</span>
            <span class="services-page__price">
              {{ service.requires_quote ? t('services_page.quote') : '$' + lowestPrice(service) }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="tw:h-20" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useServicesStore } from 'src/stores/services.store'

const store = useServicesStore()
const router = useRouter()
const { t } = useI18n()

const lowestPrice = (service) => {
  if (!service.pricing || service.pricing.length === 0) return '--'
  const prices = service.pricing.map(p => p.price).filter(p => p !== null)
  if (prices.length === 0) return '--'
  return Math.min(...prices)
}

const goToDetail = (service) => {
  router.push(`/services/${service.id}`)
}

onMounted(() => {
  store.fetchServices()
})
</script>

<style scoped lang="scss">
.services-page {
  padding: 20px;
  background: #f9fafb;
  min-height: 100vh;

  &__header {
    margin-bottom: 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 4px;
  }

  &__subtitle {
    font-size: 14px;
    color: #6b7280;
    margin: 0;
  }

  &__grid {
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  &__card {
    background: #ffffff;
    border-radius: 14px;
    overflow: hidden;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
    cursor: pointer;
    transition: transform 0.15s;

    &:active {
      transform: scale(0.98);
    }
  }

  &__card-image {
    width: 100%;
    height: 160px;
    background: #d1d5db;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__card-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  }

  &__card-body {
    padding: 14px 16px 16px;
  }

  &__card-title {
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 4px;
  }

  &__card-desc {
    font-size: 13px;
    line-height: 1.5;
    color: #6b7280;
    margin: 0 0 12px;
  }

  &__card-footer {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__from {
    font-size: 13px;
    color: #9ca3af;
  }

  &__price {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
  }
}
</style>
