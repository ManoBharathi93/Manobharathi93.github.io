import * as React from "react";
import { ArrowRight, BookOpen, Clock, Calendar, Tag } from "lucide-react";
import { blogData } from "@/data/blogData";

export default function BlogIndexPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Systems Engineering Writing</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          Technical articles focusing on database design, consensus systems, performance profiling, and network I/O.
        </p>
      </div>

      {/* Articles List */}
      <div className="space-y-8 max-w-3xl">
        {blogData.map((article) => (
          <article key={article.id} className="space-y-2 border-b border-[var(--border)] pb-6 last:border-none">
            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--muted)]">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" /> {article.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold tracking-tight hover:text-[var(--accent)] transition-colors">
              <a href={`/blog/${article.id}`}>{article.title}</a>
            </h2>

            {/* Excerpt */}
            <p className="text-xs leading-relaxed text-[var(--muted)] text-justify-custom">
              {article.excerpt}
            </p>

            {/* Tags and CTA */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="flex flex-wrap gap-1.5">
                {article.tags.map((t, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">
                    <Tag className="w-2.5 h-2.5" /> {t}
                  </span>
                ))}
              </div>
              <a
                href={`/blog/${article.id}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-[var(--accent)] hover:underline"
              >
                Read Article <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
