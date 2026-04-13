"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Props = {
  id: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ id, title, price, image }: Props) {
  const { addToCart } = useCart();

  return (
    <div className="bg-white p-4 flex flex-col justify-between h-[300px] z-10 hover:shadow-md transition">

      {/* 🔥 WRAPPED CLICKABLE AREA */}
      <Link href={`/product/${id}`} className="flex-1 flex flex-col">

        <h2 className="text-sm font-semibold line-clamp-2 cursor-pointer">
          {title}
        </h2>

        <div className="flex justify-center items-center h-32 my-2">
          <img
            src={image}
            className="max-h-full object-contain"
          />
        </div>

        <p className="text-xs text-gray-600">⭐⭐⭐⭐☆ (123)</p>

        <p className="font-bold text-lg mt-1">R{price}</p>

      </Link>

      {/* 🔥 BUTTON OUTSIDE LINK */}
      <button
        onClick={(e) => {
          e.stopPropagation(); // ✅ prevents navigation
          addToCart({ id, title, price, image });
        }}
        className="bg-[#ffd814] hover:bg-[#f7ca00] mt-2 px-3 py-1 text-sm rounded w-full"
      >
        Add to Basket
      </button>

    </div>
  );
}