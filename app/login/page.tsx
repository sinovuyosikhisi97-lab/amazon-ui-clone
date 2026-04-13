"use client";

import {useState, useEffect} from "react";
import {useRouter} from "next/navigation";
import {useAuth} from "@/context/AuthContext";

export default function LoginPage() {
    const {login, user} = useAuth();
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    // ✅ Redirect if already logged in
    useEffect(() => {
        if (user) {
            router.push("/admin");
        }
    }, [user]);

    const handleLogin = () => {
        setLoading(true);
        setError("");

        setTimeout(() => {
            const success = login(email, password);

            if (success) {
                router.push("/admin");
            } else {
                setError("Invalid email or password");
            }

            setLoading(false);
        }, 500); // simulate real request
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 w-[320px] shadow">
                <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>

                {/* ERROR */}
                {error && <div className="bg-red-100 text-red-600 p-2 mb-3 text-sm">{error}</div>}

                {/* EMAIL */}
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* PASSWORD */}
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />

                {/* BUTTON */}
                <button
                    onClick={handleLogin}
                    disabled={loading}
                    className="bg-[#ffd814] hover:bg-[#f7ca00] w-full py-2 rounded font-semibold disabled:opacity-50"
                >
                    {loading ? "Signing in..." : "Sign In"}
                </button>

                <p className="text-sm text-center mt-4">
                    New here?{" "}
                    <span onClick={() => router.push("/signup")} className="text-blue-500 cursor-pointer">
                        Create an account
                    </span>
                </p>

                {/* DEMO INFO */}
                <p className="text-xs text-gray-500 mt-4 text-center">Demo: admin@example.com / 123456</p>
            </div>
        </div>
    );
}
