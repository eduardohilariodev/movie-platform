<script setup lang="ts">
import type { Movie } from '@/types'
import { useCartStore } from '@/stores/cart'
import TrashButton from '@/components/composed/TrashButton.vue'
import MovieListItem from '../movie/MovieListItem.vue'

const props = defineProps<{
  movie: Movie
}>()

const cartStore = useCartStore()
</script>

<template>
  <MovieListItem :movie="props.movie">
    <template #actions>
      <TrashButton :onClick="() => cartStore.removeItem(props.movie)" />
    </template>
  </MovieListItem>
</template>
