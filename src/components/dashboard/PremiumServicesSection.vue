<template>
  <section class="premium-section tw:pl-5">
    <div class="premium-section__header tw:pl-3 tw:pr-5">
      <h2 class="premium-section__title">{{ t('dashboard.services.premium_title') }}</h2>
      <a class="premium-section__link" @click="$emit('viewAll')">
        {{ t('dashboard.services.view_all') }}
        <q-icon name="chevron_right" size="16px" />
      </a>
    </div>

    <div class="premium-section__scroll">
      <ServiceCard
        v-for="service in services"
        :key="service.id"
        :service="service"
      />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import ServiceCard from '@/components/dashboard/ServiceCard.vue'

defineProps({
  services: {
    type: Array,
    default: () => []
  }
})

defineEmits(['viewAll'])

const { t } = useI18n()
</script>

<style scoped lang="scss">
.premium-section {
  margin-top: 36px;


  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  &__title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #111827;
    margin: 0;
  }

  &__link {
    display: flex;
    align-items: center;
    gap: 2px;
    font-size: 14px;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: #111827;
    }
  }

  &__scroll {
    display: flex;
    gap: 14px;
    overflow-x: auto;
    margin: 0 0px;
    padding: 4px 0px 8px;
    scroll-snap-type: x mandatory;
    scrollbar-width: none;

    &::-webkit-scrollbar {
      display: none;
    }

    > * {
      scroll-snap-align: start;
    }
  }
}
</style>
