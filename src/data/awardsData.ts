import source from "../../content/resumes/variants.json";

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
export const awards: Award[] = source.awards;
