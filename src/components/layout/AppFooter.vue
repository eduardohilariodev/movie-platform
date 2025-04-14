<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const navigateToHome = () => {
  router.push('/')
}

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer
    class="fixed right-0 bottom-0 left-0 mt-auto border-t border-neutral-800 bg-neutral-950 px-4 py-6"
  >
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="flex items-center gap-2 text-neutral-400">
          <span class="text-xl tracking-widest">SONATA</span>
          <span class="text-sm">© {{ currentYear }} SONATA: The Movie Platform</span>
        </div>

        <div class="flex gap-4">
          <BaseButton variant="outline" size="sm">Termos de Uso</BaseButton>
          <BaseButton variant="outline" size="sm">Privacidade</BaseButton>
          <BaseButton variant="outline" size="sm">Contato</BaseButton>
        </div>
      </div>
    </div>
  </footer>
</template>
