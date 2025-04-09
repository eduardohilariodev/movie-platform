<script setup lang="ts">
import SearchInput from '@/components/SearchInput.vue'
import { Heart } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import CartButton from '@/components/CartButton.vue'
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
      <Heart class="text-gray-500" />
      <CartButton />
    </div>
  </header>
</template>
