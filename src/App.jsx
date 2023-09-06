/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import { generatePrice } from "./scripts/helpers";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom"; // <-- Tambahkan useNavigate
import MovieDetail from "./components/MovieDetail";
import useMovieStore from "./store/movieStore";

function App() {
  const {
    movies,
    searchValue,
    currentPage,
    isTyping,
    setMovies,
    setSearchValue,
    setCurrentPage,
    setIsTyping,
  } = useMovieStore();

  const fetchMovies = async (searchValue, page = 1) => {
    const url = `https://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=74832bf4`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      const moviesWithPrice = responseJson.Search.map((movie) => ({
        ...movie,
        price: generatePrice(movie.imdbID), // Menambahkan harga ke setiap film
      }));
      setMovies(moviesWithPrice); // Change this line
    } else {
      setMovies([]); // And this line
    }
  };

  const handleSearch = (value) => {
    setIsTyping(true); // Change this line
    setSearchValue(value); // Change this line
    setCurrentPage(1); // Change this line
    setTimeout(() => {
      setIsTyping(false); // Change this line
    }, 500);
  };

  useEffect(() => {
    if (searchValue) {
      fetchMovies(searchValue, currentPage);
    }
  }, [searchValue, currentPage]);

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Header heading="Movies" />
          <SearchBox searchValue={searchValue} setSearchValue={handleSearch} />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <div className="grid">
                <MovieList movies={movies} />
                {!isTyping && movies.length > 0 && (
                  <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    movies={movies}
                  />
                )}
              </div>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <div className="grid">
                <MovieDetail
                  searchValue={searchValue}
                  setSearchValue={setSearchValue}
                  isTyping={isTyping}
                  setIsTyping={setIsTyping}
                />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
