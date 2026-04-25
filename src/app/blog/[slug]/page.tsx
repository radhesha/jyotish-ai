import Link from "next/link";
import { notFound } from "next/navigation";
import { POSTS, getPost, getRecentPosts } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Astro AI Blog`,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function renderContent(raw: string) {
  const lines = raw.trim().split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith("## ")) {
      elements.push(
        <h2 key={i} className="font-playfair text-2xl font-bold text-neutral-100 mt-10 mb-4">
          {line.replace("## ", "")}
        </h2>
      );
    } else if (line.startsWith("**") && line.endsWith("**")) {
      // standalone bold lines (sub-headings inside paragraphs)
      elements.push(
        <p key={i} className="font-semibold text-neutral-200 mt-5 mb-1">
          {line.replace(/\*\*/g, "")}
        </p>
      );
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      // regular paragraph — handle inline bold and italic
      const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
      const rendered = parts.map((part, pi) => {
        if (part.startsWith("**") && part.endsWith("**"))
          return <strong key={pi} className="text-neutral-100 font-semibold">{part.slice(2, -2)}</strong>;
        if (part.startsWith("*") && part.endsWith("*"))
          return <em key={pi} className="text-neutral-300">{part.slice(1, -1)}</em>;
        return part;
      });
      elements.push(
        <p key={i} className="text-neutral-400 leading-relaxed text-[1.05rem] mt-4">
          {rendered}
        </p>
      );
    }
    i++;
  }
  return elements;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const related = getRecentPosts(4).filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-neutral-950">

      {/* Hero */}
      <div className="border-b border-neutral-800/60 px-6 py-16 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex justify-center">
            <Link href="/blog" className="text-sm text-neutral-600 hover:text-neutral-400 transition-colors">
              ← Back to Blog
            </Link>
          </div>
          <div className="mb-6 flex flex-wrap justify-center gap-3">
            <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-500">
              {post.category}
            </span>
            <span className="text-xs text-neutral-700 flex items-center">{post.readTime} min read</span>
            <span className="text-xs text-neutral-700 flex items-center">{formatDate(post.publishedAt)}</span>
          </div>
          <div className="mb-6 text-7xl">{post.emoji}</div>
          <h1 className="font-playfair text-3xl font-bold text-neutral-100 leading-tight md:text-5xl">
            {post.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-neutral-500 leading-relaxed">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-2xl px-6 py-14">
        <article className="prose-custom">
          {renderContent(post.content)}
        </article>

        {/* Tags */}
        <div className="mt-12 flex flex-wrap gap-2 pt-8 border-t border-neutral-800">
          <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-600">
            {post.category}
          </span>
          <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-600">
            Vedic Astrology
          </span>
          <span className="rounded-full border border-neutral-800 bg-neutral-900 px-3 py-1 text-xs text-neutral-600">
            Birth Chart
          </span>
        </div>

        {/* Advisor CTA */}
        <div className="mt-12 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center">
          <p className="text-sm font-medium text-amber-400 mb-2">Want to see this applied to your chart?</p>
          <p className="text-sm text-neutral-500 mb-4">
            Talk to one of our AI advisors. They read your actual birth chart — not generic forecasts.
          </p>
          <Link
            href="/agents"
            className="inline-flex items-center gap-2 rounded-full bg-amber-500 px-6 py-2.5 text-sm font-semibold text-neutral-950 hover:bg-amber-400 transition-colors"
          >
            Choose an Advisor →
          </Link>
        </div>
      </div>

      {/* Related posts */}
      {related.length > 0 && (
        <div className="border-t border-neutral-800/60 px-6 py-16">
          <div className="mx-auto max-w-6xl">
            <h2 className="font-playfair text-2xl font-bold text-neutral-100 mb-8">
              More from the Blog
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex gap-4 rounded-2xl border border-neutral-800 bg-neutral-900/50 p-5 hover:border-neutral-700 transition-all"
                >
                  <span className="text-3xl shrink-0">{p.emoji}</span>
                  <div>
                    <span className="text-xs text-neutral-700">{p.category}</span>
                    <h3 className="mt-1 text-sm font-semibold text-neutral-300 group-hover:text-amber-400 transition-colors leading-snug">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs text-neutral-700">{p.readTime} min read</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
