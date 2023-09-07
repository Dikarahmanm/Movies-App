/** @format */

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // Import useNavigate
import useMovieStore from "../store/movieStore"; // Import useMovieStore
import Pagination from "./Pagination"; // Import komponen Pagination
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
  } = useMovieStore();
  const { query, page } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate(); // Gunakan useNavigate

  // Do your fetching or filtering logic here based on the query

  const fetchMovies = async (searchValue, page = 1) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=74832bf4`;

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
      setTotalPages(pages); // Atur totalPages di store
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
      // Gunakan query jika ada
      const currentPageToUse = query ? 1 : currentPage; // Atur currentPage ke 1 jika ada query pencarian
      fetchMovies(query || searchValue, currentPageToUse);
    }
  }, [searchValue, currentPage, query]); // Tambahkan query sebagai dependency

  return (
    <div>
      <h1>Search results for {query}</h1>
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
              <p className="mb-2">Year: {movie.Year}</p>
              <p className="mb-2">Type: {movie.Type}</p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
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

      {totalPages > 1 && ( // Tampilkan pagination hanya jika totalPages > 1
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
