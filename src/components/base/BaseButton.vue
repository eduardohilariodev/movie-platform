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
  class?: string
}>()

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
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
          :class="[
            {
              'aspect-square size-10 rounded-full': rounded,
              'rounded-full bg-white text-black hover:bg-neutral-100 dark:bg-neutral-100 dark:text-neutral-950 dark:hover:bg-neutral-200':
                variant === 'default',
              'border border-neutral-100/30 bg-transparent text-white hover:bg-white hover:text-neutral-950 dark:border-neutral-100/30 dark:hover:bg-white dark:hover:text-neutral-950':
                variant === 'outline',
            },
            props.class,
          ]"
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
