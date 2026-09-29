"use client";

import * as React from "react";
import { Download, Mail, Phone, MapPin, Printer } from "lucide-react";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:max-w-full">
      {/* Action Header for Screen Only */}
      <div className="flex justify-between items-center border-b border-[var(--border)] pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
          <p className="text-xs text-[var(--muted)]">ATS-optimized HTML layout. Press print to save as a clean PDF.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-background)] text-xs font-semibold font-mono cursor-pointer transition-all"
          >
            <Printer className="w-3.5 h-3.5" /> Print CV (PDF)
          </button>
          <a
            href="/backup_v0/assets/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-[var(--foreground)] text-[var(--background)] hover:opacity-90 text-xs font-semibold font-mono transition-all"
          >
            <Download className="w-3.5 h-3.5" /> Raw PDF
          </a>
        </div>
      </div>

      {/* Main Resume Sheet */}
      <div className="p-8 md:p-12 rounded border border-[var(--border)] bg-[var(--background)] shadow-sm print:border-none print:p-0 print:shadow-none space-y-8">
        {/* Contact Info Header */}
        <div className="text-center space-y-3 border-b border-[var(--border)] pb-6">
          <h2 className="text-3xl font-extrabold tracking-tight text-center print:text-black">Mano Bharathi M</h2>
          <p className="text-sm font-semibold font-mono text-[var(--accent)] print:text-emerald-700">
            Systems & Platform Engineer | Distributed Systems & AI Infrastructure
          </p>
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-[var(--muted)] print:text-gray-600 font-mono">
            <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> immanobharathi21@gmail.com</span>
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> [Contact Phone Omitted]</span>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Bengaluru, Karnataka, India</span>
          </div>
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-[var(--muted)] print:text-gray-600 font-mono">
            <a href="https://github.com/ManoBharathi93" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg> github.com/ManoBharathi93
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg> linkedin.com/in/manobharathi
            </a>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Professional Summary
          </h3>
          <p className="text-xs leading-relaxed text-justify-custom text-[var(--muted)] print:text-gray-800">
            Systems Engineer with 2+ years of production experience shipping platform observability services, change data capture pipelines, and telemetry aggregation engines at OpenText. Specializes in building memory-efficient network services, concurrent key-value storage designs, and topology-aware resource schedulers using Go, Rust, and C++.
          </p>
        </div>

        {/* Professional Experience */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Work Experience
          </h3>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-sm">Associate Software Engineer</h4>
                <span className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">Oct 2024 — Present</span>
              </div>
              <div className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">OpenText (Platform Infrastructure Groups)</div>
              <ul className="list-disc pl-4 text-xs text-[var(--muted)] print:text-gray-800 space-y-1">
                <li>Refactored spatial index structures and link cache layouts for VPN connectivity tunnels, supporting a scale increase from 55 to 165 connections (3x scale) without database schema modifications.</li>
                <li>Designed and deployed an offline CVE ingestion and compliance scanning parser utilizing a local LLaMA-2 runtime on dedicated GPU nodes, reducing security triage evaluation times from hours to minutes under strict data privacy policies.</li>
                <li>Implemented time-series baseline routing algorithms and cache pre-aggregations on database instances, reducing CPU query load by 80% on high-frequency monitoring tables.</li>
                <li>Awarded formal peer recognitions (&quot;Raise the Bar&quot; and &quot;Put Customers First&quot;) for zero-defect platform delivery and rapid onboarding on complex codebases.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-sm">Software Engineering Intern</h4>
                <span className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">Apr 2024 — Sept 2024</span>
              </div>
              <div className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">OpenText (Network Operations Management)</div>
              <ul className="list-disc pl-4 text-xs text-[var(--muted)] print:text-gray-800 space-y-1">
                <li>Developed license consumption dashboard tracking frameworks using Spring Boot and REST interfaces, increasing platform configuration visibility across SaaS Ops groups.</li>
                <li>Completed internship requirements and delivered production features, resulting in direct full-time conversion.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Featured Systems Engineering Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-4 print:grid-cols-1">
            <div className="space-y-1">
              <div className="font-bold text-xs">ZenithDB (Distributed LSM Storage Engine)</div>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Built a sharded KV store with custom Raft consensus replication in Go. Features leveled compactions, sparse SSTable index mappings, and Jepsen safety checks.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-xs">AetherFlow (High-Performance Message Queue)</div>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Developed a commit log broker in Rust utilizing Linux zero-copy syscalls (`sendfile`/`splice`) and an epoll event loop, achieving line-rate 10 Gbps throughput.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-xs">SyncMirror (Production CDC Platform)</div>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Created a transaction replication engine in Rust, parsing PostgreSQL WAL files and routing messages to Kafka partitions with exactly-once delivery.
              </p>
            </div>
            <div className="space-y-1">
              <div className="font-bold text-xs">ChronosCache (Distributed Log cache)</div>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Built an off-heap key-value cache using `io_uring` and slab allocators, achieving 1.5M requests/sec under sub-500 microsecond latencies.
              </p>
            </div>
          </div>
        </div>

        {/* Core Skills */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Technical Skills
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-2 gap-x-6 text-xs text-[var(--muted)] print:text-gray-800">
            <div><strong className="text-[var(--foreground)] print:text-black">Languages:</strong> Go, Rust, C++, Java, SQL, Bash</div>
            <div><strong className="text-[var(--foreground)] print:text-black">Systems:</strong> Linux Kernel (epoll, io_uring), Raft, LSM</div>
            <div><strong className="text-[var(--foreground)] print:text-black">Databases:</strong> PostgreSQL, Redis, Milvus, Kafka</div>
            <div><strong className="text-[var(--foreground)] print:text-black">Cloud/DevOps:</strong> Docker, Kubernetes, Git, CI/CD</div>
            <div><strong className="text-[var(--foreground)] print:text-black">AI Infra:</strong> HNSW Indexing, CUDA, GPU Topologies</div>
            <div><strong className="text-[var(--foreground)] print:text-black">APIs:</strong> Spring Boot, REST APIs, JSON wire formats</div>
          </div>
        </div>
      </div>
    </div>
  );
}
