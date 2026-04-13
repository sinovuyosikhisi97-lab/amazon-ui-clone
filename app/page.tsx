"use client";

import {useEffect, useState} from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import {useProducts} from "@/context/ProductContext";

export default function Home() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [sort, setSort] = useState("default");
    const [visibleCount, setVisibleCount] = useState(20);
    const {products} = useProducts();

    const filteredProducts = products
    .filter((p) => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category === "All" || p.category === category;

        return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
        if (sort === "low-high") return a.price - b.price;
        if (sort === "high-low") return b.price - a.price;
        if (sort === "a-z") return a.title.localeCompare(b.title);
        if (sort === "z-a") return b.title.localeCompare(a.title);
        return 0;
    });
    const visibleProducts = filteredProducts.slice(0, visibleCount);
    const categories = ["All", "Electronics", "Fashion", "Gaming", "Home"];

    useEffect(() => {
        const handleScroll = () => {
            const bottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;

            if (bottom) {
                setVisibleCount((prev) => prev + 20);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setVisibleCount(20);
    }, [search, category, sort]);

    return (
        <div className="bg-[#e3e6e6] min-h-screen">
            <Navbar search={search} setSearch={setSearch} />
            <Hero />

            <div className="max-w-[1500px] mx-auto">
                {/* 🔥 CATEGORY FILTER BAR */}
                <div className="flex gap-3 px-4 py-4 overflow-x-auto">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`px-4 py-1 text-sm rounded border ${
                                category === cat ? "bg-[#ffd814] border-yellow-400" : "bg-white"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
                <div className="flex justify-end px-4 mb-2">
                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="p-2 text-sm border bg-white"
                    >
                        <option value="default">Sort by</option>
                        <option value="low-high">Price: Low to High</option>
                        <option value="high-low">Price: High to Low</option>
                        <option value="a-z">Name: A → Z</option>
                        <option value="z-a">Name: Z → A</option>
                    </select>
                </div>
                {/* PRODUCT GRID */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 pb-10">
                    {filteredProducts.length === 0 ? (
                        <p className="col-span-full text-center text-gray-600">No products found</p>
                    ) : (
                        visibleProducts.map((p) => <ProductCard key={p.id} {...p} />)
                    )}
                </div>

                {visibleCount < filteredProducts.length && (
                    <p className="text-center py-4 text-gray-500">Loading more products...</p>
                )}
            </div>
        </div>
    );
}
