<script setup lang="ts">
import type { Movie } from '@/types'
import LikeButton from '@/components/LikeButton.vue'
import { Star } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'

const props = defineProps<{
  movie: Movie
}>()
</script>

<template>
  <div class="flex h-fit w-fit flex-col rounded-md border-2 border-gray-300">
    <div class="relative h-64 w-64">
      <div class="absolute flex size-full flex-col items-center justify-between p-4">
        <LikeButton class="self-end" :is-active="false" />
        <span class="text-white">{{ movie.releaseDate }}</span>
      </div>
      <img :src="movie.poster_path" :alt="movie.title" class="size-full bg-gray-300 object-cover" />
    </div>
    <div class="flex flex-col items-center justify-center">
      <span class="text-lg font-bold">{{ movie.title }}</span>
      <span class="text-sm text-gray-500">{{ movie.releaseDate }}</span>
      <div class="flex gap-4">
        <div class="flex items-center gap-2">
          <Star class="text-gray-500" />
          <span class="text-sm font-bold text-gray-500">{{ movie.rating }}</span>
        </div>
        <span class="text-sm text-gray-500">{{ movie.genre }}</span>
      </div>
      <span class="text-sm text-gray-500">{{ movie.price }}</span>
    </div>
    <Button>Adicionar</Button>
  </div>
</template>
