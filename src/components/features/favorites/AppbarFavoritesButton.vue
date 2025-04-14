<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import { storeToRefs } from 'pinia'
import { useDrawerStore } from '@/stores/drawer'

const favoriteStore = useFavoriteStore()
const drawerStore = useDrawerStore()
const { favoritesCount } = storeToRefs(favoriteStore)
</script>

<template>
  <div
    class="relative flex items-center gap-1 hover:cursor-pointer"
    @click="drawerStore.toggle('favorites')"
  >
    <Heart class="text-neutral-100" />
    <span
      class="flex h-4 w-4 items-center justify-center rounded-full text-sm font-bold text-white"
      >{{ favoritesCount }}</span
    >
  </div>
</template>
