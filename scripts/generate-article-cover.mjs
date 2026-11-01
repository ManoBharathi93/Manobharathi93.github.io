import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

const output = fileURLToPath(
  new URL("../public/blog/transactional-outbox-cover.png", import.meta.url),
);

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><style>
  * { box-sizing: border-box; }
  body { margin: 0; width: 1200px; height: 627px; overflow: hidden; background: #f5f2eb; color: #19241f; font-family: Arial, Helvetica, sans-serif; }
  .canvas { position: relative; width: 1200px; height: 627px; padding: 55px 68px; background: radial-gradient(circle at 88% 18%, #e5eee7 0, transparent 31%), #f5f2eb; }
  .frame { position: absolute; inset: 25px; border: 1px solid #d9ddd5; }
  .eyebrow { color: #245c45; font-family: "Courier New", monospace; font-size: 15px; font-weight: 700; letter-spacing: .12em; text-transform: uppercase; }
  h1 { width: 620px; margin: 62px 0 15px; font: 500 56px/1.03 Georgia, "Times New Roman", serif; letter-spacing: -2px; }
  .dek { width: 570px; margin: 0; color: #526057; font-size: 21px; line-height: 1.45; }
  .diagram { position: absolute; right: 68px; top: 168px; width: 430px; padding: 24px; border: 1px solid #d9ddd5; border-radius: 14px; background: #fffefa; box-shadow: 0 18px 50px #1e31210d; }
  .node { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding: 16px 15px; border: 1px solid #ccd5ce; border-radius: 9px; background: #fffefa; }
  .node + .wire { height: 36px; display: flex; align-items: center; justify-content: center; color: #245c45; font: 700 11px "Courier New", monospace; letter-spacing: .1em; }
  .node strong { font-size: 14px; }
  .node span { color: #64716a; font: 11px "Courier New", monospace; }
  .database { border-color: #9cb8a4; background: #e5eee7; }
  .broker { border-color: #a4c1c9; background: #e5eef0; }
  .read { position: absolute; right: 80px; bottom: 76px; color: #245c45; font: 700 12px "Courier New", monospace; letter-spacing: .1em; }
  .footer { position: absolute; left: 68px; bottom: 58px; color: #64716a; font: 12px "Courier New", monospace; letter-spacing: .08em; }
  .footer strong { color: #19241f; }
</style></head><body><main class="canvas">
  <div class="frame"></div>
  <div class="eyebrow">Distributed systems · Field guide 01</div>
  <h1>The transaction ends at the database.</h1>
  <p class="dek">How the transactional outbox bridges a committed change and reliable event delivery.</p>
  <div class="diagram" aria-hidden="true">
    <div class="node"><strong>Payment service</strong><span>commit</span></div>
    <div class="wire">ONE DATABASE TRANSACTION ↓</div>
    <div class="node database"><strong>PostgreSQL</strong><span>state + outbox</span></div>
    <div class="wire">CDC / POLLING ↓</div>
    <div class="node broker"><strong>Kafka</strong><span>at-least-once</span></div>
  </div>
  <div class="footer"><strong>MANO BHARATHI M</strong> · BACKEND & DISTRIBUTED SYSTEMS</div>
  <div class="read">9 MIN READ ↗</div>
</main></body></html>`;

await mkdir(fileURLToPath(new URL("../public/blog/", import.meta.url)), {
  recursive: true,
});
const browser = await launchBrowser();
try {
  const page = await browser.newPage({
    viewport: { width: 1200, height: 627 },
    deviceScaleFactor: 1,
  });
  await page.setContent(html, { waitUntil: "load" });
  await page.screenshot({ path: output, type: "png" });
  await page.close();
  console.log(`Generated ${output}`);
} finally {
  await browser.close();
}
