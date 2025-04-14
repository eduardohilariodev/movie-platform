import type { Movie, MovieResponse } from '@/types'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { TMDB_GENRE_MAP } from '@/lib/constants'
import { ref } from 'vue'

function mapMovie(movie: MovieResponse): Movie {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
    voteAverage: Number(movie.vote_average.toFixed(1)) || 3.7,
    isFavorite: false,
    releaseDate: movie.release_date,
    genre: TMDB_GENRE_MAP[movie.genre_ids[0] as keyof typeof TMDB_GENRE_MAP],
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
  const isQueryLoading = ref(false)
  const movies = ref<Movie[]>([])
  const filteredMovies = ref<Movie[]>([])
  const currentPage = ref(1)
  function addMovie(movie: Movie) {
    movies.value.push(movie)
  }

  async function queryMovies(query: string) {
    try {
      isQueryLoading.value = true
      const authStore = useAuthStore()

      const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
        headers: authStore.getAuthHeader,
      })
      const data = await response.json()
      filteredMovies.value = data.results.map((movie: MovieResponse) => mapMovie(movie))
    } catch (error) {
      console.error(error)
    } finally {
      isQueryLoading.value = false
    }
  }

  async function fetchMovies(page: number = 1) {
    try {
      isRecommendationsLoading.value = true
      const authStore = useAuthStore()

      currentPage.value = page

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?page=${currentPage.value}`,
        {
          headers: authStore.getAuthHeader,
        },
      )
      const data = await response.json()
      const mappedMovies = data.results.map((movie: MovieResponse) => mapMovie(movie))

      movies.value = page > 1 ? [...movies.value, ...mappedMovies] : mappedMovies
      return data
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      isRecommendationsLoading.value = false
    }
  }

  return {
    addMovie,
    fetchMovies,
    filteredMovies,
    isQueryLoading,
    isRecommendationsLoading,
    movies,
    currentPage,
    queryMovies,
  }
})
