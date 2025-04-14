<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import { storeToRefs } from 'pinia'
import { useDrawerStore } from '@/stores/drawer'
import { computed } from 'vue'

const favoriteStore = useFavoriteStore()
const drawerStore = useDrawerStore()
const { favoritesCount } = storeToRefs(favoriteStore)
const { isOpen, drawerType } = storeToRefs(drawerStore)

const isActive = computed(() => isOpen.value && drawerType.value === 'favorites')
</script>

<template>
  <div
    class="relative flex items-center gap-1 rounded p-1 transition-colors hover:cursor-pointer"
    :class="{ 'bg-primary-600 bg-opacity-20': isActive }"
    @click="drawerStore.toggle('favorites')"
  >
    <Heart class="text-neutral-100" />
    <span
      class="flex h-4 w-4 items-center justify-center rounded-full text-sm font-bold text-white"
      >{{ favoritesCount }}</span
    >
  </div>
</template>
