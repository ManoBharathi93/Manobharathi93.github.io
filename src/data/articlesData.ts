export interface ArticleSummary {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  topics: string[];
  href: string;
}

export const articles: ArticleSummary[] = [
  {
    id: "transactional-outbox-pattern",
    title: "The Transaction Ends at the Database — An Outbox Pattern Field Guide",
    excerpt:
      "A practical, visual walkthrough of the dual-write problem, how a transactional outbox closes the gap, and the delivery guarantees and operational choices to plan for.",
    publishedAt: "November 2026",
    readTime: "9 min read",
    topics: ["Distributed systems", "PostgreSQL", "Kafka", "CDC"],
    href: "/blog/transactional-outbox-pattern.html",
  },
];
