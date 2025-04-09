<script setup lang="ts">
import type { Movie } from '@/types'
import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-vue-next'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
const props = defineProps<{
  movie: Movie
}>()

const cartStore = useCartStore()
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
        <span class="text-sm">{{ props.movie.price }}</span>
      </div>
    </div>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline" @click="cartStore.removeItem(props.movie)">
            <Trash class="h-4 w-4" /> </Button
        ></TooltipTrigger>
        <TooltipContent>
          <p>Remover do carrinho</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  </div>
</template>
