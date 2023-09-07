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
    <div className="mt-6 flex justify-center">
      {showPrev && (
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-l"
          onClick={handlePrevClick}>
          Prev
        </button>
      )}
      <span className="mx-2 py-2 px-4 bg-gray-200">{currentPage}</span>
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
