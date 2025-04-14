<script setup lang="ts">
import { HeartIcon } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import type { Movie } from '@/types'
import BaseButton from '@/components/base/BaseButton.vue'
import { useDrawerStore } from '@/stores/drawer'

const drawerStore = useDrawerStore()

const props = defineProps<{
  movie: Movie
  isActive: boolean
}>()

const favoriteStore = useFavoriteStore()

const toggleFavorite = () => {
  if (props.isActive) {
    drawerStore.open('favorites')
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
    :tooltipText="isActive ? 'Ver Favoritos' : 'Adicionar aos favoritos'"
    @click="toggleFavorite"
  >
    <HeartIcon :fill="isActive ? 'currentColor' : 'none'" :size="18" />
  </BaseButton>
</template>
