"use client";

import { createContext, useContext, useEffect, useState } from "react";

type OrderItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
};

type Order = {
  id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
};

type OrderContextType = {
  orders: Order[];
  createOrder: (items: OrderItem[]) => void;
  updateOrderStatus: (id: string, status: string) => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // ✅ Load + FIX old data (missing totalAmount)
  useEffect(() => {
    const stored = localStorage.getItem("orders");

    if (stored) {
      const parsed = JSON.parse(stored);

      const fixedOrders = parsed.map((order: any) => ({
        ...order,
        totalAmount:
          order.totalAmount ??
          order.items.reduce(
            (sum: number, item: OrderItem) =>
              sum + item.price * item.quantity,
            0
          ),
      }));

      setOrders(fixedOrders);
    }
  }, []);

  // ✅ Save
  useEffect(() => {
    localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  // ✅ Create Order
  const createOrder = (items: OrderItem[]) => {
    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const newOrder: Order = {
      id: `ORD-${Date.now()}`,
      items,
      totalAmount,
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setOrders((prev) => [newOrder, ...prev]);
  };

  // ✅ Update Status
  const updateOrderStatus = (id: string, status: string) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  return (
    <OrderContext.Provider
      value={{ orders, createOrder, updateOrderStatus }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("Orders not found");
  return ctx;
};