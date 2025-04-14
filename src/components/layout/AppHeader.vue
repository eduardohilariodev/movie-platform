<script setup lang="ts">
import SearchInput from '@/components/composed/SearchInput.vue'
import { RouterLink } from 'vue-router'
import AppbarCartButton from '@/components/features/cart/AppbarCartButton.vue'
import FavoritesButton from '../features/favorites/AppbarFavoritesButton.vue'
</script>

<template>
  <header
    class="fixed top-8 right-0 left-0 z-50 mx-auto my-0 flex max-w-[calc(100%-4rem)] items-center justify-between rounded-full border-2 border-neutral-200/12 bg-neutral-900/40 px-8 py-4 shadow-sm backdrop-blur-md sm:max-w-screen-sm lg:max-w-screen-md"
  >
    <nav>
      <RouterLink to="/">
        <h1 class="text-2xl tracking-widest text-neutral-100">SONATA</h1>
      </RouterLink>
    </nav>
    <SearchInput />
    <div class="flex items-center gap-4">
      <FavoritesButton />
      <AppbarCartButton />
    </div>
  </header>
</template>
