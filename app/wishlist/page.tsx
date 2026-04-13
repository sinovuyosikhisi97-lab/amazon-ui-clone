"use client";

import Navbar from "@/components/Navbar";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "@/components/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1200px] mx-auto p-6">
        <h1 className="text-xl font-bold mb-4">Your Wishlist</h1>

        {wishlist.length === 0 ? (
          <p>No items in wishlist</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {wishlist.map((item) => (
              <ProductCard key={item.id} {...item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}