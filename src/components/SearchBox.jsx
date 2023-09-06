/** @format */

import React from "react";
import { useEffect, useState } from "react";

const SearchBox = (props) => {
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (event) => {
    setIsTyping(true);
    props.setSearchValue(event.target.value);

    // Clear any existing timers
    clearTimeout(typingTimer);
    typingTimer = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
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
        onChange={handleInputChange}
        type="text"
        placeholder="Search for a movie..."
        className="p-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 flex-grow w-64"
      />
    </div>
  );
};

export default SearchBox;
