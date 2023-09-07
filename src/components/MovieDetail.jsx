/** @format */

// components/MovieDetail.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generatePrice, formatRupiah } from "../scripts/helpers";
import useMovieStore from "../store/movieStore";

const MovieDetail = ({
  searchValue,
  setSearchValue,
  isTyping,
  setIsTyping,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const movieDetail = useMovieStore((state) => state.movieDetail);
  const setMovieDetail = useMovieStore((state) => state.setMovieDetail);
  const moviePrice = useMovieStore((state) => state.moviePrice);
  const setMoviePrice = useMovieStore((state) => state.setMoviePrice);

  useEffect(() => {
    const fetchDetail = async () => {
      const response = await fetch(
        `https://www.omdbapi.com/?i=${id}&apikey=74832bf4`
      );
      const data = await response.json();
      setMovieDetail(data);
      setMovieDetail(data);
      setMoviePrice(generatePrice(id));
    };

    fetchDetail();
  }, [id]);

  useEffect(() => {
    if (searchValue && !isTyping) {
      const fetchSearch = async () => {
        const response = await fetch(
          `https://www.omdbapi.com/?s=${searchValue}&apikey=74832bf4`
        );
        const data = await response.json();
        if (data.Search && data.Search.length > 0) {
          navigate(`/movie/${data.Search[0].imdbID}`);
        } else {
          // Jika kita berada di halaman detail saat pencarian, navigasi kembali ke halaman utama.
          if (window.location.pathname.includes("/movie/")) {
            navigate("/");
          }
        }
      };

      fetchSearch();
    }
  }, [searchValue, isTyping, navigate]);

  const addToCart = () => {
    alert("Berhasil ditambahkan ke keranjang!");
  };

  return (
    <div className="p-4 row">
      <img
        src={movieDetail.Poster}
        alt={movieDetail.Title}
        className="w-64 h-auto mb-4"
      />

      <div className="row">
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
        {moviePrice && (
          <button
            onClick={() => addToCart(movieDetail)}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Buy for {formatRupiah(moviePrice)}
          </button>
        )}
        {/* Anda bisa menambahkan informasi lainnya sesuai kebutuhan */}
      </div>
    </div>
  );
};

export default MovieDetail;
