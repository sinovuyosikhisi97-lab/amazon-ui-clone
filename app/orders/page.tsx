"use client";

import Navbar from "@/components/Navbar";
import { useOrders } from "@/context/OrderContext";
import Image from "next/image";

export default function OrdersPage() {
  const { orders } = useOrders();

  const getStatusColor = (status: string) => {
    if (status === "processing") return "text-yellow-500";
    if (status === "shipped") return "text-blue-500";
    if (status === "cancelled") return "text-red-500";
    return "text-green-600"; // pending / delivered
  };

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1000px] mx-auto p-6">

        <h1 className="text-xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => {
            // ✅ fallback for old data
            const total =
              order.totalAmount ??
              order.items.reduce(
                (sum, item) =>
                  sum + item.price * item.quantity,
                0
              );

            return (
              <div
                key={order.id}
                className="bg-white p-4 mb-6 shadow-sm border rounded-lg"
              >

                {/* HEADER */}
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Order ID: {order.id}</span>
                  <span>
                    {new Date(order.createdAt).toLocaleString()}
                  </span>
                </div>

                {/* STATUS */}
                <p className={`mt-2 text-sm font-semibold capitalize ${getStatusColor(order.status)}`}>
                  {order.status}
                </p>

                {/* ITEMS */}
                <div className="mt-4 space-y-3">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 border-b pb-2"
                    >
                      {/* IMAGE */}
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={64}
                        height={64}
                        className="object-contain"
                      />

                      {/* INFO */}
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {item.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          Qty: {item.quantity}
                        </p>
                      </div>

                      {/* PRICE */}
                      <p className="font-bold text-sm">
                        R{item.price.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>

                {/* TOTAL */}
                <div className="mt-4 text-right">
                  <p className="font-bold text-lg">
                    Total: R{total.toLocaleString()}
                  </p>
                </div>

              </div>
            );
          })
        )}

      </div>
    </div>
  );
}