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
  <div class="flex min-h-screen flex-col pt-2 sm:pt-22 lg:pt-24">
    <div class="magicpattern fixed inset-0 z-[-1]"></div>
    <Toaster />
    <AppHeader />

    <main class="flex-1 px-4 sm:px-6 lg:px-8">
      <FavoritesDrawer />
      <CartDrawer />
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template>
