<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/features/cart/CartItem.vue'
import { ScButton } from '@/components/ui/button'
import AppDrawer from '@/components/layout/AppDrawer.vue'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import { useCurrency } from '@/composables/currency'

const cartStore = useCartStore()
const { cartItemsCount, totalPrice, getCartItems } = storeToRefs(cartStore)
const router = useRouter()

function navigateToCheckout() {
  router.push('/checkout')
  cartStore.closeDrawer()
}

const { formatCurrency } = useCurrency()
</script>

<template>
  <AppDrawer :is-open="cartStore.isOpen" @close="cartStore.closeDrawer" title="Meu Carrinho">
    <template #header-actions>
      <ScButton variant="outline" @click="cartStore.clearCart" :disabled="!cartItemsCount"
        >Esvaziar</ScButton
      >
    </template>
    <div class="flex h-full w-full flex-col items-center justify-between">
      <div class="flex h-full flex-col items-start gap-4 overflow-y-scroll">
        <div class="flex flex-col gap-4" v-if="!cartItemsCount">
          <span>Carrinho vazio</span>
        </div>
        <CartItem v-for="movie in getCartItems" :key="movie.id" :movie="movie" v-else />
      </div>
      <div class="flex w-full flex-col gap-4">
        <div class="flex w-full items-center justify-between">
          <span>Total</span>
          <span>{{ formatCurrency(Number(totalPrice)) }}</span>
        </div>
        <ScButton :disabled="!cartItemsCount" @click="navigateToCheckout" class="w-full">
          Ir para o checkout
        </ScButton>
      </div>
    </div>
  </AppDrawer>
</template>
