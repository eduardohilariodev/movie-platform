import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSearchStore = defineStore('search', () => {
  // State
  const isSearchActive = ref(false)
  const searchQuery = ref('')

  // Actions
  function activateSearch() {
    isSearchActive.value = true
  }

  function deactivateSearch() {
    isSearchActive.value = false
  }

  function toggleSearch() {
    isSearchActive.value = !isSearchActive.value
  }

  function setSearchQuery(query: string) {
    searchQuery.value = query
  }

  function clearSearchQuery() {
    searchQuery.value = ''
  }

  return {
    // State
    isSearchActive,
    searchQuery,

    // Actions
    activateSearch,
    deactivateSearch,
    toggleSearch,
    setSearchQuery,
    clearSearchQuery,
  }
})
