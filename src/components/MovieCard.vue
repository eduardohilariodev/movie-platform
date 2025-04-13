<script setup lang="ts">
import type { Movie } from '@/types'
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
  <div
    class="flex aspect-[2/3] flex-col justify-end rounded-[1.8rem] border-2 border-neutral-100/12 p-1.5"
    :style="{
      backgroundImage: `url(${movie.posterPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      // height: '100%',
    }"
  >
    <div
      class="flex flex-col items-start justify-center gap-4 rounded-3xl border-1 border-neutral-100/12 bg-neutral-950/48 p-3 backdrop-blur-md"
    >
      <div class="flex flex-col gap-1">
        <span class="text-md leading-tight font-bold text-neutral-100">{{ movie.title }}</span>
        <span class="text-sm text-neutral-100">{{ formatCurrency(Number(movie.price)) }}</span>
      </div>
      <div class="flex gap-2">
        <span class="text-sm text-neutral-100">{{
          new Date(movie.releaseDate).getFullYear()
        }}</span>
        <span class="text-sm text-neutral-100">•</span>
        <span class="text-sm text-neutral-100">{{ movie.genre }}</span>
        <span class="text-sm text-neutral-100">•</span>
        <span class="text-sm font-bold text-neutral-100">{{ movie.voteAverage }}</span>
      </div>
      <LikeButton :movie="movie" :is-active="!!isInFavorites" />
      <div class="flex w-full gap-2">
        <Button
          class="w-full rounded-full bg-white text-black hover:bg-neutral-100"
          :class="
            isInCart && 'border border-neutral-100 bg-transparent text-white hover:bg-neutral-900'
          "
          @click="isInCart ? cartStore.removeItem(movie) : cartStore.addItem(movie)"
        >
          {{ isInCart ? 'Remover' : 'Adicionar' }}
        </Button>
      </div>
    </div>
  </div>
</template>
