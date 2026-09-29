"use client";

import * as React from "react";
import { Download, Mail, Phone, MapPin, Printer } from "lucide-react";
import { awards } from "@/data/awardsData";

export default function ResumePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:max-w-full">
      {/* Action Header for Screen Only */}
      <div className="flex justify-between items-center border-b border-[var(--border)] pb-4 print:hidden">
        <div>
          <h1 className="text-2xl font-bold">Curriculum Vitae</h1>
          <p className="text-xs text-[var(--muted)]">Print this resume or download the current PDF.</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded border border-[var(--border)] bg-[var(--background)] hover:bg-[var(--muted-background)] text-xs font-semibold font-mono cursor-pointer transition-all"
          >
            <Printer className="w-3.5 h-3.5" /> Print CV (PDF)
          </button>
          <a
            href="/Mano_Bharathi_Resume.pdf"
            download
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
            Software Engineer | Backend, Distributed Systems &amp; AI
          </p>
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-[var(--muted)] print:text-gray-600 font-mono">
            <a href="mailto:immanobharathi21@gmail.com" className="flex items-center gap-1 hover:underline"><Mail className="w-3 h-3" /> immanobharathi21@gmail.com</a>
            <a href="tel:+919360425733" className="flex items-center gap-1 hover:underline"><Phone className="w-3 h-3" /> +91 93604 25733</a>
            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> Bengaluru, India</span>
          </div>
          <div className="flex flex-wrap justify-center gap-y-2 gap-x-6 text-xs text-[var(--muted)] print:text-gray-600 font-mono">
            <a href="https://github.com/ManoBharathi93" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg> github.com/ManoBharathi93
            </a>
            <a href="https://linkedin.com/in/manobharathi-m" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg> linkedin.com/in/manobharathi-m
            </a>
            <a href="https://manobharathi93.github.io" className="flex items-center gap-1 hover:underline">manobharathi93.github.io</a>
          </div>
        </div>

        {/* Profile Summary */}
        <div className="space-y-2">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Professional Summary
          </h3>
          <p className="text-xs leading-relaxed text-justify-custom text-[var(--muted)] print:text-gray-800">
            Software engineer with 2+ years of experience, including internship, building backend services, distributed systems, observability, and AI-agent workflows at OpenText. Increased cloud-connectivity capacity 3x, reduced agent escalations from 20 to 5, and built automation that reduced manual effort by ~60%. Strong in Python, Java, FastAPI, PostgreSQL, Kubernetes, RAG, and MCP.
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
                <h4 className="font-bold text-sm">Associate Software Developer</h4>
                <span className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">Oct 2024 – Present</span>
              </div>
              <div className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">OpenText · Bengaluru</div>
              <ul className="list-disc pl-4 text-xs text-[var(--muted)] print:text-gray-800 space-y-1">
                <li>Built a case-aware dual-memory agent combining enterprise RAG with reusable case memory; staged evaluation reduced escalations by 75% (20 to 5), latency by 43% (1,324 to 750 ms), tokens per ticket by 33% (502 to 336), and LLM calls per ticket by 40% (1.0 to 0.6).</li>
                <li>Redesigned UUID storage in a distributed cloud-connectivity service, increasing supported inter-region connections from 55 to 165 (3x) without a database schema migration.</li>
                <li>Built a time-series baseline service with dynamic upper and lower bounds and adaptive routing between raw 5-minute data and hourly aggregates for scalable observability queries.</li>
                <li>Prototyped an end-to-end CVE automation workflow covering advisory ingestion, normalization, inventory matching, and remediation through network automation, reducing manual triage effort by ~60%.</li>
              </ul>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-baseline">
                <h4 className="font-bold text-sm">Software Engineering Intern</h4>
                <span className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">Apr 2024 – Sept 2024</span>
              </div>
              <div className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">OpenText · Bengaluru</div>
              <ul className="list-disc pl-4 text-xs text-[var(--muted)] print:text-gray-800 space-y-1">
                <li>Built Python and SQL automation for license-usage extraction and CSV reporting, replacing repetitive manual reporting workflows.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Selected Projects */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Selected Projects
          </h3>

          <div className="grid md:grid-cols-2 gap-4 print:grid-cols-1">
            <div className="space-y-1">
              <a href="https://github.com/ManoBharathi93/capability-runner" target="_blank" rel="noopener noreferrer" className="font-bold text-xs hover:underline">Capability Runner</a>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Built browser automation that uses an LLM to discover workflows once and saves successful workflows for deterministic, model-free replay. Added action validation, page-evidence checks, expected-error handling, and human takeover for unsupported states.
              </p>
            </div>
            <div className="space-y-1">
              <a href="https://github.com/ManoBharathi93/SyncStream" target="_blank" rel="noopener noreferrer" className="font-bold text-xs hover:underline">SyncStream | Distributed Data Synchronization</a>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Built a change-data-capture pipeline using PostgreSQL, Debezium, Kafka, Redis, and Elasticsearch for distributed data propagation, caching, and indexed search.
              </p>
            </div>
            <div className="space-y-1">
              <a href="https://github.com/ManoBharathi93/Ticketless-Enterprise" target="_blank" rel="noopener noreferrer" className="font-bold text-xs hover:underline">Voice and Screen Support Agent</a>
              <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">
                Built an IT/HR support prototype combining speech recognition, WebSocket-based voice interactions, VLM/OCR screen understanding, enterprise RAG, and LangGraph orchestration, with human approval and structured verification before closure.
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
            <div><strong className="text-[var(--foreground)] print:text-black">Languages:</strong> Python, Java, Go, C++, SQL</div>
            <div><strong className="text-[var(--foreground)] print:text-black">Backend and Systems:</strong> FastAPI, Spring Boot, REST APIs, WebSockets, distributed systems, Linux</div>
            <div><strong className="text-[var(--foreground)] print:text-black">AI and Agents:</strong> LangGraph, FastMCP, MCP, RAG, embeddings, vector retrieval, tool calling, evaluation, PyTorch</div>
            <div><strong className="text-[var(--foreground)] print:text-black">Data &amp; Infrastructure:</strong> PostgreSQL, Vertica, Kafka, Redis, Elasticsearch, Docker, Kubernetes, Helm, Git, CI/CD</div>
          </div>
        </div>

        {/* Education and Research */}
        <div className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Education and Research
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between items-baseline">
              <h4 className="font-bold text-sm">B.E. Electronics and Communication Engineering</h4>
              <span className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">2024</span>
            </div>
            <p className="text-xs text-[var(--muted)] print:text-gray-800">Sri Krishna College of Engineering and Technology · CGPA 8.5/10</p>
          </div>
          <div className="space-y-2">
            <a href="https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality" target="_blank" rel="noopener noreferrer" className="font-bold text-xs hover:underline">Adaptive Compute Efficient Learning via Conceptual-Criticality</a>
            <p className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">Co-author, AAAI 2026 Student Abstract</p>
            <p className="text-xs text-[var(--muted)] print:text-gray-800">Proof of concept retained about 90.7% accuracy while reducing energy use by about 65% versus a 6-layer baseline.</p>
          </div>
        </div>

        {/* Awards and Recognition */}
        <div id="awards" className="space-y-4">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent)] print:text-emerald-800 border-b border-[var(--border)] pb-1">
            Awards and Recognition
          </h3>
          <div className="grid md:grid-cols-2 gap-4 print:grid-cols-1">
            {awards.map((award) => (
              <div key={award.id} className="space-y-1">
                <a href={award.certificateHref} target="_blank" rel="noopener noreferrer" className="font-bold text-xs hover:underline">{award.contribution}</a>
                <p className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">{award.title} · {award.organization}</p>
                <p className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">{award.date}</p>
                <p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">{award.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
