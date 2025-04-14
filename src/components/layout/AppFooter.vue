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
  <footer class="mt-auto border-t border-neutral-800 bg-neutral-950 py-6">
    <div class="container mx-auto px-4">
      <div class="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div class="flex items-center gap-2">
          <BaseButton variant="outline" rounded @click="navigateToHome">
            <span class="text-xl font-bold">SC</span>
          </BaseButton>
          <span class="text-sm text-neutral-400">© {{ currentYear }} SceneShop</span>
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
