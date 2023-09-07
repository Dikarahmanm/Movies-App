/** @format */

import React from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useMovieStore from "../store/movieStore";

const MovieList = () => {
  // Extracting movies from useMovieStore
  const movies = useMovieStore((state) => state.movies);
  const movieDetail = useMovieStore((state) => state.movieDetail);
  const [cart, setCart] = useState([]);

  const handleCartClick = (movie) => {
    // Add the movie to the cart
    setCart([...cart, movie]);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {movies.map((movie, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <Link to={`/movie/${movie.imdbID}`}>
            <img
              src={movie.Poster}
              alt="movie"
              className="w-full h-60 object-cover rounded-t-lg mb-4"
            />
          </Link>
          <div className="p-4 bg-gray-900 text-white rounded-b-lg">
            <Link to={`/movie/${movie.imdbID}`} className="hover:underline">
              <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
            </Link>
            <p className="mb-2">
              <strong>Year: </strong> {movie.Year}
            </p>
            <p className="mb-2">
              <strong>Type: </strong>
              {movie.Type}
            </p>
            {movieDetail &&
              movieDetail.Genre && ( // Check if movieDetail and Genre exist
                <p className="my-2">
                  <strong>Genre:</strong> {movieDetail.Genre}
                </p>
              )}
            <button
              onClick={() => handleCartClick(movie)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md">
              <p>
                {movie.price.toLocaleString("id-ID", {
                  style: "currency",
                  currency: "IDR",
                })}
              </p>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MovieList;
