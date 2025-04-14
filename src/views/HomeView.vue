<script setup lang="ts">
import MovieCard from '@/components/features/movie/MovieCard.vue'
import MovieSkeleton from '@/components/features/movie/MovieSkeleton.vue'
import { useMovieStore } from '@/stores/movie'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { storeToRefs } from 'pinia'

const movieStore = useMovieStore()
const authStore = useAuthStore()

const { isRecommendationsLoading, movies, currentPage } = storeToRefs(movieStore)
const loadingMore = ref(false)

onMounted(() => {
  if (authStore.isAuthenticated) {
    movieStore.fetchMovies()
  }
})

import { useIntersectionObserver } from '@vueuse/core'

const target = ref(null)

useIntersectionObserver(
  target,
  ([{ isIntersecting }]) => {
    if (isIntersecting && !isRecommendationsLoading.value && !loadingMore.value) {
      loadingMore.value = true
      movieStore.fetchMovies(currentPage.value + 1).finally(() => {
        loadingMore.value = false
      })
    }
  },
  { rootMargin: '0px 0px 2160px 0px', threshold: 0.1 },
)
</script>

<template>
  <div
    class="mx-auto grid max-w-screen-md grid-flow-dense grid-cols-2 gap-6 px-10 py-24 md:grid-cols-3 md:px-8 lg:max-w-screen-lg"
  >
    <template v-if="isRecommendationsLoading && movies.length === 0">
      <MovieSkeleton v-for="i in 8" :key="i" />
    </template>
    <template v-else>
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" class="h-full" />
    </template>
  </div>

  <!-- Intersection observer target -->
  <div ref="target" class="h-10 w-full" />
</template>
