"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ForgotPasswordPage() {
  const [email, setEmail]   = useState("");
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent]     = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-16">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-2xl text-amber-400">☸</span>
        <span className="font-playfair text-xl font-bold text-amber-400">Astro AI</span>
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-sm">
        {sent ? (
          <div className="text-center">
            <div className="mb-4 text-4xl">📬</div>
            <h2 className="font-playfair text-2xl font-bold text-zinc-100 mb-2">Email sent</h2>
            <p className="text-sm text-zinc-500 leading-relaxed">
              Check <span className="text-amber-400">{email}</span> for a password reset link.
            </p>
            <Link href="/login" className="mt-6 block text-sm text-amber-400 hover:underline">
              ← Back to sign in
            </Link>
          </div>
        ) : (
          <>
            <h1 className="font-playfair text-2xl font-bold text-zinc-100 mb-1">Reset your password</h1>
            <p className="text-sm text-zinc-500 mb-8">
              Enter your email and we&apos;ll send you a reset link.
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium text-zinc-400 mb-1.5">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full rounded-xl border border-zinc-700 bg-zinc-800/60 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 transition-colors"
                />
              </div>

              {error && (
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-full bg-amber-500 py-3.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {loading ? "Sending…" : "Send Reset Link"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-600">
              Remembered it?{" "}
              <Link href="/login" className="text-amber-400 hover:underline">
                Sign in
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
