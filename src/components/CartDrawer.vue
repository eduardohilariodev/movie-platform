<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/CartItem.vue'
import { Button } from '@/components/ui/button'
import AppDrawer from '@/components/layout/AppDrawer.vue'
import { storeToRefs } from 'pinia'

const cartStore = useCartStore()
const { itemsCount, totalPrice } = storeToRefs(cartStore)

function closeDrawer() {
  cartStore.isOpen = false
}
</script>

<template>
  <AppDrawer :is-open="cartStore.isOpen" position="right" @close="closeDrawer">
    <div class="flex h-full w-full flex-col items-center justify-between">
      <div class="flex w-full items-center justify-between">
        <h1>Meu Carrinho</h1>
        <Button variant="outline" @click="cartStore.clearCart" :disabled="!itemsCount"
          >Esvaziar</Button
        >
      </div>
      <div class="flex h-full flex-col items-start gap-4 overflow-y-scroll">
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
  </AppDrawer>
</template>
