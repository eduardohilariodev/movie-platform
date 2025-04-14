<script setup lang="ts">
import { Trash } from 'lucide-vue-next'
import BaseButton from '@/components/base/BaseButton.vue'

const props = defineProps<{
  onClick: () => void
  tooltipText?: string
}>()
</script>

<template>
  <BaseButton variant="outline" rounded :tooltipText="tooltipText" :onClick="props.onClick">
    <Trash class="h-3 w-3" />
  </BaseButton>
</template>
