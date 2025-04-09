import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import type { Movie } from '@/types'

const STORE_NAME = 'favorite'

export const useFavoriteStore = defineStore(STORE_NAME, {
  state: () => ({
    isOpen: false,
    favorites: useStorage<Movie[]>(STORE_NAME, []),
  }),
  actions: {
    closeDrawer() {
      this.isOpen = false
    },
    toggleDrawer() {
      this.isOpen = !this.isOpen
    },
    addFavorite(movie: Movie) {
      this.favorites.push(movie)
    },
    removeFavorite(movie: Movie) {
      this.favorites = this.favorites.filter((f) => f.id !== movie.id)
    },
  },
})
