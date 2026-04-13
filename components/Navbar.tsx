"use client";

import Link from "next/link";
import {ShoppingCart, Search, Menu} from "lucide-react";
import {useCart} from "@/context/CartContext";
import {useAuth} from "@/context/AuthContext";

type Props = {
    search?: string;
    setSearch?: (value: string) => void;
};

export default function Navbar({search, setSearch}: Props) {
    const {cart} = useCart();
    const {user, logout} = useAuth();

    return (
        <div className="w-full">
            {/* Top Bar */}
            <div className="bg-[#131921] text-white flex items-center px-4 py-2 gap-4">
                {/* Logo */}
                <Link href="/">
                    <div className="text-2xl font-bold cursor-pointer hover:border border-white px-2">amazon</div>
                </Link>

                {/* Location */}
                <div className="text-xs cursor-pointer hover:border border-white px-2">
                    <p>Hello</p>
                    <p className="font-bold">Select your address</p>
                </div>

                {/* Search */}
                <div className="flex flex-1">
                    <input
                        value={search || ""}
                        onChange={(e) => setSearch?.(e.target.value)}
                        className="w-full p-2 text-w outline-none bg-light"
                        placeholder="Search Amazon"
                    />
                    <button className="bg-[#febd69] px-4 flex items-center justify-center">
                        <Search size={20} />
                    </button>
                </div>

                {/* Right */}
                <div className="flex items-center gap-6 text-xs">
                    {user ? (
                        <>
                            <span className="font-bold">Admin</span>

                            <button onClick={logout} className="hover:border px-2">
                                Logout
                            </button>
                        </>
                    ) : (
                        <Link href="/login">
                            <div className="hover:border px-2 cursor-pointer">
                                <p>Hello, Sign in</p>
                                <p className="font-bold text-sm">Account</p>
                            </div>
                        </Link>
                    )}

                    <Link href="/cart">
                        <div className="flex items-center gap-1">Cart</div>
                    </Link>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-[#232f3e] text-white flex items-center gap-4 px-4 py-2 text-sm">
                <div className="flex items-center gap-1 cursor-pointer">
                    <Menu size={18} /> All
                </div>
                <p className="cursor-pointer hover:underline">Today's Deals</p>
                <p className="cursor-pointer hover:underline">Customer Service</p>
                <p className="cursor-pointer hover:underline">Registry</p>
                <p className="cursor-pointer hover:underline">Gift Cards</p>
                <p className="cursor-pointer hover:underline">Sell</p>
            </div>
        </div>
    );
}
