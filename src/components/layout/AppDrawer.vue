<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  isOpen: boolean
  position?: 'right' | 'left'
  title?: string
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const isVisible = ref(false)
const isAnimating = ref(false)
const animationClass = ref(
  props.position === 'left' ? 'animate__slideInLeft' : 'animate__slideInRight',
)
const backdropClass = ref('animate__fadeIn')

watch(
  () => props.isOpen,
  (newValue) => {
    if (newValue) {
      // Opening
      isVisible.value = true
      animationClass.value =
        props.position === 'left' ? 'animate__slideInLeft' : 'animate__slideInRight'
      backdropClass.value = 'animate__fadeIn'
      return
    }
    // Closing
    animationClass.value =
      props.position === 'left' ? 'animate__slideOutLeft' : 'animate__slideOutRight'
    backdropClass.value = 'animate__fadeOut'
    isAnimating.value = true
    setTimeout(() => {
      isVisible.value = false
      isAnimating.value = false
    }, 1000) // Animation duration
  },
  { immediate: true },
)

function closeDrawer() {
  emit('close')
}
</script>

<template>
  <div
    :class="['animate__animated fixed inset-0 z-40 bg-black/50', backdropClass]"
    v-show="isVisible || isOpen"
    @click="closeDrawer"
  ></div>
  <div
    :class="[
      'animate__animated fixed top-30 bottom-0 z-50 m-4 flex min-w-72 flex-col rounded-md border-2 border-neutral-200/12 bg-neutral-950/95 p-4',
      props.position === 'left' ? 'left-0' : 'right-0',
      animationClass,
    ]"
    v-show="isVisible || isOpen"
    @click.stop
  >
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-bold text-neutral-100">{{ title }}</h2>
      <slot name="header-actions"></slot>
    </div>
    <div>
      <slot></slot>
    </div>
    <div class="flex items-center justify-between">
      <slot name="footer-actions"></slot>
    </div>
  </div>
</template>
