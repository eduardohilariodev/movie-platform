<script setup lang="ts">
import { ShoppingCart } from 'lucide-vue-next'
import { ScButton } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { storeToRefs } from 'pinia'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const cartStore = useCartStore()
const { cartItemsCount } = storeToRefs(cartStore)

function openCart() {
  cartStore.toggleDrawer()
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>
        <ScButton variant="outline" class="relative rounded-full" @click="openCart">
          <ShoppingCart class="h-4 w-4" />
          <span
            v-if="cartItemsCount > 0"
            class="bg-primary text-primary-foreground absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full text-[10px]"
          >
            {{ cartItemsCount }}
          </span>
        </ScButton>
      </TooltipTrigger>
      <TooltipContent>
        <p>Carrinho</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
