import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";

export const metadata: Metadata = {
  title: "Backend & Distributed Systems Resume",
  description: "Backend and distributed systems resume for Mano Bharathi M.",
};

export default function ResumePage() {
  return <ResumeView variant="backend" />;
}
