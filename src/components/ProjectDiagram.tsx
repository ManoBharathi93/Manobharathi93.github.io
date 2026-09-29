import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import diagrams from "../../public/diagrams/manifest.json";

type DiagramKind = "architecture" | "sequence";
interface DiagramAsset {
  src: string;
  width: number;
  height: number;
}
interface DiagramInfo {
  title: string;
  description: string;
  caption: string;
  sources: { label: string; url: string }[];
  source: string;
  light: DiagramAsset;
  dark: DiagramAsset;
}

const projectDiagrams: Record<string, Record<DiagramKind, DiagramInfo>> = diagrams;

export function ProjectDiagram({ projectId, kind }: { projectId: string; kind: DiagramKind }) {
  const diagram = projectDiagrams[projectId]?.[kind];
  if (!diagram) throw new Error(`Missing ${kind} diagram for ${projectId}`);

  return (
    <figure data-project-diagram={`${projectId}-${kind}`} className="space-y-3 min-w-0">
      <div className="p-4 rounded border border-[var(--border)] bg-[var(--muted-background)]/50 overflow-x-auto">
        {(["light", "dark"] as const).map((theme) => (
          <a
            key={theme}
            href={diagram[theme].src}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${diagram.title} at full size (${theme} theme)`}
            className={theme === "light" ? "block dark:hidden" : "hidden dark:block"}
          >
            <Image
              src={diagram[theme].src}
              alt={diagram.description}
              width={diagram[theme].width}
              height={diagram[theme].height}
              unoptimized
              className="w-full h-auto"
            />
          </a>
        ))}
      </div>
      <figcaption className="space-y-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] font-semibold text-[var(--accent)]">
          {(["light", "dark"] as const).map((theme) => (
            <a
              key={theme}
              data-diagram-open
              href={diagram[theme].src}
              target="_blank"
              rel="noopener noreferrer"
              className={`items-center gap-1 hover:underline ${theme === "light" ? "inline-flex dark:hidden" : "hidden dark:inline-flex"}`}
            >
              View full size <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </a>
          ))}
          <a href={diagram.source} download className="inline-flex items-center gap-1 hover:underline">
            Mermaid source <Download className="w-3 h-3" aria-hidden="true" />
          </a>
        </div>
        <p className="text-[11px] text-[var(--muted)] leading-relaxed">{diagram.caption}</p>
        {diagram.sources.length > 0 && <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-[var(--muted)]">
          <span className="font-mono uppercase">Sources</span>
          {diagram.sources.map((source) => (
            <a key={source.url} href={source.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-[var(--accent)]">
              {source.label}
            </a>
          ))}
        </div>}
      </figcaption>
    </figure>
  );
}
