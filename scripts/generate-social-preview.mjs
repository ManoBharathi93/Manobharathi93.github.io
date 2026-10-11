import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

const output = fileURLToPath(new URL("../public/preview.png", import.meta.url));

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  body { margin: 0; width: 1200px; height: 627px; overflow: hidden; background: #0f0f0e; color: #e3e3dd; font-family: Arial, Helvetica, sans-serif; }
  .canvas { position: relative; width: 1200px; height: 627px; padding: 58px 68px; background: radial-gradient(circle at 88% 10%, rgba(39, 136, 92, .22), transparent 27%), linear-gradient(135deg, #0f0f0e 0%, #151714 100%); }
  .frame { position: absolute; inset: 28px; border: 1px solid #343631; }
  .eyebrow { color: #75d3a3; font-family: "Courier New", monospace; font-size: 18px; font-weight: 700; letter-spacing: .1em; }
  h1 { max-width: 690px; margin: 72px 0 15px; font-size: 62px; letter-spacing: -2.6px; line-height: 1; }
  .role { color: #75d3a3; font-family: "Courier New", monospace; font-size: 24px; font-weight: 700; }
  .description { max-width: 650px; margin: 22px 0 0; color: #b9bdb5; font-size: 21px; line-height: 1.45; }
  .tags { display: flex; gap: 12px; margin-top: 38px; }
  .tag { border: 1px solid #3d443d; border-radius: 3px; color: #d8ddd4; font-family: "Courier New", monospace; font-size: 14px; letter-spacing: .04em; padding: 9px 12px; }
  .system { position: absolute; right: 73px; bottom: 74px; width: 285px; height: 240px; }
  .line { position: absolute; height: 1px; background: #386149; transform-origin: left center; opacity: .9; }
  .node { position: absolute; width: 14px; height: 14px; border: 2px solid #75d3a3; border-radius: 50%; background: #0f0f0e; box-shadow: 0 0 0 6px rgba(117, 211, 163, .06); }
  .n1 { left: 6px; top: 110px; } .n2 { left: 105px; top: 34px; } .n3 { left: 184px; top: 113px; } .n4 { left: 104px; top: 194px; } .n5 { left: 254px; top: 30px; }
  .l1 { left: 16px; top: 116px; width: 112px; transform: rotate(-37deg); } .l2 { left: 118px; top: 42px; width: 103px; transform: rotate(39deg); } .l3 { left: 114px; top: 48px; width: 148px; transform: rotate(-6deg); } .l4 { left: 16px; top: 120px; width: 118px; transform: rotate(39deg); }
  .url { position: absolute; bottom: 57px; left: 68px; color: #737b70; font-family: "Courier New", monospace; font-size: 15px; }
</style></head><body><main class="canvas">
  <div class="frame"></div>
  <div class="eyebrow">MB_CORE_LOG / PORTFOLIO</div>
  <h1>Mano Bharathi M</h1>
  <div class="role">SOFTWARE ENGINEER</div>
  <p class="description">Backend services, distributed systems, observability, and AI-agent workflows.</p>
  <div class="tags"><span class="tag">BACKEND</span><span class="tag">DISTRIBUTED SYSTEMS</span><span class="tag">AI WORKFLOWS</span></div>
  <div class="system" aria-hidden="true"><span class="line l1"></span><span class="line l2"></span><span class="line l3"></span><span class="line l4"></span><span class="node n1"></span><span class="node n2"></span><span class="node n3"></span><span class="node n4"></span><span class="node n5"></span></div>
  <div class="url">manobharathi93.github.io</div>
</main></body></html>`;

await mkdir(fileURLToPath(new URL("../public/", import.meta.url)), { recursive: true });
const browser = await launchBrowser();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 627 }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: output, type: "png" });
  await page.close();
  console.log(`Generated ${output}`);
} finally {
  await browser.close();
}
