<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/features/cart/CartItem.vue'
import BaseButton from '@/components/base/BaseButton.vue'
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
      <BaseButton variant="outline" @click="cartStore.clearCart" :disabled="!cartItemsCount"
        >Esvaziar</BaseButton
      >
    </template>
    <div class="flex size-full flex-col justify-center" v-if="!cartItemsCount">
      <span>Carrinho vazio</span>
    </div>
    <div class="flex size-full flex-col gap-4" v-else>
      <CartItem v-for="movie in getCartItems" :key="movie.id" :movie="movie" />
    </div>
    <template #footer-actions>
      <div class="flex w-full flex-col gap-4">
        <div class="flex w-full items-center justify-between text-lg font-bold text-neutral-100">
          <span>Total</span>
          <span>{{ formatCurrency(Number(totalPrice)) }}</span>
        </div>
        <BaseButton :disabled="!cartItemsCount" @click="navigateToCheckout" class="w-full">
          Ir para o checkout
        </BaseButton>
      </div>
    </template>
  </AppDrawer>
</template>
