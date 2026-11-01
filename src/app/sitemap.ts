import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projectsData";
import { articles } from "@/data/articlesData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://manobharathi93.github.io";
  return [
    ...["", "/resume", "/resume/ai-infrastructure", "/projects", "/blog", "/architecture", "/contact"].map((path) => ({
      url: `${site}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...articles.map((article) => ({
      url: `${site}${article.href}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...projectsData.map((project) => ({
      url: `${site}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
