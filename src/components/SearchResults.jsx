/** @format */

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import useMovieStore from "../store/movieStore";
import Pagination from "./Pagination";
import { generatePrice } from "../scripts/helpers";

const SearchResults = () => {
  const {
    movies,
    searchValue,
    isTyping,
    setMovies,
    setSearchValue,
    totalPages,
    setTotalPages,
    setIsTyping,
    movieDetail,
    API_KEY,
  } = useMovieStore();
  const { query, page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const fetchMovies = async (searchValue, page = 1) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=${API_KEY}`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      const moviesWithPrice = responseJson.Search.map((movie) => ({
        ...movie,
        price: generatePrice(movie.imdbID),
      }));
      setMovies(moviesWithPrice);
    } else {
      setMovies([]);
    }

    if (responseJson.totalResults) {
      const totalResults = parseInt(responseJson.totalResults, 10);
      const pages = Math.ceil(totalResults / 10);
      setTotalPages(pages);
    }
  };

  const handleSearch = (value) => {
    setIsTyping(true);
    setSearchValue(value);
    setCurrentPage(1);
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  useEffect(() => {
    if (searchValue || query) {
      const currentPageToUse = query ? 1 : currentPage;
      fetchMovies(query || searchValue, currentPageToUse);
    }
  }, [searchValue, currentPage, query]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">
        Search results for "{searchValue}"
      </h1>
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
                <strong>Year:</strong> {movie.Year}
              </p>
              <p className="mb-2">
                <strong>Type:</strong> {movie.Type}
              </p>
              {movie.price && (
                <p className="my-2">
                  <strong>Price:</strong>{" "}
                  {movie.price.toLocaleString("id-ID", {
                    style: "currency",
                    currency: "IDR",
                  })}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-6 flex justify-center">
          <Pagination
            currentPage={currentPage}
            setCurrentPage={(page) => {
              setCurrentPage(page);
              navigate(`/search/${query}?page=${page}`);
            }}
            totalPages={totalPages}
          />
        </div>
      )}
    </div>
  );
};

export default SearchResults;
