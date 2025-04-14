import type { Movie } from '@/types'
import { useStorage } from '@vueuse/core'
import { defineStore } from 'pinia'
import { toast } from 'vue-sonner'
import router from '@/router'
import { useDrawerStore } from '@/stores/drawer'
import { computed, ref } from 'vue'

const STORE_NAME = 'cart'

export const useCartStore = defineStore(STORE_NAME, () => {
  const items = useStorage<Movie[]>(STORE_NAME, [])
  const isSuccessDialogOpen = ref(false)

  function addItem(item: Movie) {
    const drawerStore = useDrawerStore()
    const existingItem = items.value.find((i) => i.id === item.id)
    if (existingItem) {
      return
    }
    items.value = [...items.value, item]
    console.debug('🚀 ~ addItem ~ items:', items.value)

    toast('Filme adicionado ao carrinho', {
      description: `${item.title} foi adicionado ao carrinho`,
      action: {
        label: 'Ver Carrinho',
        onClick: () => {
          isSuccessDialogOpen.value = false
          drawerStore.open('cart')
        },
      },
    })
  }

  function removeItem(item: Movie) {
    console.debug('🚀 ~ removeItem ~ item:', item)

    items.value = items.value.filter((i) => i.id !== item.id)
    toast('Filme removido do carrinho', {
      description: `${item.title} foi removido do carrinho`,
    })
  }

  function clearCart() {
    items.value = []
    toast('Carrinho esvaziado', {
      description: 'Todos os filmes foram removidos do carrinho',
    })
  }

  function startCheckout() {
    isSuccessDialogOpen.value = true
  }

  function finishCheckout() {
    items.value = []
    isSuccessDialogOpen.value = false
    router.push('/')
  }

  const cartItemsCount = computed(() => items.value.length || 0)
  const totalPrice = computed(() => items.value.reduce((acc, item) => acc + Number(item.price), 0))
  const getCartItems = computed(() => items.value.filter((item) => item !== null))
  const isCartEmpty = computed(() => items.value.length === 0)

  return {
    items,
    isSuccessDialogOpen,
    addItem,
    removeItem,
    clearCart,
    startCheckout,
    finishCheckout,
    cartItemsCount,
    totalPrice,
    getCartItems,
    isCartEmpty,
  }
})
