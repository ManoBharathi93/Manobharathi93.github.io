"use client";

import { Download, Printer } from "lucide-react";

export function ResumeActions({ pdf }: { pdf: string }) {
  return (
    <div className="flex flex-wrap gap-3 print:hidden">
      <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-background)] text-xs font-semibold font-mono cursor-pointer transition-all">
        <Printer className="w-3.5 h-3.5" /> Print resume
      </button>
      <a href={pdf} download className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-xs font-semibold font-mono transition-all">
        <Download className="w-3.5 h-3.5" /> Download PDF
      </a>
    </div>
  );
}
