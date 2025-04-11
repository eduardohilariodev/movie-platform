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
import { Check, Search } from 'lucide-vue-next'

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
  <div>
    <Combobox by="id">
      <ComboboxAnchor>
        <div class="relative w-full max-w-sm items-center">
          <ComboboxInput
            class="w-full rounded-md border-2 border-gray-300 p-2 pl-9"
            :display-value="() => searchQuery"
            placeholder="Pesquisar filmes..."
            @input="handleInput"
          />
          <span class="absolute inset-y-0 start-0 flex items-center justify-center px-3">
            <Search class="text-muted-foreground size-4" />
          </span>
        </div>
      </ComboboxAnchor>

      <ComboboxList v-if="searchQuery">
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
                <div>{{ movie.title }}</div>
                <div class="text-xs text-gray-500">{{ movie.genre }} - {{ movie.releaseDate }}</div>
              </div>
            </div>

            <ComboboxItemIndicator>
              <Check :class="cn('ml-auto h-4 w-4')" />
            </ComboboxItemIndicator>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxList>
    </Combobox>
  </div>
</template>
