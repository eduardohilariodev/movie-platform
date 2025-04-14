import { defineStore } from 'pinia'
import { ref } from 'vue'

export type DrawerType = 'cart' | 'favorites' | null

export const useDrawerStore = defineStore('drawer', () => {
  const isOpen = ref(false)
  const drawerType = ref<DrawerType>(null)

  const open = (type: DrawerType) => {
    drawerType.value = type
    isOpen.value = true
  }

  const close = () => {
    isOpen.value = false
    drawerType.value = null
  }

  const toggle = (type: DrawerType) => {
    if (isOpen.value && drawerType.value === type) {
      close()
    } else {
      open(type)
    }
  }

  return {
    isOpen,
    drawerType,
    open,
    close,
    toggle,
  }
})
