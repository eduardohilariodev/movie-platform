<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton'
</script>

<template>
  <div
    class="flex h-full flex-col rounded-[1.8rem] border-2 border-neutral-100/12 bg-neutral-950/95"
  >
    <div class="flex-grow p-4 pb-0">
      <Skeleton class="aspect-[2/3] w-full rounded-lg" />
    </div>
    <div
      class="m-1 flex flex-col gap-4 rounded-3xl border-1 border-neutral-100/12 bg-neutral-950/48 p-3 backdrop-blur-md"
    >
      <div class="flex flex-col gap-1">
        <Skeleton class="h-6 w-3/4" />
        <Skeleton class="h-4 w-1/4" />
      </div>
      <div class="flex gap-2 text-sm font-light text-neutral-200">
        <Skeleton class="h-4 w-10" />
        <!-- Year -->
        <span class="text-neutral-500">•</span>
        <Skeleton class="h-4 w-16" />
        <!-- Genre -->
        <span class="text-neutral-500">•</span>
        <div class="flex items-center gap-1.5">
          <Skeleton class="h-4 w-4 rounded-full" />
          <!-- Star icon -->
          <Skeleton class="h-4 w-8" />
          <!-- Rating -->
        </div>
      </div>
      <div class="flex w-full justify-end gap-2">
        <Skeleton class="h-8 w-8 rounded-full" />
        <!-- Favorite button -->
        <Skeleton class="h-8 w-8 rounded-full" />
        <!-- Cart button -->
      </div>
    </div>
  </div>
</template>
