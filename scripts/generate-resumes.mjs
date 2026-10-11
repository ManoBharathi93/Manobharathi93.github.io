import { mkdir, readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { launchBrowser } from "./browser.mjs";

const root = new URL("../", import.meta.url);
const source = JSON.parse(await readFile(new URL("content/resumes/variants.json", root), "utf8"));
const publicDirectory = new URL("public/", root);
const docsDirectory = new URL("docs/", root);

function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

function link(url, label) {
  return `<a href="${escapeHtml(url)}">${escapeHtml(label)}</a>`;
}

function documentHtml(variant) {
  const { identity, education, research } = source;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(identity.name)} | ${escapeHtml(variant.label)}</title><style>
    @page { size: A4; margin: 11mm 13mm; }
    * { box-sizing: border-box; } body { margin: 0; color: #182124; font-family: Arial, Helvetica, sans-serif; font-size: 9.5pt; line-height: 1.22; } h1,h2,h3,p,ul { margin: 0; } h1 { font-size: 20pt; line-height: 1.1; } h2 { color: #176447; border-bottom: 1px solid #cfd8d3; font-size: 9.5pt; letter-spacing: .05em; margin: 7pt 0 3pt; padding-bottom: 1pt; text-transform: uppercase; } h3 { font-size: 9.5pt; } a { color: inherit; text-decoration: none; } .headline { color: #176447; font-weight: 700; margin-top: 2pt; } .contact { color: #485458; font-size: 8.5pt; margin-top: 1pt; } .role { break-inside: avoid; margin-top: 4pt; } .meta { color: #485458; font-size: 8.5pt; margin-top: 1pt; } ul { margin-top: 2pt; padding-left: 13pt; } li + li { margin-top: 1pt; } .project { break-inside: avoid; margin-top: 3pt; } .project p { margin-top: 1pt; } .skills p + p { margin-top: 1pt; } .research { margin-top: 3pt; }
    section { break-inside: avoid; }</style></head><body><header><h1>${escapeHtml(identity.name)}</h1><p class="headline">${escapeHtml(variant.headline)}</p><p class="contact">${link(`mailto:${identity.email}`, identity.email)} | ${link(`tel:${identity.phone.replaceAll(" ", "")}`, identity.phone)} | ${escapeHtml(identity.location)}</p><p class="contact">${link(identity.linkedinUrl, identity.linkedin)} | ${link(identity.websiteUrl, identity.website)} | ${link(identity.githubUrl, identity.github)}</p></header>
  <section><h2>Summary</h2><p>${escapeHtml(variant.summary)}</p></section>
  <section><h2>Professional Experience</h2>${variant.experience.map((role) => `<div class="role"><h3>${escapeHtml(role.title)} | ${escapeHtml(role.company)}</h3><p class="meta">${escapeHtml(role.dates)} | ${escapeHtml(role.location)}</p><ul>${role.bullets.map((bullet) => `<li>${escapeHtml(bullet)}</li>`).join("")}</ul></div>`).join("")}</section>
  <section><h2>Selected Projects</h2>${variant.projects.map((project) => `<div class="project"><h3>${link(project.url, project.name)}</h3><p>${escapeHtml(project.description)}</p></div>`).join("")}</section>
  <section><h2>Technical Skills</h2><div class="skills">${variant.skills.map(([label, values]) => `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(values)}</p>`).join("")}</div></section>
  <section><h2>Education & Research</h2><h3>${escapeHtml(education.degree)} | ${escapeHtml(education.year)}</h3><p>${escapeHtml(education.institution)} | ${escapeHtml(education.detail)}</p><div class="research"><h3>${link(research.url, research.name)}</h3><p class="meta">${escapeHtml(research.category)}</p><p>${escapeHtml(research.description)}</p></div></section>
  <section><h2>Awards & Recognition</h2><p>${source.awards.map((award) => `${link(award.certificateHref, award.contribution)} (${escapeHtml(award.title)}, ${escapeHtml(award.date)})`).join(" · ")}</p></section>
  </body></html>`;
}

function flowCv(variant) {
  const { identity, education, research } = source;
  return `# ${identity.name}\n\n${variant.headline}\n\n${identity.email} | ${identity.phone} | ${identity.location}\n\n[LinkedIn](${identity.linkedinUrl}) | [Portfolio](${identity.websiteUrl}) | [GitHub](${identity.githubUrl})\n\n## Summary\n\n${variant.summary}\n\n## Professional Experience\n\n${variant.experience.map((role) => `### ${role.title} | ${role.company}\n\n${role.dates} | ${role.location}\n\n${role.bullets.map((bullet) => `- ${bullet}`).join("\n")}`).join("\n\n")}\n\n## Selected Projects\n\n${variant.projects.map((project) => `### [${project.name}](${project.url})\n\n${project.description}`).join("\n\n")}\n\n## Technical Skills\n\n${variant.skills.map(([label, values]) => `**${label}:** ${values}`).join("\n\n")}\n\n## Education & Research\n\n### ${education.degree}\n\n${education.institution} | ${education.year} | ${education.detail}\n\n### [${research.name}](${research.url})\n\n${research.category}\n\n${research.description}\n\n## Awards & Recognition\n\n${source.awards.map((award) => `- [${award.contribution}](${award.certificateHref}) — ${award.title}, ${award.date}`).join("\n")}\n`;
}

const browser = await launchBrowser();
try {
  await mkdir(publicDirectory, { recursive: true });
  await mkdir(docsDirectory, { recursive: true });
  for (const [id, variant] of Object.entries(source.variants)) {
    const page = await browser.newPage();
    await page.setContent(documentHtml(variant), { waitUntil: "load" });
    await page.emulateMedia({ media: "print" });
    await page.pdf({ path: fileURLToPath(new URL(variant.pdf.slice(1), publicDirectory)), format: "A4", printBackground: true, tagged: true, outline: true });
    await page.close();
    await writeFile(new URL(`resume-${id}.md`, docsDirectory), flowCv(variant), "utf8");
  }
  console.log("Generated both PDFs and editable Markdown from content/resumes/variants.json.");
} finally {
  await browser.close();
}
