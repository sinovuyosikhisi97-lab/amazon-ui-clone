"use client";

import { useState } from "react";
import { useProducts } from "@/context/ProductContext";

export default function AdminPage() {
  const { products, addProduct, deleteProduct } = useProducts();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Electronics");

  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddOrUpdate = () => {
    if (!title || !price) return;

    const productData = {
      id: editingId || `product-${Date.now()}`,
      title,
      price: Number(price),
      image: image || "https://picsum.photos/300",
      category,
      description,
    };

    if (editingId) {
      // 🔥 keep your logic (delete + add)
      deleteProduct(editingId);
      addProduct(productData);
      setEditingId(null);
    } else {
      addProduct(productData);
    }

    // reset form
    setTitle("");
    setPrice("");
    setImage("");
    setDescription(""); // ✅ FIXED
    setCategory("Electronics");
  };

  const handleEdit = (p: any) => {
    setEditingId(p.id);
    setTitle(p.title);
    setPrice(String(p.price));
    setImage(p.image);
    setCategory(p.category);
    setDescription(p.description || ""); // ✅ FIXED
  };

  return (
    <div className="p-6 max-w-[1200px] mx-auto">

      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {/* 📊 STATS */}
      <div className="bg-white p-4 mb-6 shadow">
        <p className="text-lg font-semibold">
          Total Products: {products.length}
        </p>
      </div>

      {/* ➕ ADD / EDIT FORM */}
      <div className="bg-white p-4 mb-6 grid gap-2 shadow">

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

        {/* ✅ NEW: DESCRIPTION */}
        <textarea
          placeholder="Product Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 min-h-[80px]"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2"
        >
          <option>Electronics</option>
          <option>Fashion</option>
          <option>Gaming</option>
          <option>Home</option>
        </select>

        <button
          onClick={handleAddOrUpdate}
          className={`text-white py-2 ${
            editingId ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </div>

      {/* 📦 PRODUCT LIST */}
      <div className="bg-white p-4 shadow">
        <h2 className="font-bold mb-4">Products</h2>

        <div className="space-y-4">
          {products.map((p) => (
            <div
              key={p.id}
              className="flex items-center justify-between border-b pb-3"
            >
              {/* LEFT */}
              <div className="flex items-center gap-4">
                <img
                  src={p.image}
                  className="h-16 w-16 object-contain"
                />

                <div>
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-sm text-gray-500">
                    R{p.price} • {p.category}
                  </p>

                  {/* ✅ SHOW DESCRIPTION */}
                  <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                    {p.description}
                  </p>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex gap-2">

                <button
                  onClick={() => handleEdit(p)}
                  className="bg-blue-500 text-white px-3 py-1 text-sm"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProduct(p.id)}
                  className="bg-red-500 text-white px-3 py-1 text-sm"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}