<script setup lang="ts">
import SearchInput from '@/components/composed/SearchInput.vue'
import { RouterLink } from 'vue-router'
import AppbarCartButton from '@/components/features/cart/AppbarCartButton.vue'
import FavoritesButton from '../features/favorites/AppbarFavoritesButton.vue'
import { useSearchStore } from '@/stores/search'

const searchStore = useSearchStore()
</script>

<template>
  <header
    class="fixed top-4 right-0 left-0 z-50 mx-auto my-0 flex w-[calc(100%-2rem)] items-center justify-between rounded-full border-2 border-neutral-200/12 bg-neutral-900/40 px-4 py-3 shadow-sm backdrop-blur-md sm:top-8 sm:max-w-[calc(100%-4rem)] sm:max-w-screen-sm sm:px-8 sm:py-4 lg:max-w-screen-md"
  >
    <nav :class="{ 'flex-none md:block': true, hidden: searchStore.isSearchActive }">
      <RouterLink to="/">
        <h1 class="text-xl tracking-widest text-neutral-100 sm:text-2xl">SONATA</h1>
      </RouterLink>
    </nav>
    <SearchInput class="mx-2 flex flex-1 justify-center" />
    <div
      class="flex items-center gap-2 sm:gap-4"
      :class="{ 'flex-none md:flex': true, hidden: searchStore.isSearchActive }"
    >
      <FavoritesButton />
      <AppbarCartButton />
    </div>
  </header>
</template>
