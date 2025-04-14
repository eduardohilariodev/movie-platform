<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { Movie } from '@/types'
import { useDrawerStore } from '@/stores/drawer'

const drawerStore = useDrawerStore()
const props = defineProps<{
  movie?: Movie
}>()

const cartStore = useCartStore()
const { items } = storeToRefs(cartStore)

function handleClick() {
  if (!props.movie) {
    // Handle cart drawer toggle if needed
    return
  }

  if (isInCart.value) {
    drawerStore.open('cart')
  } else {
    cartStore.addItem(props.movie)
  }
}

const isInCart = computed(
  () => props.movie && items.value.some((item) => item.id === props.movie?.id),
)
</script>

<template>
  <BaseButton
    rounded
    size="icon"
    :variant="isInCart ? 'default' : 'outline'"
    :tooltipText="props.movie && !isInCart ? 'Adicionar ao Carrinho' : 'Ver no Carrinho'"
    @click="handleClick"
    class="relative"
  >
    <ShoppingCart :fill="isInCart ? 'currentColor' : 'none'" class="h-4 w-4" />
  </BaseButton>
</template>
