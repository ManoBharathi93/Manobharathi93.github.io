import Link from "next/link";
import { ResumeActions } from "@/components/ResumeActions";
import { getResume, resumeAwards, resumeEducation, resumeIdentity, resumeResearch, type ResumeVariantId } from "@/data/resumes";

const variantLinks: { id: ResumeVariantId; href: string; label: string }[] = [
  { id: "backend", href: "/resume", label: "Backend & distributed systems" },
  { id: "ai-infrastructure", href: "/resume/ai-infrastructure", label: "AI infrastructure & agents" },
];

export function ResumeView({ variant }: { variant: ResumeVariantId }) {
  const resume = getResume(variant);
  return (
    <div className="max-w-4xl mx-auto space-y-8 print:p-0 print:max-w-full">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-[var(--border)] pb-4 print:hidden">
        <div><h1 className="text-2xl font-bold">Resume</h1><p className="text-xs text-[var(--muted)]">Choose the version that matches the role.</p></div>
        <ResumeActions pdf={resume.pdf} />
      </div>
      <nav aria-label="Resume variants" className="flex flex-wrap gap-2 print:hidden">
        {variantLinks.map((link) => <Link key={link.id} href={link.href} aria-current={link.id === variant ? "page" : undefined} className={`rounded border px-3 py-2 text-xs font-semibold transition-colors ${link.id === variant ? "border-[var(--accent)] bg-[var(--muted-background)] text-[var(--foreground)]" : "border-[var(--border)] text-[var(--muted)] hover:text-[var(--foreground)]"}`}>{link.label}</Link>)}
      </nav>
      <article className="resume-sheet p-8 md:p-12 rounded border border-[var(--border)] bg-[var(--background)] shadow-sm print:border-none print:p-0 print:shadow-none space-y-7">
        <header className="text-center space-y-2 border-b border-[var(--border)] pb-5">
          <h2 className="text-3xl font-extrabold tracking-tight print:text-black">{resumeIdentity.name}</h2>
          <p className="text-sm font-semibold font-mono text-[var(--accent)] print:text-emerald-700">{resume.headline}</p>
          <p className="text-xs text-[var(--muted)] print:text-gray-600 font-mono"><a href={`mailto:${resumeIdentity.email}`} className="hover:underline">{resumeIdentity.email}</a> · {resumeIdentity.phone} · {resumeIdentity.location}</p>
          <p className="text-xs text-[var(--muted)] print:text-gray-600 font-mono"><a href={resumeIdentity.linkedinUrl} className="hover:underline">{resumeIdentity.linkedin}</a> · <a href={resumeIdentity.websiteUrl} className="hover:underline">{resumeIdentity.website}</a> · <a href={resumeIdentity.githubUrl} className="hover:underline">{resumeIdentity.github}</a></p>
        </header>
        <section className="space-y-2"><h3 className="resume-section-heading">Summary</h3><p className="text-xs leading-relaxed text-[var(--muted)] print:text-gray-800">{resume.summary}</p></section>
        <section className="space-y-4"><h3 className="resume-section-heading">Professional experience</h3>{resume.experience.map((role) => <div key={`${role.company}-${role.title}`} className="space-y-2"><div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1"><div><h4 className="font-bold text-sm">{role.title}</h4><p className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">{role.company} · {role.location}</p></div><p className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">{role.dates}</p></div><ul className="list-disc pl-4 text-xs text-[var(--muted)] print:text-gray-800 space-y-1">{role.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul></div>)}</section>
        <section className="space-y-3"><h3 className="resume-section-heading">Selected projects</h3>{resume.projects.map((project) => <div key={project.name} className="space-y-1"><a href={project.url} className="font-bold text-xs hover:underline">{project.name}</a><p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">{project.description}</p></div>)}</section>
        <section className="space-y-2"><h3 className="resume-section-heading">Technical skills</h3><div className="space-y-1 text-xs text-[var(--muted)] print:text-gray-800">{resume.skills.map(([label, values]) => <p key={label}><strong className="text-[var(--foreground)] print:text-black">{label}:</strong> {values}</p>)}</div></section>
        <section className="space-y-3"><h3 className="resume-section-heading">Education & research</h3><div><div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1"><h4 className="font-bold text-sm">{resumeEducation.degree}</h4><span className="text-[10px] font-mono text-[var(--muted)] print:text-gray-600">{resumeEducation.year}</span></div><p className="text-xs text-[var(--muted)] print:text-gray-800">{resumeEducation.institution} · {resumeEducation.detail}</p></div><div className="space-y-1"><a href={resumeResearch.url} className="font-bold text-xs hover:underline">{resumeResearch.name}</a><p className="text-xs font-semibold text-[var(--accent)] print:text-emerald-700">{resumeResearch.category}</p><p className="text-[11px] text-[var(--muted)] print:text-gray-800 leading-relaxed">{resumeResearch.description}</p></div></section>
        <section id="awards" className="space-y-3"><h3 className="resume-section-heading">Awards & recognition</h3><div className="grid gap-2 sm:grid-cols-2">{resumeAwards.map((award) => <a key={award.id} href={award.certificateHref} className="rounded border border-[var(--border)] p-2 hover:border-[var(--accent)]"><p className="text-xs font-bold">{award.contribution}</p><p className="text-[10px] text-[var(--accent)]">{award.title} ? {award.date}</p></a>)}</div></section>
      </article>
    </div>
  );
}
