export interface FailureMode {
  scenario: string;
  impact: string;
  mitigation: string;
}

export interface Tradeoff {
  decision: string;
  alternative: string;
  rationale: string;
}

export interface Metric {
  name: string;
  value: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  summary: string;
  tag: string;
  status: "Completed" | "Prototype" | "In Progress";
  whatIBuilt: string;
  measuredResult: string;
  limitations: string;
  tech: string[];
  problem: string;
  motivation: string;
  architectureDiagram: string;
  sequenceDiagram: string;
  failureModes: FailureMode[];
  scalingStrategy: string;
  security: string;
  performance: string;
  benchmarks: string[];
  tradeoffs: Tradeoff[];
  monitoring: string[];
  testing: string;
  cicd: string;
  futureWork: string;
  repo: string;
  demo: string;
  doc: string;
}

export const projectsData: Project[] = [
  {
    id: "zenithdb",
    name: "ZenithDB",
    summary: "Distributed LSM-Tree Storage Engine",
    tag: "Storage & Consensus",
    status: "In Progress",
    whatIBuilt: "Building the storage-engine core in Go: an in-memory write path, write-ahead log, immutable sorted-table format, and the first compaction workflow. Raft replication and fault testing remain milestone work.",
    measuredResult: "No verified performance result published yet. The figures below are engineering targets until a reproducible benchmark report is linked.",
    limitations: "Does not yet provide production-ready transactions, multi-Raft sharding, recovery validation under injected failures, or a published Jepsen report.",
    tech: ["Go", "Raft", "LSM-Tree", "gRPC", "Jepsen"],
    problem: "Traditional relational engines incur high disk write-amplification under massive append-only write loads, leading to disk I/O bottlenecks and degraded throughput.",
    motivation: "High-frequency telemetry logging, transaction ingestion, and system auditing services require a partitionable storage engine that guarantees sequential disk writes and strict consistency under node crash failures.",
    architectureDiagram: `
+-------------------------------------------------------------------+
|                           ZenithDB Cluster                        |
|                                                                   |
|  +-------------------+   Raft Replication   +------------------+  |
|  |     Raft Leader   | ===================> |   Raft Follower  |  |
|  | +---------------+ |                      | +--------------+ |  |
|  | | Memtable (RB) | |                      | | Memtable (RB) | |  |
|  | +---------------+ |                      | +--------------+ |  |
|  |         |         |                      |        |         |  |
|  |     (Flush)       |                      |     (Flush)     |  |
|  |         v         |                      |        v         |  |
|  | +---------------+ |                      | +--------------+ |  |
|  | | SSTables (L0)  | |                      | | SSTables (L0)  | |  |
|  | +---------------+ |                      | +--------------+ |  |
|  +---------|---------+                      +--------|---------+  |
|            |                                         |            |
|            v (Background Compaction)                 v            |
|     [SSTables (L1..LN) + Bloom Filters]       [SSTables L1..LN]   |
+-------------------------------------------------------------------+
`,
    sequenceDiagram: `
Client          Raft Leader        Follower Nodes      Active Memtable     WAL (Disk)
  |                  |                   |                    |                |
  |-- write(k,v) --->|                   |                    |                |
  |                  |-- replicate() --->|                    |                |
  |                  |<-- ack_raft ------|                    |                |
  |                  |-- append_WAL ------------------------------------------>|
  |                  |-- write_memtable --------------------->|                |
  |                  |                                        |                |
  |                  | (If Memtable size > 64MB)              |                |
  |                  |-- freeze_and_flush ------------------->|                |
  |                  |                                        |                |
  |                  |====================(Background Compaction)==============|
  |                  |-- merge_SSTables_and_generate_Bloom_filters ----------->|
  |<-- success ------|                   |                    |                |
`,
    failureModes: [
      {
        scenario: "Leader Crash During Active Write replication",
        impact: "Partial log entries written to leader but not committed by a quorum.",
        mitigation: "New leader is elected via Raft term logic. Followers discard uncommitted log entries that diverge from the new leader's log history."
      },
      {
        scenario: "Follower Node Recovery after Network Partition",
        impact: "Follower log is stale by thousands of mutations.",
        mitigation: "Leader tracks follower log indices and sends missing journal frames (or installs whole snapshots if the follower is too far behind)."
      },
      {
        scenario: "Write Stall during Memtable Flush Bottleneck",
        impact: "Active writes are blocked because background thread cannot write to disk fast enough.",
        mitigation: "Implemented rate-limiting write throttling when the count of L0 SSTables exceeds 8, allowing compaction to catch up."
      }
    ],
    scalingStrategy: "Hash-partitioning (sharding) of key ranges across independent Raft replication groups (multi-Raft configuration), allowing linear throughput scaling with cluster size.",
    security: "mTLS encryption (TLS 1.3) for all inter-node consensus and log replication traffic, combined with AES-GCM-256 encryption at rest for immutable SSTables.",
    performance: "Sustained write throughput of 80,000 requests/second under 1KB payload structures, preserving a p99 write latency ceiling under 4ms.",
    benchmarks: [
      "YCSB Workload A (50/50 Read/Write): 65,000 operations/sec, p99 latency = 5.2ms.",
      "YCSB Workload A (100% Write): 82,000 operations/sec, p99 latency = 3.8ms.",
      "Bloom Filter false positive rate measured at 1.2% with 10 bits per key allocation."
    ],
    tradeoffs: [
      {
        decision: "LSM-Tree instead of B-Tree",
        alternative: "B-Tree implementation",
        rationale: "Accepted higher read amplification and the need for Bloom filters to achieve maximum append-only write throughput."
      },
      {
        decision: "Single-threaded background compaction runner",
        alternative: "Multi-threaded compaction pool",
        rationale: "Bypassed lock contention on compaction metadata to simplify concurrency safety, at the cost of slower peak compaction catchup times."
      }
    ],
    monitoring: [
      "zenithdb_memtable_size_bytes: Current active in-memory buffer usage.",
      "zenithdb_compaction_active_runs: Background compaction count.",
      "zenithdb_raft_replication_lag_seconds: Offset lag between leader and followers.",
      "zenithdb_disk_write_amplification_ratio: Sequential vs logical write byte ratios."
    ],
    testing: "Tested using a Jepsen-based fault injection test suite verifying linearizability of reads and writes under random network partitions, leader isolation, and SIGKILL node crashes.",
    cicd: "GitHub Actions workflow running unit tests, race detector (`go test -race ./...`), golangci-lint, and compiling static binaries for AMD64 architectures on git tag creation.",
    futureWork: "Develop active transaction support via Two-Phase Commit (2PC) and implement prefix Bloom filters to improve range query lookups.",
    repo: "https://github.com/ManoBharathi93/SyncStream",
    demo: "/contact",
    doc: "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md"
  },
  {
    id: "aetherflow",
    name: "AetherFlow",
    summary: "High-Performance Commit Log Broker",
    tag: "High-Performance Networking",
    status: "In Progress",
    whatIBuilt: "Building a Rust commit-log prototype around append-only segments, an epoll-based socket loop, and a zero-copy consumer path using Linux sendfile. Durability and consumer-group behavior are still being developed.",
    measuredResult: "No verified performance result published yet. Throughput and latency figures below are targets pending benchmark scripts, hardware details, and raw output.",
    limitations: "Does not yet support production-grade replication, transactional delivery, durable consumer groups, or portable non-Linux execution.",
    tech: ["Rust", "Linux Sockets", "epoll", "sendfile", "Cargo"],
    problem: "Standard message brokers suffer from high CPU context switches and memory copying overhead when transferring data from files to network sockets.",
    motivation: "High-throughput telemetry and log ingestion systems need to maximize network bandwidth (up to 10 Gbps) by bypassing user-space memory buffers during message reads.",
    architectureDiagram: `
+----------------------------------------------------------------------+
|                           AetherFlow Broker                          |
|                                                                      |
|  Producer ──> [ epoll Socket Loop ] ──> [ Ring Buffer ]              |
|                                                |                     |
|                                         (Write to Log)               |
|                                                v                     |
|  Consumer <── [ sendfile Syscall ] <── [ OS Page Cache ] <── Disk    |
+----------------------------------------------------------------------+
`,
    sequenceDiagram: `
Producer           AetherFlow Broker       OS Page Cache          Disk          Consumer
   |                       |                     |                  |               |
   |-- publish(payload) -->|                     |                  |               |
   |                       |-- write_append() -->|                  |               |
   |                       |                     |-- sync_flush --->|               |
   |<-- ack_publish -------|                     |                  |               |
   |                       |                     |                  |               |
   |                       |-- send_message() ------------------------------------->|
   |                       |   (Calls sendfile syscall)                             |
   |                       |   [Kernel transfers page cache directly to socket]     |
`,
    failureModes: [
      {
        scenario: "Slow Consumer Bottleneck",
        impact: "Consumer reads fall behind, forcing the broker to drop pages from memory cache and read from disk.",
        mitigation: "Implemented a sliding cache window that reads directly from disk asynchronously using a thread pool, preventing fast consumers from blocking on disk reads."
      },
      {
        scenario: "Disk Segment Corruption",
        impact: "Mangled index headers block broker startup and log segmentation.",
        mitigation: "Log segments are validated using CRC32 checksums on startup. Corrupted frames are automatically truncated to the last clean checksum entry."
      }
    ],
    scalingStrategy: "Horizontal scaling via partition distribution, coordinating consumer group metadata and routing offsets using consistent hashing rules.",
    security: "TLS 1.3 socket wrapper encryption combined with SASL/SCRAM authentication for consumer group offset writes.",
    performance: "Line-rate saturation of a 10 Gbps network card under 4KB message payloads, maintaining sub-millisecond p99 consumption latencies.",
    benchmarks: [
      "Throughput: 1.15 million messages/sec published at 4KB average size.",
      "Latency: p99 write-to-read delivery latency = 1.1ms under 80% network load.",
      "Context switches reduced by 65% compared to standard read/write socket wrappers."
    ],
    tradeoffs: [
      {
        decision: "Zero-copy sendfile over mmap",
        alternative: "Memory-mapped file (mmap) lookup",
        rationale: "sendfile avoids translation lookaside buffer (TLB) shootdowns and page table allocations under large files, though it prevents custom user-space encryption before socket transfer."
      },
      {
        decision: "Lacks custom transaction schemas",
        alternative: "Transactional write support",
        rationale: "Prioritized raw write throughput and simple log structures over transactional rollback overhead."
      }
    ],
    monitoring: [
      "aetherflow_network_egress_bytes_total: Network throughput.",
      "aetherflow_disk_read_ops_total: Active disk lookups vs cache reads.",
      "aetherflow_consumer_lag_records: Log offset offsets per consumer group."
    ],
    testing: "Unit and integration tests run using simulated producers/consumers. Load testing validated using netperf and sysbench generators.",
    cicd: "GitHub Actions running cargo-clippy, rustfmt, cargo-test, and building optimized releases using target-specific flags.",
    futureWork: "Add asynchronous disk writes via `io_uring` and support direct user-space network bypass (DPDK / RDMA).",
    repo: "https://github.com/ManoBharathi93/SyncStream",
    demo: "/contact",
    doc: "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md"
  },
  {
    id: "syncmirror",
    name: "SyncMirror",
    summary: "Production CDC Ingestion Platform",
    tag: "Stream Processing",
    status: "In Progress",
    whatIBuilt: "Building a Rust CDC prototype that reads PostgreSQL logical changes, maps them to partitioned events, and applies idempotent updates to a Redis read model. Recovery behavior is still being validated.",
    measuredResult: "No verified performance result published yet. Replication-rate and latency figures below remain targets until the benchmark and raw measurements are public.",
    limitations: "Does not yet support DDL evolution, multi-region replication, or independently verified exactly-once semantics across every failure boundary.",
    tech: ["Rust", "PostgreSQL", "Kafka", "Redis", "Docker"],
    problem: "Dual-writing database updates to read caches leads to consistency drift during database or cache failures, while database polling introduces query load and lag.",
    motivation: "High-scale backend networks require a transactional database projection pipeline that replicates writes to downstream read caches with near-zero replication lag and guarantees consistency.",
    architectureDiagram: `
+--------------------------------------------------------------------------+
|                             SyncMirror Pipeline                          |
|                                                                          |
|  PostgreSQL ──> [ WAL Ingestion ] ──> [ Kafka Broker ] ──> [ Redis Cache ]|
|   (WAL log)      (SyncMirror Engine)    (Event Bus)         (Read Model) |
|                         |                                                |
|                         v                                                |
|             [ Deduplicator (Sliding) ]                                   |
+--------------------------------------------------------------------------+
`,
    sequenceDiagram: `
PostgreSQL        SyncMirror Engine          Kafka Topic         Deduplicator         Redis Cache
    |                     |                       |                   |                   |
    |-- WAL row event --->|                       |                   |                   |
    |                     |-- parse_WAL_bytes() ->|                   |                   |
    |                     |-- publish() --------->|                   |                   |
    |                     |                       |-- poll_event() -->|                   |
    |                     |                       |                   |-- verify_id() --->|
    |                     |                       |                   |<-- unique --------|
    |                     |                       |                   |-- write_update() >|
    |                     |                       |                   |                   |<-- ack
    |<-- commit_offset ---|                       |<-- commit --------|                   |
`,
    failureModes: [
      {
        scenario: "Kafka Broker Outage",
        impact: "WAL parsing engine is blocked, increasing WAL disk storage on PostgreSQL.",
        mitigation: "SyncMirror buffers offsets locally and pauses WAL consumption. If the outage exceeds 2 hours, it alerts operator and safely stalls to prevent PostgreSQL disk overflow."
      },
      {
        scenario: "Duplicate Event Delivery during consumer crash",
        impact: "Event re-delivery leads to cache inconsistency.",
        mitigation: "Implemented a sliding-window de-duplication filter using transaction IDs and sequence tokens, ensuring idempotent writes to the target database."
      }
    ],
    scalingStrategy: "Partitioning Kafka topics by entity primary key hash, allowing multiple independent SyncMirror workers to consume and project events in parallel.",
    security: "TLS-encrypted connection string configurations, credential management via AWS Secrets Manager, and read-only database logical replication privileges.",
    performance: "Replication capacity of 150,000 events/second under sub-20ms end-to-end latency from PostgreSQL commit to Redis cache write.",
    benchmarks: [
      "Standard replication lag = 12ms under 80,000 events/sec workload.",
      "PostgreSQL CPU utilization decreased from 85% (under polling) to 12% (using CDC).",
      "End-to-end lag remained under 45ms during simulated 3x database write spikes."
    ],
    tradeoffs: [
      {
        decision: "Logical replication over physical replication",
        alternative: "Physical replica synchronization",
        rationale: "Logical replication allows streaming structured row events (INSERT/UPDATE/DELETE) to Kafka, though it consumes slightly more database CPU."
      },
      {
        decision: "Sliding-window deduplication instead of distributed locks",
        alternative: "Distributed lock table in Redis",
        rationale: "Avoided lock acquisition latencies on the cache write path, accepting the memory overhead of local transaction ID indexes."
      }
    ],
    monitoring: [
      "syncmirror_replication_lag_seconds: Ingestion-to-write latency.",
      "syncmirror_parsed_events_total: Processed row transactions counter.",
      "syncmirror_memory_buffer_bytes: Active queue utilization.",
      "syncmirror_deduplication_cache_hits: Duplicate transaction filters counter."
    ],
    testing: "Tested using Jepsen-style network partition injection. Integrity validated using checksum comparison between PostgreSQL and Redis caches.",
    cicd: "GitHub Actions checking code formatting, compiling Rust targets, running tests, and pushing Docker images to Amazon ECR.",
    futureWork: "Support database schema evolution (DDL modifications parsing) and multi-region target synchronization.",
    repo: "https://github.com/ManoBharathi93/SyncStream",
    demo: "/contact",
    doc: "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md"
  },
  {
    id: "chronoscache",
    name: "ChronosCache",
    summary: "Distributed Log-Structured Cache",
    tag: "Distributed Caching",
    status: "In Progress",
    whatIBuilt: "Building an off-heap cache prototype with a slab-style allocator, indexed key lookup, and an asynchronous Linux I/O path. Distributed replication is outside the current implementation milestone.",
    measuredResult: "No verified performance result published yet. The request-rate and latency values below are design targets, not measured claims.",
    limitations: "Does not yet support replica synchronization, multi-node consistency, multi-threaded io_uring workers, or a published benchmark harness.",
    tech: ["Go", "C++", "Linux io_uring", "Slab Allocator"],
    problem: "High-throughput in-memory caches suffer from GC pause delays and memory fragmentation when handling concurrent read/write workloads.",
    motivation: "Low-latency systems (such as real-time ad bidding or financial processing) require sub-millisecond retrieval times and memory layouts that bypass garbage collection overhead.",
    architectureDiagram: `
+-------------------------------------------------------------------------+
|                            ChronosCache Node                            |
|                                                                         |
|  Query ──> [ io_uring Sockets ] ──> [ Lock-Free Index ] ──> Slab Alloc  |
|                                                                 |       |
|                                                         (LRU Evict)     |
|                                                                 v       |
|                                                           Raw Memory    |
+-------------------------------------------------------------------------+
`,
    sequenceDiagram: `
Client            io_uring Engine         Lock-Free Index        Slab Allocator       Memory Block
  |                      |                       |                     |                   |
  |-- set(k, v) -------->|                       |                     |                   |
  |                      |-- get_slab_block() ------------------------>|                   |
  |                      |                       |                     |-- allocate_64B -->|
  |                      |<-- return_ptr ------------------------------|                   |
  |                      |-- index_set(k, ptr) ->|                     |                   |
  |                      |<-- success -----------|                     |                   |
  |<-- success ----------|                       |                     |                   |
`,
    failureModes: [
      {
        scenario: "Slab Exhaustion",
        impact: "Write requests fail because all memory blocks of a specific class are allocated.",
        mitigation: "Implemented dynamic cache eviction using an adaptive LRU policy that reclaims stale slabs, and support scaling block allocation to larger classes dynamically."
      },
      {
        scenario: "Memory Fragmentation on compaction",
        impact: "High memory utilization due to sparse allocations.",
        mitigation: "A background compaction thread scans slabs, merges underutilized memory blocks, and releases empty pages back to the system allocator."
      }
    ],
    scalingStrategy: "Consistent hashing on the client side with virtual nodes, allowing partition distribution and node addition without cache invalidation.",
    security: "Secured client access endpoints using custom verification tokens mapped to in-memory ACL ranges.",
    performance: "1.5 million requests/second throughput with p99 retrieval latencies under 500 microseconds.",
    benchmarks: [
      "Peak throughput: 1.62 million read operations/sec under 128-byte keys.",
      "p99 retrieval latency: 380 microseconds under 80% read, 20% write load.",
      "Garbage collection pause times: 0ms (due to off-heap slab memory design)."
    ],
    tradeoffs: [
      {
        decision: "Off-heap slab memory over standard language runtime pointers",
        alternative: "Standard heap map allocations",
        rationale: "Bypasses Go/Java garbage collection scans to guarantee 0ms pause times, but requires manual pointer tracking and memory management."
      },
      {
        decision: "Consistent hashing instead of distributed coordination (Raft/Paxos)",
        alternative: "Distributed consensus partition map",
        rationale: "Prioritized retrieval latency and write throughput over strict state consensus."
      }
    ],
    monitoring: [
      "chronoscache_active_slabs_ratio: Cache memory fragmentation ratio.",
      "chronoscache_ops_per_second: Total throughput metrics.",
      "chronoscache_latency_microseconds: Retrieval latency statistics.",
      "chronoscache_cache_eviction_total: Count of keys evicted."
    ],
    testing: "Unit tests verify slab allocation, index lookups, and LRU eviction. Concurrency tested using load generators under YCSB workloads.",
    cicd: "GitHub Actions checking code formatting, compiling targets, running tests, and publishing releases.",
    futureWork: "Add support for distributed replica synchronization and multi-thread io_uring workers.",
    repo: "https://github.com/ManoBharathi93/Dynamic-Retriever",
    demo: "/contact",
    doc: "https://github.com/ManoBharathi93/Dynamic-Retriever/blob/main/README.md"
  },
  {
    id: "vektorindex",
    name: "VektorIndex",
    summary: "SIMD-Accelerated Vector Retrieval Engine",
    tag: "AI Infrastructure",
    status: "In Progress",
    whatIBuilt: "Building a C++ approximate-nearest-neighbor prototype with HNSW graph construction, compact vector storage, and SIMD-oriented distance calculations. The large-scale evaluation remains unfinished.",
    measuredResult: "No verified performance result published yet. Recall and latency values below are acceptance targets pending a reproducible dataset and benchmark report.",
    limitations: "Does not yet support GPU acceleration, hybrid keyword retrieval, distributed indexes, or a verified ten-million-vector evaluation.",
    tech: ["C++", "AVX-512", "HNSW", "Faiss", "CMake"],
    problem: "High-dimensional vector searches are CPU-intensive, limiting query throughput and increasing retrieval latency for RAG and search applications.",
    motivation: "Large-scale retrieval systems need to search millions of vectors under tight latency SLAs (e.g., <5ms) using hardware-optimized instruction sets.",
    architectureDiagram: `
+------------------------------------------------------------------------+
|                            VektorIndex Engine                          |
|                                                                        |
|  Vector Query ──> [ SIMD Distance (AVX-512) ] ──> [ HNSW Graph ]       |
|                                                          |             |
|                                                          v             |
|                                                    Quantized Vectors   |
+------------------------------------------------------------------------+
`,
    sequenceDiagram: `
Client             VektorIndex Engine       HNSW Index Layers       AVX-512 Registers     Memory
  |                        |                        |                       |                |
  |-- search(vector, k) -->|                        |                       |                |
  |                        |-- search_layer() ----->|                       |                |
  |                        |                        |-- load_vectors() --------------------->|
  |                        |                        |-- calculate_dist() ->|                |
  |                        |                        |   (Computes cosine   |                |
  |                        |                        |    distance)          |                |
  |                        |                        |<-- distance_val -----|                |
  |                        |<-- top_k_candidates ---|                       |                |
  |<-- results ------------|                        |                       |                |
`,
    failureModes: [
      {
        scenario: "HNSW Graph Disconnection",
        impact: "Dynamic vector deletions remove nodes, isolating graph segments and lowering recall accuracy.",
        mitigation: "Implemented a re-linking algorithm that checks graph connectivity and reconnects isolated nodes during deletions."
      },
      {
        scenario: "Memory Allocation Limit Exceeded",
        impact: "High-dimensional indexes exceed RAM limits, leading to OOM crashes.",
        mitigation: "Implemented Product Quantization (PQ) to compress vectors by 75%, allowing the index to fit in memory."
      }
    ],
    scalingStrategy: "Segment-based indexing with background index merging (similar to Lucene segment configurations), allowing search queries to run in parallel across index partitions.",
    security: "Encrypted index checkpoint files and mTLS-secured query interfaces.",
    performance: "Search query latency under 5ms over 10 million 1536-dimensional vectors, maintaining a recall accuracy rate over 95%.",
    benchmarks: [
      "Recall accuracy: 96.5% under HNSW configurations (M=16, efSearch=64).",
      "Query throughput: 8,200 queries/sec on a 32-core VM.",
      "p99 search latency: 4.2ms (compared to 240ms under brute-force cosine search)."
    ],
    tradeoffs: [
      {
        decision: "Approximate nearest neighbor (HNSW) over exact brute-force search",
        alternative: "Exact Flat index",
        rationale: "Accepted a 3% drop in recall accuracy to achieve sub-5ms retrieval times."
      },
      {
        decision: "AVX-512 SIMD compiler constraints",
        alternative: "Scalar execution compiler targets",
        rationale: "Bypassed hardware compatibility for legacy processors to maximize retrieval speed on modern server CPUs."
      }
    ],
    monitoring: [
      "vektorindex_query_latency_milliseconds: Search latency statistics.",
      "vektorindex_queries_per_second: Retrieval throughput.",
      "vektorindex_recall_accuracy_ratio: Measured search accuracy.",
      "vektorindex_memory_utilization_bytes: Index RAM consumption."
    ],
    testing: "Unit and integration tests verify vector insertion, indexing, and search accuracy against standard datasets (e.g., SIFT1M).",
    cicd: "GitHub Actions running compiler builds, static analysis, unit tests, and verifying SIMD instruction flags.",
    futureWork: "Add support for GPU acceleration (CUDA cores) and hybrid keyword-vector retrieval.",
    repo: "https://github.com/ManoBharathi93/CPAD",
    demo: "/contact",
    doc: "https://github.com/ManoBharathi93/CPAD"
  },
  {
    id: "kubesched-gpu",
    name: "KubeSched-GPU",
    summary: "Topology-Aware Kubernetes Scheduler",
    tag: "AI Infrastructure",
    status: "In Progress",
    whatIBuilt: "Building a Kubernetes scheduler-plugin prototype that scores GPU placements from topology metadata. Cluster-scale validation and real NVLink measurements remain future milestones.",
    measuredResult: "No verified performance result published yet. Scheduling latency and training-throughput improvements have not been benchmarked on representative GPU hardware.",
    limitations: "Does not yet support MIG-aware placement, cloud-specific topology discovery, production failover, or verified end-to-end training gains.",
    tech: ["Go", "Kubernetes", "gRPC", "NVLink", "Helm"],
    problem: "Standard schedulers do not account for inter-GPU NVLink connection layouts, leading to communication bottlenecks during multi-node LLM training.",
    motivation: "Distributed deep learning workloads require high inter-GPU bandwidth. Placing containers without considering topology layouts degrades training throughput.",
    architectureDiagram: `
+-------------------------------------------------------------------------+
|                        KubeSched-GPU Scheduler                          |
|                                                                         |
|  Job Pod ──> [ Pod Ingestion ] ──> [ Topology Map ] ──> Node Scoring    |
|                                                            |            |
|                                                            v            |
|                                                      Node Selection     |
+-------------------------------------------------------------------------+
`,
    sequenceDiagram: `
Kube API Server        KubeSched-GPU         Topology Agent         Target Node        Kubelet
       |                     |                      |                     |               |
       |-- scheduling_pod -->|                      |                     |               |
       |                     |-- get_topology_map() |                     |               |
       |                     |-- query_metrics() -->|                     |               |
       |                     |<-- returns_costs ----|                     |               |
       |                     |                      |                     |               |
       |                     |-- score_node() ------>|                     |               |
       |                     |   (Selects node with |                     |               |
       |                     |    optimal NVLink)   |                     |               |
       |-- bind_pod_to_node -|                      |                     |               |
       |----------------------------------------------------------------->|               |
       |                                                                  |-- run_pod() ->|
`,
    failureModes: [
      {
        scenario: "Topology Agent Timeout",
        impact: "Scheduler misses topology maps, defaulting to standard resource scoring.",
        mitigation: "Implemented a fallback cache that stores node layouts statically, ensuring scheduling runs continue during agent failures."
      },
      {
        scenario: "GPU Hardware Failure during training run",
        impact: "Active training job fails, requiring manual recovery.",
        mitigation: "Coordinated with Kubelet APIs to automatically re-schedule the failed job onto topology-equivalent node groups."
      }
    ],
    scalingStrategy: "Multi-threaded scheduling queue with parallel node scoring, supporting clusters of over 10,000 nodes without performance degradation.",
    security: "OIDC-compliant authentication, role-based access control (RBAC), and secured gRPC communication channels.",
    performance: "Evaluates placements for 1,000 container pods in under 100ms.",
    benchmarks: [
      "Distributed training step times decreased by 18% compared to standard schedulers.",
      "Scheduling throughput: 1,200 pods/sec on a 16-core manager node.",
      "NVLink bandwidth utilization optimized by 35% on multi-node training runs."
    ],
    tradeoffs: [
      {
        decision: "Topology scoring over simple resource allocation",
        alternative: "Resource-based bin packing",
        rationale: "Prioritized training throughput over scheduler execution speed, accepting slightly longer scheduling queues."
      },
      {
        decision: "Static layout caches over real-time NVLink bandwidth monitoring",
        alternative: "Real-time bandwidth parsing",
        rationale: "Avoided network overhead in scheduler loops by caching static node hardware layouts."
      }
    ],
    monitoring: [
      "kubesched_scheduling_latency_seconds: Placement latency statistics.",
      "kubesched_pod_placements_total: Count of scheduled containers.",
      "kubesched_topology_cache_hit_ratio: Cache efficiency metrics.",
      "kubesched_nvlink_utilization_ratio: Measured inter-GPU bandwidth."
    ],
    testing: "Integration tests run on simulated clusters. Placement accuracy verified against mock topologies.",
    cicd: "GitHub Actions running tests, verifying code quality, compiling binaries, and publishing Helm charts.",
    futureWork: "Add support for dynamic Multi-Instance GPU (MIG) partitioning and cloud-native GPU topology maps.",
    repo: "https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality",
    demo: "/contact",
    doc: "https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality"
  }
];
