<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useDrawerStore } from '@/stores/drawer'

const cartStore = useCartStore()
const drawerStore = useDrawerStore()

const { cartItemsCount: itemsCount } = storeToRefs(cartStore)
</script>

<template>
  <div
    class="relative flex items-center gap-1 hover:cursor-pointer"
    @click="drawerStore.toggle('cart')"
  >
    <ShoppingCart class="text-neutral-100" />
    <span
      class="flex h-4 w-4 items-center justify-center rounded-full text-sm font-bold text-white"
      >{{ itemsCount }}</span
    >
  </div>
</template>
