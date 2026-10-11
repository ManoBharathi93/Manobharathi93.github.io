import type { Metadata } from "next";
import { ResumeView } from "@/components/ResumeView";

export const metadata: Metadata = { title: "AI Infrastructure & Agent Engineering Resume", description: "AI infrastructure and agent engineering resume for Mano Bharathi M." };

export default function AiInfrastructureResumePage() {
  return <ResumeView variant="ai-infrastructure" />;
}
