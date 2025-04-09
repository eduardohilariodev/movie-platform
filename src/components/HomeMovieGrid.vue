<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import { useMovieStore } from '@/stores/movie'

const movieStore = useMovieStore()
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <MovieCard v-for="movie in movieStore.movies" :key="movie.id" :movie="movie" />
  </div>
</template>
