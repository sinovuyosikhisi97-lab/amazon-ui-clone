"use client";

import { createContext, useContext, useEffect, useState } from "react";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  quantity: number;
  image: string; // ✅ added
};

type Order = {
  id: string;
  items: OrderItem[];
  total: number;
  createdAt: string;
  status: "Processing" | "Shipped" | "Delivered"; // ✅ added
};

type OrderContextType = {
  orders: Order[];
  createOrder: (items: OrderItem[]) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // ✅ Load orders safely
  useEffect(() => {
    try {
      const stored = localStorage.getItem("orders");
      if (stored) {
        setOrders(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load orders", err);
    }
  }, []);

  // ✅ Save orders
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ Create order
  const createOrder = (items: OrderItem[]) => {
    const total = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items,
      total,
      createdAt: new Date().toISOString(),
      status: "Processing", // ✅ default status
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  // ✅ Simulate delivery updates (optional but 🔥)
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => {
          if (order.status === "Processing") {
            return { ...order, status: "Shipped" };
          }
          if (order.status === "Shipped") {
            return { ...order, status: "Delivered" };
          }
          return order;
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <OrderContext.Provider value={{ orders, createOrder }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("Orders not found");
  return ctx;
};