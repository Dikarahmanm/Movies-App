/** @format */

import { useEffect, useState } from "react";
import "./App.css";
import MovieList from "./components/MovieList";
import Header from "./components/Header";
import SearchBox from "./components/SearchBox";
import Pagination from "./components/Pagination";
import { generatePrice } from "./scripts/helpers";
import SearchResults from "./components/SearchResults";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useParams,
} from "react-router-dom";
import MovieDetail from "./components/MovieDetail";
import useMovieStore from "./store/movieStore";

function App() {
  const {
    movies,
    searchValue,
    isTyping,
    setMovies,
    setSearchValue,
    totalPages,
    setTotalPages,
    setIsTyping,
    API_KEY,
  } = useMovieStore();
  const [currentPage, setCurrentPage] = useState(1);
  const { query } = useParams();

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
    // Fetch data when the component initially mounts
    fetchMovies("Avengers"); // Replace with your default query
  }, []); // Empty dependency array means this effect runs once on mount

  useEffect(() => {
    if (searchValue || query) {
      const currentPageToUse = query ? 1 : currentPage;
      fetchMovies(query || searchValue, currentPageToUse);
    }
  }, [searchValue, currentPage, query]);

  return (
    <Router>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6 my-4">
          <Header heading="Movies" />
          <div className="ml-4">
            <SearchBox
              searchValue={searchValue}
              setSearchValue={handleSearch}
            />
          </div>
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
                    totalPages={totalPages}
                  />
                )}
              </div>
            }
          />
          <Route
            path="/movie/:id"
            element={
              <MovieDetail
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setIsTyping={setIsTyping}
              />
            }
          />
          <Route path="/search/*" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
