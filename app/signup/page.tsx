"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = () => {
    setError("");

    if (!email || !password || !confirm) {
      setError("All fields are required");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const success = signup(email, password);

      if (success) {
        router.push("/"); // ✅ FIXED (not /admin)
      } else {
        setError("User already exists");
      }

      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      <div className="bg-white p-6 w-[320px] shadow">

        <h1 className="text-2xl font-bold mb-4 text-center">
          Create Account
        </h1>

        {/* ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-2 mb-3 text-sm">
            {error}
          </div>
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 w-full mb-3 focus:ring-2 focus:ring-green-400 outline-none"
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 w-full mb-3 focus:ring-2 focus:ring-green-400 outline-none"
        />

        {/* CONFIRM PASSWORD */}
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          className="border p-2 w-full mb-4 focus:ring-2 focus:ring-green-400 outline-none"
        />

        {/* BUTTON */}
        <button
          onClick={handleSignup}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white w-full py-2 rounded font-semibold disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        {/* LOGIN LINK */}
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Sign in
          </span>
        </p>

      </div>

    </div>
  );
}