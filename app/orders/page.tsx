"use client";

import Navbar from "@/components/Navbar";
import { useOrders } from "@/context/OrderContext";

export default function OrdersPage() {
  const { orders } = useOrders();

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1000px] mx-auto p-6">

        <h1 className="text-xl font-bold mb-4">Your Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div key={order.id} className="bg-white p-4 mb-4">

              <p className="text-sm text-gray-500">
                Order ID: {order.id}
              </p>

              <p className="text-sm text-gray-500">
                Date: {new Date(order.createdAt).toLocaleString()}
              </p>

              <p className="font-bold mt-2">
                Total: R{order.total}
              </p>

              <div className="mt-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.title}</span>
                    <span>x{item.quantity}</span>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}