<template>
  <div class="project-card">
    <div class="project-card__header">
      <q-icon name="construction" size="18px" color="white" />
      <span class="project-card__label">{{ t('dashboard.new_project_card.label') }}</span>
    </div>

    <h2 class="project-card__title">{{ t('dashboard.new_project_card.title') }}</h2>

    <p class="project-card__description">
      {{ t('dashboard.new_project_card.description') }}
    </p>

    <q-btn
      unelevated
      no-caps
      class="project-card__btn"
      :label="t('dashboard.new_project_card.btn')"
      icon-right="arrow_forward"
      @click="$emit('startQuote')"
    />
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'

defineEmits(['startQuote'])

const { t } = useI18n()
</script>

<style scoped lang="scss">
.project-card {
  margin: 20px 20px 0;
  padding: 24px;
  background: linear-gradient(135deg, #1a2a3f 0%, #162438 100%);
  border-radius: 16px;

  &__header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
  }

  &__label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 2px;
    text-transform: uppercase;
    color: #9ca3af;
  }

  &__title {
    font-size: 26px;
    font-weight: 700;
    color: #ffffff;
    margin: 0 0 10px;
    line-height: 1.2;
  }

  &__description {
    font-size: 15px;
    line-height: 1.6;
    color: #9ca3af;
    margin: 0 0 24px;
  }

  &__btn {
    background-color: #ffffff;
    color: #162438;
    font-weight: 600;
    font-size: 15px;
    padding: 12px 24px;
    border-radius: 10px;
    text-transform: none;
    letter-spacing: 0;
  }
}
</style>
