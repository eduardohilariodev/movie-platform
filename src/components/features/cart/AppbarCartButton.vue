<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { useDrawerStore } from '@/stores/drawer'
import { computed } from 'vue'

const cartStore = useCartStore()
const drawerStore = useDrawerStore()

const { cartItemsCount: itemsCount } = storeToRefs(cartStore)
const { isOpen, drawerType } = storeToRefs(drawerStore)

const isActive = computed(() => isOpen.value && drawerType.value === 'cart')
</script>

<template>
  <div
    class="relative flex items-center gap-1 rounded p-1 transition-colors hover:cursor-pointer"
    :class="{ 'bg-primary-600 bg-opacity-20': isActive }"
    @click="drawerStore.toggle('cart')"
  >
    <ShoppingCart class="text-neutral-100" />
    <span
      class="flex h-4 w-4 items-center justify-center rounded-full text-sm font-bold text-white"
      >{{ itemsCount }}</span
    >
  </div>
</template>
