import * as React from "react";
import { ArrowRight, Database, Network, Cpu, Zap, Eye, GitBranch, Terminal } from "lucide-react";

interface TechTopic {
  title: string;
  icon: React.ReactNode;
  description: string;
  concepts: string[];
  demonstratingProjects: {
    name: string;
    slug: string;
    details: string;
  }[];
}

const topics: TechTopic[] = [
  {
    title: "Consensus & State Replication",
    icon: <GitBranch className="w-5 h-5 text-[var(--accent)]" />,
    description: "Replicating transaction state across independent servers to maintain consistency and high availability under machine crashes and network partitions.",
    concepts: ["Raft Leader Election", "Log Replication", "Membership Changes", "Split-brain fencing"],
    demonstratingProjects: [
      {
        name: "ZenithDB",
        slug: "zenithdb",
        details: "Implements a custom Raft consensus state machine to replicate writes across follower logs safely."
      }
    ]
  },
  {
    title: "Storage Engines & Log Structuring",
    icon: <Database className="w-5 h-5 text-[var(--accent)]" />,
    description: "Optimizing database read and write paths for sequential disk access and cache locality.",
    concepts: ["LSM-Tree compaction", "Write-Ahead Logging (WAL)", "Sparse Index Mappings", "Bloom filter lookup optimization"],
    demonstratingProjects: [
      {
        name: "ZenithDB",
        slug: "zenithdb",
        details: "Implements an in-memory Red-Black tree memtable, segment write-ahead logging, and background leveled compaction."
      }
    ]
  },
  {
    title: "High-Performance Networking & I/O",
    icon: <Network className="w-5 h-5 text-[var(--accent)]" />,
    description: "Bypassing context switches, buffer copies, and locking bottlenecks in socket servers under heavy concurrency load.",
    concepts: ["Zero-copy networking (sendfile/splice)", "epoll event loop concurrency", "Asynchronous I/O via io_uring", "Socket ring buffers"],
    demonstratingProjects: [
      {
        name: "AetherFlow",
        slug: "aetherflow",
        details: "Uses Linux sendfile/splice and custom epoll loops to achieve line-rate network card saturation."
      },
      {
        name: "ChronosCache",
        slug: "chronoscache",
        details: "Utilizes the kernel io_uring interface to register asynchronous socket reads and offload allocations off-heap."
      }
    ]
  },
  {
    title: "Low-Latency Caching & Memory Allocations",
    icon: <Zap className="w-5 h-5 text-[var(--accent)]" />,
    description: "Building fast, in-memory caches that optimize RAM consumption and avoid GC latency spikes.",
    concepts: ["Slab memory allocation", "Off-heap pointer safety", "Lock-free key lookup tables", "Adaptive cache eviction (LRU/LFU)"],
    demonstratingProjects: [
      {
        name: "ChronosCache",
        slug: "chronoscache",
        details: "Implements an off-heap slab memory allocator in Go/C++ to guarantee zero garbage-collection pauses under 1.5M ops/sec."
      }
    ]
  },
  {
    title: "Stream Processing & Change Data Capture (CDC)",
    icon: <Terminal className="w-5 h-5 text-[var(--accent)]" />,
    description: "Ingesting raw database mutations directly from logs and streaming them with low replication lag and transaction safety.",
    concepts: ["PostgreSQL WAL byte parsing", "Transaction boundary reconstruction", "Sliding-window de-duplication", "Exactly-once streaming semantics"],
    demonstratingProjects: [
      {
        name: "SyncMirror",
        slug: "syncmirror",
        details: "Parses raw PostgreSQL WAL output and routes transactions to Kafka partitions with sliding deduplication trackers."
      }
    ]
  },
  {
    title: "AI Retrieval & Dense Vector Indexes",
    icon: <Cpu className="w-5 h-5 text-[var(--accent)]" />,
    description: "Accelerating similarity lookups over high-dimensional vector spaces using compiler-level instruction sets.",
    concepts: ["HNSW graph construction", "SIMD vector arithmetic (AVX-512)", "Product Quantization (PQ) compression", "Recall/latency trade-off optimizations"],
    demonstratingProjects: [
      {
        name: "VektorIndex",
        slug: "vektorindex",
        details: "Implements SIMD-aligned cosine distance calculations and HNSW graphs in C++ to achieve sub-5ms recall latency."
      }
    ]
  },
  {
    title: "Cluster Resource Scheduling",
    icon: <Network className="w-5 h-5 text-[var(--accent)] text-purple-500" />,
    description: "Placing massive compute jobs onto physical clusters while accounting for complex hardware topology and communication costs.",
    concepts: ["Kubernetes scheduler scheduler-plugins", "NVLink bandwidth routing path cost", "Hardware topology discovery mappings", "Cluster state caching"],
    demonstratingProjects: [
      {
        name: "KubeSched-GPU",
        slug: "kubesched-gpu",
        details: "Uses topology maps and custom Kubernetes placement logic to route distributed LLM training jobs to NVLink-adjacent GPUs."
      }
    ]
  },
  {
    title: "System Observability & Baseline Diagnostics",
    icon: <Eye className="w-5 h-5 text-[var(--accent)]" />,
    description: "Tracking end-to-end data pipeline diagnostics, system health thresholds, and metric aggregates under high-frequency writes.",
    concepts: ["Dynamic query baseline routing", "Prometheus exporters", "Distributed tracer context propagation", "Load testing diagnostics metrics"],
    demonstratingProjects: [
      {
        name: "SyncMirror",
        slug: "syncmirror",
        details: "Exposes real-time Kafka partition offsets, ingestion lag metrics, and memory-buffer consumption stats."
      }
    ]
  }
];

export default function ArchitecturePage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--border)] pb-4">
        <h1 className="text-3xl font-extrabold tracking-tight">Systems Architecture Library</h1>
        <p className="text-sm text-[var(--muted)] mt-1">
          A cross-linked catalog of core engineering concepts mapped directly to their implementations.
        </p>
      </div>

      {/* Grid of Topics */}
      <div className="grid gap-6 md:grid-cols-2">
        {topics.map((topic, i) => (
          <div key={i} className="p-6 rounded border border-[var(--border)] bg-[var(--background)] flex flex-col justify-between hover:border-[var(--accent)] transition-all">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded bg-[var(--muted-background)] border border-[var(--border)]">
                  {topic.icon}
                </div>
                <h2 className="font-bold text-base">{topic.title}</h2>
              </div>
              
              <p className="text-xs text-[var(--muted)] leading-relaxed">
                {topic.description}
              </p>

              {/* Core Concepts list */}
              <div className="space-y-1.5">
                <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Key Design Concepts</div>
                <div className="flex flex-wrap gap-1.5">
                  {topic.concepts.map((concept, cIdx) => (
                    <span key={cIdx} className="text-[10px] font-mono px-2 py-0.5 rounded border border-[var(--border)] bg-[var(--muted-background)]">
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Demonstrating Projects */}
            <div className="border-t border-[var(--border)] pt-4 mt-6 space-y-3">
              <div className="text-[10px] font-mono text-[var(--muted)] uppercase tracking-wider">Demonstrated In:</div>
              {topic.demonstratingProjects.map((p, pIdx) => (
                <div key={pIdx} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <a href={`/projects/${p.slug}`} className="text-xs font-bold hover:text-[var(--accent)] hover:underline flex items-center gap-1">
                      {p.name} <ArrowRight className="w-3 h-3 text-[var(--accent)]" />
                    </a>
                  </div>
                  <p className="text-[11px] text-[var(--muted)] leading-normal">
                    {p.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
