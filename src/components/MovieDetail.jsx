/** @format */

// components/MovieDetail.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=74832bf4`
      );
      const data = await response.json();
      setMovieDetail(data);
    };

    fetchDetail();
  }, [id]);

  return (
    <div className="p-4">
      <img
        src={movieDetail.Poster}
        alt={movieDetail.Title}
        className="w-64 h-auto mb-4"
      />
      <h1 className="text-xl font-bold">
        {movieDetail.Title} ({movieDetail.Year})
      </h1>
      <p className="my-2">
        <strong>Rated:</strong> {movieDetail.Rated}
      </p>
      <p className="my-2">
        <strong>Runtime:</strong> {movieDetail.Runtime}
      </p>
      <p className="my-2">
        <strong>Genre:</strong> {movieDetail.Genre}
      </p>
      <p className="my-2">
        <strong>Director:</strong> {movieDetail.Director}
      </p>
      <p className="my-2">
        <strong>Actors:</strong> {movieDetail.Actors}
      </p>
      <p className="my-2">
        <strong>Plot:</strong> {movieDetail.Plot}
      </p>
      <p className="my-2">
        <strong>Language:</strong> {movieDetail.Language}
      </p>
      <p className="my-2">
        <strong>Country:</strong> {movieDetail.Country}
      </p>
      <p className="my-2">
        <strong>Awards:</strong> {movieDetail.Awards}
      </p>
      <p className="my-2">
        <strong>Ratings:</strong>
      </p>
      <ul className="pl-4">
        {movieDetail.Ratings &&
          movieDetail.Ratings.map((rating, index) => (
            <li key={index}>
              <strong>{rating.Source}:</strong> {rating.Value}
            </li>
          ))}
      </ul>
      <p className="my-2">
        <strong>IMDb Rating:</strong> {movieDetail.imdbRating}
      </p>
      <p className="my-2">
        <strong>Box Office:</strong> {movieDetail.BoxOffice}
      </p>
      {/* Anda bisa menambahkan informasi lainnya sesuai kebutuhan */}
    </div>
  );
};

export default MovieDetail;
