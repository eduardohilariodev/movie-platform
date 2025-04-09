<script setup lang="ts">
import { HeartIcon } from 'lucide-vue-next'

const props = defineProps<{
  isActive: boolean
}>()
</script>

<template>
  <button :style="{ color: isActive ? 'black' : 'lightgray' }" class="hover:cursor-pointer">
    <HeartIcon :fill="isActive ? 'currentColor' : 'none'" />
  </button>
</template>
