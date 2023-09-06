/** @format */

// movieStore.js
import create from "zustand";

const useMovieStore = create((set) => ({
  movies: [],
  searchValue: "",
  currentPage: 1,
  typingTimer: null,
  isTyping: false,
  movieDetail: {},
  moviePrice: null,
  setMovieDetail: (detail) => set({ movieDetail: detail }),
  setMoviePrice: (price) => set({ moviePrice: price }),

  setMovies: (movies) => set({ movies }),
  setSearchValue: (value) => set({ searchValue: value }),
  setCurrentPage: (page) => set({ currentPage: page }),
  setIsTyping: (typing) => set({ isTyping: typing }),
}));

export default useMovieStore;
