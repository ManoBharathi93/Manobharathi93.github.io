import source from "../../content/resumes/variants.json";

export type ResumeVariantId = keyof typeof source.variants;
export const resumeIdentity = source.identity;
export const resumeEducation = source.education;
export const resumeResearch = source.research;
export const resumeAwards = source.awards;
export const resumes = source.variants;

export function getResume(variant: ResumeVariantId) {
  return resumes[variant];
}
