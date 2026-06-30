<template>
  <div class="history-item">
    <div class="history-item__icon-circle">
      <q-icon :name="item.icon" size="20px" color="grey-6" />
    </div>

    <div class="history-item__info">
      <p class="history-item__title">{{ item.title }}</p>
      <p class="history-item__date">{{ item.date }}</p>
    </div>

    <span :class="['history-item__badge', statusClass]">
      {{ item.status }}
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  item: {
    type: Object,
    required: true,
    validator: (v) => v.title && v.date && v.status
  }
})

const statusClass = computed(() => {
  const status = props.item.status?.toUpperCase()
  if (status === 'COMPLETADO') return 'history-item__badge--completado'
  if (status === 'PENDIENTE') return 'history-item__badge--pendiente'
  return 'history-item__badge--default'
})
</script>

<style scoped lang="scss">
.history-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px 18px;

  &__icon-circle {
    width: 44px;
    height: 44px;
    min-width: 44px;
    background: #f3f4f6;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title {
    font-size: 15px;
    font-weight: 600;
    color: #111827;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__date {
    font-size: 13px;
    color: #9ca3af;
    margin: 3px 0 0;
  }

  &__badge {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 6px;
    letter-spacing: 0.3px;

    &--completado {
      background: #dcfce7;
      color: #16a34a;
    }

    &--pendiente {
      background: #fef3c7;
      color: #d97706;
    }

    &--default {
      background: #f3f4f6;
      color: #6b7280;
    }
  }
}
</style>
