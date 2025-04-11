import type { Movie, MovieResponse } from '@/types'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { TMDB_GENRE_MAP } from '@/lib/constants'

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

export const useMovieStore = defineStore('movie', {
  state: () => ({
    isRecommendationsLoading: false,
    isQueryLoading: false,
    movies: [] as Movie[],
    filteredMovies: [] as Movie[],
  }),
  actions: {
    addMovie(movie: Movie) {
      this.movies.push(movie)
    },
    async queryMovies(query: string) {
      try {
        this.isQueryLoading = true
        const authStore = useAuthStore()

        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}`, {
          headers: authStore.getAuthHeader,
        })
        const data = await response.json()
        this.filteredMovies = data.results.map((movie: MovieResponse) => mapMovie(movie))
      } catch (error) {
        console.error(error)
      } finally {
        this.isQueryLoading = false
      }
    },
    async fetchMovies() {
      try {
        this.isRecommendationsLoading = true
        const authStore = useAuthStore()

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
          headers: authStore.getAuthHeader,
        })
        const data = await response.json()
        this.movies = data.results.map((movie: MovieResponse) => mapMovie(movie))
      } catch (error) {
        console.error(error)
      } finally {
        this.isRecommendationsLoading = false
      }
    },
  },
})
