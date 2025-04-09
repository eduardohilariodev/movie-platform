<script setup lang="ts">
import { useCartStore } from '@/stores/cart'
import CartItem from '@/components/CartItem.vue'
import { Button } from '@/components/ui/button'
import { storeToRefs } from 'pinia'
import { ref, watch } from 'vue'

const cartStore = useCartStore()
const { itemsCount, totalPrice } = storeToRefs(cartStore)

const isVisible = ref(false)
const isAnimating = ref(false)
const animationClass = ref('animate__slideInRight')
const backdropClass = ref('animate__fadeIn')

watch(
  () => cartStore.isOpen,
  (newValue) => {
    if (newValue) {
      // Opening
      isVisible.value = true
      animationClass.value = 'animate__slideInRight'
      backdropClass.value = 'animate__fadeIn'
      return
    }
    // Closing
    animationClass.value = 'animate__slideOutRight'
    backdropClass.value = 'animate__fadeOut'
    isAnimating.value = true
    setTimeout(() => {
      isVisible.value = false
      isAnimating.value = false
    }, 1000) // Animation duration
  },
)

function closeDrawer() {
  cartStore.isOpen = false
}
</script>

<template>
  <div
    :class="['animate__animated fixed inset-0 z-40 bg-black/50', backdropClass]"
    v-show="isVisible || cartStore.isOpen"
    @click="closeDrawer"
  ></div>
  <div
    :class="[
      'animate__animated fixed top-0 right-0 bottom-0 z-50 m-4 flex h-screen min-w-72 flex-col items-center justify-between rounded-md border-2 bg-neutral-100 p-4',
      animationClass,
    ]"
    v-show="isVisible || cartStore.isOpen"
    @click.stop
  >
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
</template>
