<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import CartDrawer from '@/components/CartDrawer.vue'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <Toaster />
  <AppHeader />

  <main class="relative h-full">
    <CartDrawer />
    <RouterView />
  </main>
</template>
