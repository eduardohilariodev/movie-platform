<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue'
import MovieSkeleton from '@/components/MovieSkeleton.vue'
import { useMovieStore } from '@/stores/movie'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'
import { storeToRefs } from 'pinia'

const movieStore = useMovieStore()
const authStore = useAuthStore()

const { isRecommendationsLoading, movies } = storeToRefs(movieStore)

onMounted(() => {
  if (authStore.isAuthenticated) {
    movieStore.fetchMovies()
  }
})
</script>

<template>
  <div class="size-screen grid grid-cols-4 gap-4 overflow-clip">
    <template v-if="isRecommendationsLoading">
      <MovieSkeleton v-for="i in 8" :key="i" />
    </template>
    <template v-else>
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" />
    </template>
  </div>
</template>
