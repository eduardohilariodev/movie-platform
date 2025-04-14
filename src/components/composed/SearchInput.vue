<script setup lang="ts">
import { ref, computed } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { cn } from '@/lib/utils'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxList,
} from '@/components/ui/combobox'
import { Check } from 'lucide-vue-next'

const movieStore = useMovieStore()
const searchQuery = ref('')
let debounceTimeout: number | null = null

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  searchQuery.value = input.value

  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    movieStore.queryMovies(searchQuery.value)
  }, 500)
}

const movies = computed(() => movieStore.filteredMovies)
</script>

<template>
  <Combobox by="id" class="w-[420px]">
    <ComboboxAnchor>
      <ComboboxInput
        :display-value="() => searchQuery"
        placeholder="Encontre seu filme..."
        @input="handleInput"
      />
    </ComboboxAnchor>

    <ComboboxList
      v-if="searchQuery"
      class="w-full border-2 border-neutral-200/12 bg-neutral-950/95 backdrop-blur-lg"
    >
      <ComboboxEmpty> Nenhum filme encontrado. </ComboboxEmpty>

      <ComboboxGroup>
        <ComboboxItem v-for="movie in movies" :key="movie.id" :value="movie">
          <div class="flex items-center gap-2">
            <img
              v-if="movie.posterPath"
              :src="movie.posterPath"
              class="h-8 w-6 object-cover"
              :alt="movie.title"
            />
            <div>
              <div class="text-sm font-medium text-neutral-100">{{ movie.title }}</div>
              <div class="text-xs text-neutral-200">
                {{ movie.genre }} - {{ movie.releaseDate }}
              </div>
            </div>
          </div>

          <ComboboxItemIndicator>
            <Check :class="cn('ml-auto h-4 w-4')" />
          </ComboboxItemIndicator>
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
