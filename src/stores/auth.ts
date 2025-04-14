import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const apiKey = ref(import.meta.env.VITE_TMDB_API_KEY || null)
  const accessToken = ref(import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN || null)
  const isAuthenticated = ref(false)

  const getApiKey = computed(() => apiKey.value)
  const getAccessToken = computed(() => accessToken.value)
  const getAuthHeader = computed(() => ({
    Authorization: `Bearer ${accessToken.value}`,
  }))

  function initialize() {
    // Check if tokens are available
    if (apiKey.value && accessToken.value) {
      isAuthenticated.value = true
    }
  }

  function reset() {
    isAuthenticated.value = false
  }

  return {
    apiKey,
    accessToken,
    isAuthenticated,
    getApiKey,
    getAccessToken,
    getAuthHeader,
    initialize,
    reset,
  }
})
