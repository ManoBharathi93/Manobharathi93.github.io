import * as React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Tag, BookOpen } from "lucide-react";
import { blogData, BlogArticle } from "@/data/blogData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for Next.js static export
export async function generateStaticParams() {
  return blogData.map((article) => ({
    slug: article.id,
  }));
}

export default async function BlogDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const article = blogData.find((a) => a.id === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  // Pre-process simple markdown formatting for rendering content blocks cleanly
  const sections = article.content.split("\n\n");

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      {/* Back button */}
      <div className="print:hidden">
        <a
          href="/blog"
          className="inline-flex items-center gap-1 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> BACK_TO_WRITING
        </a>
      </div>

      {/* Article Header */}
      <div className="space-y-4 border-b border-[var(--border)] pb-6">
        <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--muted)]">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" /> {article.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> {article.readTime}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">
          {article.title}
        </h1>
        
        <div className="flex flex-wrap gap-1.5 pt-1">
          {article.tags.map((t, idx) => (
            <span key={idx} className="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">
              <Tag className="w-2.5 h-2.5" /> {t}
            </span>
          ))}
        </div>
      </div>

      {/* Article Body (Research Document Style) */}
      <div className="prose prose-stone dark:prose-invert max-w-none text-xs leading-relaxed text-justify-custom text-[var(--foreground)]/90 space-y-6">
        {sections.map((section, idx) => {
          const trimmed = section.trim();
          if (trimmed.startsWith("### ")) {
            return (
              <h3 key={idx} className="text-base font-bold tracking-tight text-[var(--foreground)] mt-6 border-b border-[var(--border)] pb-1">
                {trimmed.replace("### ", "")}
              </h3>
            );
          }
          if (trimmed.startsWith("#### ")) {
            return (
              <h4 key={idx} className="text-sm font-bold tracking-tight text-[var(--foreground)] mt-4">
                {trimmed.replace("#### ", "")}
              </h4>
            );
          }
          if (trimmed.startsWith("- ")) {
            const listItems = trimmed.split("\n");
            return (
              <ul key={idx} className="list-disc pl-4 space-y-1.5 my-3">
                {listItems.map((item, itemIdx) => (
                  <li key={itemIdx} className="leading-relaxed">
                    {item.replace("- ", "").replace(/\*\*(.*?)\*\*/g, "$1")}
                  </li>
                ))}
              </ul>
            );
          }
          if (trimmed.startsWith("```")) {
            const lines = trimmed.split("\n");
            const codeContent = lines.slice(1, -1).join("\n");
            return (
              <div key={idx} className="my-4 p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50 overflow-x-auto">
                <pre className="font-mono text-[10px] leading-normal text-[var(--foreground)] whitespace-pre">
                  {codeContent}
                </pre>
              </div>
            );
          }
          // Default paragraph
          return (
            <p key={idx} className="leading-relaxed text-[var(--muted)]">
              {trimmed}
            </p>
          );
        })}
      </div>
    </div>
  );
}
