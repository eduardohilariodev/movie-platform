<script setup lang="ts">
import { HeartIcon } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import type { Movie } from '@/types'

const props = defineProps<{
  movie: Movie
  isActive: boolean
}>()

const favoriteStore = useFavoriteStore()

const toggleFavorite = () => {
  if (props.isActive) {
    favoriteStore.removeFavorite(props.movie)
  } else {
    favoriteStore.addFavorite(props.movie)
  }
}
</script>

<template>
  <button
    :style="{ color: isActive ? 'black' : 'lightgray' }"
    class="hover:cursor-pointer"
    @click="toggleFavorite"
  >
    <HeartIcon :fill="isActive ? 'currentColor' : 'none'" />
  </button>
</template>
