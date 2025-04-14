import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { computed } from 'vue'
import type { Movie } from '@/types'
import { toast } from 'vue-sonner'
import { useDrawerStore } from '@/stores/drawer'

const STORE_NAME = 'favorite'

export const useFavoriteStore = defineStore(STORE_NAME, () => {
  const favorites = useStorage<Movie[]>(STORE_NAME, [])
  const drawerStore = useDrawerStore()

  const favoritesCount = computed(() => favorites.value.length)
  const getFavoritesItems = computed(() => favorites.value.filter((movie) => movie !== null))

  function addFavorite(movie: Movie) {
    // Check if the movie is already in favorites before adding it
    const exists = favorites.value.some((f) => f.id === movie.id)
    if (!exists) {
      favorites.value.push(movie)
      toast('Filme adicionado aos favoritos', {
        description: `${movie.title} foi adicionado aos favoritos`,
        action: {
          label: 'Ver Favoritos',
          onClick: () => {
            drawerStore.open('favorites')
          },
        },
      })
    }
  }

  function removeFavorite(movie: Movie) {
    favorites.value = favorites.value.filter((f) => f.id !== movie.id)
    toast('Filme removido dos favoritos', {
      description: `${movie.title} foi removido dos favoritos`,
    })
  }

  return {
    favorites,
    favoritesCount,
    getFavoritesItems,
    addFavorite,
    removeFavorite,
  }
})
