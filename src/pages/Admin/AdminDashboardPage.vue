<template>
  <div class="admin-dashboard">
    <q-card class="admin-dashboard__card">
      <q-card-section>
        <div class="text-h6">Panel de Administración</div>
        <div class="text-subtitle2 text-grey">Gestión del sistema</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p class="text-grey">Aquí aparecerán las estadísticas y accesos directos del admin.</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.admin-dashboard {
  padding: 16px;

  &__card {
    border-radius: 12px;
  }
}
</style>
