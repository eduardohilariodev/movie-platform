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
  <div class="relative flex items-center gap-1 hover:cursor-pointer" @click="addToCart">
    <ShoppingCart class="text-neutral-100" />
    <span
      class="flex h-4 w-4 items-center justify-center rounded-full text-sm font-bold text-white"
      >{{ itemsCount }}</span
    >
  </div>
</template>
