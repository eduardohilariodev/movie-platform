<script setup lang="ts">
import { computed, ref, onMounted, nextTick } from 'vue'
import { useMovieStore } from '@/stores/movie'
import { useSearchStore } from '@/stores/search'
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
import { Check, Search, X, ShoppingCart, PlusCircle } from 'lucide-vue-next'
import { useCartStore } from '@/stores/cart'
import type { Movie } from '@/types'

const movieStore = useMovieStore()
const searchStore = useSearchStore()
const cartStore = useCartStore()
let debounceTimeout: number | null = null
const isMobile = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)

onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

function checkIfMobile() {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
}

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  searchStore.setSearchQuery(input.value)

  if (debounceTimeout) clearTimeout(debounceTimeout)
  debounceTimeout = setTimeout(() => {
    movieStore.queryMovies(searchStore.searchQuery)
  }, 500)
}

const toggleSearchInput = () => {
  searchStore.toggleSearch()

  // Focus the input after the UI updates
  nextTick(() => {
    if (searchStore.isSearchActive && searchInputRef.value) {
      searchInputRef.value.focus()
    }
  })
}

const closeSearchInput = () => {
  if (!searchStore.searchQuery) {
    searchStore.deactivateSearch()
  }
}

const clearAndClose = () => {
  searchStore.clearSearchQuery()
  searchStore.deactivateSearch()
}

const addToCart = (movie: Movie) => {
  cartStore.addItem(movie)
}

const isInCart = (movie: Movie) => {
  return cartStore.items.some((item) => item.id === movie.id)
}

const movies = computed(() => movieStore.filteredMovies)
</script>

<template>
  <div class="flex items-center justify-center">
    <!-- Search button (mobile only) -->
    <button
      @click="toggleSearchInput"
      class="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-700 md:hidden"
      aria-label="Search"
      v-if="!searchStore.isSearchActive"
    >
      <Search class="h-5 w-5 text-neutral-200" />
    </button>

    <!-- Search input (desktop always visible, mobile only when toggled) -->
    <div
      :class="[
        'transition-all duration-300 ease-in-out',
        'md:w-[300px] lg:w-[420px]',
        searchStore.isSearchActive ? 'w-full' : 'w-auto',
      ]"
      v-if="searchStore.isSearchActive || !isMobile"
    >
      <Combobox by="id" class="w-full">
        <ComboboxAnchor class="relative w-full">
          <ComboboxInput
            ref="searchInputRef"
            :display-value="() => searchStore.searchQuery"
            placeholder="Encontre seu filme..."
            @input="handleInput"
            @blur="closeSearchInput"
            class="w-full px-2 pr-10 md:px-3"
            :autofocus="searchStore.isSearchActive"
          />
          <button
            v-if="searchStore.isSearchActive"
            @click="clearAndClose"
            class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 hover:bg-neutral-800 md:hidden"
          >
            <X class="h-4 w-4 text-neutral-400" />
          </button>
        </ComboboxAnchor>

        <ComboboxList
          v-if="searchStore.searchQuery"
          class="scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 max-h-[70vh] w-full overflow-y-auto rounded-lg border-2 border-neutral-200/12 bg-neutral-900 py-1 backdrop-blur-lg md:py-2"
        >
          <ComboboxEmpty class="px-2 py-2 text-sm text-neutral-300 md:px-4 md:py-3">
            Nenhum filme encontrado.
          </ComboboxEmpty>

          <ComboboxGroup>
            <ComboboxItem
              v-for="movie in movies"
              :key="movie.id"
              :value="movie"
              class="group cursor-pointer px-2 py-2 hover:bg-neutral-800 data-[focused]:bg-neutral-800 md:px-4 md:py-3"
              @select="addToCart(movie)"
            >
              <div class="flex items-center gap-3">
                <img
                  v-if="movie.posterPath"
                  :src="movie.posterPath"
                  class="h-12 w-9 rounded-md object-cover"
                  :alt="movie.title"
                />
                <div class="flex-1">
                  <div
                    class="text-sm font-medium text-neutral-100 group-data-[focused]:text-neutral-100"
                  >
                    {{ movie.title }}
                  </div>
                  <div class="text-xs text-neutral-300 group-data-[focused]:text-neutral-300">
                    {{ movie.genre }} - {{ new Date(movie.releaseDate).getFullYear() }}
                  </div>
                </div>
                <button
                  class="flex items-center justify-center rounded-full bg-neutral-700 p-1.5 text-neutral-200 opacity-0 transition-colors group-hover:opacity-100 group-data-[focused]:bg-neutral-300 group-data-[focused]:text-neutral-800 group-data-[focused]:opacity-100 hover:bg-neutral-600"
                  @click.stop="addToCart(movie)"
                  :class="{
                    'bg-green-800 text-green-200 group-data-[focused]:bg-green-600 group-data-[focused]:text-white':
                      isInCart(movie),
                  }"
                >
                  <span v-if="isInCart(movie)" class="mr-1.5 text-xs font-medium">No carrinho</span>
                  <ShoppingCart v-if="isInCart(movie)" class="h-4 w-4" />
                  <PlusCircle v-else class="h-4 w-4" />
                </button>
              </div>

              <ComboboxItemIndicator>
                <Check :class="cn('ml-auto h-4 w-4')" />
              </ComboboxItemIndicator>
            </ComboboxItem>
          </ComboboxGroup>
        </ComboboxList>
      </Combobox>
    </div>
  </div>
</template>
