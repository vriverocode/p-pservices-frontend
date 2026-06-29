<template>
  <nav class="bottom-nav">
    <div class="bottom-nav__tabs">
      <button
        v-for="tab in tabs"
        :key="tab.name"
        :class="['bottom-nav__tab', { 'bottom-nav__tab--active': activeTab === tab.name }]"
        @click="navigateTo(tab.name)"
      >
        <q-icon :name="tab.icon" size="24px" />
        <span class="bottom-nav__label">{{ tab.label }}</span>
      </button>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const emit = defineEmits(['navigate'])

const router = useRouter()
const { t } = useI18n()
const activeTab = ref('inicio')

const tabs = computed(() => [
  { name: 'inicio', icon: 'home', label: t('dashboard.nav.home') },
  { name: 'cotizar', icon: 'grid_view', label: t('dashboard.nav.quote') },
  { name: 'perfil', icon: 'person', label: t('dashboard.nav.profile') }
])

const routes = {
  inicio: '/dashboard',
  cotizar: '/cotizar',
  perfil: '/profile'
}

const navigateTo = (name) => {
  activeTab.value = name
  emit('navigate', name)
  if (routes[name]) {
    router.push(routes[name])
  }
}
</script>

<style scoped lang="scss">
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  border-top: 1px solid #f0f0f0;
  z-index: 100;
  padding-bottom: env(safe-area-inset-bottom, 0);

  @media (min-width: 768px) {
    left: 50%;
    right: auto;
    transform: translateX(-50%);
    max-width: 480px;
    width: 100%;
    box-shadow: 0 -2px 12px rgba(0, 0, 0, 0.06);
  }

  &__tabs {
    display: flex;
    align-items: center;
    justify-content: space-around;
    height: 62px;
  }

  &__tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    flex: 1;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px 0;
    color: #9ca3af;
    transition: color 0.2s;

    &--active {
      color: #111827;
    }
  }

  &__label {
    font-size: 11px;
    font-weight: 500;
    margin: 0;
  }
}
</style>
