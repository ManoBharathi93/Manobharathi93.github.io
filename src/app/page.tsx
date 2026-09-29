import * as React from "react";
import { ArrowUpRight, Cpu, Database, Network, ShieldAlert, Zap, FileText } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import { experienceHighlights } from "@/data/experienceData";
import { awards } from "@/data/awardsData";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* 1. ABOVE THE FOLD: HERO SECTION */}
      <section className="space-y-6 pt-4 border-b border-[var(--border)] pb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--muted-background)] text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Software Engineer | Backend, Distributed Systems & AI
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Mano Bharathi M
          </h1>
          <p className="text-xl text-[var(--muted)] font-medium max-w-3xl leading-relaxed">
            I build backend services, distributed systems, observability, and AI-agent workflows. I have 2+ years of experience at OpenText, including my internship.
          </p>
        </div>

        {/* Proof Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">2+ Yrs</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">Experience incl. Internship</div>
          </div>
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">3x</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">Cloud Connection Capacity</div>
          </div>
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">75%</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">Fewer Escalations (Staged)</div>
          </div>
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">~60%</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">Less Manual Triage (Prototype)</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 pt-2">
          <a
            href="/resume"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 font-medium transition-all text-sm"
          >
            <FileText className="w-4 h-4" /> View Resume
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-background)] font-medium transition-all text-sm"
          >
            Explore Projects
          </a>
        </div>
      </section>

      {/* 2. CORE SKILL & FOCUS DIRECTORY */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Core Technical Domains
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Database className="w-4 h-4 text-[var(--accent)]" /> Backend & Data
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Python, Java, Go, C++, SQL, FastAPI, Spring Boot, PostgreSQL, Vertica, Redis, and Elasticsearch.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Network className="w-4 h-4 text-[var(--accent)]" /> Distributed Systems & Infrastructure
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              REST APIs, WebSockets, Kafka, change data capture, Linux, Docker, Kubernetes, Helm, Git, and CI/CD.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Cpu className="w-4 h-4 text-[var(--accent)]" /> AI Agents & Retrieval
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              LangGraph, FastMCP, MCP, RAG, embeddings, vector retrieval, tool calling, evaluation, and PyTorch.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION: OPENTEXT PRODUCTION IMPACT */}
      <section id="experience" className="space-y-8 scroll-mt-20">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Professional Experience
        </h2>

        <div className="space-y-12">
          {/* Role Header */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
              <div>
                <h3 className="text-lg font-bold">Associate Software Developer</h3>
                <div className="text-sm font-semibold text-[var(--accent)]">OpenText · Bengaluru</div>
              </div>
              <div className="text-xs font-mono text-[var(--muted)]">Oct 2024 — Present</div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Building backend services, distributed cloud connectivity, observability, and AI-agent workflows at OpenText.
            </p>

            {experienceHighlights.map((highlight, index) => {
              const Icon = [Cpu, Network, Zap, ShieldAlert][index] ?? Cpu;
              return (
                <div key={highlight.title} className="border-l-2 border-[var(--border)] pl-4 space-y-4">
                  <div className="font-bold text-sm flex items-center gap-2">
                    <Icon className="w-4 h-4 text-[var(--accent)]" /> {highlight.title}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4 text-xs">
                    {[highlight.details.slice(0, 3), highlight.details.slice(3)].map((column, columnIndex) => (
                      <div key={columnIndex} className="space-y-1.5">
                        {column.map(([label, detail]) => (
                          <div key={label}><strong className="text-[var(--foreground)] font-semibold">{label}:</strong> {detail}</div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Intern Role */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
              <div>
                <h3 className="text-md font-bold">Software Engineering Intern</h3>
                <div className="text-sm font-semibold text-[var(--accent)]">OpenText · Bengaluru</div>
              </div>
              <div className="text-xs font-mono text-[var(--muted)]">Apr 2024 — Sept 2024</div>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Built Python and SQL automation for license-usage extraction and CSV reporting, replacing repetitive manual reporting workflows.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE SYSTEMS PROJECTS */}
      <section id="projects" className="space-y-8 scroll-mt-20">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Selected Projects & Research
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {projectsData.map((project, index) => {
            const Icon = [Cpu, Database, Network, FileText, Zap, Cpu][index] ?? Cpu;
            return (
              <div key={project.id} className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-base flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[var(--accent)]" /> {project.name}
                    </h3>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">{project.tag}</span>
                  </div>
                  <p className="text-xs text-[var(--muted)] leading-relaxed">
                    {project.whatIBuilt}
                  </p>
                  <div className="text-[10px] font-mono text-[var(--muted)]">
                    {project.tech.join(" · ")}
                  </div>
                </div>
                <a href={`/projects/${project.id}`} className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
                  Project Details & Source <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. AWARDS SECTION */}
      <section id="awards" className="space-y-6">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Awards & Recognition
        </h2>

        <div className="space-y-4">
          {awards.map((award) => (
            <a key={award.id} href={award.certificateHref} target="_blank" rel="noopener noreferrer" className="group block border-b border-[var(--border)] pb-3">
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors">
                  {award.title} · {award.organization}
                </h3>
                <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap">{award.date}</span>
              </div>
              <p className="text-xs text-[var(--muted)] mt-1">
                {award.description}
              </p>
            </a>
          ))}
        </div>

        <a href="/resume#awards" className="inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
          View Awards in Resume <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </section>
    </div>
  );
}
