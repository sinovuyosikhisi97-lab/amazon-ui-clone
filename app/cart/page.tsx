"use client";

import Navbar from "@/components/Navbar";
import {useCart} from "@/context/CartContext";
import {useOrders} from "@/context/OrderContext";

export default function CartPage() {
    const {cart, increaseQty, decreaseQty, removeFromCart} = useCart();
    const {createOrder} = useOrders();

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleCheckout = () => {
        createOrder(cart);
        localStorage.removeItem("cart"); // clear cart
        window.location.href = "/orders";
    };

    return (
        <div className="bg-[#e3e6e6] min-h-screen">
            <Navbar />

            <div className="max-w-[1200px] mx-auto p-6 mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LEFT: ITEMS */}
                <div className="md:col-span-2 bg-white p-6">
                    <h1 className="text-xl font-bold mb-4">Shopping Cart</h1>

                    {cart.length === 0 ? (
                        <p>Your cart is empty</p>
                    ) : (
                        cart.map((item, i) => (
                            <div key={i} className="flex justify-between items-center border-b py-4">
                                {/* PRODUCT INFO */}
                                <div className="flex gap-4">
                                    <img src={item.image} className="h-20 object-contain" />

                                    <div>
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-green-600">In Stock</p>
                                        <p className="font-bold">R{item.price}</p>

                                        {/* REMOVE */}
                                        <button
                                            onClick={() => removeFromCart(item.title)}
                                            className="text-red-500 text-xs mt-1"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>

                                {/* QUANTITY CONTROLS */}
                                <div className="flex items-center gap-2">
                                    <button onClick={() => decreaseQty(item.title)} className="px-2 bg-gray-200">
                                        -
                                    </button>

                                    <span>{item.quantity}</span>

                                    <button onClick={() => increaseQty(item.title)} className="px-2 bg-gray-200">
                                        +
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* RIGHT: SUMMARY */}
                <div className="bg-white p-6 h-fit">
                    <h2 className="text-lg font-semibold mb-2">Subtotal ({cart.length} items)</h2>

                    <p className="text-2xl font-bold mb-4">R{total}</p>

                    <button className="bg-[#ffd814] hover:bg-[#f7ca00] w-full py-2 rounded" onClick={handleCheckout}>Proceed to Checkout</button>
                </div>
            </div>
        </div>
    );
}
