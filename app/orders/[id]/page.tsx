"use client";

import { useParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useOrders } from "@/context/OrderContext";

export default function OrderDetailsPage() {
  const { id } = useParams();
  const { orders } = useOrders();

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="p-10">
        <h1 className="text-xl font-bold">Order not found</h1>
      </div>
    );
  }

  const getStep = () => {
    if (order.status === "Processing") return 1;
    if (order.status === "Shipped") return 2;
    return 3;
  };

  const step = getStep();

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1000px] mx-auto p-6">

        <h1 className="text-xl font-bold mb-4">Order Details</h1>

        {/* ORDER INFO */}
        <div className="bg-white p-4 mb-6">
          <p className="text-sm text-gray-500">
            Order ID: {order.id}
          </p>

          <p className="text-sm text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>

          <p className="font-bold mt-2">
            Total: R{order.total}
          </p>
        </div>

        {/* DELIVERY TRACKING */}
        <div className="bg-white p-4 mb-6">
          <h2 className="font-semibold mb-4">Delivery Status</h2>

          <div className="flex justify-between text-sm">

            <div className={`flex-1 text-center ${step >= 1 ? "text-yellow-500" : ""}`}>
              Processing
            </div>

            <div className={`flex-1 text-center ${step >= 2 ? "text-blue-500" : ""}`}>
              Shipped
            </div>

            <div className={`flex-1 text-center ${step >= 3 ? "text-green-600" : ""}`}>
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
        <div className="bg-white p-4">
          <h2 className="font-semibold mb-4">Items</h2>

          <div className="space-y-4">
            {order.items.map((item) => (
              <div key={item.id} className="flex gap-4 border-b pb-3">

                <img
                  src={item.image}
                  className="h-20 w-20 object-contain"
                />

                <div className="flex-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <p className="font-bold">
                  R{item.price}
                </p>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}