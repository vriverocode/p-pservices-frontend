<template>
  <div class="welcome-header">
    <div class="welcome-header__text">
      <span class="welcome-header__subtitle">Bienvenido de nuevo</span>
      <h1 class="welcome-header__title">Hola, {{ userName }}</h1>
    </div>
    <div class="avatar__letter">
      {{ userName.charAt(0).toUpperCase() }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  userName: {
    type: String,
    default: 'Cliente'
  },
  avatar: {
    type: String,
    default: ''
  }
})
</script>

<style scoped lang="scss">
.avatar__letter {
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.432);
  color: $brand-blue-dark;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  font-weight: 700;
  box-shadow: 0px 0px 0px 1px rgba(17, 15, 15, 0.774);
}
.welcome-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 24px 20px 0;

  &__text {
    display: flex;
    flex-direction: column;
  }

  &__subtitle {
    font-size: 15px;
    font-weight: 400;
    color: #6b7280;
    margin-bottom: 4px;
  }

  &__title {
    font-size: 28px;
    font-weight: 700;
    color: #111827;
    line-height: 2;
    margin: 0;
    letter-spacing: -0.5px;
  }

  &__avatar {
    border: 2px solid #e5e7eb;
  }
}
</style>
