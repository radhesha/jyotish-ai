"use client";

import Link from "next/link";
import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function SignupPage() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/chart`,
      },
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    setDone(true);
    setLoading(false);
  }

  async function handleGoogle() {
    setError("");
    const { error: authError } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/chart` },
    });
    if (authError) setError(authError.message);
  }

  if (done) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-16">
        <Link href="/" className="mb-8 flex items-center gap-2">
          <span className="text-2xl text-amber-400">☸</span>
          <span className="font-playfair text-xl font-bold text-amber-400">Astro AI</span>
        </Link>
        <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 text-center">
          <div className="mb-4 text-4xl">✉️</div>
          <h2 className="font-playfair text-2xl font-bold text-zinc-100 mb-2">Check your email</h2>
          <p className="text-sm text-zinc-500 leading-relaxed">
            We sent a confirmation link to <span className="text-amber-400">{email}</span>.
            Click it to activate your account and start your free reading.
          </p>
          <p className="mt-6 text-xs text-zinc-700">
            Didn&apos;t get it? Check spam, or{" "}
            <button
              onClick={() => setDone(false)}
              className="text-amber-500 hover:underline"
            >
              try again
            </button>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-6 py-16">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-2xl text-amber-400">☸</span>
        <span className="font-playfair text-xl font-bold text-amber-400">Astro AI</span>
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-sm">
        <h1 className="font-playfair text-2xl font-bold text-zinc-100 mb-1">Get your first reading free</h1>
        <p className="text-sm text-zinc-500 mb-8">No credit card needed. No astrology knowledge required.</p>

        {/* Google OAuth */}
        <button
          onClick={handleGoogle}
          type="button"
          className="mb-6 w-full flex items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/60 py-3 text-sm font-medium text-zinc-200 hover:bg-zinc-800 hover:border-zinc-600 transition-colors"
        >
          <svg className="h-4 w-4" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          Continue with Google
        </button>

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-800" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-zinc-900 px-3 text-zinc-600">or sign up with email</span>
          </div>
        </div>

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
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1.5">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a strong password (min 6 chars)"
              required
              minLength={6}
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
            className="w-full rounded-full bg-amber-500 py-3.5 text-sm font-semibold text-zinc-950 hover:bg-amber-400 disabled:opacity-60 disabled:cursor-not-allowed transition-colors mt-2"
          >
            {loading ? "Creating account…" : "Create Free Account →"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-zinc-600">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-4 text-center text-xs text-zinc-700 leading-relaxed">
          By creating an account you agree to our Terms of Service.
          Readings are for personal reflection and guidance only.
        </p>
      </div>
    </div>
  );
}
