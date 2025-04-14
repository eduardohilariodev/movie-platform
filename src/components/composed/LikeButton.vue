<script setup lang="ts">
import { HeartIcon } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import type { Movie } from '@/types'
import BaseButton from '@/components/base/BaseButton.vue'

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
  <BaseButton
    rounded
    size="icon"
    :variant="isActive ? 'default' : 'outline'"
    :tooltipText="isActive ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
    @click="toggleFavorite"
  >
    <HeartIcon :fill="isActive ? 'currentColor' : 'none'" :size="18" />
  </BaseButton>
</template>
