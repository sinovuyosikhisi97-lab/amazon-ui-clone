"use client";

import Navbar from "@/components/Navbar";
import { useOrders } from "@/context/OrderContext";

export default function OrdersPage() {
  const { orders } = useOrders();

  const getStatusColor = (status: string) => {
    if (status === "Processing") return "text-yellow-500";
    if (status === "Shipped") return "text-blue-500";
    return "text-green-600";
  };

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1000px] mx-auto p-6">

        <h1 className="text-xl font-bold mb-6">Your Orders</h1>

        {orders.length === 0 ? (
          <p>No orders yet</p>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-4 mb-6 shadow-sm border"
            >

              {/* HEADER */}
              <div className="flex justify-between text-sm text-gray-500">
                <span>Order ID: {order.id}</span>
                <span>
                  {new Date(order.createdAt).toLocaleString()}
                </span>
              </div>

              {/* STATUS */}
              <p className={`mt-2 text-sm font-semibold ${getStatusColor(order.status)}`}>
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
                    <img
                      src={item.image}
                      className="h-16 w-16 object-contain"
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
                      R{item.price}
                    </p>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="mt-4 text-right">
                <p className="font-bold text-lg">
                  Total: R{order.total}
                </p>
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}