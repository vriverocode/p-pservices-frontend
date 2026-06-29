<template>
  <section class="history-section">
    <h2 class="history-section__title">{{ t('dashboard.history.title') }}</h2>

    <div v-if="items.length > 0" class="history-section__card">
      <template v-for="(item, index) in items" :key="item.id">
        <HistoryItem :item="item" />
        <q-separator
          v-if="index < items.length - 1"
          spaced="0"
          class="history-section__separator"
        />
      </template>
    </div>

    <div v-else class="history-section__empty">
      <div class="history-section__empty-icon">
        <q-icon name="receipt_long" size="45px" color="primary" />
      </div>
      <h3 class="history-section__empty-title">{{ t('dashboard.history.empty_title') }}</h3>
      <p class="history-section__empty-description">{{ t('dashboard.history.empty_description') }}</p>
      <q-btn
        unelevated
        no-caps
        class="history-section__empty-btn"
        :label="t('dashboard.history.empty_btn')"
        icon-right="arrow_forward"
        @click="goToQuote"
      />
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import HistoryItem from '@/components/dashboard/HistoryItem.vue'

defineProps({
  items: {
    type: Array,
    default: () => []
  }
})

const { t } = useI18n()
const router = useRouter()

const goToQuote = () => {
  router.push('/cotizar')
}
</script>

<style scoped lang="scss">
.history-section {
  margin-top: 36px;
  padding: 0 20px;

  &__title {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #111827;
    margin: 0 0 16px;
  }

  &__card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 1px 6px rgba(0, 0, 0, 0.06);
    overflow: hidden;
  }

  &__separator {
    margin: 0 18px;
    border-color: #f3f4f6;
  }

  &__empty {
    border-radius: 16px;
    padding-bottom: 24px;
    text-align: center;
    
  }

  &__empty-icon {
    width: 80px;
    height: 80px;
    margin: 0 auto 8px;
   background: linear-gradient(135deg, #c5cad3 0%, #b0b8c4 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__empty-title {
    font-size: 17px;
    font-weight: 600;
    color: #111827;
    margin: 0 0 0px;
  }

  &__empty-description {
    font-size: 14px;
    line-height: 1.5;
    color: #6b7280;
    margin: 0 0 24px;
    max-width: 280px;
    margin-left: auto;
    margin-right: auto;
  }

  &__empty-btn {
    background-color: #162438;
    color: #ffffff;
    font-weight: 600;
    font-size: 14px;
    padding: 10px 24px;
    border-radius: 10px;
    text-transform: none;
    letter-spacing: 0;
  }
}
</style>
