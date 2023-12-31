/** @format */

import React from "react";
import { useNavigate } from "react-router-dom";
import useMovieStore from "../store/movieStore"; // <-- Import useNavigate

const SearchBox = (props) => {
  const navigate = useNavigate();
  // <-- useNavigate hook
  const searchValue = useMovieStore((state) => state.searchValue);
  const typingTimer = useMovieStore((state) => state.typingTimer);
  const setSearchValue = useMovieStore((state) => state.setSearchValue);
  const setIsTyping = useMovieStore((state) => state.setIsTyping);
  const clearTypingTimer = useMovieStore((state) => state.clearTypingTimer);

  const handleInputChange = (event) => {
    setSearchValue(event.target.value);
    setIsTyping(true);

    // Clear any existing timers
    clearTypingTimer();

    // Set a new timer
    const timer = setTimeout(() => {
      setIsTyping(false);
      // Navigate to the search results page after the user stops typing
      navigate(`/search/${event.target.value}`);
    }, 1000);

    // Update typingTimer in the store
    useMovieStore.setState({ typingTimer: timer });
  };

  return (
    <div className="relative">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 text-gray-500"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </span>
      <input
        value={props.value}
        onChange={handleInputChange} // <-- Use the updated handler
        type="text"
        placeholder="Search for a movie..."
        className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow w-64"
      />
    </div>
  );
};

export default SearchBox;
