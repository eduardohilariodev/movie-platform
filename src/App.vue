<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import CartDrawer from '@/components/features/cart/CartDrawer.vue'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import FavoritesDrawer from '@/components/features/favorites/FavoritesDrawer.vue'

const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <Toaster />
  <AppHeader />

  <main class="relative h-full bg-gradient-to-br from-black to-teal-900">
    <FavoritesDrawer />
    <CartDrawer />
    <RouterView />
  </main>
</template>
