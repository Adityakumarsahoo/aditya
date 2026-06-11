"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Spotlight } from "@/components/ui/spotlight";
import { ArrowLeft, Lock, ShieldAlert } from "lucide-react";
import Link from "next/link";

import { API_BASE_URL } from "@/lib/api-config";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ password }),
        // Crucial for Set-Cookie header on cross-origin requests
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Store in localStorage as fallback flag
      localStorage.setItem("admin_logged", "true");
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-zinc-950 px-4 py-12 antialiased">
      {/* Background Spotlight */}
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-20" fill="#0FFF50" />

      {/* Grid Pattern Background */}
      <div className="pointer-events-none -z-20 absolute inset-0 [background-size:40px_40px] select-none [background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)] opacity-50" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 pointer-events-none" />

      <div className="w-full max-w-md z-10">
        {/* Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-zinc-200 transition-colors mb-6 text-sm">
          <ArrowLeft className="w-4 h-4" />
          Back to Portfolio
        </Link>

        {/* Login Container */}
        <div className="relative group">
          {/* Accent back glow */}
          <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-r from-[#0FFF50] to-emerald-500 opacity-10 blur-lg transition duration-1000 group-hover:opacity-20" />

          <div className="relative rounded-2xl border border-zinc-900 bg-zinc-950/80 backdrop-blur-xl p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mb-4 shadow-[0_0_15px_rgba(16,185,129,0.15)]">
                <Lock className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold text-zinc-100 mb-2">Access Control</h1>
              <p className="text-sm text-zinc-400">Enter your administration password</p>
            </div>

            {/* Error Feedback */}
            {error && (
              <div className="mb-6 flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-4 text-sm text-rose-400">
                <ShieldAlert className="h-5 w-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-950/60 px-4 py-3 text-zinc-100 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:bg-zinc-900/20 focus:ring-1 focus:ring-emerald-500/20"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-[#0FFF50] py-3.5 text-sm font-bold text-zinc-950 transition-all duration-300 hover:brightness-110 hover:shadow-lg hover:shadow-emerald-500/20 active:scale-[0.98] cursor-pointer"
              >
                {loading ? "Verifying..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
