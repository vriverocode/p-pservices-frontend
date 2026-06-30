<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="layout-wrapper">
        <router-view />
      </div>
    </q-page-container>
    <BottomNavBar />
  </q-layout>
</template>

<script setup>
import BottomNavBar from 'src/components/dashboard/BottomNavBar.vue'
</script>

<style lang="scss">
.layout-wrapper {
  max-width: 100%;
  margin: 0 auto;

  @media (min-width: 768px) {
    max-width: 480px;
    min-height: 100vh;
    box-shadow: 0 0 40px rgba(0, 0, 0, 0.08);
    background: #f9fafb;
  }
}
</style>
