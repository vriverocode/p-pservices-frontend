<template>
  <div class="service-card">
    <div class="service-card__image-wrapper">
      <img
        v-if="service.image"
        :src="service.image"
        :alt="service.title"
        class="service-card__image"
      />
      <div v-else class="service-card__placeholder">
        <q-icon name="image" size="40px" color="primary" />
      </div>
      <span v-if="service.featured" class="service-card__badge">{{ t('dashboard.services.featured') }}</span>
    </div>

    <div class="service-card__content">
      <h3 class="service-card__title">{{ service.title }}</h3>
      <p class="service-card__description">{{ service.description }}</p>
      <div class="service-card__price-row">
        <span class="service-card__from">{{ t('dashboard.services.from') }}</span>
        <span class="service-card__price">${{ service.price }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineProps({
  service: {
    type: Object,
    required: true,
    validator: (v) => v.title && v.description && v.price !== undefined
  }
})

const { t } = useI18n()
</script>

<style scoped lang="scss">
.service-card {
  min-width: 260px;
  max-width: 260px;
  background: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.075);


  &__image-wrapper {
    position: relative;
    width: 100%;
    height: 180px;
    background: #d1d5db;
    overflow: hidden;
  }

  &__image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #c5cad3 0%, #b0b8c4 100%);
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(56, 22, 22, 0.85);
    backdrop-filter: blur(4px);
    color: #ffffff;
    font-size: 12px;
    font-weight: 500;
    padding: 5px 14px;
    border-radius: 20px;
  }

  &__content {
    padding: 16px 18px 18px;
  }

  &__title {
    font-size: 17px;
    font-weight: 700;
    color: #111827;
    margin: 0 0 6px;
    line-height: 1.3;
  }

  &__description {
    font-size: 13px;
    line-height: 1.5;
    color: #6b7280;
    margin: 0 0 14px;
  }

  &__price-row {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
  }

  &__from {
    font-size: 13px;
    color: #575757;
    font-weight: 500;
  }

  &__price {
    font-size: 20px;
    font-weight: 700;
    color: #111827;
  }
}
</style>
