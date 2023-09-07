/** @format */

// movieStore.js
import create from "zustand";

const useMovieStore = create((set) => ({
  movies: [],
  searchValue: "Avengers",
  currentPage: 1,
  totalPages: 0,
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

  setTotalPages: (pages) => set({ totalPages: pages }), // Action untuk mengatur total halaman
  incrementPage: () => set((state) => ({ currentPage: state.currentPage + 1 })),
  decrementPage: () => set((state) => ({ currentPage: state.currentPage - 1 })),
  clearTypingTimer: () => {
    const typingTimer = useMovieStore.getState().typingTimer;
    if (typingTimer) {
      clearTimeout(typingTimer);
    }
  },
}));

export default useMovieStore;
