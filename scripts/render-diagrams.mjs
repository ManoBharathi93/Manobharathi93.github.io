import { createServer } from "node:http";
import { readFile, readdir, mkdir, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

// Regenerate the committed SVGs with `npm run diagrams`. Mermaid is a build
// tool only: exported pages never load a diagram runtime or an external CDN.
const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = join(root, "content/diagrams");
const outputRoot = join(root, "public/diagrams");
const mermaidRoot = join(root, "node_modules/mermaid/dist");
const server = createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    if (pathname === "/") {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end('<!doctype html><html><body style="margin:0"></body></html>');
      return;
    }
    const path = resolve(mermaidRoot, `.${pathname}`);
    if (!path.startsWith(mermaidRoot + sep)) throw new Error("Invalid asset path");
    const content = await readFile(path);
    response.writeHead(200, { "Content-Type": "application/javascript" });
    response.end(content);
  } catch {
    response.writeHead(404);
    response.end();
  }
});
await new Promise((done) => server.listen(0, "127.0.0.1", done));

const palettes = {
  light: { background: "#fdfdfc", surface: "#edf5ef", group: "#f4f4f0", foreground: "#1c1c1a", line: "#51675a", border: "#719480", accent: "#2e8b57" },
  dark: { background: "#0f0f0e", surface: "#1c3024", group: "#1a1a18", foreground: "#e3e3dd", line: "#aac0b2", border: "#6c947b", accent: "#6abf8f" },
};

let browser;
try {
  browser = await launchBrowser();
  const page = await browser.newPage({ viewport: { width: 1600, height: 1200 } });
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.evaluate(async () => {
    window.mermaid = (await import("/mermaid.esm.min.mjs")).default;
  });

  const outputs = [];
  const manifest = {};
  const projects = (await readdir(sourceRoot, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory()).map((entry) => entry.name).sort();

  for (const project of projects) {
    const metadata = JSON.parse(await readFile(join(sourceRoot, project, "metadata.json"), "utf8"));
    manifest[project] = {};
    for (const kind of ["architecture", "sequence"]) {
      const source = await readFile(join(sourceRoot, project, `${kind}.mmd`), "utf8");
      const details = metadata[kind];
      if (!details?.title || !details.description || !details.caption || !Array.isArray(details.sources)) {
        throw new Error(`Missing diagram metadata for ${project}/${kind}`);
      }
      const base = `${project}-${kind}`;
      outputs.push([`${base}.mmd`, source]);
      const entry = { ...details, source: `/diagrams/${base}.mmd` };

      for (const [theme, colors] of Object.entries(palettes)) {
        const rendered = await page.evaluate(async ({ source, id, theme, colors }) => {
          window.mermaid.initialize({
            startOnLoad: false,
            securityLevel: "strict",
            theme: "base",
            look: "classic",
            htmlLabels: false,
            deterministicIds: true,
            deterministicIDSeed: id,
            fontFamily: "Arial, Helvetica, sans-serif",
            themeVariables: {
              darkMode: theme === "dark",
              background: colors.background,
              primaryColor: colors.surface,
              secondaryColor: colors.group,
              tertiaryColor: colors.group,
              primaryTextColor: colors.foreground,
              secondaryTextColor: colors.foreground,
              tertiaryTextColor: colors.foreground,
              primaryBorderColor: colors.border,
              secondaryBorderColor: colors.border,
              tertiaryBorderColor: colors.border,
              lineColor: colors.line,
              textColor: colors.foreground,
              mainBkg: colors.surface,
              clusterBkg: colors.group,
              clusterBorder: colors.border,
              edgeLabelBackground: colors.background,
              titleColor: colors.foreground,
              fontSize: "17px",
              actorBkg: colors.surface,
              actorBorder: colors.border,
              actorTextColor: colors.foreground,
              actorLineColor: colors.border,
              signalColor: colors.line,
              signalTextColor: colors.foreground,
              labelBoxBkgColor: colors.group,
              labelBoxBorderColor: colors.border,
              labelTextColor: colors.foreground,
              loopTextColor: colors.foreground,
              noteBkgColor: colors.group,
              noteBorderColor: colors.border,
              noteTextColor: colors.foreground,
              activationBkgColor: colors.surface,
              activationBorderColor: colors.border,
              sequenceNumberColor: colors.background,
            },
            flowchart: { htmlLabels: false, curve: "basis", nodeSpacing: 32, rankSpacing: 42, padding: 16, diagramPadding: 24, wrappingWidth: 180 },
            sequence: { useMaxWidth: false, wrap: true, width: 130, height: 48, actorMargin: 32, boxMargin: 12, messageMargin: 32, diagramMarginX: 24, diagramMarginY: 24, mirrorActors: false, actorFontSize: 16, messageFontSize: 15, noteFontSize: 14 },
          });
          await window.mermaid.parse(source);
          const { svg } = await window.mermaid.render(id, source);
          const document = new DOMParser().parseFromString(svg, "image/svg+xml");
          const element = document.documentElement;
          const viewBox = element.getAttribute("viewBox").split(/[ ,]+/).map(Number);
          const width = Math.ceil(viewBox[2]);
          const height = Math.ceil(viewBox[3]);
          element.setAttribute("width", String(width));
          element.setAttribute("height", String(height));
          element.style.backgroundColor = colors.background;
          element.style.maxWidth = "none";
          if (!element.querySelector("title") || !element.querySelector("desc")) {
            throw new Error(`Missing accessible title or description: ${id}`);
          }
          if (element.querySelector("foreignObject, script")) throw new Error(`Nonportable SVG markup: ${id}`);
          return { svg: new XMLSerializer().serializeToString(element), width, height };
        }, { source, id: `${base}-${theme}`, theme, colors });
        outputs.push([`${base}.${theme}.svg`, rendered.svg + "\n"]);
        entry[theme] = { src: `/diagrams/${base}.${theme}.svg`, width: rendered.width, height: rendered.height };
      }
      manifest[project][kind] = entry;
      console.log(`Rendered ${project}/${kind} in light and dark`);
    }
  }

  // Publish only after every source parses and both palettes render successfully.
  await mkdir(outputRoot, { recursive: true });
  await Promise.all(outputs.map(([name, content]) => writeFile(join(outputRoot, name), content)));
  await writeFile(join(outputRoot, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");
  console.log(`Generated ${outputs.length} assets in ${relative(root, outputRoot)}`);
} finally {
  await browser?.close();
  await new Promise((done) => server.close(done));
}
