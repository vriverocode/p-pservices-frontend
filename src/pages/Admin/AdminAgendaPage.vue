<template>
  <div class="admin-agenda">
    <q-card class="admin-agenda__card">
      <q-card-section>
        <div class="text-h6">Agenda</div>
        <div class="text-subtitle2 text-grey">Citas y reservas del día</div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <p class="text-grey">Aquí aparecerá la agenda de citas del admin.</p>
      </q-card-section>
    </q-card>
  </div>
</template>

<style scoped lang="scss">
.admin-agenda {
  padding: 16px;

  &__card {
    border-radius: 12px;
  }
}
</style>
