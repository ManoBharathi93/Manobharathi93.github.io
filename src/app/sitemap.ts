import type { MetadataRoute } from "next";
import { projectsData } from "@/data/projectsData";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://manobharathi93.github.io";
  return [
    ...["", "/resume", "/projects", "/architecture", "/contact"].map((path) => ({
      url: `${site}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...projectsData.map((project) => ({
      url: `${site}/projects/${project.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
