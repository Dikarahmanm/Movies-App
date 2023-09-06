/** @format */

export function generatePrice(imdbID) {
  const seed = parseInt(imdbID.slice(-5), 16);
  const random = Math.abs(Math.sin(seed)) * 900000; // Menggunakan Math.abs() untuk mendapatkan nilai absolut (positif)
  return Math.floor(random + 100000);
}
