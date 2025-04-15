import type { Movie, MovieResponse } from '@/types'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { TMDB_GENRE_MAP } from '@/lib/constants'
import { ref } from 'vue'

function mapMovie(movie: MovieResponse): Movie {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: movie.poster_path
      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
      : '/placeholder.png',
    voteAverage: Number(movie.vote_average.toFixed(1)) || 3.7,
    isFavorite: false,
    releaseDate: movie.release_date,
    genre:
      movie.genre_ids.length > 0
        ? TMDB_GENRE_MAP[movie.genre_ids[0] as keyof typeof TMDB_GENRE_MAP]
        : 'Unknown',
    price: Number(
      (
        (Number(movie.vote_average.toFixed(1)) || 3.7) *
        (Number(movie.vote_average.toFixed(1)) || 3.7) *
        100
      ).toFixed(),
    ),
  }
}

export const useMovieStore = defineStore('movie', () => {
  const isRecommendationsLoading = ref(false)
  const movies = ref<Movie[]>([])
  const currentRecommendationsPage = ref(1)
  const totalRecommendationsPages = ref(1)

  const isQueryLoading = ref(false)
  const isQueryLoadingMore = ref(false)
  const filteredMovies = ref<Movie[]>([])
  const currentSearchPage = ref(1)
  const totalSearchPages = ref(1)

  function addMovie(movie: Movie) {
    movies.value.push(movie)
  }

  async function queryMovies(query: string, page: number = 1) {
    if (page === 1 && isQueryLoading.value) return
    if (page > 1 && isQueryLoadingMore.value) return
    if (page > totalSearchPages.value && totalSearchPages.value > 0 && page > 1) return

    try {
      if (page === 1) {
        isQueryLoading.value = true
        currentSearchPage.value = 1
        totalSearchPages.value = 1
      } else {
        isQueryLoadingMore.value = true
      }

      const authStore = useAuthStore()
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
        {
          headers: authStore.getAuthHeader,
        },
      )
      const data = await response.json()
      const mappedMovies = data.results.map((movie: MovieResponse) => mapMovie(movie))

      if (page === 1) {
        filteredMovies.value = mappedMovies
      } else {
        filteredMovies.value = [...filteredMovies.value, ...mappedMovies]
      }
      currentSearchPage.value = data.page
      totalSearchPages.value = data.total_pages

      return data
    } catch (error) {
      console.error('Error querying movies:', error)
    } finally {
      if (page === 1) {
        isQueryLoading.value = false
      } else {
        isQueryLoadingMore.value = false
      }
    }
  }

  async function fetchMovies(page: number = 1) {
    if (isRecommendationsLoading.value) return
    if (page > totalRecommendationsPages.value && totalRecommendationsPages.value > 0 && page > 1)
      return

    try {
      isRecommendationsLoading.value = true
      const authStore = useAuthStore()

      const response = await fetch(`https://api.themoviedb.org/3/movie/popular?page=${page}`, {
        headers: authStore.getAuthHeader,
      })
      const data = await response.json()
      const mappedMovies = data.results.map((movie: MovieResponse) => mapMovie(movie))

      if (page === 1) {
        movies.value = mappedMovies
      } else {
        movies.value = [...movies.value, ...mappedMovies]
      }
      currentRecommendationsPage.value = data.page
      totalRecommendationsPages.value = data.total_pages

      return data
    } catch (error) {
      console.error('Error fetching popular movies:', error)
      throw error
    } finally {
      isRecommendationsLoading.value = false
    }
  }

  function clearSearchResults() {
    filteredMovies.value = []
    currentSearchPage.value = 1
    totalSearchPages.value = 1
  }

  return {
    movies,
    isRecommendationsLoading,
    currentRecommendationsPage,
    totalRecommendationsPages,
    fetchMovies,
    filteredMovies,
    isQueryLoading,
    isQueryLoadingMore,
    currentSearchPage,
    totalSearchPages,
    queryMovies,
    clearSearchResults,
    addMovie,
  }
})
