import Link from "next/link";
import { POSTS, CATEGORIES, getFeaturedPost } from "@/lib/posts";

export const metadata = {
  title: "Astrology Blog — Astro AI",
  description:
    "Understand astrology in plain English. Saturn returns, Mercury retrograde, birth chart basics, and how the planets actually shape your life.",
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function BlogPage() {
  const featured = getFeaturedPost();
  const rest = POSTS.filter((p) => !p.featured).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen bg-neutral-950 px-6 py-16">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <div className="mb-8">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">
            ← Home
          </Link>
        </div>

        {/* Header */}
        <div className="mb-14 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-sm text-amber-400">
            <span>✦</span>
            <span>Astrology Explained Simply</span>
          </div>
          <h1 className="font-playfair text-4xl font-bold text-neutral-100 md:text-5xl">
            The Astro AI Blog
          </h1>
          <p className="mt-4 text-neutral-500 max-w-xl mx-auto">
            No jargon. No vague predictions. Just honest explanations of how astrology works and what it can actually tell you about your life.
          </p>
        </div>

        {/* Featured post */}
        <Link
          href={`/blog/${featured.slug}`}
          className="group mb-14 flex flex-col gap-8 overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900/60 p-8 hover:border-neutral-700 transition-all md:flex-row md:items-center"
        >
          <div className="flex h-48 w-full shrink-0 items-center justify-center rounded-2xl bg-neutral-800/60 text-8xl md:h-40 md:w-48">
            {featured.emoji}
          </div>
          <div className="flex-1">
            <div className="mb-3 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-amber-500/20 border border-amber-500/30 px-3 py-0.5 text-xs font-medium text-amber-400">
                ✦ Featured
              </span>
              <span className="rounded-full border border-neutral-800 bg-neutral-800/60 px-3 py-0.5 text-xs text-neutral-500">
                {featured.category}
              </span>
              <span className="text-xs text-neutral-700">{featured.readTime} min read</span>
            </div>
            <h2 className="font-playfair text-2xl font-bold text-neutral-100 group-hover:text-amber-400 transition-colors md:text-3xl">
              {featured.title}
            </h2>
            <p className="mt-3 text-neutral-500 leading-relaxed">
              {featured.excerpt}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <span className="text-sm font-medium text-amber-400 group-hover:underline">
                Read article →
              </span>
              <span className="text-xs text-neutral-700">{formatDate(featured.publishedAt)}</span>
            </div>
          </div>
        </Link>

        {/* Category filter row */}
        <div className="mb-10 flex flex-wrap gap-2">
          <span className="rounded-full border border-amber-500/50 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-400">
            All Topics
          </span>
          {CATEGORIES.map((cat) => (
            <span
              key={cat}
              className="rounded-full border border-neutral-800 bg-neutral-900/50 px-4 py-1.5 text-xs text-neutral-500 cursor-default"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Post grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group flex flex-col rounded-2xl border border-neutral-800 bg-neutral-900/50 overflow-hidden hover:border-neutral-700 hover:bg-neutral-900 transition-all"
            >
              <div className="flex h-36 items-center justify-center bg-neutral-800/40 text-6xl">
                {post.emoji}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-2">
                  <span className="rounded-full border border-neutral-800 bg-neutral-800/60 px-2.5 py-0.5 text-xs text-neutral-600">
                    {post.category}
                  </span>
                  <span className="text-xs text-neutral-700">{post.readTime} min</span>
                </div>
                <h2 className="font-playfair text-lg font-bold text-neutral-100 group-hover:text-amber-400 transition-colors leading-snug">
                  {post.title}
                </h2>
                <p className="mt-2 flex-1 text-sm text-neutral-500 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="mt-4 flex items-center justify-between pt-4 border-t border-neutral-800">
                  <span className="text-xs text-neutral-700">{formatDate(post.publishedAt)}</span>
                  <span className="text-xs font-medium text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Read →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-3xl border border-neutral-800 bg-neutral-900/40 px-8 py-12 text-center">
          <div className="text-4xl mb-4">☸</div>
          <h2 className="font-playfair text-2xl font-bold text-neutral-100">
            Ready to explore your own chart?
          </h2>
          <p className="mt-3 text-neutral-500 max-w-md mx-auto text-sm">
            Reading about astrology is one thing. Seeing it applied to your specific birth chart is another.
          </p>
          <Link
            href="/agents"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-amber-500 px-8 py-3 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
          >
            Chat with an Advisor Free →
          </Link>
        </div>

      </div>
    </div>
  );
}
