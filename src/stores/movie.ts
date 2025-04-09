import type { Movie, MovieResponse } from '@/types'
import { defineStore } from 'pinia'
import { useAuthStore } from '@/stores/auth'
import { TMDB_GENRE_MAP } from '@/lib/constants'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    isLoading: false,
    movies: [
      {
        id: 1,
        title: 'The Dark Knight',
        posterPath: '/dark-knight.jpg',
        genre: 'Action',
        releaseDate: '2008-07-18',
        voteAverage: 8.4,
        price: 10.5,
        isFavorite: false,
      },
    ] as Movie[],
  }),
  actions: {
    addMovie(movie: Movie) {
      this.movies.push(movie)
    },
    async fetchMovies() {
      try {
        this.isLoading = true
        const authStore = useAuthStore()

        const response = await fetch(`https://api.themoviedb.org/3/movie/popular`, {
          headers: authStore.getAuthHeader,
        })
        const data = await response.json()
        this.movies = data.results.map((movie: MovieResponse) => ({
          ...movie,
          posterPath: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
          voteAverage: movie.vote_average.toFixed(1),
          releaseDate: movie.release_date,
          genre: TMDB_GENRE_MAP[movie.genre_ids[0] as keyof typeof TMDB_GENRE_MAP],
        }))
      } catch (error) {
        console.error(error)
      } finally {
        this.isLoading = false
      }
    },
  },
})
