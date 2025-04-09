<script setup lang="ts">
import AppHeader from '@/components/layout/AppHeader.vue'
import CartDrawer from '@/components/CartDrawer.vue'
import { RouterView } from 'vue-router'
import { Toaster } from 'vue-sonner'
</script>

<template>
  <Toaster />
  <AppHeader />

  <main class="relative h-full">
    <CartDrawer />
    <RouterView />
  </main>
</template>
