import Link from "next/link";

export const metadata = {
  title: "Sign Up — Astro AI",
};

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-neutral-950 px-6 py-16">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-2xl text-amber-400">☸</span>
        <span className="font-playfair text-xl font-bold text-amber-400">Astro AI</span>
      </Link>

      <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900/60 p-8 backdrop-blur-sm">
        <h1 className="font-playfair text-2xl font-bold text-neutral-100 mb-1">
          Create your account
        </h1>
        <p className="text-sm text-neutral-500 mb-8">
          Free to start. No credit card required.
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1.5">
              Email address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-1.5">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a strong password"
              className="w-full rounded-xl border border-neutral-700 bg-neutral-800/60 px-4 py-3 text-sm text-neutral-100 placeholder-neutral-600 outline-none focus:border-amber-500/60 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-amber-500 py-3.5 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors mt-2"
          >
            Create Free Account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-600">
          Already have an account?{" "}
          <Link href="/login" className="text-amber-400 hover:underline">
            Sign in
          </Link>
        </p>

        <p className="mt-6 text-center text-xs text-neutral-700 leading-relaxed">
          By creating an account you agree to our Terms of Service.
          Jyotiṣa AI responses are for educational purposes only.
        </p>
      </div>
    </div>
  );
}
