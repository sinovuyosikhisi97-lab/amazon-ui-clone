"use client";

import { useState, useEffect } from "react";

const images = [
  "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a",
  "https://images.unsplash.com/photo-1512436991641-6745cdb1723f",
  "https://images.unsplash.com/photo-1498049794561-7780e7231661",
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full">

      <img
        src={images[index]}
        className="w-full h-[400px] object-cover transition duration-500"
      />

      <div className="absolute bottom-0 w-full h-64 bg-gradient-to-t from-[#e3e6e6] via-[#e3e6e6]/80 to-transparent" />

    </div>
  );
}