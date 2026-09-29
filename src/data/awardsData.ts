export interface Award {
  id: string;
  title: string;
  contribution: string;
  organization: string;
  date: string;
  description: string;
  certificateHref: string;
}

// Dates and descriptions are drawn from the four distinct certificates in
// backup_v0/awards. Public PDFs contain only the certificate cover page.
export const awards: Award[] = [
  {
    id: "pi45",
    title: "Put Customers First",
    contribution: "CVE agent and customer demonstrations",
    organization: "OpenText",
    date: "12 February 2026",
    description:
      "Recognized for developing a CVE data-extraction agent for a Policy AI assistant prototype and contributing to customer demonstrations.",
    certificateHref: "/awards/award-pi45.pdf",
  },
  {
    id: "pi44",
    title: "Raise the Bar",
    contribution: "Raw-data sleeve visualization",
    organization: "OpenText",
    date: "25 July 2025",
    description:
      "Recognized for delivering sleeve visualization for raw datasets on time in the first sprint of PI44.",
    certificateHref: "/awards/award-pi44.pdf",
  },
  {
    id: "pi41",
    title: "Raise the Bar",
    contribution: "Dark mode, reporting and Azure backend",
    organization: "OpenText",
    date: "14 February 2025",
    description:
      "Recognized for dark mode support, license-consumption reporting, and quickly becoming productive on Azure backend work.",
    certificateHref: "/awards/award-pi41.pdf",
  },
  {
    id: "pi42",
    title: "Raise the Bar",
    contribution: "AWS and Azure network visualization",
    organization: "OpenText",
    date: "24 January 2025",
    description:
      "Recognized for implementing AWS and Azure network-test visualization on the geographical map and demonstrating working code for early feedback.",
    certificateHref: "/awards/award-pi42.pdf",
  },
];
