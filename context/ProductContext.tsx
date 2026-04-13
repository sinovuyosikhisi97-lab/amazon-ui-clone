"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  description: string
};

type ProductContextType = {
  products: Product[];
  addProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
};

const ProductContext = createContext<ProductContextType | null>(null);

export const ProductProvider = ({ children }: any) => {
  const [products, setProducts] = useState<Product[]>([]);

  // load
  useEffect(() => {
    const stored = localStorage.getItem("products");
    if (stored) setProducts(JSON.parse(stored));
  }, []);

  // save
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  const addProduct = (product: Product) => {
    setProducts((prev) => [product, ...prev]);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("Products not found");
  return ctx;
};