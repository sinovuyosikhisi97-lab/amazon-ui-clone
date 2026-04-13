"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { products } from "@/data/products";

export default function ProductPage() {
  const { id } = useParams(); // ✅ FIX
  const { addToCart } = useCart();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-bold">Product not found</h1>
      </div>
    );
  }

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1400px] mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">

        {/* IMAGE */}
        <div className="flex justify-center items-center">
          <img src={product.image} className="max-h-[400px] object-contain" />
        </div>

        {/* INFO */}
        <div>
          <h1 className="text-lg font-semibold">{product.title}</h1>

          <p className="text-sm text-blue-500 mt-1 cursor-pointer">
            Visit the Store
          </p>

          <p className="text-sm mt-2">⭐⭐⭐⭐☆ 4.5 (2,345 ratings)</p>

          <hr className="my-3" />

          <p className="text-2xl font-bold text-red-600">
            R{product.price}
          </p>

          <p className="text-sm text-gray-600 mt-1">FREE delivery</p>

          <p className="mt-4 text-sm">{product.description}</p>
        </div>

        {/* BUY BOX */}
        <div className="border p-4 h-fit rounded">
          <p className="text-xl font-bold">R{product.price}</p>

          <p className="text-sm text-green-600 mt-1">In Stock</p>

          <button
            onClick={() =>
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              })
            }
            className="bg-[#ffd814] hover:bg-[#f7ca00] w-full mt-4 py-2 rounded"
          >
            Add to Basket
          </button>

          <button
            onClick={() => {
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.image,
              });
              window.location.href = "/cart";
            }}
            className="bg-[#ffa41c] hover:bg-[#fa8900] w-full mt-2 py-2 rounded"
          >
            Buy Now
          </button>
        </div>

      </div>
    </div>
  );
}