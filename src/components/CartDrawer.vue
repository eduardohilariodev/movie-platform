<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/CartItem.vue'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { itemsCount, totalPrice } = storeToRefs(cartStore)
</script>

<template>
  <div
    class="animate__animated animate__slideInRight absolute top-0 right-0 bottom-0 z-50 m-4 flex h-full min-w-72 flex-col items-center justify-between rounded-md border-2 bg-neutral-100 p-4"
    v-show="cartStore.isOpen"
  >
    <div class="flex w-full items-center justify-between">
      <h1>Meu Carrinho</h1>
      <Button variant="outline" @click="cartStore.clearCart" :disabled="!itemsCount"
        >Esvaziar</Button
      >
    </div>
    <div class="flex flex-col items-start gap-4">
      <div class="flex flex-col gap-4" v-if="!itemsCount">
        <span>Carrinho vazio</span>
      </div>
      <CartItem v-for="movie in cartStore.items" :key="movie.id" :movie="movie" v-else />
    </div>
    <div class="flex w-full flex-col gap-4">
      <div class="flex w-full items-center justify-between">
        <span>Total</span>
        <span>{{ totalPrice }}</span>
      </div>
      <Button class="w-full">Finalizar compra</Button>
    </div>
  </div>
</template>
