<script setup lang="ts">
import type { Movie } from '@/types'
import { useFavoriteStore } from '@/stores/favorite'
import MovieListItem from '@/components/features/movie/MovieListItem.vue'
import TrashButton from '@/components/composed/TrashButton.vue'
import CartButton from '@/components/features/cart/CartButton.vue'

const props = defineProps<{
  movie: Movie
}>()

const favoriteStore = useFavoriteStore()
</script>

<template>
  <MovieListItem :movie="props.movie">
    <template #actions>
      <CartButton :movie="props.movie" />
      <TrashButton
        :onClick="() => favoriteStore.removeFavorite(props.movie)"
        tooltipText="Remover dos favoritos"
      />
    </template>
  </MovieListItem>
</template>
