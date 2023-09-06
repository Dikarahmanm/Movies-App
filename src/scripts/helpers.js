/** @format */

export function generatePrice(imdbID) {
  const seed = parseInt(imdbID.slice(-5), 16);
  const random = Math.abs(Math.sin(seed)) * 900000; // Menggunakan Math.abs() untuk mendapatkan nilai absolut (positif)
  return Math.floor(random + 100000);
}

export const formatRupiah = (angka) => {
  let rupiah = "";
  const angkaStr = angka.toString().split("").reverse().join("");
  for (let i = 0; i < angkaStr.length; i++)
    if (i % 3 === 0) rupiah += angkaStr.substr(i, 3) + ".";
  return (
    "Rp " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
};
