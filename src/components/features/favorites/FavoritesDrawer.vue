<script setup lang="ts">
import AppDrawer from '@/components/layout/AppDrawer.vue'
import { useFavoriteStore } from '@/stores/favorite'
import FavoritesItem from '@/components/features/favorites/FavoritesItem.vue'
import { storeToRefs } from 'pinia'

const favoriteStore = useFavoriteStore()
const { getFavoritesItems, favoritesCount } = storeToRefs(favoriteStore)
</script>

<template>
  <AppDrawer :is-open="favoriteStore.isOpen" @close="favoriteStore.closeDrawer" title="Favoritos">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <div v-if="!favoritesCount">
          <span>Nenhum filme favoritado</span>
        </div>
        <FavoritesItem v-else v-for="movie in getFavoritesItems" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </AppDrawer>
</template>
