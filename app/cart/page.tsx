"use client";

import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { useOrders } from "@/context/OrderContext";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cart, increaseQty, decreaseQty, removeFromCart, clearCart } = useCart();
  const { createOrder } = useOrders();
  const router = useRouter();

  // ✅ Total price
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // ✅ Total items (important fix)
  const totalItems = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cart.length === 0) return;

    createOrder(cart);
    clearCart();
    router.push("/orders"); // ✅ proper navigation
  };

  return (
    <div className="bg-[#e3e6e6] min-h-screen">
      <Navbar />

      <div className="max-w-[1200px] mx-auto p-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* LEFT */}
        <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
          <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center border-b py-4"
              >
                {/* PRODUCT */}
                <div className="flex gap-4">
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={80}
                    height={80}
                    className="object-contain"
                  />

                  <div>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-green-600">In Stock</p>

                    <p className="font-bold">
                      R{item.price.toLocaleString()}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 text-xs mt-1 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                {/* QUANTITY */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    onClick={() => increaseQty(item.id)}
                    className="px-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* RIGHT */}
        <div className="bg-white p-6 h-fit rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-2">
            Subtotal ({totalItems} items)
          </h2>

          <p className="text-2xl font-bold mb-4">
            R{total.toLocaleString()}
          </p>

          <button
            disabled={cart.length === 0}
            className={`w-full py-2 rounded transition ${
              cart.length === 0
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-[#ffd814] hover:bg-[#f7ca00]"
            }`}
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}