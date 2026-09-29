export const experienceHighlights = [
  {
    title: "Case-Aware Dual-Memory Agent",
    details: [
      ["Focus", "Enterprise support using RAG and reusable case memory."],
      ["Built", "A case-aware agent combining enterprise knowledge with memory of previous cases."],
      ["Evaluation", "Staged evaluation of escalations, response latency, tokens, and LLM calls per ticket."],
      ["Escalations", "Reduced by 75%, from 20 to 5."],
      ["Latency", "Reduced by 43%, from 1,324 to 750 ms."],
      ["Efficiency", "Tokens per ticket fell 33% (502 to 336); LLM calls fell 40% (1.0 to 0.6)."],
    ],
  },
  {
    title: "Cloud-Connectivity Capacity",
    details: [
      ["Focus", "Inter-region connections in a distributed cloud-connectivity service."],
      ["Context", "The service previously supported 55 inter-region connections."],
      ["Approach", "Redesigned UUID storage in the existing service."],
      ["Compatibility", "Delivered without a database schema migration."],
      ["Capacity", "Increased supported connections from 55 to 165."],
      ["Outcome", "3x cloud-connectivity capacity."],
    ],
  },
  {
    title: "Time-Series Baseline Service",
    details: [
      ["Focus", "Scalable time-series queries for observability."],
      ["Built", "A baseline service with dynamic upper and lower bounds."],
      ["Raw Data", "5-minute data for detailed queries."],
      ["Aggregates", "Hourly aggregates for broader time ranges."],
      ["Routing", "Adaptive selection between raw data and hourly aggregates."],
      ["Outcome", "Supported scalable observability queries across data granularities."],
    ],
  },
  {
    title: "CVE Automation Prototype",
    details: [
      ["Focus", "Reducing manual vulnerability triage effort."],
      ["Ingestion", "Collected and normalized security advisories."],
      ["Matching", "Matched advisory information against inventory."],
      ["Remediation", "Connected the workflow to network automation."],
      ["Scope", "An end-to-end prototype covering ingestion through remediation."],
      ["Outcome", "Reduced manual triage effort by approximately 60%."],
    ],
  },
];
