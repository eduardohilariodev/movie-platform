<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { useFavoriteStore } from '@/stores/favorite'
import { storeToRefs } from 'pinia'

const favoriteStore = useFavoriteStore()
const { favoritesCount } = storeToRefs(favoriteStore)
</script>

<template>
  <div
    class="relative flex items-center gap-2 hover:cursor-pointer"
    @click="favoriteStore.toggleDrawer()"
  >
    <span
      class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white"
      >{{ favoritesCount }}</span
    >
    <Heart class="text-gray-500" />
  </div>
</template>
