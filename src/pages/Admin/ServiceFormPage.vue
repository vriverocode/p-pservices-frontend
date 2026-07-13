<template>
  <div class="service-form">
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ isEdit ? t('admin.services.edit_service') : t('admin.services.new_service') }}
        </div>
      </q-card-section>
      <q-separator />
      <q-card-section>
        <q-form @submit="save" class="q-gutter-md">
          <q-input v-model="form.name" :label="t('admin.services.name')" :rules="[v => !!v || 'Required']" />

          <q-input v-model="form.description" :label="t('admin.services.description')" type="textarea" autogrow />

          <div class="row q-col-gutter-md">
            <div class="col-6">
              <q-input v-model.number="form.sort_order" :label="t('admin.services.sort_order')" type="number" min="0" />
            </div>
            <div class="col-6">
              <q-select v-model="form.is_active" :options="statusOptions" option-label="label" option-value="value"
                emit-value map-options :label="t('admin.services.active')" />
            </div>
          </div>

          <q-toggle v-model="form.requires_quote" :label="t('admin.services.requires_quote')" />

          <q-input v-model="form.configurable_options" :label="t('admin.services.configurable_options')" type="textarea"
            autogrow :hint="optionsHint" />

          <div>
            <div class="text-caption q-mb-sm">{{ t('admin.services.thumbnail') }}</div>
            <q-file v-model="thumbnail" accept="image/*" max-file-size="2097152" @update:model-value="onFilePicked">
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
            <div v-if="previewUrl" class="q-mt-sm">
              <img :src="previewUrl" class="service-form__preview" />
            </div>
          </div>

          <div class="row justify-end q-gutter-sm">
            <q-btn flat :label="t('admin.services.cancel')" @click="$router.back()" />
            <q-btn color="primary" :label="t('admin.services.save')" type="submit" :loading="saving" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'
import { useServicesStore } from 'src/stores/services.store'

const store = useServicesStore()
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const $q = useQuasar()

const isEdit = computed(() => !!route.params.id)
const saving = ref(false)
const thumbnail = ref(null)
const previewUrl = ref(null)

const optionsHint = 'JSON: [{"key":"level","label":"Nivel","type":"select","options":["Claro","Oscuro"]}]'

const form = reactive({
  name: '',
  description: '',
  sort_order: 0,
  is_active: true,
  requires_quote: false,
  configurable_options: ''
})

const statusOptions = [
  { label: t('admin.services.active'), value: true },
  { label: t('admin.services.inactive'), value: false }
]

const onFilePicked = (file) => {
  if (file) {
    previewUrl.value = URL.createObjectURL(file)
  }
}

const save = async () => {
  saving.value = true
  try {
    const formData = new FormData()
    formData.append('name', form.name)
    formData.append('description', form.description || '')
    formData.append('sort_order', form.sort_order || 0)
    formData.append('is_active', form.is_active ? '1' : '0')
    formData.append('requires_quote', form.requires_quote ? '1' : '0')
    if (form.configurable_options) {
      formData.append('configurable_options', form.configurable_options)
    }
    if (thumbnail.value) {
      formData.append('thumbnail', thumbnail.value)
    }
    if (isEdit.value) {
      await store.updateService(route.params.id, formData)
    } else {
      await store.createService(formData)
    }
    $q.notify({ type: 'positive', message: t('admin.services.saved') })
    router.push('/admin/services')
  } catch {
    $q.notify({ type: 'negative', message: 'Error' })
  } finally {
    saving.value = false
  }
}

onMounted(async () => {
  if (isEdit.value) {
    const service = await store.fetchAdminService(route.params.id)
    if (service) {
      form.name = service.name
      form.description = service.description || ''
      form.sort_order = service.sort_order || 0
      form.is_active = service.is_active
      form.requires_quote = service.requires_quote
      form.configurable_options = service.configurable_options
        ? JSON.stringify(service.configurable_options)
        : ''
      if (service.thumbnail_url) {
        previewUrl.value = service.thumbnail_url
      }
    }
  }
})
</script>

<style scoped lang="scss">
.service-form {
  padding: 16px;
  max-width: 600px;
  margin: 0 auto;

  &__preview {
    width: 120px;
    height: 90px;
    object-fit: cover;
    border-radius: 8px;
  }
}
</style>
