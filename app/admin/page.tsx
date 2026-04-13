"use client";

import {useState} from "react";
import {useProducts} from "@/context/ProductContext";
import {useAuth} from "@/context/AuthContext";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function AdminPage() {
    const {products, addProduct, deleteProduct} = useProducts();

    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [image, setImage] = useState("");
    const {user} = useAuth();
    const router = useRouter();
    const [category, setCategory] = useState("Electronics");

    useEffect(() => {
        if (!user) {
            router.push("/login");
        }
    }, [user]);

    const handleAdd = () => {
        if (!title || !price) return;

        addProduct({
            id: `product-${Date.now()}`,
            title,
            price: Number(price),
            image: image || "https://picsum.photos/300",
            category: category,
        });

        setTitle("");
        setPrice("");
        setImage("");
    };

    const {logout} = useAuth();

    return (
        <div className="p-6 max-w-[1000px] mx-auto">
            <h1 className="text-xl font-bold mb-4">Admin Dashboard</h1>

            {/* ADD PRODUCT */}
            <div className="bg-white p-4 mb-6 grid gap-2">
                <input
                    placeholder="Product Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2"
                />

                <input
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border p-2"
                />

                <input
                    placeholder="Image URL"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    className="border p-2"
                />

                <select onChange={(e) => setCategory(e.target.value)} className="border p-2">
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Gaming</option>
                    <option>Home</option>
                </select>

                <button onClick={handleAdd} className="bg-green-500 text-white py-2">
                    Add Product
                </button>
            </div>

            {/* PRODUCT LIST */}
            <div className="bg-white p-4">
                {products.map((p) => (
                    <div key={p.id} className="flex justify-between border-b py-2">
                        <span>{p.title}</span>

                        <button onClick={() => deleteProduct(p.id)} className="text-red-500">
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <button
                onClick={() => {
                    logout();
                    router.push("/login");
                }}
                className="bg-red-500 text-white px-4 py-2 mb-4"
            >
                Logout
            </button>
        </div>
    );
}
