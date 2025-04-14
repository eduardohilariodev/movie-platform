<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import BaseButton from '@/components/base/BaseButton.vue'
import type { Movie } from '@/types'

const props = defineProps<{
  movie?: Movie
}>()

const cartStore = useCartStore()
const { cartItemsCount, items } = storeToRefs(cartStore)

function handleClick() {
  if (!props.movie) {
    // Handle cart drawer toggle if needed
    return
  }

  // Directly attempt to add the item.
  // The store's addItem action will handle checks for duplicates.
  cartStore.addItem(props.movie)
}

const isCartEmpty = computed(() => items.value.length === 0)
const isInCart = computed(() =>
  props.movie ? items.value.some((item) => item.id === props.movie?.id) : false,
)
</script>

<template>
  <BaseButton
    rounded
    size="icon"
    variant="outline"
    :tooltipText="
      props.movie && !isInCart
        ? 'Adicionar ao Carrinho'
        : props.movie
          ? 'Item no Carrinho'
          : 'Ver Carrinho'
    "
    @click="handleClick"
    class="relative"
    :disabled="!!props.movie && isInCart"
  >
    <ShoppingCart :fill="isInCart ? 'currentColor' : 'none'" class="h-4 w-4" />
    <span
      v-if="cartItemsCount > 0"
      class="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]"
    >
      {{ cartItemsCount }}
    </span>
  </BaseButton>
</template>
