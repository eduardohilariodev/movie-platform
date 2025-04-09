import type { Movie } from '@/types'
import { defineStore } from 'pinia'

export const useMovieStore = defineStore('movie', {
  state: () => ({
    movies: [
      {
        id: 1,
        title: 'The Dark Knight',
        poster_path: '/dark-knight.jpg',
        genre: 'Action',
        releaseDate: '2008-07-18',
        rating: 8.4,
        price: 10.5,
        isFavorite: false,
      },
    ] as Movie[],
  }),
  actions: {
    addMovie(movie: Movie) {
      this.movies.push(movie)
    },
  },
})
