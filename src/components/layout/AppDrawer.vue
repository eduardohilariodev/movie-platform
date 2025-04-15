<script setup lang="ts">
import { motion, AnimatePresence } from 'motion-v';

const props = withDefaults(
  defineProps<{
    isOpen: boolean
    title?: string
  }>(),
  {},
)

const emit = defineEmits<{
  (e: 'close'): void
}>()

function closeDrawer() {
  emit('close')
}

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

const drawerVariants = {
  hidden: {
    x: '100%',
    transition: {
      type: 'tween',
      ease: 'easeOut',
      duration: 0.3,
    },
  },
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 25,
      stiffness: 300,
    },
  },
}
</script>

<template>
  <AnimatePresence>
    <motion.div
      v-if="isOpen"
      class="fixed inset-0 z-40 bg-black/50"
      :variants="backdropVariants"
      :initial="'hidden'"
      :animate="'visible'"
      :exit="'hidden'"
      @click="closeDrawer"
      @mousedown.prevent
    ></motion.div>
  </AnimatePresence>

  <AnimatePresence>
    <motion.div
      v-if="isOpen"
      class="fixed top-20 right-0 bottom-24 z-50 m-4 flex flex-col rounded-md border-2 border-neutral-200/12 bg-neutral-950/95 p-4 md:top-30 md:min-w-96"
      :variants="drawerVariants"
      :initial="'hidden'"
      :animate="'visible'"
      :exit="'hidden'"
      @click.stop
      @mousedown.prevent
    >
      <div class="mt-2 mb-6 flex items-center justify-between" @mousedown.prevent>
        <h2 class="text-2xl font-bold text-neutral-100">{{ title }}</h2>
        <slot name="header-actions"></slot>
      </div>
      <div class="size-full overflow-y-auto">
        <slot></slot>
      </div>
      <div class="flex items-center justify-between">
        <slot name="footer-actions"></slot>
      </div>
    </motion.div>
  </AnimatePresence>
</template>
