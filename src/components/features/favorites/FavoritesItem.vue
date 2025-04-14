<script setup lang="ts">
import type { Movie } from '@/types'
import { useCartStore } from '@/stores/cart'
import { ScButton } from '@/components/ui/button'
import { ShoppingCart } from 'lucide-vue-next'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useFavoriteStore } from '@/stores/favorite'
import { useCurrency } from '@/composables/currency'
import TrashButton from '@/components/composed/TrashButton.vue'

const props = defineProps<{
  movie: Movie
}>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const { formatCurrency } = useCurrency()
</script>

<template>
  <div class="flex w-full items-center justify-between">
    <div class="flex items-center gap-2">
      <img
        :src="props.movie.posterPath"
        :alt="props.movie.title"
        class="h-16 w-16 rounded-md object-cover"
      />
      <div class="flex flex-col">
        <span class="text-sm font-bold">{{ props.movie.title }}</span>
        <span class="text-sm">{{ formatCurrency(Number(props.movie.price)) }}</span>
      </div>
    </div>
    <div class="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <ScButton variant="outline" @click="cartStore.addItem(props.movie)">
              <ShoppingCart class="h-4 w-4" />
            </ScButton>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar ao carrinho</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <TrashButton :onClick="() => favoriteStore.removeFavorite(props.movie)" />
          </TooltipTrigger>
          <TooltipContent>
            <p>Remover dos favoritos</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
