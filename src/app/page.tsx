import * as React from "react";
import { ArrowUpRight, Cpu, Database, Network, HardDrive, ShieldAlert, Zap, FileText, CheckCircle2 } from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* 1. ABOVE THE FOLD: HERO SECTION */}
      <section className="space-y-6 pt-4 border-b border-[var(--border)] pb-12">
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--muted-background)] text-xs font-mono text-[var(--accent)] font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
            Systems & Platform Engineer
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Mano Bharathi
          </h1>
          <p className="text-xl text-[var(--muted)] font-medium max-w-3xl leading-relaxed">
            I design, build, and optimize low-latency storage engines, high-throughput message brokers, and distributed data pipelines.
          </p>
        </div>

        {/* Proof Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">2+ Yrs</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">Production Experience</div>
          </div>
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">1.5M/s</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">Cache Throughput Target</div>
          </div>
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">150K/s</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">CDC Streaming Capacity</div>
          </div>
          <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50">
            <div className="text-2xl font-bold font-mono text-[var(--accent)]">AVX-512</div>
            <div className="text-xs text-[var(--muted)] mt-1 font-mono uppercase">SIMD Retrieval Optimizations</div>
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
              <Database className="w-4 h-4 text-[var(--accent)]" /> Storage & Databases
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              LSM-Trees, Write-Ahead Logs (WAL), compaction strategies, sparse index layouts, and key-value file formats.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Network className="w-4 h-4 text-[var(--accent)]" /> Distributed Systems & I/O
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              Consensus protocols (Raft), zero-copy networking (sendfile/splice), async I/O (io_uring, epoll), and stream-processing deduplication.
            </p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 font-bold text-sm">
              <Cpu className="w-4 h-4 text-[var(--accent)]" /> Infrastructure & AI Retrieval
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed">
              GPU scheduling topologies (NVLink affinity), vector index search (HNSW, PQ), SIMD compiler parallelization, and telemetry aggregation.
            </p>
          </div>
        </div>
      </section>

      {/* 3. EXPERIENCE SECTION: OPENTEXT PRODUCTION IMPACT */}
      <section id="experience" className="space-y-8 scroll-mt-20">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Production Experience
        </h2>

        <div className="space-y-12">
          {/* Role Header */}
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
              <div>
                <h3 className="text-lg font-bold">Associate Software Engineer</h3>
                <div className="text-sm font-semibold text-[var(--accent)]">OpenText — Platform Infrastructure Groups</div>
              </div>
              <div className="text-xs font-mono text-[var(--muted)]">Oct 2024 — Present</div>
            </div>
            <p className="text-sm text-[var(--muted)]">
              Shipped backend services and data pipeline layers for enterprise platform connectivity, security compliance, and high-frequency systems monitoring.
            </p>

            {/* Project 1 */}
            <div className="border-l-2 border-[var(--border)] pl-4 space-y-4">
              <div className="font-bold text-sm flex items-center gap-2">
                <Network className="w-4 h-4 text-[var(--accent)]" /> Link Connectivity Services Scaling
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <div><strong className="text-[var(--foreground)] font-semibold">Problem:</strong> Relational database connection pools and indexing queries bottlenecked under heavy UUID storage lookup layouts.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Context:</strong> Managed routing mappings for inter-region multi-tenant VPN node setups.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Constraints:</strong> Zero database schema migrations allowed due to high-availability cluster agreements.</div>
                </div>
                <div className="space-y-1.5">
                  <div><strong className="text-[var(--foreground)] font-semibold">Decisions:</strong> Restructured link ID memory cache boundaries and optimized spatial lookup queries.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Tradeoffs:</strong> Accepted a marginal 2% memory footprint increase in application JVM layers.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Metrics & Outcome:</strong> Increased supported active inter-region connections from 55 to 165 (3x scale increase).</div>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="border-l-2 border-[var(--border)] pl-4 space-y-4">
              <div className="font-bold text-sm flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-[var(--accent)]" /> Automated Vulnerability Triage Pipeline
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <div><strong className="text-[var(--foreground)] font-semibold">Problem:</strong> Security teams manually matched daily security advisories to software dependencies, wasting engineering hours.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Context:</strong> Target inventory compliance checks require deterministic local audits.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Constraints:</strong> Strictly prohibited from shipping software configuration inventories to external cloud LLM endpoints.</div>
                </div>
                <div className="space-y-1.5">
                  <div><strong className="text-[var(--foreground)] font-semibold">Decisions:</strong> Built a local LLaMA-2 offline evaluator pipeline containerized on dedicated GPU hardware.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Tradeoffs:</strong> Provisioned dedicated local GPU nodes instead of using standard scalable serverless APIs.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Metrics & Outcome:</strong> Reduced daily manual triage time from several hours to minutes.</div>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="border-l-2 border-[var(--border)] pl-4 space-y-4">
              <div className="font-bold text-sm flex items-center gap-2">
                <Zap className="w-4 h-4 text-[var(--accent)]" /> High-Frequency Observability Metric Ingestion
              </div>
              <div className="grid md:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1.5">
                  <div><strong className="text-[var(--foreground)] font-semibold">Problem:</strong> High-frequency telemetry dashboard updates caused heavy CPU read spikes on index databases.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Context:</strong> Platform logging agent nodes push metrics updates every 10 seconds.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Constraints:</strong> Must preserve raw granularity tables for historical compliance audits.</div>
                </div>
                <div className="space-y-1.5">
                  <div><strong className="text-[var(--foreground)] font-semibold">Decisions:</strong> Implemented rule-based query routing, caching pre-aggregated baselines on a write-aside cache.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Tradeoffs:</strong> Accepted a 60-second synchronization lag target for dashboard statistics updates.</div>
                  <div><strong className="text-[var(--foreground)] font-semibold">Metrics & Outcome:</strong> Reduced telemetry read load by 80% on time-series database instances.</div>
                </div>
              </div>
            </div>
          </div>

          {/* Intern Role */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
              <div>
                <h3 className="text-md font-bold">Software Engineering Intern</h3>
                <div className="text-sm font-semibold text-[var(--accent)]">OpenText — Network Operations Platform Group</div>
              </div>
              <div className="text-xs font-mono text-[var(--muted)]">Apr 2024 — Sept 2024</div>
            </div>
            <p className="text-sm text-[var(--muted)] leading-relaxed">
              Designed and built consumption telemetry dashboard utilities for license monitoring across SaaS operations. Shipped code and met features SLAs, leading directly to full-time Associate Software Engineer conversion.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CORE SYSTEMS PROJECTS */}
      <section id="projects" className="space-y-8 scroll-mt-20">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Systems Engineering Products
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* ZenithDB */}
          <div className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-[var(--accent)]" /> ZenithDB
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">Storage / Consensus</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Distributed LSM-Tree storage engine featuring leveling compactions, Bloom filters, write-ahead logs, and custom Raft consensus replication.
              </p>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                Golang · Raft · LSM · Bloom Filters
              </div>
            </div>
            <a href="/projects/zenithdb" className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
              Design RFC & Benchmarks <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* AetherFlow */}
          <div className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Network className="w-4 h-4 text-[var(--accent)]" /> AetherFlow
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">Message Broker</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                High-performance commit log broker utilizing zero-copy Linux syscalls (`sendfile`, `splice`) and an epoll network event loop.
              </p>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                Rust · epoll · sendfile · Zero-Copy
              </div>
            </div>
            <a href="/projects/aetherflow" className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
              Design RFC & Benchmarks <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* SyncMirror */}
          <div className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--accent)]" /> SyncMirror
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">Data Ingestion</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Change Data Capture (CDC) engine parsing PostgreSQL WAL logs, streaming transactions to Kafka with exactly-once deduplication semantics.
              </p>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                Rust · CDC · Kafka · Exactly-Once
              </div>
            </div>
            <a href="/projects/syncmirror" className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
              Design RFC & Benchmarks <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* ChronosCache */}
          <div className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Zap className="w-4 h-4 text-[var(--accent)]" /> ChronosCache
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">Distributed Cache</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Log-structured distributed cache using an asynchronous io_uring engine and slab memory allocators to prevent GC fragmentation.
              </p>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                Golang/C++ · io_uring · Slab Allocation · LRU
              </div>
            </div>
            <a href="/projects/chronoscache" className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
              Design RFC & Benchmarks <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* VektorIndex */}
          <div className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-[var(--accent)]" /> VektorIndex
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">Retrieval Engine</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                SIMD-accelerated approximate nearest neighbor search library implementing HNSW graphs and Product Quantization (PQ) in C++.
              </p>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                C++ · AVX-512 · HNSW · Quantization
              </div>
            </div>
            <a href="/projects/vektorindex" className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
              Design RFC & Benchmarks <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* KubeSched GPU */}
          <div className="p-5 rounded border border-[var(--border)] hover:border-[var(--accent)] bg-[var(--muted-background)]/20 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-base flex items-center gap-2">
                  <Network className="w-4 h-4 text-[var(--accent)]" /> KubeSched-GPU
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">Kubernetes / Scheduling</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                Topology-aware Kubernetes scheduler plugin that maps hardware NVLink layout pathways to optimize distributed LLM training.
              </p>
              <div className="text-[10px] font-mono text-[var(--muted)]">
                Go · Kubernetes Scheduler API · NVLink
              </div>
            </div>
            <a href="/projects/kubesched-gpu" className="mt-4 inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
              Design RFC & Benchmarks <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* 5. TECHNICAL ARTICLES SECTION */}
      <section className="space-y-6">
        <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--muted)] border-b border-[var(--border)] pb-2">
          Systems Engineering Writing
        </h2>
        
        <div className="space-y-4">
          <a href="/blog/lsm-tree-from-scratch" className="group block border-b border-[var(--border)] pb-3">
            <div className="flex justify-between items-baseline gap-2">
              <h3 className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors">
                Writing an LSM-Tree Storage Engine from Scratch in Rust
              </h3>
              <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap">Jul 2026</span>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              Building file formats, memtable boundary checks, immutable sorted tables, and sequential write allocations.
            </p>
          </a>

          <a href="/blog/zero-copy-splice-sendfile" className="group block border-b border-[var(--border)] pb-3">
            <div className="flex justify-between items-baseline gap-2">
              <h3 className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors">
                Zero-Copy Networking: Using sendfile and splice
              </h3>
              <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap">Jun 2026</span>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              Optimizing data paths through the OS page cache and network interfaces to minimize user-space memory copies.
            </p>
          </a>

          <a href="/blog/gpu-topology-scheduling" className="group block border-b border-[var(--border)] pb-3">
            <div className="flex justify-between items-baseline gap-2">
              <h3 className="text-sm font-bold group-hover:text-[var(--accent)] transition-colors">
                NVLink Topology-Aware Scheduling in Kubernetes
              </h3>
              <span className="text-xs font-mono text-[var(--muted)] whitespace-nowrap">May 2026</span>
            </div>
            <p className="text-xs text-[var(--muted)] mt-1">
              Solving bottleneck problems in deep learning pipeline parallelism by evaluating network layouts of multi-GPU nodes.
            </p>
          </a>
        </div>
        
        <a href="/blog" className="inline-flex items-center gap-1 text-xs text-[var(--accent)] font-semibold hover:underline">
          View All Technical Articles <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </section>
    </div>
  );
}
