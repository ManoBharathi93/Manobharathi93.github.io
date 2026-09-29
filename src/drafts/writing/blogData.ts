export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  content: string;
}

export const blogData: BlogArticle[] = [
  {
    id: "lsm-tree-from-scratch",
    title: "Writing an LSM-Tree Storage Engine from Scratch in Rust",
    excerpt: "An in-depth look at designing memtable boundary checks, immutable sorted string tables (SSTables), sparse index layouts, and compaction algorithms in Rust.",
    date: "Jul 2026",
    readTime: "12 min",
    tags: ["Storage", "Rust", "LSM-Tree"],
    content: `
### LSM-Tree Internals
Log-Structured Merge-trees (LSM-trees) are the foundation of modern high-throughput write databases (such as RocksDB and Cassandra). Unlike B-Trees, which perform random in-place updates, LSM-trees append updates sequentially to memory buffers (Memtables) and periodic flushes write them as sorted immutable files (SSTables) to disk.

#### 1. Memtable Boundary Checks and Concurrency
The Memtable serves as the active in-memory buffer. In Rust, we implement this utilizing a concurrent SkipList or a Red-Black Tree protected by an Epoch-Based Reclamation (EBR) lock structure or standard crossbeam concurrent channels.

To guarantee thread safety during concurrent writes:
- We enforce size boundaries. When the active Memtable exceeds a size threshold (e.g. 64MB), we mark it as immutable, allocate a new active Memtable, and notify the background flushing thread pool.
- Reads query the active Memtable first, then immutable memory buffers, before performing disk SSTable scans.

#### 2. SSTable Segment Layout
Immutable SSTables on disk consist of three distinct layout blocks:
- **Data Blocks:** A sequential series of key-value records packed using delta-encoding to reduce byte storage.
- **Index Blocks:** Located at the end of the file, this contains sparse offsets mapping keys to specific data block offsets.
- **Bloom Filters:** A bit array containing hashing index keys to allow constant-time O(1) checks before reading files.

\`\`\`
SSTable Layout:
+------------------------------------+
|  Data Block 1 (Key/Val offsets)   |
+------------------------------------+
|  Data Block 2 (Key/Val offsets)   |
+------------------------------------+
|  ...                               |
+------------------------------------+
|  Index Block (Sparse key offsets)  |
+------------------------------------+
|  Bloom Filter Block (Key hashes)   |
+------------------------------------+
|  Footer (Index offset, Magic No)   |
+------------------------------------+
\`\`\`

#### 3. Why We Compact
Since keys are flushed across multiple SSTables sequentially, duplicate updates or deleted keys (Tombstones) lead to high read amplification (the engine must scan many files to find a single key).
Compaction runs in the background, merging overlapping key ranges, purging stale values, and outputting consolidated SSTable levels, which optimizes disk space and read speeds.
`
  },
  {
    id: "zero-copy-splice-sendfile",
    title: "Zero-Copy Networking: Using sendfile and splice in Linux",
    excerpt: "How to bypass user-space memory buffers, context switches, and page cache allocation overhead using low-level Linux system calls.",
    date: "Jun 2026",
    readTime: "9 min",
    tags: ["Networking", "Linux", "Performance"],
    content: `
### Bypassing Context Switches
In high-throughput message brokers (such as Apache Kafka), transferring data from a log file on disk to a network socket is a primary bottleneck.

#### The Traditional Path (Copy-Heavy)
A standard read-and-write pattern involves:
1. **Disk to Page Cache:** The kernel reads file data into the page cache (Context Switch: User to Kernel).
2. **Page Cache to User Buffer:** The application copies data into its local heap memory (Context Switch: Kernel to User).
3. **User Buffer to Socket Buffer:** The application writes the data into the network socket buffer (Context Switch: User to Kernel).
4. **Socket Buffer to NIC:** The network interface card transfers bytes from socket buffers via DMA.

This requires **4 context switches** and **4 memory copies** (2 of which cross the user-kernel space boundary).

#### The Zero-Copy Path
Using the Linux \`sendfile()\` or \`splice()\` system call:
1. The application instructs the kernel to copy bytes directly from the open file descriptor (page cache) to the target socket descriptor.
2. The data remains in kernel memory space throughout, bypassing user-space allocations entirely.

This reduces the overhead to **2 context switches** and **0 user-space memory copies**, allowing network cards to saturate at line rate.
`
  },
  {
    id: "gpu-topology-scheduling",
    title: "NVLink Topology-Aware Scheduling in Kubernetes",
    excerpt: "Solving inter-GPU communication bottlenecks in deep learning pipeline parallelism by evaluating network layouts of multi-GPU nodes.",
    date: "May 2026",
    readTime: "10 min",
    tags: ["AI Infra", "Kubernetes", "Scheduling"],
    content: `
### Distributed LLM Training Bottlenecks
Distributed training (e.g. using Megatron-LM) splits large model weights across multiple GPU instances using Tensor, Pipeline, or Data Parallelism.

#### The Problem with Default Scheduling
Standard schedulers schedule containers based solely on bulk memory and CPU resource availability. In a cluster of 8-GPU nodes, some GPUs are connected via high-bandwidth NVLink interfaces (up to 900 GB/s), while others must route through slower PCIe lanes (up to 64 GB/s) or inter-node InfiniBand networks. 

If training containers are placed on GPUs that cross PCIe or inter-node links, the GPU execution engine stalls waiting for weight synchronization, reducing training performance.

#### Topology scoring implementation
A custom scheduler plugin can:
1. Query node configuration daemons to map hardware NVLink matrices.
2. Intercept Kubernetes pod schedules to identify pipeline groupings.
3. Apply placement logic that routes adjacent pipeline stages to NVLink-adjacent GPUs on the same physical node, avoiding slower PCIe lanes and inter-node network hops.
`
  },
  {
    id: "leveled-compaction-challenges",
    title: "Implementing Leveled Compaction: Challenges and Solutions",
    excerpt: "Mitigating write stalls and compaction lock contention in log-structured database engines.",
    date: "Apr 2026",
    readTime: "8 min",
    tags: ["Storage", "Performance", "Databases"],
    content: `
### Compaction Bottlenecks
Leveled Compaction (as used in RocksDB) organizes SSTables into hierarchical levels (L0, L1, L2... LN). Each level has a maximum capacity (e.g. 10MB for L1, 100MB for L2).

#### 1. Write Stalls
When writes outpace compaction, L0 SSTables accumulate. Because L0 tables have overlapping key ranges, reads must scan all L0 tables. To prevent read performance from degrading, the storage engine must throttle client writes (write stalls) until background threads merge L0 tables into L1.

#### 2. Compaction Lock Contention
Updating file metadata and tracking active keys requires synchronization. In a multi-threaded compaction loop, threads frequently block on the database manifest mutex, which limits compaction concurrency.

#### Mitigations
- **Compaction Rate Limiting:** Track disk write statistics to gradually throttle incoming writes, avoiding sudden write stalls.
- **Lock-Free Manifest Updates:** Implement version sets using copy-on-write pointers, allowing read queries and compaction threads to scan database layouts without acquiring global locks.
`
  },
  {
    id: "raft-consensus-deep-dive",
    title: "Building a Consensus Engine: A Deep Dive into Raft",
    excerpt: "Ensuring state replication correctness, leader election transitions, and split-brain fencing.",
    date: "Mar 2026",
    readTime: "11 min",
    tags: ["Distributed Systems", "Consensus", "Raft"],
    content: `
### Distributed State Consistency
Consensus protocols ensure that a cluster of nodes agrees on a sequence of state transitions, even when some nodes experience network partitions or crashes.

#### 1. Leader Election Transitions
Raft splits time into terms. If a follower node stops receiving leader heartbeats within a randomized election timeout (e.g., 150-300ms), it increments its term, transitions to the candidate state, and requests votes from the cluster. Randomized timeouts are critical to prevent split-vote states.

#### 2. Split-Brain Fencing
If a network partition divides a 5-node cluster into groups of 2 and 3 nodes, the group of 2 cannot commit writes because it lacks a quorum (3 nodes). The group of 3 will elect a new leader and continue processing writes. Once the partition heals, the isolated group of 2 will detect the higher term of the new leader, discard its uncommitted logs, and replicate state from the active leader.
`
  },
  {
    id: "linux-iouring-networking",
    title: "Optimizing Linux Network Services with io_uring",
    excerpt: "How asynchronous kernel ring buffers outperform epoll-based socket loops under heavy connection load.",
    date: "Feb 2026",
    readTime: "9 min",
    tags: ["Networking", "Linux", "Performance"],
    content: `
### Beyond epoll
For years, high-performance networking relied on \`epoll\` loops to notify user-space applications of socket readiness. However, \`epoll\` still requires system calls (\`epoll_wait\`, \`recv\`, \`send\`) to read and write bytes, incurring system call overhead.

#### How io_uring Works
\`io_uring\` uses two ring buffers shared between the application and the Linux kernel:
- **Submission Queue (SQ):** The application writes I/O requests directly to this memory ring.
- **Completion Queue (CQ):** The kernel writes I/O completion results to this ring.

By utilizing kernel polling (SQPOLL), the kernel sweeps the Submission Queue without the application invoking explicit system calls, reducing kernel context switch overhead to zero.
`
  },
  {
    id: "lock-free-hash-tables",
    title: "Designing a Lock-Free Hash Table for Cache Ingestion",
    excerpt: "Utilizing Compare-And-Swap (CAS) primitives to build thread-safe indexes without mutexes.",
    date: "Jan 2026",
    readTime: "10 min",
    tags: ["Concurrency", "Systems", "Performance"],
    content: `
### Lock Contention in Caches
High-throughput concurrent caches spend significant time waiting on reader-writer locks. Mutexes block thread execution, causing CPU cores to go idle.

#### Lock-Free Indexing
A lock-free hash table uses atomic CPU instructions, such as **Compare-And-Swap (CAS)**, to insert and update key-value pointers. 
If two threads attempt to write to the same bucket concurrently:
1. Both read the current pointer.
2. Both compute the new pointer.
3. Both run CAS to swap the pointer. The CPU guarantees that only one write succeeds; the other thread detects the collision, re-reads the updated pointer, and retries.

This allows threads to write concurrently without blocking, maintaining high throughput under write contention.
`
  },
  {
    id: "custom-slab-allocators",
    title: "Solving Memory Fragmentation with Custom Slab Allocators",
    excerpt: "Designing off-heap memory allocators to prevent garbage collection pauses and memory leaks.",
    date: "Dec 2025",
    readTime: "9 min",
    tags: ["Memory", "Go", "C++"],
    content: `
### The Cost of Garbage Collection
Languages like Go and Java use garbage collectors to reclaim memory. Under high-throughput caches with millions of active keys, GC scanners must traverse millions of pointers, causing stop-the-world pauses.

#### Slab Allocation Architecture
A slab allocator pre-allocates large memory blocks (Slabs) from the operating system and divides them into smaller slots of uniform size (e.g., 32-byte slots, 64-byte slots, 128-byte slots).
- When a key is inserted, the cache allocates a slot from the corresponding slab class.
- When a key is evicted, the slot is marked as free and returned to the slab class.

Because memory is managed off-heap in pre-sized slots, memory fragmentation is avoided, and garbage collection scanner overhead is reduced to zero.
`
  },
  {
    id: "hnsw-avx512-vector-optimizations",
    title: "HNSW Vector Search Optimizations: AVX-512 vs. Scalar",
    excerpt: "How SIMD registers accelerate vector distance calculations in retrieval databases.",
    date: "Nov 2025",
    readTime: "8 min",
    tags: ["AI Infra", "Performance", "Vector"],
    content: `
### Accelerating Vector Operations
Vector similarity searches (e.g., cosine distance calculations for RAG pipelines) require millions of dot-product operations per second.

#### Scalar Loop Execution
A standard loop calculates similarity by multiplying each dimension sequentially:
\`\`\`cpp
float dot = 0;
for (int i = 0; i < dim; ++i) {
    dot += a[i] * b[i];
}
\`\`\`
Under a 1536-dimensional vector, this loop runs 1536 times, compiling into 1536 separate floating-point multiplication instructions.

#### SIMD AVX-512 Execution
AVX-512 registers (512-bit wide) can hold sixteen 32-bit floating-point values. Using SIMD instructions:
1. The CPU loads 16 dimensions from vector A and vector B into registers.
2. A single instruction multiplies all 16 values in parallel.
3. The CPU accumulates the results, reducing loop execution iterations from 1536 to 96.
`
  },
  {
    id: "product-quantization-vector-indexes",
    title: "Product Quantization (PQ) for Vector Indexes",
    excerpt: "Compressing high-dimensional vector spaces by 75% while maintaining recall accuracy.",
    date: "Oct 2025",
    readTime: "9 min",
    tags: ["AI Infra", "Vector", "Retrieval"],
    content: `
### Memory Scale in Vector Databases
A dataset of 10 million 1536-dimensional vectors (using 32-bit floats) requires approximately 60GB of memory for raw vector storage, before accounting for HNSW graph structure overhead.

#### Product Quantization (PQ)
PQ compresses vector spaces using vector quantization:
1. Split the high-dimensional vector into $M$ smaller sub-vectors (e.g., 1536 dimensions split into 96 sub-vectors of 16 dimensions).
2. Run K-Means clustering on each sub-vector space to find centroid points (typically 256 centroids per sub-space).
3. Replace each sub-vector with the 8-bit index byte of its closest centroid, compressing each 1536-dimensional vector to 96 bytes.

This reduces the memory footprint of the index by 75% while preserving search recall accuracy.
`
  },
  {
    id: "postgres-wal-cdc-parser",
    title: "PostgreSQL WAL Parsing: Building a Custom CDC Parser",
    excerpt: "Extracting transactions directly from binary WAL streams to build low-latency ingestion pipelines.",
    date: "Sep 2025",
    readTime: "11 min",
    tags: ["Databases", "CDC", "PostgreSQL"],
    content: `
### Change Data Capture Internals
Logical replication engines parse the PostgreSQL Write-Ahead Log (WAL) directly to capture row mutations (INSERT/UPDATE/DELETE) instead of querying tables.

#### WAL File Layout
The WAL is a sequence of binary records containing operation headers and raw row data:
- **Logical Decoding Plugins:** Plugins like \`pgoutput\` decode the raw WAL bytes into logical replication streams.
- **Parser Pipeline:** The CDC engine opens a replication connection, reads the decoded protocol frames, reconstructs transaction boundaries (using BEGIN and COMMIT markers), and formats row changes into JSON messages.

This avoids database read amplification and provides real-time event updates to downstream services.
`
  },
  {
    id: "exactly-once-ingestion-pipelines",
    title: "Guaranteeing Exactly-Once Semantics in Ingestion Pipelines",
    excerpt: "Using transaction tokens and deduplication windows to prevent data corruption.",
    date: "Aug 2025",
    readTime: "9 min",
    tags: ["Distributed Systems", "CDC", "Consistency"],
    content: `
### The Ingestion Delivery Challenge
Under network partitions, distributed message brokers frequently trigger retry events, leading to duplicated message delivery.

#### Guaranteeing Exactly-Once Semantics
Exactly-once processing requires:
1. **Transaction Tokens:** Producers append a unique, monotonically increasing transaction token and producer ID to each message.
2. **Deduplication Windows:** Consumers track processed transaction IDs within a sliding-window cache. Duplicate messages are detected and discarded before writing to the target database.
3. **Idempotent target writes:** Downstream writes utilize upsert schemas (INSERT ON CONFLICT DO UPDATE) to ensure duplicate events do not corrupt state.
`
  },
  {
    id: "custom-cluster-resource-schedulers",
    title: "Mega-Cluster Resource Allocation: Custom Schedulers",
    excerpt: "Optimizing container placement algorithms for large-scale physical server pools.",
    date: "Jul 2025",
    readTime: "10 min",
    tags: ["Kubernetes", "Scheduling", "Infrastructure"],
    content: `
### Large-Scale Resource Allocation
At scale (10,000+ nodes), evaluating resource placement choices for thousands of incoming containers per second creates scheduler bottlenecks.

#### Custom Scheduling Architectures
1. **Parallel Scoring:** The scheduler splits node scoring checks across independent worker threads.
2. **Cluster State Caches:** Instead of querying the API server directly, the scheduler scores placements against an in-memory cache of cluster state, which is updated asynchronously via change event streams.
3. **Optimized Bin Packing:** Placements are calculated using modified knapsack algorithms to optimize node resource allocation.
`
  },
  {
    id: "jepsen-testing-distributed-systems",
    title: "Jepsen-Style Testing: Injecting Faults in Distributed Systems",
    excerpt: "Verifying consensus safety under random network partitions and node crashes.",
    date: "Jun 2025",
    readTime: "10 min",
    tags: ["Distributed Systems", "Consensus", "Testing"],
    content: `
### Validating Consistency Safety
Distributed consensus implementations (like Raft or Paxos) are prone to subtle edge cases that can lead to split-brain states and data corruption.

#### Jepsen Fault Injection
Jepsen tests validate consistency by:
1. Spinning up a mock distributed cluster and generating a random workload of write operations.
2. Injecting network partitions, node crashes, and disk write stalls during the workload.
3. Recovering the cluster, reading the final state, and checking for consistency anomalies (such as stale reads or lost updates).
`
  },
  {
    id: "database-compaction-write-stalls",
    title: "Benchmarking Database Compaction: Write Stall Mitigation",
    excerpt: "How to tune background compaction threads to maintain consistent write latency under heavy loads.",
    date: "May 2025",
    readTime: "8 min",
    tags: ["Storage", "Performance", "Databases"],
    content: `
### Compaction Tuning
LSM storage engines periodically experience latency spikes when background thread compaction cannot keep up with incoming write workloads.

#### Tuning Strategies
1. **Compaction Thread Pools:** Allocate dedicated I/O threads to compaction classes to prevent small merges from blocking large leveling runs.
2. **Compaction Rate Limiting:** Enforce write rate limits on client threads when compaction lag increases, avoiding sudden write stalls.
3. **Leveled Compaction Tuning:** Adjust the leveling multiplier to optimize compaction throughput and write amplification.
`
  },
  {
    id: "monitoring-observability-distributed-systems",
    title: "Monitoring Distributed Systems: Exposing Internal State",
    excerpt: "Implementing Prometheus counters and tracing spans in distributed pipelines.",
    date: "Apr 2025",
    readTime: "9 min",
    tags: ["Observability", "Prometheus", "Tracing"],
    content: `
### Observability at Scale
Diagnosing performance bottlenecks in distributed pipelines requires real-time telemetry updates.

#### Instrumentation Best Practices
1. **Prometheus Metrics:** Expose performance-critical indicators (e.g. queue lag, transaction throughput, memory block usage) as Prometheus counter and gauge metrics.
2. **Distributed Tracing:** Inject trace context headers (e.g. W3C Trace Context) into message frames, enabling collectors to trace the lifecycle of individual transactions across nodes.
3. **Aggregated Baselines:** Pre-aggregate metric values on write-aside cache instances to minimize query overhead on monitoring databases.
`
  },
  {
    id: "consistent-hashing-distributed-caching",
    title: "Consistent Hashing Strategies for Distributed Cache Routing",
    excerpt: "Distributing keys across dynamically scaling cache node pools without losing state.",
    date: "Mar 2025",
    readTime: "10 min",
    tags: ["Distributed Systems", "Caching", "Algorithms"],
    content: `
### Dynamic Node Scalability
Traditional modulo hashing (hash(key) % N) causes cache invalidation across the entire cluster when nodes are added or removed.

#### Consistent Hashing Rings
Consistent hashing routes keys using a hash ring:
1. Node identifiers and keys are mapped onto a 32-bit integer ring.
2. A key is routed to the first node encountered moving clockwise along the ring.
3. **Virtual Nodes:** Map each physical node to multiple virtual points on the ring to distribute keys evenly across nodes and prevent hotspots.

When a node scales up or down, only a fraction of the keys are redistributed, which avoids cluster-wide cache invalidation.
`
  },
  {
    id: "thread-safe-ring-buffers",
    title: "Designing Thread-Safe Ring Buffers for Asynchronous Processing",
    excerpt: "Building lock-free SPSC queues to pass telemetry frames between threads.",
    date: "Feb 2025",
    readTime: "9 min",
    tags: ["Concurrency", "Systems", "Performance"],
    content: `
### Single-Producer Single-Consumer (SPSC) Queues
Asynchronous telemetry pipelines frequently need to pass data frames between worker and network threads without introducing lock contention.

#### Lock-Free Ring Buffers
An SPSC ring buffer uses a fixed-size array with read and write index pointers:
1. The producer thread updates the write pointer, and the consumer thread updates the read pointer.
2. By utilizing atomic operations and CPU memory barriers, the threads write and read memory locations concurrently without locks.
3. Cache line alignment is applied to separate the read and write pointers, preventing CPU cache bouncing (false sharing).
`
  },
  {
    id: "database-replication-cdc-vs-dual-writes",
    title: "Comparing Database Replication Paths: CDC vs. Dual Writes",
    excerpt: "Analyzing cache consistency, network overhead, and reliability in transaction pipelines.",
    date: "Jan 2025",
    readTime: "9 min",
    tags: ["Databases", "CDC", "Consistency"],
    content: `
### Replicating Writes
Keeping a primary database and a read cache synchronized is a common platform engineering challenge.

#### 1. Dual Writes
The application writes updates to both the database and the cache. Under concurrent updates, race conditions and partial failures frequently lead to consistency drift between the database and the cache.

#### 2. Change Data Capture (CDC)
The application writes only to the database. The CDC engine streams updates asynchronously from the database log to the cache. This decouples the write path, guarantees consistency, and eliminates read database load.
`
  },
  {
    id: "distributed-systems-split-brain-recovery",
    title: "Distributed Systems Failures: Recovering from Split-Brain States",
    excerpt: "How consensus engines resolve partition state divergence and restore write quorum safety.",
    date: "Dec 2024",
    readTime: "11 min",
    tags: ["Distributed Systems", "Consensus", "Failures"],
    content: `
### The Consensus split-brain Challenge
If network partitions divide a cluster, nodes in different partitions can elect separate leaders, leading to split-brain states and data corruption.

#### Recovery Actions
Consensus engines resolve split-brain states by:
1. **Quorum Checks:** Nodes verify that they can communicate with a majority of the cluster before accepting write operations.
2. **Term Fencing:** If an isolated leader attempts to write, its term number will be rejected by the majority partition, which forces it to step down.
3. **Log Reconciliation:** Once the network heals, the leader in the majority partition reconciles follower logs, restoring consistency.
`
  }
];
