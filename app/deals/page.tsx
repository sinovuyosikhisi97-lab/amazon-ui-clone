"use client";

import Navbar from "@/components/Navbar";
import { useProducts } from "@/context/ProductContext";
import ProductCard from "@/components/ProductCard";

export default function DealsPage() {
  const { products } = useProducts();

  const deals = products.filter((p) => p.isDeal);

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1400px] mx-auto p-6">

        <h1 className="text-2xl font-bold mb-6">
          🔥 Today's Deals
        </h1>

        {deals.length === 0 ? (
          <p>No deals available</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {deals.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
}