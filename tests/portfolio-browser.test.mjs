import assert from "node:assert/strict";
import { createServer } from "node:http";
import { access, mkdtemp, readFile, readdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import { extname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { launchBrowser } from "../scripts/browser.mjs";

const exportDirectory = fileURLToPath(new URL("../out/", import.meta.url));
const projects = [
  "capability-runner",
  "syncstream",
  "ticketless-enterprise",
  "adaptive-runbook-intelligence",
  "adaptive-compute-efficient-learning",
  "dynamic-retriever",
];
const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".txt": "text/plain; charset=utf-8",
  ".mmd": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
};

async function windowsSegmentAliases() {
  const aliases = new Map();
  if (process.platform !== "win32") return aliases;

  // Next 16.2's Windows exporter passes backslashes to a filename encoder that
  // only flattens forward slashes. Mirror the flat RSC filenames emitted by the
  // Linux deployment build, using only segment files that actually exist.
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const filename = join(directory, entry.name);
      if (entry.isDirectory()) {
        await visit(filename);
      } else if (entry.isFile() && filename.endsWith(".txt")) {
        const parts = relative(exportDirectory, filename).split(sep);
        const segmentStart = parts.findIndex((part) => part.startsWith("__next."));
        if (segmentStart >= 0 && segmentStart < parts.length - 1) {
          await access(filename);
          const requestPath = `/${[
            ...parts.slice(0, segmentStart),
            parts.slice(segmentStart).join("."),
          ].join("/")}`;
          assert.equal(aliases.has(requestPath), false, `Duplicate RSC segment alias: ${requestPath}`);
          aliases.set(requestPath, filename);
        }
      }
    }
  }
  await visit(exportDirectory);
  return aliases;
}

async function serveExport() {
  await readFile(join(exportDirectory, "index.html"));
  const segmentAliases = await windowsSegmentAliases();
  let adaptedSegmentRequests = 0;
  const server = createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
      const requestedFile = resolve(exportDirectory, `.${pathname}`);
      const root = resolve(exportDirectory);
      if (requestedFile !== root && !requestedFile.startsWith(`${root}${sep}`)) {
        response.writeHead(403).end();
        return;
      }
      const candidates = extname(requestedFile)
        ? [requestedFile]
        : [requestedFile, `${requestedFile}.html`, join(requestedFile, "index.html")];
      const segmentAlias = segmentAliases.get(pathname);
      if (segmentAlias) candidates.push(segmentAlias);
      for (const candidate of candidates) {
        try {
          const body = await readFile(candidate);
          if (candidate === segmentAlias) adaptedSegmentRequests++;
          response.writeHead(200, {
            "Content-Type": contentTypes[extname(candidate)] ?? "application/octet-stream",
            "Cache-Control": "no-store",
          });
          response.end(request.method === "HEAD" ? undefined : body);
          return;
        } catch (error) {
          if (!["ENOENT", "EISDIR", "EACCES"].includes(error.code)) throw error;
        }
      }
      response.writeHead(404).end("Not found");
    } catch {
      response.writeHead(500).end("Unable to serve export");
    }
  });
  await new Promise((accept, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", accept);
  });
  return {
    origin: `http://127.0.0.1:${server.address().port}`,
    adaptedSegmentRequests: () => adaptedSegmentRequests,
    close: () => new Promise((accept, reject) => {
      server.close((error) => error ? reject(error) : accept());
      server.closeAllConnections();
    }),
  };
}

async function bodyColors(page) {
  return page.locator("body").evaluate((body) => {
    const styles = getComputedStyle(body);
    return { background: styles.backgroundColor, foreground: styles.color };
  });
}

async function waitForTheme(page, theme) {
  await page.waitForFunction((expected) => {
    const root = document.documentElement;
    return root.classList.contains(expected)
      && getComputedStyle(root).colorScheme === expected;
  }, theme);
  const button = page.getByRole("button", {
    name: theme === "dark" ? "Switch to light theme" : "Switch to dark theme",
    exact: true,
  });
  await button.waitFor({ state: "visible" });
  assert.equal(await button.getAttribute("aria-pressed"), String(theme === "dark"));
  assert.equal(await button.isEnabled(), true);
}

async function switchTheme(page, theme) {
  await page.getByRole("button", {
    name: theme === "dark" ? "Switch to dark theme" : "Switch to light theme",
    exact: true,
  }).click();
  await waitForTheme(page, theme);
}

