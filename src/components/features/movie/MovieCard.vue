<script setup lang="ts">
import type { Movie } from '@/types'
import { useCartStore } from '@/stores/cart'
import { computed } from 'vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useCurrency } from '@/composables/currency'
import LikeButton from '@/components/composed/LikeButton.vue'
import BaseButton from '@/components/base/BaseButton.vue'
import { ShoppingCart, StarIcon, Trash2 } from 'lucide-vue-next'

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
    class="flex h-full flex-col rounded-[1.8rem] border-2 border-neutral-100/12 bg-neutral-950/95"
    :style="{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${movie.posterPath})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }"
  >
    <div class="flex-grow p-4 pb-0">
      <img
        :src="movie.posterPath"
        :alt="movie.title"
        class="aspect-[2/3] w-full rounded-lg object-cover"
      />
    </div>
    <div
      class="m-1 flex flex-col gap-4 rounded-3xl border-1 border-neutral-100/12 bg-neutral-950/48 p-3 backdrop-blur-md"
    >
      <div class="flex flex-col gap-1">
        <span class="text-lg leading-tight font-bold text-white">{{ movie.title }}</span>
        <span class="text-sm text-neutral-200">{{ formatCurrency(Number(movie.price)) }}</span>
      </div>
      <div class="flex gap-2 text-sm font-light text-neutral-200">
        <span>{{ new Date(movie.releaseDate).getFullYear() }}</span>
        <span>•</span>
        <span>{{ movie.genre }}</span>
        <span>•</span>
        <div class="flex items-center gap-1.5">
          <StarIcon class="h-4 w-4" />
          <span>{{ movie.voteAverage }}</span>
        </div>
      </div>
      <div class="flex w-full justify-end gap-2">
        <LikeButton :movie="movie" :is-active="!!isInFavorites" />
        <BaseButton
          rounded
          size="icon"
          :variant="isInCart ? 'outline' : 'default'"
          :tooltipText="isInCart ? 'Remover do carrinho' : 'Adicionar ao carrinho'"
          @click="isInCart ? cartStore.removeItem(movie) : cartStore.addItem(movie)"
        >
          <ShoppingCart v-if="!isInCart" class="text-neutral-950" :size="18" />
          <Trash2 v-else class="text-white" :size="18" />
        </BaseButton>
      </div>
    </div>
  </div>
</template>
