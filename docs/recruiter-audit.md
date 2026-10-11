# Recruiter-facing portfolio audit

Reviewed 11 October 2026. This note records the state of the checked-out portfolio and the changes made in response to the recruiter-shortlisting brief.

## Five issues that most affected quick comprehension

1. **The homepage gave six projects equal weight.** A recruiter could not tell which work best represents backend, systems, or AI-engineering fit. The homepage now highlights Capability Runner, SyncStream, and the dynamic-retrieval experiment; the complete set remains on `/projects`.
2. **One resume tried to serve different roles.** Backend/data and AI-agent evidence appeared together without a role-specific entry point. The site now provides a backend/distributed-systems resume and an AI-infrastructure/agent-engineering resume from one shared fact source.
3. **The old downloadable PDF was hand-maintained separately from the HTML resume.** It had compact content and extraction showed nonstandard bullet/dash characters. Both new PDFs are generated from `content/resumes/variants.json` with selectable text and direct links.
4. **Several strong metrics lacked enough context at a glance.** The agent numbers are described as a staged evaluation; the CVE percentage is explicitly an estimate of manual triage effort; the research energy comparison is identified as estimated against an extrapolated baseline.
5. **Evidence is uneven across projects.** Capability Runner and SyncStream have public source; Ticketless source availability should be checked before relying on the current GitHub link. Project pages distinguish prototype/demo evidence from deployment or benchmark evidence.

## Claims retained with qualifications

- **OpenText title and dates:** Associate Software Developer, Oct 2024–Present; Software Engineering Intern, Apr–Sep 2024. Confirmed in the current portfolio/resume content.
- **Cloud-connectivity capacity:** 55 to 165 supported inter-region connections, without a database schema migration. This is capacity, not a general throughput or latency claim.
- **Dual-memory agent:** agent metrics are from a staged evaluation. The baseline, number/type of cases, and latency statistic are still not documented publicly.
- **CVE workflow:** approximately 60% is an estimate of manual triage effort, not a timed benchmark.
- **Research:** the energy comparison must retain its estimated/extrapolated method. Do not turn it into a directly measured production-energy claim.

## Evidence that would strengthen recruiter confidence

- A short public case-study note for each flagship project with a reproducible command, a screenshot or artifact, and the boundary of the demonstration.
- A written evaluation note for the dual-memory agent identifying baseline, case set, sample size, and how latency was summarized.
- A public-safe description of the user's own contribution to collaborative research and any results that were directly measured rather than estimated.
- Public accessibility confirmation for Ticketless or removal of its source link if it is private/unavailable.
- A benchmark script and raw result file for SyncStream if throughput/recovery claims are added later.

## Maintenance

Edit `content/resumes/variants.json` for shared resume facts. Run `npm run resume:pdf` to regenerate both PDFs and the editable FlowCV-style Markdown files in `docs/`. Recheck the PDFs after every factual edit. The portfolio is configured for static export and GitHub Pages through `.github/workflows/deploy.yml`.

No deployment or push is part of this review.
