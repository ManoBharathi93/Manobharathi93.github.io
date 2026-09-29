import * as React from "react";
import { ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";

export default function ProjectsIndexPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Systems Engineering Products</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          An honest build log of systems projects, including current status, decisions, limitations, and reproducible evidence.
        </p>
      </div>

      {/* Grid of Projects */}
      <div className="grid gap-6 md:grid-cols-2">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="p-6 rounded border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between hover:border-[var(--accent)] transition-all"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)] uppercase tracking-wider text-[var(--accent)] font-semibold">
                  {project.tag}
                </span>
                <span className="text-[10px] font-mono text-[var(--muted)] whitespace-nowrap">
                  Status: <strong className="text-[var(--foreground)]">{project.status}</strong>
                </span>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">{project.name}</h2>
                <p className="text-xs text-[var(--muted)] font-mono">{project.tech.join(" · ")}</p>
              </div>

              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {project.summary}
              </p>

              <div className="space-y-3 border-t border-[var(--border)] pt-4 text-xs">
                <div>
                  <strong className="text-[var(--foreground)] font-semibold">Problem:</strong>{" "}
                  <span className="text-[var(--muted)]">{project.problem}</span>
                </div>
                <div>
                  <strong className="text-[var(--foreground)] font-semibold">What I built:</strong>{" "}
                  <span className="text-[var(--muted)]">{project.whatIBuilt}</span>
                </div>
                <div>
                  <strong className="text-[var(--foreground)] font-semibold">Key decisions:</strong>{" "}
                  <span className="text-[var(--muted)]">{project.tradeoffs.map((item) => item.decision).join("; ")}.</span>
                </div>
                <div>
                  <strong className="text-[var(--foreground)] font-semibold">Measured result:</strong>{" "}
                  <span className="text-[var(--muted)]">{project.measuredResult}</span>
                </div>
                <div>
                  <strong className="text-[var(--foreground)] font-semibold">Limitations:</strong>{" "}
                  <span className="text-[var(--muted)]">{project.limitations}</span>
                </div>
                <div>
                  <strong className="text-[var(--foreground)] font-semibold">Evidence:</strong>{" "}
                  <span className="text-[var(--muted)]">Repository / design doc / demo / benchmark status on the project page.</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <a
                href={`/projects/${project.id}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 transition-all cursor-pointer"
              >
                View project evidence <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
