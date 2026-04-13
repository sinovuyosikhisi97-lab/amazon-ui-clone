"use client";

import Link from "next/link";
import { ShoppingCart, Search, Menu, Heart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";
import { useState } from "react";

type Props = {
  search?: string;
  setSearch?: (value: string) => void;
};

export default function Navbar({ search, setSearch }: Props) {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const { wishlist } = useWishlist();

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Top Bar */}
      <div className="bg-[#131921] text-white flex items-center px-4 py-2 gap-4">

        {/* Logo */}
        <Link href="/">
          <div className="text-2xl font-bold cursor-pointer hover:border border-white px-2">
            amazon
          </div>
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
            className="w-full p-2 text-black outline-none"
            placeholder="Search Amazon"
          />
          <button className="bg-[#febd69] px-4 flex items-center justify-center">
            <Search size={20} />
          </button>
        </div>

        {/* Right */}
        <div className="flex items-center gap-6 text-xs">

          {/* 🔥 ACCOUNT DROPDOWN */}
          <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            {user ? (
              <div className="hover:border px-2 cursor-pointer">
                <p>Hello, Admin</p>
                <p className="font-bold text-sm">Account & Lists</p>
              </div>
            ) : (
              <Link href="/login">
                <div className="hover:border px-2 cursor-pointer">
                  <p>Hello, Sign in</p>
                  <p className="font-bold text-sm">Account & Lists</p>
                </div>
              </Link>
            )}

            {/* DROPDOWN */}
            {open && user && (
              <div className="absolute right-0 mt-2 w-56 bg-white text-black shadow-lg border z-50 animate-fade-in">

                <div className="p-3 border-b font-bold">
                  Your Account
                </div>

                <Link href="/orders">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">
                    Your Orders
                  </div>
                </Link>

                <Link href="/wishlist">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">
                    Your Wishlist
                  </div>
                </Link>

                <Link href="/admin">
                  <div className="p-2 hover:bg-gray-100 cursor-pointer">
                    Admin Dashboard
                  </div>
                </Link>

                <div
                  onClick={logout}
                  className="p-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </div>
              </div>
            )}
          </div>

          {/* ❤️ WISHLIST */}
          <Link href="/wishlist">
            <div className="relative flex items-center gap-1 hover:border px-2 cursor-pointer">
              <Heart size={18} />

              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#f08804] text-black text-xs px-1 rounded">
                  {wishlist.length}
                </span>
              )}

              Wishlist
            </div>
          </Link>

          {/* 🛒 CART */}
          <Link href="/cart">
            <div className="relative flex items-center gap-1 hover:border px-2 cursor-pointer">
              <ShoppingCart size={18} />

              {cart.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#f08804] text-black text-xs px-1 rounded">
                  {cart.length}
                </span>
              )}

              Cart
            </div>
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