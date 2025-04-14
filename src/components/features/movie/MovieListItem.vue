<script setup lang="ts">
import type { Movie } from '@/types'
import { useCurrency } from '@/composables/currency'

const props = defineProps<{
  movie: Movie
}>()

const { formatCurrency } = useCurrency()
</script>

<template>
  <div
    class="flex items-center gap-4 rounded-lg border border-neutral-100/12 bg-neutral-950/48 p-3 backdrop-blur-md transition-transform duration-200 hover:scale-102"
  >
    <img
      :src="props.movie.posterPath"
      :alt="props.movie.title"
      class="h-20 w-16 rounded-md object-cover"
    />
    <div class="flex flex-1 flex-col gap-1">
      <h3 class="text-md font-bold text-white">{{ props.movie.title }}</h3>

      <span class="text-sm font-medium text-neutral-200">{{
        formatCurrency(Number(props.movie.price))
      }}</span>
    </div>
    <div class="flex items-center gap-2">
      <slot name="actions"></slot>
    </div>
  </div>
</template>
