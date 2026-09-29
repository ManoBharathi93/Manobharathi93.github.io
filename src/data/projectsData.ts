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
  evidence: string;
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

// Public projects only. Unstarted project ideas are intentionally excluded.
export const projectsData: Project[] = [
  {
    id: "capability-runner",
    name: "Capability Runner",
    summary: "Discover browser workflows once, then replay them with new inputs without calling a model.",
    tag: "Browser Automation",
    status: "Prototype",
    whatIBuilt: "Built LLM-assisted workflow discovery, saved capability artifacts, deterministic replay, action validation, page-evidence checks, expected-error handling, and human takeover.",
    measuredResult: "Recorded local banking demos show saved workflows replaying with different inputs and zero replay model calls.",
    limitations: "Demonstrated on local banking apps with synthetic data. General website support, production authentication, and cross-tenant reuse are outside the demonstrated scope.",
    evidence: "Repository, design report, screenshot guide, and recorded discovery/replay evidence are available on GitHub.",
    tech: ["Python", "Playwright", "React", "TypeScript", "LLM Tool Calling"],
    problem: "Repeating model-driven browser reasoning for familiar tasks adds cost and makes outcomes harder to reproduce.",
    motivation: "Separate learning a workflow from executing it, while checking that each saved action still matches the current page.",
    architectureDiagram: `
Natural-language goal
         |
         v
LLM Discovery --> Action Gateway --> Playwright Browser
         |              ^                   |
         v              |                   v
Saved Capability --> Replay Engine <-- Page Evidence
                            |
                            v
                    Result / Human Handoff
`,
    sequenceDiagram: `
User       Discovery        Saved Artifact       Replay        Browser
 |-- goal ---->|                  |                  |              |
 |             |-- validate and discover actions ----------------->|
 |             |-- save -------->|                  |              |
 |-- new inputs ---------------------------------->|              |
 |                                |-- load -------->|              |
 |                                                  |-- act ------>|
 |                                                  |<-- evidence -|
 |<-- checked result; zero replay model calls -------|              |
`,
    failureModes: [
      { scenario: "Stale or ambiguous page target", impact: "A saved action may point at the wrong control.", mitigation: "Validate fresh evidence and fail when target resolution is uncertain." },
      { scenario: "Action needs human intervention", impact: "Replay cannot safely continue automatically.", mitigation: "Pause for takeover and validate fresh state before resuming." },
    ],
    scalingStrategy: "One Python process coordinates the browser. Active sessions are local and do not survive a restart.",
    security: "The action gateway checks allowed actions, ownership, and observations. The local UI is not a production authentication system.",
    performance: "Replay has no model dependency; discovery uses a configured provider.",
    benchmarks: ["Recorded replay checks expected outputs with new inputs.", "Evidence covers local demo cases, not arbitrary websites."],
    tradeoffs: [
      { decision: "Discover once, replay deterministically", alternative: "Ask a model to plan every run", rationale: "A saved procedure makes repeated execution inspectable and avoids repeated model decisions." },
      { decision: "Validate state before continuing", alternative: "Treat completed clicks as success", rationale: "Page evidence must support the requested result." },
    ],
    monitoring: ["Execution evidence: Saved steps, outcomes, and failure context.", "Model calls: Discovery and replay usage are tracked separately."],
    testing: "Tests and evaluation commands cover replay, expected business errors, and intervention behavior. The design report links recorded evidence.",
    cicd: "The repository documents Python and frontend setup, local launch commands, and evaluation instructions.",
    futureWork: "Further validation would cover physical handoff acceptance and reuse of one unchanged capability across application profiles.",
    repo: "https://github.com/ManoBharathi93/capability-runner",
    demo: "https://github.com/ManoBharathi93/capability-runner#run-the-product",
    doc: "https://github.com/ManoBharathi93/capability-runner/blob/main/REPORT.md",
  },
  {
    id: "syncstream",
    name: "SyncStream",
    summary: "Distributed data synchronization using PostgreSQL change events, Kafka, Redis, and Elasticsearch.",
    tag: "Distributed Systems",
    status: "Prototype",
    whatIBuilt: "Built a CDC pipeline with Debezium, Kafka consumers for Redis and Elasticsearch, shared retries, dead-letter queues, and consumer-management APIs.",
    measuredResult: "Implemented product-event propagation from PostgreSQL to cache and search projections, with repository verification scripts.",
    limitations: "A local development platform; analytics consumption is not implemented and role-header authorization needs production hardening.",
    evidence: "Source, Docker Compose setup, architecture documentation, and workflow verification scripts are available in the repository.",
    tech: ["Java", "PostgreSQL", "Debezium", "Kafka", "Redis", "Elasticsearch", "Docker"],
    problem: "Synchronizing caches and search indexes through application dual writes creates failure windows and duplicated integration logic.",
    motivation: "Keep PostgreSQL as the source of truth and propagate its changes to independent downstream consumers.",
    architectureDiagram: `
PostgreSQL WAL --> Debezium --> Kafka
                                 |
                    +------------+------------+
                    |                         |
             Redis Consumer          Elasticsearch Consumer
                    |                         |
                  Redis                  Search Index

Shared Retry / Dead-Letter Queues
Consumer Registry + Dashboard    Prometheus + Grafana
`,
    sequenceDiagram: `
Database       Debezium           Kafka          Consumers       Read Models
   |-- change ---->|                |                |                |
   |               |-- event ------>|                |                |
   |               |                |-- consume ---->|                |
   |               |                |                |-- project ---->|
   |               |                |                |<-- result -----|
   |               |                |<-- offset -----|                |
   |               |                |<-- retry / DLQ on failure -------|
`,
    failureModes: [
      { scenario: "Downstream projection fails", impact: "Cache or search updates can lag behind PostgreSQL.", mitigation: "Retry policies and dead-letter topics retain failures for investigation." },
      { scenario: "Consumer needs recovery", impact: "Previously read events may need reprocessing.", mitigation: "Registry APIs include replay requests and verification workflows." },
    ],
    scalingStrategy: "Kafka decouples capture from projection. Partitioning and consumer groups provide a path to parallel processing; no production capacity figure is claimed.",
    security: "The local setup uses role headers. Signed identity and production credential management remain deployment work.",
    performance: "Functional CDC propagation is implemented; no measured throughput or latency benchmark is published here.",
    benchmarks: ["Product events flow to Redis and Elasticsearch.", "Verification scripts cover monitoring and administration workflows."],
    tradeoffs: [
      { decision: "CDC through Debezium and Kafka", alternative: "Application dual writes or polling", rationale: "Change capture separates source writes from downstream projection, at the cost of more infrastructure." },
      { decision: "Separate cache and search consumers", alternative: "One combined projection service", rationale: "Consumers can evolve independently while sharing the event stream." },
    ],
    monitoring: ["Prometheus and Grafana: Repository configurations support operational visibility.", "Consumer dashboard: Registration, health, and replay management APIs."],
    testing: "Deterministic verification scripts cover the monitoring and admin dashboard workflows.",
    cicd: "Docker Compose starts infrastructure; Maven and Python commands start consumers and the registry platform.",
    futureWork: "Documented next steps include an analytics consumer and production identity controls.",
    repo: "https://github.com/ManoBharathi93/SyncStream",
    demo: "https://github.com/ManoBharathi93/SyncStream#quick-start",
    doc: "https://github.com/ManoBharathi93/SyncStream/blob/main/docs/architecture/ARCHITECTURE.md",
  },
  {
    id: "ticketless-enterprise",
    name: "Ticketless IT/HR Voice Support",
    summary: "A voice and screen support prototype combining enterprise retrieval, guided actions, and human approval.",
    tag: "Multimodal AI Agents",
    status: "Prototype",
    whatIBuilt: "Built speech recognition, WebSocket voice interactions, VLM/OCR screen understanding, enterprise RAG, and LangGraph orchestration with human approval and structured verification before closure.",
    measuredResult: "Implemented a combined voice-and-screen support workflow. No quantitative performance result is claimed for this prototype.",
    limitations: "An IT/HR support prototype; production deployment and a measured reliability benchmark are not established by this project summary.",
    evidence: "Implementation summary follows my resume. The supplied project repository is linked above; public access is currently unavailable.",
    tech: ["Speech Recognition", "WebSockets", "VLM/OCR", "RAG", "LangGraph"],
    problem: "Support requests often need both a spoken description and the context visible on an employee's screen.",
    motivation: "Bring voice, screen context, and enterprise knowledge into one guided support workflow.",
    architectureDiagram: `
Voice Input --> Speech Recognition ----+
                                      |
Screen Context --> VLM / OCR ----------+--> LangGraph Orchestration
                                      |              |
Enterprise Knowledge --> RAG ---------+              v
                                              Human Approval
                                                     |
                                                     v
                                           Structured Verification
                                                     |
                                                     v
                                               Support Closure
`,
    sequenceDiagram: `
Employee       Voice / Screen       Agent + RAG      Approval      Verification
   |-- request ---->|                    |              |              |
   |                |-- context -------->|              |              |
   |                |                    |-- proposal -->|              |
   |<-- review and approve -----------------------------|              |
   |                |                    |-- workflow ----------------->|
   |<-- verified outcome ----------------------------------------------|
`,
    failureModes: [
      { scenario: "Incomplete voice or screen interpretation", impact: "The workflow may lack enough context to resolve the request.", mitigation: "Human review and structured verification provide a check before closure." },
      { scenario: "An action needs approval", impact: "Execution requires a human decision.", mitigation: "Keep human approval in the support workflow." },
    ],
    scalingStrategy: "WebSockets carry interactive voice traffic. Concurrent-session capacity has not been reported for this prototype.",
    security: "Human approval is part of the action flow, and structured verification precedes closure. Production security validation is outside the documented scope.",
    performance: "Interactive voice and screen support; latency and concurrency measurements are not included in the supplied results.",
    benchmarks: ["Combines speech, screen understanding, and enterprise retrieval.", "Approval and verification precede support closure."],
    tradeoffs: [
      { decision: "Use voice and screen context", alternative: "Text-only support requests", rationale: "Screen understanding can supply context that a spoken description leaves out." },
      { decision: "Keep human approval", alternative: "Fully autonomous support actions", rationale: "The user participates before actions are accepted and the request is closed." },
    ],
    monitoring: ["Workflow outcome: Structured verification before closure.", "Approval state: Human participation in the resolution flow."],
    testing: "Structured verification is built into the workflow. A separate test-suite or benchmark report was not supplied for this entry.",
    cicd: "The project repository is linked for source access; public setup and deployment documentation could not be verified.",
    futureWork: "Further work would document reproducible support scenarios, latency measurements, and deployment requirements.",
    repo: "https://github.com/ManoBharathi93/Ticketless-Enterprise",
    demo: "",
    doc: "https://github.com/ManoBharathi93/Ticketless-Enterprise",
  },
  {
    id: "adaptive-runbook-intelligence",
    name: "Adaptive Runbook Intelligence Platform",
    summary: "A support-automation proof of concept that learns reusable runbooks from execution history.",
    tag: "Agent Memory & RAG",
    status: "Prototype",
    whatIBuilt: "Built knowledge retrieval, case memory, a runbook library, policy-based routing, feedback tracking, and a fast path for known-good runbooks without LLM calls.",
    measuredResult: "Includes a three-phase benchmark over 20 synthetic support tickets, comparing stateless reasoning, runbook creation, and runbook reuse.",
    limitations: "The demonstration uses synthetic tickets and simulated MCP actions. It does not establish production incident-resolution performance.",
    evidence: "The repository includes workflow code, runbook storage, policy logic, a benchmark runner, and documented metrics.",
    tech: ["Python", "ChromaDB", "SQLite", "Streamlit", "MCP", "Embeddings"],
    problem: "Repeated support requests can trigger the same retrieval and reasoning even after a successful resolution is already known.",
    motivation: "Reuse validated resolution steps and retain feedback about when a runbook succeeds or fails.",
    architectureDiagram: `
Incoming Query --> Runbook Similarity Search
                            |
               +------------+------------+
               |                         |
        Known-Good Match              No Match
               |                         |
          Policy Gate           Knowledge + Case Memory
               |                         |
       Direct MCP Actions          LLM Reasoning
               |                         |
               |                    Policy Gate
               |                         |
               +----------+--------------+
                          |
               Feedback + Runbook Updates
`,
    sequenceDiagram: `
Query          Runbook Store       Policy          Executor       Feedback
  |-- match ------>|                 |                |              |
  |<-- known-good -|                 |                |              |
  |-- candidate ------------------->|                |              |
  |                                 |-- approved --->|              |
  |                                 |                |-- outcome -->|
  |                |<-- update counters and status -----------------|
  |<-- result; fast path avoids LLM calls ------------|              |
`,
    failureModes: [
      { scenario: "No suitable runbook", impact: "A saved resolution cannot be reused confidently.", mitigation: "Route through exploratory retrieval and reasoning." },
      { scenario: "Runbook repeatedly fails or reopens", impact: "A previously useful procedure may no longer be reliable.", mitigation: "Update lifecycle counters and exclude known-bad runbooks from matching." },
    ],
    scalingStrategy: "The proof of concept uses ChromaDB indexes and SQLite statistics. Distributed operation is not demonstrated.",
    security: "A policy gate evaluates execution eligibility. Benchmark MCP actions are simulated rather than live enterprise changes.",
    performance: "The known-good fast path bypasses model reasoning and tracks latency, tokens, and LLM calls separately.",
    benchmarks: ["Three phases compare stateless, learning, and reuse behavior.", "Repeated-query checks compare determinism hashes."],
    tradeoffs: [
      { decision: "Reuse explicit runbooks", alternative: "Reason from scratch for every request", rationale: "Stored steps can be inspected and routed directly when their history supports reuse." },
      { decision: "Separate semantic and structured memory", alternative: "Store all runbook state in one format", rationale: "Similarity search finds candidates while counters support lifecycle decisions." },
    ],
    monitoring: ["Execution metrics: Tokens, model calls, latency, and escalations.", "Runbook lifecycle: Successes, failures, reopenings, and reuse status."],
    testing: "The benchmark reuses a fixed synthetic ticket set across three phases and includes a repeated-query determinism check.",
    cicd: "The README documents Python setup, provider configuration, benchmark commands, and Streamlit launch instructions.",
    futureWork: "Further validation would use held-out cases and approved integrations with real operational systems.",
    repo: "https://github.com/ManoBharathi93/Adaptive-Runbook-Intelligence",
    demo: "https://github.com/ManoBharathi93/Adaptive-Runbook-Intelligence#launch-ui",
    doc: "https://github.com/ManoBharathi93/Adaptive-Runbook-Intelligence#architecture",
  },
  {
    id: "adaptive-compute-efficient-learning",
    name: "Adaptive Compute Efficient Learning via Conceptual-Criticality",
    summary: "Research into allocating model compute according to input difficulty and early-exit confidence.",
    tag: "AI Research",
    status: "Prototype",
    whatIBuilt: "Co-authored the AAAI 2026 Student Abstract and contributed to a proof of concept for criticality estimation and early-exit inference.",
    measuredResult: "The proof of concept retained about 90.7% accuracy while reducing energy use by about 65% versus a 6-layer baseline.",
    limitations: "These are results for the evaluated proof of concept, not a general energy or accuracy guarantee for other models and datasets.",
    evidence: "The research repository contains the paper, notebooks, and experiment code. Results here follow the resume summary.",
    tech: ["Python", "PyTorch", "Transformers", "Jupyter", "Early Exit"],
    problem: "A fixed inference depth spends the same computation on easy and difficult inputs.",
    motivation: "Explore whether input difficulty and confidence can guide compute use while retaining predictive accuracy.",
    architectureDiagram: `
Input --> Criticality Estimation --> Adaptive Compute Decision
                                               |
                                               v
                                      Transformer Layers
                                               |
                                      Early-Exit Heads
                                               |
                                  Confidence Threshold Met?
                                      |              |
                                     Yes             No
                                      |              |
                                 Prediction     Continue Layers
`,
    sequenceDiagram: `
Input          Criticality         Transformer       Exit Head      Evaluation
  |-- score ------>|                    |                |              |
  |                |-- allocation ---->|                |              |
  |                                     |-- hidden ---->|              |
  |                                     |<-- confidence-|              |
  |                                     |-- exit / continue            |
  |                                     |-- prediction + compute ----->|
  |<-- accuracy and energy comparison --------------------------------|
`,
    failureModes: [
      { scenario: "An input exits too early", impact: "Compute savings may reduce prediction quality.", mitigation: "Evaluate accuracy alongside exit thresholds and compute usage." },
      { scenario: "Results vary across workloads", impact: "Savings may not transfer to another model or dataset.", mitigation: "Report the evaluated baseline and experimental scope." },
    ],
    scalingStrategy: "The work explores per-input compute allocation. Larger-model and broader-dataset validation remain further research.",
    security: "This is experimental research code rather than an exposed inference service; no service security model is claimed.",
    performance: "About 90.7% accuracy with about 65% lower energy use than the 6-layer baseline in the proof of concept.",
    benchmarks: ["Baseline: fixed 6-layer computation.", "Evaluation: prediction accuracy and energy use within the proof-of-concept setup."],
    tradeoffs: [
      { decision: "Adapt compute to input difficulty", alternative: "Run full fixed-depth inference for every input", rationale: "Easier inputs may require fewer computation steps." },
      { decision: "Use confidence-based early exits", alternative: "Always use the final layer", rationale: "Threshold selection makes the accuracy-versus-compute tradeoff explicit." },
    ],
    monitoring: ["Accuracy: Predictive quality in the evaluated experiment.", "Compute use: Energy, layers used, and inference-cost comparisons."],
    testing: "Notebooks demonstrate criticality estimation and early-exit comparisons alongside the research paper and experiment code.",
    cicd: "Python dependency setup and notebook instructions are available for reproducing the research workflow.",
    futureWork: "Further research would test more workloads and document how savings vary with model size and exit thresholds.",
    repo: "https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality",
    demo: "https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality/tree/main/notebooks",
    doc: "https://github.com/ManoBharathi93/Adaptive-Compute-Efficient-Learning-via-Conceptual-Criticality#notebooks",
  },
  {
    id: "dynamic-retriever",
    name: "Dynamic vs. Fixed K Reranking in RAG",
    summary: "A retrieval experiment comparing fixed context size with relevance-based dynamic document selection.",
    tag: "Retrieval & Evaluation",
    status: "Prototype",
    whatIBuilt: "Built a notebook comparison using embeddings, FAISS retrieval, cross-encoder reranking, and fixed versus score-based dynamic context selection.",
    measuredResult: "On the documented synthetic experiment, estimated average context tokens fell from 125.17 to 13.00 while answer presence in context remained 1.00 for both methods.",
    limitations: "Uses 100 synthetic documents and 30 queries. Token cost is estimated; answer presence measures retrieved context, not generated-answer correctness.",
    evidence: "The repository contains the comparison notebook, experiment design, evaluation definitions, and aggregate results.",
    tech: ["Python", "Sentence Transformers", "FAISS", "Cross-Encoder", "Jupyter"],
    problem: "A fixed document count can add irrelevant context for simple queries or omit context for broader queries.",
    motivation: "Compare selection strategies by measuring both context quality and the amount of text selected.",
    architectureDiagram: `
Synthetic Documents --> Embeddings --> FAISS Index
                                           ^
                                           |
Query --> Embedding --> Candidate Retrieval
                              |
                       Cross-Encoder Reranking
                              |
                  +-----------+-----------+
                  |                       |
             Fixed-K Context        Dynamic-K Context
                  |                       |
                  +-----------+-----------+
                              |
                     Retrieval Evaluation
`,
    sequenceDiagram: `
Query             FAISS          Reranker        Selection       Evaluation
  |-- retrieve ---->|               |               |               |
  |<-- candidates -|               |               |               |
  |-- score candidates ----------->|               |               |
  |                                |-- ranking ---->|               |
  |                                                 |-- fixed K --->|
  |                                                 |-- dynamic K ->|
  |<-- compare context quality and estimated tokens ----------------|
`,
    failureModes: [
      { scenario: "Threshold discards useful context", impact: "Selection could omit information needed for an answer.", mitigation: "Compare answer presence, ranking metrics, and context precision." },
      { scenario: "Synthetic results do not generalize", impact: "Gains may differ on real document collections.", mitigation: "Keep dataset scope explicit and validate separately on new corpora." },
    ],
    scalingStrategy: "The notebook uses a small synthetic corpus and FAISS IndexFlatL2. Large-corpus throughput is outside the measured experiment.",
    security: "The experiment uses synthetic documents. Enterprise document permissions and tenant isolation are outside its scope.",
    performance: "README-reported synthetic results compare context quality and estimated token cost.",
    benchmarks: ["Precision: 0.11 fixed K; 0.98 dynamic K.", "Average selected documents: 10.00 fixed K; 1.03 dynamic K.", "Estimated average context tokens: 125.17 fixed K; 13.00 dynamic K."],
    tradeoffs: [
      { decision: "Select by relative reranker score", alternative: "Always keep a fixed document count", rationale: "Context size follows relevance but becomes sensitive to the selection threshold." },
      { decision: "Evaluate retrieval independently", alternative: "Judge only final generated answers", rationale: "Context metrics isolate the effect of document selection." },
    ],
    monitoring: ["Context quality: Answer presence, precision, MRR, and NDCG.", "Context size: Selected document count and estimated tokens."],
    testing: "Both strategies are compared on the same synthetic documents and queries with known answers.",
    cicd: "The project provides a notebook and README with setup and execution instructions.",
    futureWork: "Further evaluation would use real corpora, additional query types, and generated-answer measurements.",
    repo: "https://github.com/ManoBharathi93/Dynamic-Retriever",
    demo: "https://github.com/ManoBharathi93/Dynamic-Retriever/blob/main/Dynamic_K_vs_Fixed_K_Retrieval_ipynb.ipynb",
    doc: "https://github.com/ManoBharathi93/Dynamic-Retriever#experiment-design",
  },
];
