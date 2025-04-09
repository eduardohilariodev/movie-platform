import type { Movie } from '@/types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'

const STORE_NAME = 'cart'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: useStorage<Movie[]>(STORE_NAME, []),
    isOpen: false,
  }),
  actions: {
    addItem(item: Movie) {
      const existingItem = this.items.find((i) => i.id === item.id)
      if (!existingItem) {
        this.items.push(item)
        toast('Filme adicionado ao carrinho', {
          description: `${item.title} foi adicionado ao carrinho`,
          action: {
            label: 'Ver Carrinho',
            onClick: () => (this.isOpen = true),
          },
        })
      }
    },
    toggleDrawer() {
      this.isOpen = !this.isOpen
    },
    removeItem(item: Movie) {
      this.items = this.items.filter((i) => i.id !== item.id)
      toast('Filme removido do carrinho', {
        description: `${item.title} foi removido do carrinho`,
      })
    },
    clearCart() {
      this.items = []
      toast('Carrinho esvaziado', {
        description: 'Todos os filmes foram removidos do carrinho',
      })
    },
  },
  getters: {
    itemsCount: (state) => state.items.length || 0,
    totalPrice: (state) => state.items.reduce((acc, item) => acc + item.price, 0).toFixed(2),
  },
})
