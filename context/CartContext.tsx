"use client";

import {createContext, useContext, useEffect, useState} from "react";

type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
    quantity: number;
};

type CartContextType = {
    cart: Product[];
    addToCart: (product: Omit<Product, "quantity">) => void;
    removeFromCart: (title: string) => void;
    increaseQty: (title: string) => void;
    decreaseQty: (title: string) => void;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({children}: {children: React.ReactNode}) => {
    const [cart, setCart] = useState<Product[]>([]);

    // ✅ LOAD from localStorage (on app start)
    useEffect(() => {
        const storedCart = localStorage.getItem("cart");
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    // ✅ SAVE to localStorage (on change)
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    // ADD
    const addToCart = (product: Omit<Product, "quantity">) => {
        setCart((prev) => {
            const exists = prev.find((item) => item.title === product.title);

            if (exists) {
                return prev.map((item) =>
                    item.title === product.title ? {...item, quantity: item.quantity + 1} : item
                );
            }

            return [...prev, {...product, quantity: 1}];
        });
    };

    // REMOVE
    const removeFromCart = (title: string) => {
        setCart((prev) => prev.filter((item) => item.title !== title));
    };

    // INCREASE
    const increaseQty = (title: string) => {
        setCart((prev) => prev.map((item) => (item.title === title ? {...item, quantity: item.quantity + 1} : item)));
    };

    // DECREASE
    const decreaseQty = (title: string) => {
        setCart((prev) =>
            prev
            .map((item) => (item.title === title ? {...item, quantity: item.quantity - 1} : item))
            .filter((item) => item.quantity > 0)
        );
    };

    return (
        <CartContext.Provider value={{cart, addToCart, removeFromCart, increaseQty, decreaseQty}}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("Cart not found");
    return context;
};
