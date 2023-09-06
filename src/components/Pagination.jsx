/** @format */
import React from "react";
import useMovieStore from "../store/movieStore"; // Import the store

const Pagination = () => {
  // Extracting state and actions from useMovieStore
  const currentPage = useMovieStore((state) => state.currentPage);
  const movies = useMovieStore((state) => state.movies);
  const setCurrentPage = useMovieStore((state) => state.setCurrentPage);

  const showPrev = currentPage > 1;
  const showNext = movies.length === 10; // if there are 10 movies, it's likely there's a next page

  return (
    <div className="mt-6 flex justify-center">
      {showPrev && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-l"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
          Prev
        </button>
      )}
      <span className="mx-2 py-2 px-4 bg-gray-200">{currentPage}</span>
      {showNext && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={() => setCurrentPage((prev) => prev + 1)}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
