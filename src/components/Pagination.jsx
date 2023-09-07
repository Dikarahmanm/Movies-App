/** @format */

import React from "react";

const Pagination = ({ currentPage, totalPages, setCurrentPage }) => {
  const showPrev = currentPage > 1;
  const showNext = currentPage < totalPages;

  const handlePrevClick = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-white my-4 px-4 py-3 sm:px-6">
      {showPrev && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-l"
          onClick={handlePrevClick}>
          Prev
        </button>
      )}
      <span className="mx-2 py-2 px-4 bg-gray-400">{currentPage}</span>
      {showNext && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-r"
          onClick={handleNextClick}>
          Next
        </button>
      )}
    </div>
  );
};

export default Pagination;
