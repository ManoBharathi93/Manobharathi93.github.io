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
    title: "Browser Workflow Discovery & Replay",
    icon: <GitBranch className="w-5 h-5 text-[var(--accent)]" />,
    description: "Using an LLM to discover browser workflows once, then saving successful workflows for deterministic, model-free replay.",
    concepts: ["LLM-guided discovery", "Saved workflows", "Deterministic replay", "Model-free execution"],
    demonstratingProjects: [
      {
        name: "Capability Runner",
        slug: "capability-runner",
        details: "Separates workflow discovery from replay so saved browser workflows can run without repeated model calls."
      }
    ]
  },
  {
    title: "Change Data Capture & Data Synchronization",
    icon: <Database className="w-5 h-5 text-[var(--accent)]" />,
    description: "Propagating database changes through a distributed pipeline for downstream caching and indexed search.",
    concepts: ["PostgreSQL change capture", "Debezium connectors", "Kafka data propagation", "Redis and Elasticsearch"],
    demonstratingProjects: [
      {
        name: "SyncStream",
        slug: "syncstream",
        details: "Connects PostgreSQL, Debezium, Kafka, Redis, and Elasticsearch in a change-data-capture pipeline."
      }
    ]
  },
  {
    title: "Voice Interactions & Agent Orchestration",
    icon: <Network className="w-5 h-5 text-[var(--accent)]" />,
    description: "Combining speech recognition and WebSocket-based voice interactions with retrieval and agent orchestration for an IT/HR support prototype.",
    concepts: ["Speech recognition", "WebSocket interactions", "LangGraph orchestration", "Enterprise RAG"],
    demonstratingProjects: [
      {
        name: "Ticketless IT/HR Voice Support",
        slug: "ticketless-enterprise",
        details: "Brings voice interactions, enterprise knowledge retrieval, and support workflow orchestration into one prototype."
      }
    ]
  },
  {
    title: "Action Validation & Human Takeover",
    icon: <Zap className="w-5 h-5 text-[var(--accent)]" />,
    description: "Checking browser actions against page evidence and handing unsupported states back to a person.",
    concepts: ["Action validation", "Page-evidence checks", "Expected-error handling", "Human takeover"],
    demonstratingProjects: [
      {
        name: "Capability Runner",
        slug: "capability-runner",
        details: "Validates actions and page evidence, handles expected errors, and supports human takeover when automation cannot proceed."
      }
    ]
  },
  {
    title: "Case-Aware Retrieval & Reusable Memory",
    icon: <Terminal className="w-5 h-5 text-[var(--accent)]" />,
    description: "Combining enterprise RAG with reusable case memory to support case-aware agent workflows.",
    concepts: ["Enterprise retrieval", "Reusable case memory", "Dual-memory agents", "Staged evaluation"],
    demonstratingProjects: [
      {
        name: "Adaptive Runbook Intelligence Platform",
        slug: "adaptive-runbook-intelligence",
        details: "Explores support-agent workflows that combine retrieved knowledge with reusable case context."
      }
    ]
  },
  {
    title: "Retrieval Reranking & Context Selection",
    icon: <Cpu className="w-5 h-5 text-[var(--accent)]" />,
    description: "Exploring how dynamic and fixed-K reranking select retrieved context for language models.",
    concepts: ["Retrieval-augmented generation", "Dynamic K selection", "Fixed-K reranking", "LLM context selection"],
    demonstratingProjects: [
      {
        name: "Dynamic Retriever",
        slug: "dynamic-retriever",
        details: "Compares dynamic and fixed-K reranking approaches for choosing context in RAG workflows."
      }
    ]
  },
  {
    title: "Compute-Efficient Learning",
    icon: <Network className="w-5 h-5 text-[var(--accent)] text-purple-500" />,
    description: "Studying adaptive computation through conceptual criticality and measuring the trade-off between model accuracy and energy use.",
    concepts: ["Adaptive computation", "Conceptual criticality", "Energy measurement", "Accuracy evaluation"],
    demonstratingProjects: [
      {
        name: "Adaptive Compute-Efficient Learning",
        slug: "adaptive-compute-efficient-learning",
        details: "AAAI 2026 Student Abstract proof of concept retained about 90.7% accuracy while reducing energy use by about 65% versus a 6-layer baseline."
      }
    ]
  },
  {
    title: "Screen Understanding & Support Verification",
    icon: <Eye className="w-5 h-5 text-[var(--accent)]" />,
    description: "Using screen context to support IT/HR assistance, with human approval and structured verification before closing a support workflow.",
    concepts: ["VLM screen understanding", "OCR", "Human approval", "Structured verification"],
    demonstratingProjects: [
      {
        name: "Ticketless IT/HR Voice Support",
        slug: "ticketless-enterprise",
        details: "Combines VLM/OCR screen understanding with voice support, enterprise retrieval, and approval before closure."
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
          Engineering concepts explored in my projects, prototypes, and research.
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
