<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div class="flex h-fit w-fit flex-col rounded-md border-2 border-gray-300">
    <div class="relative aspect-square">
      <Skeleton class="size-full" />
    </div>
    <div class="flex flex-col items-center justify-center space-y-2 p-4">
      <Skeleton class="h-6 w-3/4" />
      <Skeleton class="h-4 w-1/4" />
      <div class="flex w-full justify-center gap-4">
        <div class="flex items-center gap-2">
          <Skeleton class="h-5 w-5 rounded-full" />
          <Skeleton class="h-4 w-8" />
        </div>
        <Skeleton class="h-4 w-12" />
      </div>
      <Skeleton class="h-4 w-10" />
    </div>
    <Skeleton class="h-10 w-full rounded-t-none" />
  </div>
</template>
