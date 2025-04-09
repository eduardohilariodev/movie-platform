<script setup lang="ts">
import { Heart } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { useFavoriteStore } from '@/stores/favorite'

const favoriteStore = useFavoriteStore()
</script>

<template>
  <Button variant="outline" @click="favoriteStore.toggleDrawer">
    <Heart class="text-gray-500" />
  </Button>
</template>
