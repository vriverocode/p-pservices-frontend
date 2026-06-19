<template>
    <q-header elevated>
        <q-toolbar>
          <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleDrawer" />
          <q-toolbar-title> Quasar App </q-toolbar-title>
          <div>Quasar v{{ $q.version }}</div>
        </q-toolbar>
      </q-header>
</template>
<script setup>
import { ref } from 'vue'
const emit = defineEmits(['toggleLeft'])
const leftDrawerOpen = ref(false)

const toggleDrawer = () => {
    leftDrawerOpen.value = !leftDrawerOpen.value
    emit('toggleLeft', leftDrawerOpen.value)
}


</script>