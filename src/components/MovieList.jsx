/** @format */
import React from "react";

const MovieList = (props) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {props.movies.map((movie, index) => (
        <div
          key={index}
          className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
          <img
            src={movie.Poster}
            alt="movie"
            className="w-full h-60 object-cover rounded-t-lg mb-4"
          />
          <div className="p-4 bg-gray-900 text-white rounded-b-lg">
            <h2 className="text-xl font-semibold mb-2">{movie.Title}</h2>
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
  );
};

export default MovieList;
