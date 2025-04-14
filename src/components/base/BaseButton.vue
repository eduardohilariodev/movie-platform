<script setup lang="ts">
import { ScButton } from '@/components/ui/button'
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip'

const props = defineProps<{
  label?: string
  variant?: 'default' | 'outline'
  size?: 'default' | 'sm' | 'lg' | 'icon'
  disabled?: boolean
  rounded?: boolean
  tooltipText?: string
  onClick?: () => void
}>()

const emit = defineEmits<{
  (e: 'click'): void
}>()

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
  emit('click')
}
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <ScButton
          :variant="variant || 'default'"
          :size="size || 'default'"
          :disabled="disabled"
          :class="{ 'rounded-full': rounded }"
          @click="handleClick"
        >
          <slot />
          {{ label }}
        </ScButton>
      </TooltipTrigger>
      <TooltipContent v-if="tooltipText">
        <p>{{ tooltipText }}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
