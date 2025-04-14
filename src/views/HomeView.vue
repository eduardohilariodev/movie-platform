<script setup lang="ts">
import MovieCard from '@/components/features/movie/MovieCard.vue'
import MovieSkeleton from '@/components/features/movie/MovieSkeleton.vue'
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

import { useIntersectionObserver } from '@vueuse/core'
import { shallowRef, useTemplateRef } from 'vue'

const target = useTemplateRef<HTMLDivElement>('target')
const targetIsVisible = shallowRef(false)

const { stop } = useIntersectionObserver(target, ([entry], observerElement) => {
  targetIsVisible.value = entry?.isIntersecting || false
})
</script>

<template>
  <div
    class="mx-auto grid max-w-screen-md grid-flow-dense grid-cols-2 gap-6 px-10 py-24 md:grid-cols-3 md:px-8 lg:max-w-screen-lg"
  >
    <template v-if="isRecommendationsLoading">
      <MovieSkeleton v-for="i in 8" :key="i" />
    </template>
    <template v-else>
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" class="h-full" />
    </template>
  </div>
</template>
