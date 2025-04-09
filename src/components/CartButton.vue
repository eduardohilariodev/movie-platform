<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
const cartStore = useCartStore()

const addToCart = () => {
  cartStore.toggleDrawer()
}

const { cartItemsCount: itemsCount } = storeToRefs(cartStore)
</script>

<template>
  <div class="relative flex items-center gap-2 hover:cursor-pointer" @click="addToCart">
    <span
      class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
      >{{ itemsCount }}</span
    >
    <ShoppingCart class="text-gray-500" />
  </div>
</template>
