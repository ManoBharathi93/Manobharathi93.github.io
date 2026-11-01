import type { Metadata } from "next";
import { ArrowUpRight, Clock, Tag } from "lucide-react";
import { articles } from "@/data/articlesData";

export const metadata: Metadata = {
  title: "Technical Writing | Mano Bharathi M",
  description:
    "Technical field guides and notes on backend engineering, distributed systems, and reliable software.",
  alternates: {
    canonical: "/blog",
  },
};

export default function BlogPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-3 border-b border-[var(--border)] pb-6">
        <p className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">
          Field notes · Engineering
        </p>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Technical Writing
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-[var(--muted)]">
          Practical explanations of the systems concepts I work with and learn.
          This is the first article; I’ll add more technical writing here over time.
        </p>
      </header>

      <section aria-label="Published articles" className="max-w-3xl">
        <div className="space-y-7">
          {articles.map((article) => (
            <article
              key={article.id}
              className="space-y-3 border-b border-[var(--border)] pb-7 last:border-b-0"
            >
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--muted)]">
                <span>{article.publishedAt}</span>
                <span className="inline-flex items-center gap-1">
                  <Clock aria-hidden="true" className="h-3.5 w-3.5" />
                  {article.readTime}
                </span>
              </div>

              <h2 className="text-xl font-bold tracking-tight">
                <a
                  href={article.href}
                  className="hover:text-[var(--accent)] transition-colors"
                >
                  {article.title}
                </a>
              </h2>

              <p className="text-sm leading-relaxed text-[var(--muted)]">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                <ul className="flex flex-wrap gap-2" aria-label="Topics">
                  {article.topics.map((topic) => (
                    <li
                      key={topic}
                      className="inline-flex items-center gap-1 rounded border border-[var(--border)] bg-[var(--muted-background)] px-2 py-1 text-[10px] font-mono"
                    >
                      <Tag aria-hidden="true" className="h-3 w-3" />
                      {topic}
                    </li>
                  ))}
                </ul>
                <a
                  href={article.href}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
                >
                  Read article <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
