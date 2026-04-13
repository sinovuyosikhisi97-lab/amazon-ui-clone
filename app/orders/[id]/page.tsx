"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useOrders } from "@/context/OrderContext";
import Image from "next/image";

export default function OrderDetailsPage() {
  const params = useParams();
  const rawId = Array.isArray(params.id) ? params.id[0] : params.id;

  const { orders } = useOrders();

  const order = orders.find((o) => o.id === rawId);

  if (!order) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-bold">Order not found</h1>
      </div>
    );
  }

  // ✅ fallback total
  const total =
    order.totalAmount ??
    order.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

  // ✅ FIXED STATUS LOGIC
  const getStep = () => {
    if (order.status === "processing") return 1;
    if (order.status === "shipped") return 2;
    if (order.status === "delivered") return 3;
    return 0; // pending
  };

  const step = getStep();

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1000px] mx-auto p-6">

        <h1 className="text-xl font-bold mb-4">Order Details</h1>

        {/* ORDER INFO */}
        <div className="bg-white p-4 mb-6 rounded shadow">
          <p className="text-sm text-gray-500">
            Order ID: {order.id}
          </p>

          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <p className="font-bold mt-2">
            Total: R{total.toLocaleString()}
          </p>
        </div>

        {/* DELIVERY TRACKING */}
        <div className="bg-white p-4 mb-6 rounded shadow">
          <h2 className="font-semibold mb-4">Delivery Status</h2>

          <div className="flex justify-between text-sm">

            <div className={`flex-1 text-center ${step >= 1 ? "text-yellow-500 font-semibold" : "text-gray-400"}`}>
              Processing
            </div>

            <div className={`flex-1 text-center ${step >= 2 ? "text-blue-500 font-semibold" : "text-gray-400"}`}>
              Shipped
            </div>

            <div className={`flex-1 text-center ${step >= 3 ? "text-green-600 font-semibold" : "text-gray-400"}`}>
              Delivered
            </div>

          </div>

          {/* progress bar */}
          <div className="h-2 bg-gray-200 mt-4 rounded">
            <div
              className="h-2 bg-green-500 rounded transition-all"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* ITEMS */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="font-semibold mb-4">Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-3">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="object-contain"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  R{item.price.toLocaleString()}
                </p>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}