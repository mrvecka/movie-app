import { makeAutoObservable } from "mobx";
import { createContext, useContext } from "react";

export interface Movie {
  imdbID: string;
  Title: string;
}

export class FavoriteMovieStore {
  movies: Movie[];
  moviesSet: Set<string>;

  constructor() {
    makeAutoObservable(this);

    const savedFavoritedMovies = localStorage.getItem("favoritedMovies");
    this.movies = savedFavoritedMovies ? JSON.parse(savedFavoritedMovies) : [];
    this.moviesSet = new Set(this.movies.map((m) => m.imdbID));
  }

  get isMovieFavorited() {
    return (movie: Movie) => this.moviesSet.has(movie.imdbID);
  }

  get favoritedMovies() {
    return this.movies;
  }

  addMovie(movie: Movie) {
    this.movies.push(movie);
    this.moviesSet.add(movie.imdbID);
  }

  removeMovie(movie: Movie) {
    this.movies = this.movies.filter((m) => m.imdbID !== movie.imdbID);
    this.moviesSet.delete(movie.imdbID);
  }

  toggleFavoritedMovie(movie: Movie) {
    if (this.moviesSet.has(movie.imdbID)) {
      this.removeMovie(movie);
    } else {
      this.addMovie(movie);
    }

    localStorage.setItem("favoritedMovies", JSON.stringify(this.movies));
  }
}
