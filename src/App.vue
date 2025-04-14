<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import CartDrawer from '@/components/features/cart/CartDrawer.vue'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import FavoritesDrawer from '@/components/features/favorites/FavoritesDrawer.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-gradient-to-br from-black to-teal-900">
    <Toaster />
    <AppHeader />

    <main class="flex-1">
      <FavoritesDrawer />
      <CartDrawer />
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>
