<template>
  <q-btn flat dense icon="arrow_back" :color="color" @click="goBack" />
</template>

<script setup>
import { useRouter } from 'vue-router'

defineProps({
  color: {
    type: String,
    default: undefined
  }
})

const router = useRouter()
const goBack = () => router.go(-1)
</script>
