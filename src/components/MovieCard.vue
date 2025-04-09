<script setup lang="ts">
import type { Movie } from '@/types'
import LikeButton from '@/components/LikeButton.vue'
import { Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useCurrency } from '@/composables/currency'

const props = defineProps<{
  movie: Movie
}>()

const cartStore = useCartStore()
const favoriteStore = useFavoriteStore()
const { formatCurrency } = useCurrency()

const addMovieToCart = () => {
  cartStore.addItem(props.movie)
}

const isInCart = computed(() => cartStore.items.find((i) => i.id === props.movie.id))
const isInFavorites = computed(() => favoriteStore.favorites.find((i) => i.id === props.movie.id))
</script>

<template>
  <div class="flex h-fit w-fit flex-col rounded-md border-2 border-gray-300">
    <div class="relative h-64 w-64">
      <div class="absolute flex size-full flex-col items-center justify-between p-4">
        <LikeButton class="self-end" :movie="movie" :is-active="!!isInFavorites" />
        <span class="text-white">{{ movie.releaseDate }}</span>
      </div>
      <img :src="movie.posterPath" :alt="movie.title" class="size-full bg-gray-300 object-cover" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <span class="text-lg font-bold">{{ movie.title }}</span>
      <span class="text-sm text-gray-500">{{ movie.releaseDate }}</span>
      <div class="flex gap-4">
        <div class="flex items-center gap-2">
          <Star class="text-gray-500" />
          <span class="text-sm font-bold text-gray-500">{{ movie.voteAverage }}</span>
        </div>
        <span class="text-sm text-gray-500">{{ movie.genre }}</span>
      </div>
      <span class="text-sm text-gray-500">{{ formatCurrency(Number(movie.price)) }}</span>
    </div>
    <Button
      class="w-full"
      @click="isInCart ? cartStore.removeItem(movie) : cartStore.addItem(movie)"
    >
      {{ isInCart ? 'Remover' : 'Adicionar' }}
    </Button>
  </div>
</template>
