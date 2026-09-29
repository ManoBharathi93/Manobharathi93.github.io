const DB_DATA = {
  "projects": [
    {
      "id": "syncstream",
      "name": "SyncStream",
      "summary": "Event-driven database projection pipeline using PostgreSQL WAL capture.",
      "status": "ACTIVE",
      "techFlow": "PostgreSQL WAL → Debezium → Kafka → Redis",
      "constraints": [
        "PostgreSQL source of truth",
        "No application code modifications",
        "Near real-time synchronization",
        "Event ordering preservation"
      ],
      "scaleContext": [
        "2,000 inserts workload",
        "500 updates workload",
        "10 concurrent writers",
        "PostgreSQL WAL ingestion",
        "Redis projection synchronization"
      ],
      "adr": "Chose CDC over polling to eliminate synchronization lag and database read amplification.",
      "rejectedAlternatives": [
        {
          "name": "Polling",
          "reason": "Simple deployment, but excessive database read amplification."
        },
        {
          "name": "Dual Writes",
          "reason": "Lower infrastructure complexity, but consistency drift during database/cache failures."
        }
      ],
      "tradeoff": "Additional operational overhead (Kafka/Debezium) in exchange for near real-time consistency and removal of polling synchronization.",
      "failureModes": [
        "Kafka broker outage",
        "Debezium connector lag",
        "Duplicate event delivery"
      ],
      "operationalConcerns": [
        "Consumer lag alerting strategy",
        "Observability tracking via metrics",
        "Backpressure handling on spikes",
        "Dead-letter queues (DLQ) routing"
      ],
      "costConsiderations": [
        "Additional Kafka infrastructure overhead",
        "Reduced database CPU consumption",
        "Lower query amplification costs"
      ],
      "whatNext": "Support schema evolution, add replay tooling, and configure multi-region Kafka replication.",
      "repolink": "https://github.com/ManoBharathi93/SyncStream",
      "documentation": "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md",
      "benchmarks": [
        { "label": "Polling Latency", "value": 120, "unit": "ms" },
        { "label": "CDC Latency", "value": 15, "unit": "ms" },
        { "label": "DB CPU Ingestion", "value": 85, "unit": "%" },
        { "label": "CDC CPU Ingestion", "value": 12, "unit": "%" }
      ]
    },
    {
      "id": "cve-automation",
      "name": "CVE Automation Pipeline",
      "summary": "Security triage pipeline mapping vendor advisories to local software dependencies.",
      "status": "ACTIVE",
      "techFlow": "Vendor Advisories → Ingestion Engine → LLaMA-2 Evaluator → VEX Report",
      "constraints": [
        "Strict VEX compliance formatting",
        "Continuous advisory ingestion",
        "Deterministic inventory mapping"
      ],
      "scaleContext": [
        "500+ CVEs analyzed per day",
        "Analyst triage time reduced from hours to minutes",
        "LLaMA-2 local exploitability assessment"
      ],
      "adr": "Chose local LLaMA-2 inference over OpenAI APIs to prevent enterprise data leaks and contain costs.",
      "rejectedAlternatives": [
        {
          "name": "SaaS LLM API",
          "reason": "Violated compliance regulations regarding advisory exposure."
        },
        {
          "name": "Regex Matching",
          "reason": "Incapable of reasoning through hardware configurations and software exploit context."
        }
      ],
      "tradeoff": "Higher local hardware infrastructure provisioning requirements in exchange for absolute security compliance.",
      "failureModes": [
        "False negative exploitability tags",
        "Missing advisory metadata fields",
        "Incomplete device mapping database"
      ],
      "operationalConcerns": [
        "Analyst override and audit trail mapping",
        "Model drift checking",
        "Rate-limiting ingestion queues"
      ],
      "costConsiderations": [
        "No external API call dependencies",
        "Local dedicated GPU utilization costs"
      ],
      "whatNext": "Extend to active exploit validation (safe sandboxed runs) and OIDC-signed audit logs.",
      "repolink": "https://manobharathi93.github.io/blog/cve-automation-system.html",
      "documentation": "https://manobharathi93.github.io/blog/cve-automation-system.html",
      "benchmarks": [
        { "label": "Manual Triage Time", "value": 180, "unit": "min" },
        { "label": "Automated Triage Time", "value": 5, "unit": "min" }
      ]
    },
    {
      "id": "dual-memory-agent",
      "name": "Case-Aware Dual Memory Agent",
      "summary": "Retrieval architecture combining knowledge memory and case memory for LLM support ticketing.",
      "status": "STANDBY",
      "techFlow": "User Prompt → Dynamic Retriever → Case/Vector Match → LLM Context Solver",
      "constraints": [
        "Latency budget (<1s)",
        "Token usage limitation",
        "Ticketing system API bounds"
      ],
      "scaleContext": [
        "Multi-agent enterprise systems",
        "Milvus vector database indexes",
        "Dynamic memory aging decayer"
      ],
      "adr": "Chose hierarchical case memory mapping to reuse historical resolutions before calling vector retrieval.",
      "rejectedAlternatives": [
        {
          "name": "Naïve RAG",
          "reason": "Produced high token overhead and retrieval drift under long contexts."
        },
        {
          "name": "Static Fine-Tuning",
          "reason": "High compute costs and unable to dynamically ingest support workflow shifts."
        }
      ],
      "tradeoff": "Additional routing logic complexity in exchange for a 40% reduction in LLM token consumption.",
      "failureModes": [
        "Memory contamination",
        "Retrieval context drift",
        "Incorrect case reuse"
      ],
      "operationalConcerns": [
        "Confidence score filtering",
        "Telemetry observability logging",
        "Automatic case expiration policies"
      ],
      "costConsiderations": [
        "40% reduction in token consumption bills",
        "Minimal vector database infrastructure costs"
      ],
      "whatNext": "Implement automatic case promotion pipelines and decaying memory aging algorithms.",
      "repolink": "https://github.com/ManoBharathi93/Dynamic-Retriever/",
      "documentation": "https://github.com/ManoBharathi93/Dynamic-Retriever/blob/main/README.md",
      "benchmarks": [
        { "label": "Naïve RAG Tokens", "value": 4200, "unit": "tok" },
        { "label": "Dual Memory Tokens", "value": 2520, "unit": "tok" },
        { "label": "Avg Escalation Rate", "value": 15, "unit": "%" }
      ]
    },
    {
      "id": "grid-security",
      "name": "Cyber-Physical Grid FDI Detection",
      "summary": "Graph-based anomaly detector identifying malicious SCADA grid telemetry.",
      "status": "LOCAL_ONLY",
      "techFlow": "SCADA Telemetry → Graph Neural Network → Anomaly Classifier",
      "constraints": [
        "Real-time measurement windows",
        "Topological network structure representation",
        "High detection precision requirement"
      ],
      "scaleContext": [
        "IEEE 118-bus test power network",
        "Graph-based bus telemetry matrix",
        "Adversarial noise injection runs"
      ],
      "adr": "Chose Graph Neural Network (GNN) modeling to capture spatial and electrical topological features.",
      "rejectedAlternatives": [
        {
          "name": "Standard Autoencoder",
          "reason": "Ignored power line routing and grid topology connections, lowering precision."
        },
        {
          "name": "Statistical Thresholding",
          "reason": "Vulnerable to coordinated stealth attacks masquerading as load changes."
        }
      ],
      "tradeoff": "Longer model training latencies in exchange for 95%+ false data injection detection accuracy.",
      "failureModes": [
        "False positive flags during grid reconfigurations",
        "Telemetry latency skewing"
      ],
      "operationalConcerns": [
        "Real-time SCADA state estimators synchronization",
        "Model drift during line outages"
      ],
      "costConsiderations": [
        "Zero SaaS analytics cost",
        "Offline training GPU compute costs"
      ],
      "whatNext": "Incorporate temporal-GNN layers to capture transient wave oscillations.",
      "repolink": "https://github.com/ManoBharathi93/CPAD",
      "documentation": "https://github.com/ManoBharathi93/CPAD",
      "benchmarks": [
        { "label": "FDI Detection Accuracy", "value": 96, "unit": "%" },
        { "label": "Standard Model Accuracy", "value": 78, "unit": "%" }
      ]
    },
    {
      "id": "medical-knn",
      "name": "Medical Imaging KNN Search",
      "summary": "DenseNet feature extraction + Faiss indexing for image similarity queries.",
      "status": "LOCAL_ONLY",
      "techFlow": "Medical Scans → DenseNet Encoder → Faiss KNN Finder",
      "constraints": [
        "Sub-10ms similarity search target",
        "GPU memory limit bounds",
        "High feature dimension size"
      ],
      "scaleContext": [
        "100,000+ medical imaging scans",
        "DenseNet-121 feature vectors",
        "Faiss index retrieval pipeline"
      ],
      "adr": "Chose Faiss indexes over standard SQL lookups to obtain low-latency retrieval speeds on vector data.",
      "rejectedAlternatives": [
        {
          "name": "Brute-force Cosine Search",
          "reason": "Exhibited O(N) search scaling, exceeding the 10ms latency budget."
        },
        {
          "name": "LSH indexing",
          "reason": "Too many approximation errors, lowering search precision."
        }
      ],
      "tradeoff": "Higher RAM storage footprint in exchange for fast similarity search queries.",
      "failureModes": [
        "Semantic similarity mismatch on raw embeddings",
        "Out-of-memory under concurrent loads"
      ],
      "operationalConcerns": [
        "Dynamic indexing sync strategy",
        "GPU/CPU memory allocation bounds"
      ],
      "costConsiderations": [
        "Optimized CPU query pipelines minimizing dedicated cluster charges"
      ],
      "whatNext": "Support hierarchical indexing structures for multi-modal imaging feature vectors.",
      "repolink": "https://manobharathi93.github.io/blog/medical-imaging-knn-retrieval-system.html",
      "documentation": "https://manobharathi93.github.io/blog/medical-imaging-knn-retrieval-system.html",
      "benchmarks": [
        { "label": "Search Query Latency", "value": 8, "unit": "ms" },
        { "label": "Brute-Force Latency", "value": 240, "unit": "ms" }
      ]
    },
    {
      "id": "line-outage",
      "name": "Line Outage Network Optimization",
      "summary": "Matrix-based topology solver for transmission networks.",
      "status": "LOCAL_ONLY",
      "techFlow": "Phase Telemetry → Graph Laplacian → Sparse Matrix Solver",
      "constraints": [
        "Accurate grid topology representation",
        "Sparse measurement constraints",
        "No model re-training delays"
      ],
      "scaleContext": [
        "Bulk electrical transmission grids",
        "Topological network graph metrics",
        "Sparse optimization solvers"
      ],
      "adr": "Chose topological sparse matrix algorithms to solve line outages directly without data-hungry estimators.",
      "rejectedAlternatives": [
        {
          "name": "ML Regression Classifier",
          "reason": "High training lag and vulnerable to topology layout shifts."
        }
      ],
      "tradeoff": "Requires complete, accurate network matrices in exchange for fault localization.",
      "failureModes": [
        "Incomplete network matrices blocking calculations",
        "Telemetry measurement error bias"
      ],
      "operationalConcerns": [
        "SCADA phase telemetry ingestion rates",
        "Matrix size processing targets"
      ],
      "costConsiderations": [
        "Lightweight algorithmic execution with negligible CPU consumption bills"
      ],
      "whatNext": "Incorporate active line outage estimation modules for missing node connections.",
      "repolink": "https://manobharathi93.github.io/blog/medical-imaging-knn-retrieval-system.html",
      "documentation": "https://manobharathi93.github.io/blog/medical-imaging-knn-retrieval-system.html",
      "benchmarks": [
        { "label": "Outage Loc. Time", "value": 12, "unit": "sec" },
        { "label": "State Estimation Time", "value": 180, "unit": "sec" }
      ]
    }
  ],
  "experience": [
    {
      "company": "OpenText",
      "title": "Associate Software Engineer",
      "duration": "Oct 2024 - Present",
      "description": "Building platform observability systems, enterprise AI workflows, and cloud infrastructure connectivity services.",
      "highlights": [
        "Redesigned UUID storage architecture in cloud connectivity services, increasing supported inter-region connections from 55 to 165 (3× scaling) without database schema migrations.",
        "Built time-series metric retrieval services with dynamic baseline computation, implementing rule-based query routing between raw and pre-aggregated tables to optimize latency.",
        "Designed automated CVE ingestion and triage pipeline mapping vendor advisories to software inventory, reducing manual assessment time from hours to minutes.",
        "Received leadership recognition from the Vice President and Senior Principal Architect for delivering platform automation features and ramping quickly on complex backend codebases."
      ]
    },
    {
      "company": "OpenText",
      "title": "Software Engineering Intern",
      "duration": "Apr 2024 - Sept 2024",
      "description": "Contributed to platform development during internship period.",
      "highlights": [
        "Designed and developed license consumption reporting platform for Network Operations Management products, improving visibility into license usage.",
        "Delivered production-ready feature directly leading to full-time Associate Software Engineer conversion."
      ]
    }
  ],
  "experiments": [
    {
      "id": "rfc-001",
      "rfcNumber": "RFC-001",
      "date": "Jun 2026",
      "readTime": "6 min",
      "title": "Zero-Read Projections: Change Data Capture (CDC) vs. Polling vs. Dual Writes",
      "problem": "Real-time dashboards often introduce database read bottlenecks. Most designs solve this via database polling, which increases read load, or dual writes, which produce cache drift under concurrent write updates.",
      "hypothesis": "Change Data Capture (CDC) events streamed from the PostgreSQL WAL to a message bus (Kafka) can feed downstream read models (Redis) asynchronously, eliminating read amplification and cache drift.",
      "methodology": "Subjected three competing architectures (Polling, Dual Writes, CDC WAL streaming) to the same synthetic workload: 2,000 inserts, 500 updates, 10 concurrent writes, and continuous dashboard queries.",
      "results": "Polling saturated PostgreSQL CPU capacity (85% utilization); Dual Writes produced cache drift due to race conditions during database/cache updates. CDC WAL streaming (PostgreSQL → Debezium → Kafka → Redis) eliminated dashboard-related queries from PostgreSQL, resolving cache consistency.",
      "tradeoffs": "Increased operational overhead (Kafka, Zookeeper, Debezium connector clusters) in exchange for near real-time consistency and removal of polling synchronization.",
      "conclusion": "Real-time dashboards are a projection problem, not a query problem. Separating write-intensive sources from read models via CDC streams decouples database CPU and avoids data drift.",
      "links": [
        {
          "label": "Github Codebase",
          "url": "https://github.com/ManoBharathi93/SyncStream"
        },
        {
          "label": "Architecture Guide",
          "url": "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md"
        }
      ]
    },
    {
      "id": "rfc-002",
      "rfcNumber": "RFC-002",
      "date": "Jul 2026",
      "readTime": "8 min",
      "title": "Why Fixed Top-K Retrieval Limits RAG Systems",
      "problem": "Fixed top-K retrieval strategies in Retrieval-Augmented Generation (RAG) waste LLM token budgets on irrelevant context when queries are simple, and fail to retrieve enough context when queries require complex, multi-hop reasoning.",
      "hypothesis": "An adaptive, context-selective retrieval architecture that uses semantic thresholding and dynamic memory caches can optimize token usage while preserving retrieval quality.",
      "methodology": "Tested dynamic RAG retrieval against static top-K on support ticket datasets, measuring token count per request, retrieval latency, and accuracy under concurrent workflows.",
      "results": "Adaptive memory caching and dynamic similarity thresholds reduced token consumption by 40% (from 4200 to 2520 tokens average) without degradation in retrieval metrics, resolving SLA budgets (<1s target).",
      "tradeoffs": "Additional indexing and threshold calculation complexity in exchange for reduced token consumption costs.",
      "conclusion": "Moving from static context counts to dynamic, case-aware memory thresholds is a critical RAG infrastructure optimization that significantly reduces API runtime bills.",
      "links": [
        {
          "label": "Medium Article",
          "url": "https://medium.com/@immanobharathi21/beyond-fixed-k-why-dynamic-context-selection-is-the-rag-game-changer-you-didnt-know-you-needed-c00f2a8c0517"
        },
        {
          "label": "Github Project",
          "url": "https://github.com/ManoBharathi93/Dynamic-Retriever/"
        }
      ]
    },
    {
      "id": "mlsys-paper",
      "rfcNumber": "Paper",
      "date": "2024",
      "readTime": "12 min",
      "title": "Adaptive Compute-Efficient Learning via Conceptual Criticality",
      "problem": "Deep learning models expend identical compute budgets on simple vs. complex training inputs, leading to high energy overhead and slow convergence.",
      "hypothesis": "Measuring learning gradients of conceptual milestones allows the training process to allocate learning capacity dynamically to critical, hard-to-learn concepts.",
      "methodology": "Evaluated adaptive milestones learning schemes against baseline training across MLSys benchmarks.",
      "results": "Achieved 25% reduction in training energy overhead and training acceleration by prioritizing critical concepts.",
      "tradeoffs": "Introduced conceptual milestone evaluation overhead in exchange for reduced training convergence times.",
      "conclusion": "Compute-efficient deep learning can be guided dynamically by conceptual milestones metrics.",
      "links": [
        {
          "label": "MLSys 2024 Submission",
          "url": "https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality"
        }
      ]
    }
  ],
  "articles": [
    {
      "date": "2026",
      "readTime": "6 min",
      "title": "CDC vs Polling vs Dual Writes: Rebuilding Cache Consistency",
      "excerpt": "An empirical systems analysis comparing write workloads, cache drift, and read amplification across database replication paths.",
      "link": "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md",
      "tags": ["Distributed Systems", "CDC", "Kafka", "PostgreSQL"]
    },
    {
      "date": "2026",
      "readTime": "8 min",
      "title": "Why Fixed Top-K Retrieval Limits RAG Systems",
      "excerpt": "A deep dive into why static retrieval windows degrade LLM output context quality and how dynamic memory boundaries optimize token consumption.",
      "link": "https://medium.com/@immanobharathi21/beyond-fixed-k-why-dynamic-context-selection-is-the-rag-game-changer-you-didnt-know-you-needed-c00f2a8c0517",
      "tags": ["AI Infrastructure", "RAG", "Milvus", "Vector Database"]
    },
    {
      "date": "2026",
      "readTime": "5 min",
      "title": "Designing Memory Systems for Agents",
      "excerpt": "Exploring memory decay, case caching, and hierarchical abstractions for persistent LLM agent state runtimes.",
      "link": "https://github.com/ManoBharathi93/Dynamic-Retriever/",
      "tags": ["Agent Systems", "State Runtimes", "Agent Architecture"]
    }
  ]
};
