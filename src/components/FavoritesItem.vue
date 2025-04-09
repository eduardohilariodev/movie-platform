<script setup lang="ts">
import type { Movie } from '@/types'
import { useCartStore } from '@/stores/cart'
import { Button } from '@/components/ui/button'
import { ShoppingCart, Trash } from 'lucide-vue-next'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'
import { useFavoriteStore } from '@/stores/favorite'

const props = defineProps<{
  movie: Movie
}>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
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
    <div class="flex gap-2">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" @click="cartStore.addItem(props.movie)">
              <ShoppingCart class="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Adicionar ao carrinho</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline" @click="favoriteStore.removeFavorite(props.movie)">
              <Trash class="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Remover dos favoritos</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  </div>
</template>
