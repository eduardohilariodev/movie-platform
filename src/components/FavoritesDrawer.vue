<script setup lang="ts">
import AppDrawer from '@/components/layout/AppDrawer.vue'
import { useFavoriteStore } from '@/stores/favorite'
import MovieCard from '@/components/MovieCard.vue'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <AppDrawer :is-open="favoriteStore.isOpen" @close="favoriteStore.closeDrawer">
    <div class="flex flex-col gap-4">
      <h1>Favoritos</h1>
      <div class="flex flex-col gap-4">
        <MovieCard v-for="movie in favoriteStore.favorites" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </AppDrawer>
</template>
