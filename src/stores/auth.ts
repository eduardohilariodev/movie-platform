import { defineStore } from 'pinia'

interface TMDBAuthState {
  apiKey: string | null
  accessToken: string | null
  isAuthenticated: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): TMDBAuthState => ({
    apiKey: import.meta.env.VITE_TMDB_API_KEY || null,
    accessToken: import.meta.env.VITE_TMDB_READ_ACCESS_TOKEN || null,
    isAuthenticated: false,
  }),

  getters: {
    getApiKey: (state) => state.apiKey,
    getAccessToken: (state) => state.accessToken,
    getAuthHeader: (state) => ({
      Authorization: `Bearer ${state.accessToken}`,
    }),
  },

  actions: {
    initialize() {
      // Check if tokens are available
      if (this.apiKey && this.accessToken) {
        this.isAuthenticated = true
      }
    },

    reset() {
      this.isAuthenticated = false
    },
  },
})
