<template>
  <div class="admin-services">
    <q-card>
      <q-card-section class="row items-center">
        <div class="text-h6">{{ t('admin.services.title') }}</div>
        <q-space />
        <q-btn dense flat icon="add" color="primary" :label="t('admin.services.new_service')" @click="goToNew" />
      </q-card-section>
      <q-separator />
      <q-list bordered separator>
        <q-item v-for="service in store.services" :key="service.id">
          <q-item-section avatar>
            <q-avatar v-if="service.thumbnail_url" size="48px">
              <img :src="service.thumbnail_url" :alt="service.name" />
            </q-avatar>
            <q-avatar v-else size="48px" color="grey-3" text-color="grey-6" icon="build" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ service.name }}</q-item-label>
            <q-item-label caption lines="2">{{ service.description }}</q-item-label>
            <q-item-label caption class="text-grey">
              {{ t('admin.services.sort_order') }}: {{ service.sort_order }}
              <template v-if="service.requires_quote"> · {{ t('admin.services.requires_quote') }}</template>
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle :model-value="service.is_active" @update:model-value="toggleActive(service)" />
          </q-item-section>
          <q-item-section side class="tw:gap-1">
            <q-btn flat dense icon="attach_money" color="orange" @click="goToPricing(service)">
              <q-tooltip>{{ t('admin.services.pricing') }}</q-tooltip>
            </q-btn>
            <q-btn flat dense icon="edit" @click="goToEdit(service)" />
            <q-btn flat dense icon="delete" color="negative" @click="confirmDelete(service)" />
          </q-item-section>
        </q-item>
      </q-list>
      <q-card-section v-if="store.services.length === 0" class="text-center text-grey q-py-xl">
        {{ t('admin.services.no_pricing') }}
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useServicesStore } from 'src/stores/services.store'

const store = useServicesStore()
const router = useRouter()
const { t } = useI18n()
const $q = useQuasar()

const goToNew = () => router.push('/admin/services/new')
const goToEdit = (service) => router.push(`/admin/services/${service.id}/edit`)
const goToPricing = (service) => router.push(`/admin/services/${service.id}/pricing`)

const toggleActive = async (service) => {
  try {
    const formData = new FormData()
    formData.append('is_active', service.is_active ? '0' : '1')
    await store.updateService(service.id, formData)
    await store.fetchAdminServices()
    $q.notify({ type: 'positive', message: t('admin.services.saved') })
  } catch {
    $q.notify({ type: 'negative', message: 'Error' })
  }
}

const confirmDelete = (service) => {
  $q.dialog({
    title: t('admin.services.delete_confirm'),
    message: service.name,
    cancel: true,
    persistent: true
  }).onOk(async () => {
    await store.deleteService(service.id)
    await store.fetchAdminServices()
    $q.notify({ type: 'positive', message: t('admin.services.deleted') })
  })
}

onMounted(() => {
  store.fetchAdminServices()
})
</script>

<style scoped lang="scss">
.admin-services {
  padding: 16px;
}
</style>
