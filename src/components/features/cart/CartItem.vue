<script setup lang="ts">
import type { Movie } from '@/types'
import { useCartStore } from '@/stores/cart'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useCurrency } from '@/composables/currency'
import TrashButton from '@/components/composed/TrashButton.vue'

const props = defineProps<{
  movie: Movie
}>()

const cartStore = useCartStore()
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
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <TrashButton :onClick="() => cartStore.removeItem(props.movie)" />
        </TooltipTrigger>
        <TooltipContent>
          <p>Remover do carrinho</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