test("exported portfolio themes and project diagrams work in Chromium", { timeout: 180_000 }, async (t) => {
  const server = await serveExport();
  t.after(() => server.close());
  const browser = await launchBrowser();
  t.after(() => browser.close());
  const context = await browser.newContext({ viewport: { width: 1440, height: 1100 } });
  const page = await context.newPage();
  page.setDefaultTimeout(15_000);
  const browserErrors = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") {
      const location = message.location();
      browserErrors.push(`${message.text()} (${location.url}:${location.lineNumber})`);
    }
  });
  page.on("response", (response) => {
    if (response.status() >= 400) browserErrors.push(`HTTP ${response.status()}: ${response.url()}`);
  });
  const screenshots = await mkdtemp(join(tmpdir(), "portfolio-browser-"));
  t.diagnostic(`Screenshots: ${screenshots}`);

  await t.test("theme changes actual colors and persists across reload and client navigation", async () => {
    await page.goto(server.origin, { waitUntil: "networkidle" });
    await waitForTheme(page, "light");
    const light = await bodyColors(page);
    assert.deepEqual(light, { background: "rgb(253, 253, 252)", foreground: "rgb(28, 28, 26)" });
    await page.screenshot({ path: join(screenshots, "home.light.png"), animations: "disabled" });

    await switchTheme(page, "dark");
    const dark = await bodyColors(page);
    assert.deepEqual(dark, { background: "rgb(15, 15, 14)", foreground: "rgb(227, 227, 221)" });
    assert.notEqual(dark.background, light.background);
    assert.notEqual(dark.foreground, light.foreground);
    assert.equal(await page.evaluate(() => localStorage.getItem("theme")), "dark");

    await page.reload({ waitUntil: "networkidle" });
    await waitForTheme(page, "dark");
    assert.deepEqual(await bodyColors(page), dark);
    await page.screenshot({ path: join(screenshots, "home.dark.png"), animations: "disabled" });

    await page.locator("header").getByRole("link", { name: "Projects", exact: true }).click();
    await page.waitForURL(/\/projects\/?$/);
    await page.locator('a[href="/projects/capability-runner"]').first().click();
    await page.waitForURL(/\/projects\/capability-runner\/?$/);
    await waitForTheme(page, "dark");
    assert.deepEqual(await bodyColors(page), dark);

    await switchTheme(page, "light");
    assert.deepEqual(await bodyColors(page), light);
    assert.equal(await page.evaluate(() => localStorage.getItem("theme")), "light");
    await page.reload({ waitUntil: "networkidle" });
    await waitForTheme(page, "light");
    assert.deepEqual(await bodyColors(page), light);
  });

  for (const project of projects) {
    await t.test(`${project}: both diagrams render with working source and full-size links in both themes`, async () => {
      await page.setViewportSize({ width: 1440, height: 1100 });
      await page.goto(`${server.origin}/projects/${project}`, { waitUntil: "networkidle" });
      await waitForTheme(page, "light");
      const figures = page.locator("figure[data-project-diagram]");
      assert.equal(await figures.count(), 2, "Each project needs architecture and workflow figures");

      for (const theme of ["light", "dark"]) {
        if (theme === "dark") await switchTheme(page, "dark");
        for (let index = 0; index < 2; index++) {
          const figure = figures.nth(index);
          const image = figure.locator("img:visible");
          assert.equal(await image.count(), 1, "Exactly one theme image must be visible");
          const source = await image.getAttribute("src");
          assert.ok(source.endsWith(`.${theme}.svg`), `Wrong image for ${theme}: ${source}`);
          assert.ok((await image.getAttribute("alt"))?.trim(), "Diagrams need descriptive alternative text");
          await page.waitForFunction((imageSource) => Array.from(document.images).some((img) =>
            img.getAttribute("src") === imageSource && img.complete && img.naturalWidth > 0
          ), source);

          const openLink = figure.locator("a[data-diagram-open]:visible");
          assert.equal(await openLink.count(), 1, "Only the active theme's full-size link should be visible");
          const fullSizeHref = await openLink.getAttribute("href");
          assert.equal(new URL(fullSizeHref, server.origin).pathname, new URL(source, server.origin).pathname);
          assert.ok((await openLink.getAttribute("aria-label") ?? await openLink.innerText()).trim());
          const svgResponse = await context.request.get(new URL(fullSizeHref, server.origin).href);
          assert.equal(svgResponse.status(), 200);
          assert.match(svgResponse.headers()["content-type"], /image\/svg\+xml/);
          const svg = await svgResponse.text();
          assert.match(svg, /<svg[\s>]/);
          assert.doesNotMatch(svg, /Syntax error in text|Parse error on line|mermaid error/i);

          const sourceLink = figure.locator('a[href$=".mmd"]');
          assert.equal(await sourceLink.count(), 1);
          assert.notEqual(await sourceLink.getAttribute("download"), null, "Mermaid source should be downloadable");
          const sourceResponse = await context.request.get(new URL(await sourceLink.getAttribute("href"), server.origin).href);
          assert.equal(sourceResponse.status(), 200);
          const sourceText = await sourceResponse.text();
          assert.match(sourceText, /\b(?:flowchart|graph|sequenceDiagram)\b/);
          const kind = index === 0 ? "architecture" : "sequence";
          const authoredSource = await readFile(new URL(`../content/diagrams/${project}/${kind}.mmd`, import.meta.url), "utf8");
          assert.equal(sourceText, authoredSource, "Exported diagrams must use the current authored sources");
          await figure.screenshot({ path: join(screenshots, `${project}.${index + 1}.${theme}.png`), animations: "disabled", style: "header { visibility: hidden !important; }" });
        }
        assert.doesNotMatch(await page.locator("main").innerText(), /Syntax error in text|Parse error on line|mermaid error/i);
      }

      await page.setViewportSize({ width: 375, height: 812 });
      const main = page.locator("main");
      const mainBounds = await main.boundingBox();
      assert.ok(mainBounds.x >= -1 && mainBounds.x + mainBounds.width <= 376, "Main content must fit a 375px viewport");
      const mainWidths = await main.evaluate((element) => ({ scroll: element.scrollWidth, client: element.clientWidth }));
      assert.ok(mainWidths.scroll <= mainWidths.client + 1, `Main content overflows: ${JSON.stringify(mainWidths)}`);
      for (let index = 0; index < 2; index++) {
        const figure = figures.nth(index);
        const bounds = await figure.boundingBox();
        assert.ok(bounds.x >= -1 && bounds.x + bounds.width <= 376, "Diagram must fit the mobile viewport");
        const imageBounds = await figure.locator("img:visible").boundingBox();
        assert.ok(imageBounds.width <= bounds.width + 1, "Diagram image must fit its figure");
      }
      await switchTheme(page, "light");
    });
  }

  await t.test("no hydration or browser errors", () => {
    if (process.platform === "win32") {
      t.diagnostic(`Windows-only Next.js RSC filename adapter served ${server.adaptedSegmentRequests()} requests from existing exported segment files.`);
    }
    assert.deepEqual(browserErrors, []);
  });
});
