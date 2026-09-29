import * as React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, FileText, Cpu, AlertTriangle } from "lucide-react";
import { projectsData } from "@/data/projectsData";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate static params for Next.js static export
export async function generateStaticParams() {
  return projectsData.map((project) => ({
    slug: project.id,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const project = projectsData.find((p) => p.id === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-12">
      {/* Back navigation */}
      <div className="print:hidden">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1 text-xs font-mono text-[var(--muted)] hover:text-[var(--accent)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> BACK_TO_PROJECTS
        </Link>
      </div>

      {/* Main Header */}
      <div className="space-y-4 border-b border-[var(--border)] pb-8">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)] text-[var(--accent)] font-bold uppercase tracking-wider">
            {project.tag}
          </span>
          <span className="inline-flex items-center gap-1 text-[10px] font-mono text-[var(--muted)]">
            Status: <strong className="text-[var(--foreground)]">{project.status}</strong>
          </span>
        </div>
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">{project.name}</h1>
        <p className="text-base text-[var(--muted)] max-w-3xl leading-relaxed">{project.summary}</p>
        <p className="text-xs font-mono text-[var(--muted)]">Tech Stack: {project.tech.join(" · ")}</p>

        {/* Project Links */}
        <div className="flex flex-wrap gap-3 pt-2 print:hidden">
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-background)] text-xs font-semibold font-mono transition-all"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg> Code Repository
          </a>
          <a
            href={project.doc}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-background)] text-xs font-semibold font-mono transition-all"
          >
            <FileText className="w-4 h-4" /> Project Documentation
          </a>
        </div>
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        {[
          ["Problem", project.problem],
          ["What I built", project.whatIBuilt],
          ["Key decisions", project.tradeoffs.map((item) => `${item.decision}: ${item.rationale}`).join(" ")],
          ["Results", project.measuredResult],
          ["Limitations", project.limitations],
          ["Evidence", project.evidence],
        ].map(([label, value]) => (
          <div key={label} className="p-5 rounded border border-[var(--border)] bg-[var(--muted-background)]/20 space-y-2">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)]">{label}</h2>
            <p className="text-xs leading-relaxed text-[var(--muted)]">{value}</p>
          </div>
        ))}
      </section>

      {/* Main Core Section */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* Left column (2/3 width) - Technical Outline */}
        <div className="md:col-span-2 space-y-10">
          {/* Problem Statement */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold tracking-tight">1. Problem Statement</h2>
            <p className="text-xs leading-relaxed text-[var(--muted)] text-justify-custom">
              {project.problem}
            </p>
          </section>

          {/* Real-world Motivation */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold tracking-tight">2. Real-World Motivation</h2>
            <p className="text-xs leading-relaxed text-[var(--muted)] text-justify-custom">
              {project.motivation}
            </p>
          </section>

          {/* System Architecture */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold tracking-tight">3. System Architecture</h2>
            <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50 overflow-x-auto">
              <pre className="font-mono text-[10px] leading-normal text-[var(--foreground)] whitespace-pre">
                {project.architectureDiagram.trim()}
              </pre>
            </div>
            <p className="text-[11px] text-[var(--muted)] italic">Figure 1.0: High-level project components and information flow.</p>
          </section>

          {/* Sequence Diagram */}
          <section className="space-y-3">
            <h2 className="text-lg font-bold tracking-tight">4. Pipeline Data Flow</h2>
            <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50 overflow-x-auto">
              <pre className="font-mono text-[10px] leading-normal text-[var(--foreground)] whitespace-pre">
                {project.sequenceDiagram.trim()}
              </pre>
            </div>
            <p className="text-[11px] text-[var(--muted)] italic">Figure 1.1: Main workflow and validation steps.</p>
          </section>

          {/* Failure Modes & Mitigations */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight">5. Failure Modes & Mitigations</h2>
            <div className="overflow-x-auto border border-[var(--border)] rounded">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--muted-background)] border-b border-[var(--border)] font-mono text-[10px] uppercase text-[var(--muted)]">
                  <tr>
                    <th className="p-3">Scenario</th>
                    <th className="p-3">Impact</th>
                    <th className="p-3">Mitigation Strategy</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--muted)]">
                  {project.failureModes.map((f, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-[var(--foreground)]">{f.scenario}</td>
                      <td className="p-3">{f.impact}</td>
                      <td className="p-3 text-[var(--accent)] font-mono text-[10px]">{f.mitigation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Tradeoffs Accepted */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold tracking-tight">6. Design Tradeoffs</h2>
            <div className="overflow-x-auto border border-[var(--border)] rounded">
              <table className="w-full text-xs text-left">
                <thead className="bg-[var(--muted-background)] border-b border-[var(--border)] font-mono text-[10px] uppercase text-[var(--muted)]">
                  <tr>
                    <th className="p-3">Decision</th>
                    <th className="p-3">Alternative</th>
                    <th className="p-3">Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)] text-[var(--muted)]">
                  {project.tradeoffs.map((t, idx) => (
                    <tr key={idx}>
                      <td className="p-3 font-semibold text-[var(--foreground)]">{t.decision}</td>
                      <td className="p-3 italic">{t.alternative}</td>
                      <td className="p-3">{t.rationale}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Testing & CI/CD */}
          <div className="grid md:grid-cols-2 gap-6 pt-2">
            <section className="space-y-3">
              <h2 className="text-base font-bold tracking-tight">7. Validation</h2>
              <p className="text-xs leading-relaxed text-[var(--muted)] text-justify-custom">
                {project.testing}
              </p>
            </section>
            <section className="space-y-3">
              <h2 className="text-base font-bold tracking-tight">8. Setup & Delivery</h2>
              <p className="text-xs leading-relaxed text-[var(--muted)] text-justify-custom">
                {project.cicd}
              </p>
            </section>
          </div>
        </div>

        {/* Right column (1/3 width) - System Telemetry/Specs */}
        <div className="space-y-6">
          {/* Performance Targets */}
          <div className="p-5 rounded border border-[var(--border)] bg-[var(--muted-background)]/30 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-2 flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5" /> Results & Evaluation
            </h3>
            <div className="space-y-3 text-xs">
              <div>
                <div className="text-[10px] font-mono text-[var(--muted)] uppercase">Evaluation Summary</div>
                <div className="text-sm font-bold text-[var(--foreground)] mt-0.5">{project.performance}</div>
              </div>
              <div>
                <div className="text-[10px] font-mono text-[var(--muted)] uppercase">Evaluation Scope</div>
                <ul className="list-disc pl-4 mt-1 text-[var(--muted)] space-y-1">
                  {project.benchmarks.map((b, idx) => (
                    <li key={idx}>{b}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Scaling Strategy */}
          <div className="p-5 rounded border border-[var(--border)] bg-[var(--muted-background)]/30 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-2">
              Scaling Strategy
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {project.scalingStrategy}
            </p>
          </div>

          {/* Security Model */}
          <div className="p-5 rounded border border-[var(--border)] bg-[var(--muted-background)]/30 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-2">
              Security Model
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {project.security}
            </p>
          </div>

          {/* Monitoring Metrics */}
          <div className="p-5 rounded border border-[var(--border)] bg-[var(--muted-background)]/30 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-2">
              Observability
            </h3>
            <ul className="space-y-2 text-xs font-mono text-[var(--muted)]">
              {project.monitoring.map((m, idx) => {
                const [metricName, metricDesc] = m.split(": ");
                return (
                  <li key={idx} className="border-b border-[var(--border)] pb-1.5 last:border-none last:pb-0">
                    <div className="text-[var(--foreground)] font-semibold text-[10px] break-all">{metricName}</div>
                    <div className="text-[10px] mt-0.5 text-gray-500 leading-normal">{metricDesc}</div>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Future Work */}
          <div className="p-5 rounded border border-[var(--border)] bg-[var(--muted-background)]/30 space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] border-b border-[var(--border)] pb-2 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" /> Future Roadmap
            </h3>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              {project.futureWork}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
