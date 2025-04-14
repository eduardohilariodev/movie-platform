<script setup lang="ts">
import AppDrawer from '@/components/layout/AppDrawer.vue'
import { useFavoriteStore } from '@/stores/favorite'
import { useDrawerStore } from '@/stores/drawer'
import FavoritesItem from '@/components/features/favorites/FavoritesItem.vue'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const favoriteStore = useFavoriteStore()
const drawerStore = useDrawerStore()
const { getFavoritesItems, favoritesCount } = storeToRefs(favoriteStore)

const isOpen = computed(() => drawerStore.isOpen && drawerStore.drawerType === 'favorites')
</script>

<template>
  <AppDrawer :is-open="isOpen" @close="drawerStore.close" title="Favoritos">
    <div class="flex flex-col gap-4">
      <div class="flex flex-col gap-4">
        <div v-if="!favoritesCount">
          <span>Nenhum filme favoritado</span>
        </div>
        <FavoritesItem v-else v-for="movie in getFavoritesItems" :key="movie.id" :movie="movie" />
      </div>
    </div>
  </AppDrawer>
</template>
