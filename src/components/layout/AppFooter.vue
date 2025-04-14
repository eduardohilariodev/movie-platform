<script setup lang="ts">
import { useRouter } from 'vue-router'
import { GithubIcon } from 'lucide-vue-next'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

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
          <span class="text-xl tracking-widest">SONATA </span>
          <span class="text-sm text-neutral-400">© {{ currentYear }}</span>
        </div>

        <div class="flex items-center gap-6">
          <span class="text-sm text-neutral-400"> Made with 💚 by Eduardo Hilário</span>
        </div>

        <div class="flex items-center gap-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://github.com/eduardohilariodev/movie-platform" target="_blank">
                  <GithubIcon class="h-8 w-8 text-neutral-400 transition-colors hover:text-white" />
                </a>
                <TooltipContent> Source code </TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <a href="https://eduardohilariodev.com" target="_blank">
                  <div class="h-12 w-12 transition-all duration-300 hover:scale-110">
                    <svg
                      class="h-full w-full text-neutral-400 transition-colors hover:text-white"
                      viewBox="0 0 500 246.54"
                      xmlns="http://www.w3.org/2000/svg"
                      style="
                        -webkit-mask-image: url(/logo_eh.svg);
                        mask-image: url(/logo_eh.svg);
                        -webkit-mask-repeat: no-repeat;
                        mask-repeat: no-repeat;
                        -webkit-mask-size: contain;
                        mask-size: contain;
                        -webkit-mask-position: center;
                        mask-position: center;
                      "
                    >
                      <rect x="0" y="0" width="100%" height="100%" fill="currentColor" />
                    </svg>
                  </div>
                </a>
                <TooltipContent>Personal website</TooltipContent>
              </TooltipTrigger>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  </footer>
</template>
