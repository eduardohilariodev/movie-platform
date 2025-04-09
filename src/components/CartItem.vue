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
  <div class="flex items-center justify-between">
    <div class="flex items-center gap-2">
      <img :src="props.movie.poster_path" :alt="props.movie.title" class="h-16 w-16 rounded-md" />
      <span>{{ props.movie.title }}</span>
      <span>{{ props.movie.price }}</span>
    </div>
    <div class="flex items-center gap-2">
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
  </div>
</template>
