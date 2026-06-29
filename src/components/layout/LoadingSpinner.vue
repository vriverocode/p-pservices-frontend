<template>
  <div class="loading-overlay">
    <div class="loading-spinner">
      <img :src="logo" alt="P&P Services" class="loading-spinner__logo" />
      <div class="loading-spinner__ring"></div>
    </div>
  </div>
</template>

<script setup>
import logo from '@/assets/images/logo/logo.webp'
</script>

<style scoped lang="scss">
.loading-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
}

.loading-spinner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 150px;

  &__logo {
    width: 100px;
    height: 100px;
    object-fit: contain;
    animation: bounce 5s ease-in-out infinite;
    filter: drop-shadow(0px 8px 5px rgba(0, 0, 0, 0.226));
  }

  &__ring {
    position: absolute;
    inset: 0;
    border: 3px solid transparent;
    border-top-color: #162438;
    border-right-color: #162438;
    border-radius: 50%;
    animation: spin 2s linear infinite;
    opacity: 0;
  }
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(10px) scale(1);
  }
  30% {
    transform: translateY(-8px) scale(1.05);
  }
  50% {
    transform: translateY(10px) scale(0.95);
  }
  70% {
    transform: translateY(-8px) scale(1.02);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
