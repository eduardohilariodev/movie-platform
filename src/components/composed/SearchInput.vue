<script setup lang="ts">
import { computed, ref, onMounted, nextTick, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useMovieStore } from '@/stores/movie'
import { useSearchStore } from '@/stores/search'
import { useCartStore } from '@/stores/cart'
import { useIntersectionObserver } from '@vueuse/core'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import { Search, X } from 'lucide-vue-next'
import type { Movie } from '@/types'
import CartButton from '../features/cart/CartButton.vue'

const movieStore = useMovieStore()
const searchStore = useSearchStore()
const cartStore = useCartStore()

const { filteredMovies, isQueryLoading, isQueryLoadingMore, currentSearchPage, totalSearchPages } =
  storeToRefs(movieStore)
const { searchQuery, isSearchActive } = storeToRefs(searchStore)

const isMobile = ref(false)
const searchInputRef = ref<HTMLInputElement | null>(null)
const isComboboxOpen = ref(false)
let queryDebounceTimeout: number | null = null
const infiniteScrollTarget = ref(null)
const isLoadingMore = ref(false)

onMounted(() => {
  checkIfMobile()
  window.addEventListener('resize', checkIfMobile)
})

const showClearButton = computed(() => isSearchActive.value || !!searchQuery.value)

watch(searchQuery, (newQuery) => {
  isComboboxOpen.value = !!newQuery

  if (queryDebounceTimeout) clearTimeout(queryDebounceTimeout)

  if (newQuery) {
    queryDebounceTimeout = setTimeout(() => {
      movieStore.queryMovies(newQuery, 1)
    }, 500)
  } else {
    movieStore.clearSearchResults()
  }
})

useIntersectionObserver(
  infiniteScrollTarget,
  ([{ isIntersecting }]) => {
    const canLoadMore =
      isIntersecting &&
      !isQueryLoading.value &&
      !isQueryLoadingMore.value &&
      currentSearchPage.value < totalSearchPages.value &&
      !!searchQuery.value

    if (canLoadMore) {
      isLoadingMore.value = true
      movieStore.queryMovies(searchQuery.value, currentSearchPage.value + 1).finally(() => {
        isLoadingMore.value = false
      })
    }
  },
  { rootMargin: '0px 0px 400px 0px', threshold: 0.1 },
)

function checkIfMobile() {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
}

const handleInput = (event: Event) => {
  const input = event.target as HTMLInputElement
  searchStore.setSearchQuery(input.value)
}

const toggleSearchInput = () => {
  searchStore.toggleSearch()

  nextTick(() => {
    if (isSearchActive.value && searchInputRef.value) {
      searchInputRef.value.focus()
    }
  })
}

const handleInputFocus = () => {
  if (searchQuery.value) {
    isComboboxOpen.value = true
    if (filteredMovies.value.length === 0 && !isQueryLoading.value) {
      movieStore.queryMovies(searchQuery.value, 1)
    }
  }
}

const handleSearchBlur = () => {
  if (!searchQuery.value && isMobile.value) {
    searchStore.deactivateSearch()
  }

  setTimeout(() => {
    const listElement = document.querySelector('[role="listbox"]')
    if (!listElement || !listElement.contains(document.activeElement)) {
      isComboboxOpen.value = false
    }
  }, 150)
}

const clearAndClose = () => {
  searchStore.clearSearchQuery()
  searchStore.deactivateSearch()
}

const addToCart = (movie: Movie) => {
  cartStore.addItem(movie)
  isComboboxOpen.value = false
}
</script>

<template>
  <div class="flex w-full items-center justify-center">
    <div class="flex items-center justify-center">
      <button
        @click="toggleSearchInput"
        class="flex items-center justify-center rounded-full p-2 transition-colors hover:bg-neutral-700 md:hidden"
        aria-label="Search"
        v-if="!isSearchActive"
      >
        <Search class="h-5 w-5 text-neutral-200" />
      </button>

      <div
        :class="[
          'relative transition-all duration-300 ease-in-out',
          'md:w-[300px] lg:w-[420px]',
          isSearchActive ? 'w-full' : 'w-auto',
        ]"
        v-if="isSearchActive || !isMobile"
      >
        <Combobox by="id" class="w-full" :open="isComboboxOpen">
          <ComboboxAnchor class="relative w-full">
            <ComboboxInput
              ref="searchInputRef"
              :display-value="() => searchQuery"
              placeholder="Encontre seu filme..."
              @input="handleInput"
              @focus="handleInputFocus"
              @blur="handleSearchBlur"
              class="w-full rounded-lg px-3 py-1.5 pr-10 text-neutral-100 transition-colors"
              :autofocus="isSearchActive"
            />
            <button
              v-if="showClearButton"
              @click="clearAndClose"
              class="absolute top-1/2 right-2 -translate-y-1/2 rounded-full p-1 text-neutral-400 hover:bg-neutral-700 hover:text-neutral-200"
              aria-label="Clear search"
            >
              <X class="h-4 w-4" />
            </button>
          </ComboboxAnchor>

          <ComboboxList
            class="scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-neutral-900 z-10 mt-1.5 max-h-[70vh] w-full overflow-y-auto rounded-lg border-2 border-neutral-200/12 bg-neutral-900 py-1 shadow-xl backdrop-blur-lg md:py-2"
          >
            <ComboboxEmpty
              v-if="!isQueryLoading && filteredMovies.length === 0 && !!searchQuery"
              class="px-2 py-2 text-sm text-neutral-300 md:px-4 md:py-3"
            >
              Nenhum filme encontrado para "{{ searchQuery }}".
            </ComboboxEmpty>

            <ComboboxGroup>
              <ComboboxItem
                v-for="movie in filteredMovies"
                :key="movie.id"
                :value="movie"
                class="group cursor-pointer px-2 py-2 hover:bg-neutral-800 data-[highlighted]:bg-neutral-800 md:px-4 md:py-3"
                @select="addToCart(movie)"
              >
                <div class="flex w-full items-center justify-between gap-3">
                  <img
                    v-if="movie.posterPath && movie.posterPath !== '/placeholder.png'"
                    :src="movie.posterPath"
                    class="h-12 w-9 flex-shrink-0 rounded-md object-cover"
                    :alt="movie.title"
                    loading="lazy"
                  />
                  <div v-else class="h-12 w-9 flex-shrink-0 rounded-md bg-neutral-700"></div>
                  <div class="min-w-0 flex-1">
                    <div
                      class="truncate text-sm font-medium text-neutral-100 group-data-[highlighted]:text-neutral-100"
                    >
                      {{ movie.title }}
                    </div>
                    <div
                      class="truncate text-xs text-neutral-300 group-data-[highlighted]:text-neutral-300"
                    >
                      {{ movie.genre }} -
                      {{ movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A' }}
                    </div>
                  </div>
                  <CartButton :movie="movie" />
                </div>
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxList>
        </Combobox>
      </div>
    </div>
  </div>
</template>
