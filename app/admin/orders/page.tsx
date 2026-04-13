"use client";

import { useOrders } from "@/context/OrderContext";

export default function AdminOrdersPage() {
  const { orders, updateOrderStatus } = useOrders();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Orders</h1>

      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-4">Order ID</th>
              <th className="p-4">Items</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4">Date</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td className="p-4" colSpan={6}>
                  No orders yet...
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="p-4">{order.id}</td>

                  <td className="p-4">
                    {order.items.length} items
                  </td>

                  <td className="p-4">R{order.totalAmount}</td>

                  <td className="p-4">
                    <span className="capitalize px-3 py-1 rounded-full bg-gray-200 text-xs">
                      {order.status}
                    </span>
                  </td>

                  <td className="p-4">{order.createdAt}</td>

                  <td className="p-4">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        updateOrderStatus(order.id, e.target.value)
                      }
                      className="border rounded px-2 py-1 text-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}