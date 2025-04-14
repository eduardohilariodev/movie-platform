<script setup lang="ts">
import { Trash } from 'lucide-vue-next'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{
  onClick: () => void
  tooltipText?: string
}>()
</script>

<template>
  <BaseButton variant="outline" :rounded="true" :tooltipText="tooltipText" :onClick="props.onClick">
    <Trash class="h-4 w-4" />
  </BaseButton>
</template>
