<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import { RouterLink } from 'vue-router'
import CartButton from '@/components/CartButton.vue'
import FavoritesButton from '../FavoritesButton.vue'
</script>

<template>
  <header class="flex items-center justify-between bg-neutral-100 p-4">
    <nav>
      <RouterLink to="/">
        <h1 class="text-2xl font-bold">Movie Store</h1>
      </RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
    <SearchInput />
    <div class="flex items-center gap-4">
      <FavoritesButton />
      <CartButton />
    </div>
  </header>
</template>
