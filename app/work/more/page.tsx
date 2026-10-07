import type { Metadata } from "next";
import { cookies } from "next/headers";
import { MORE_PROJECTS_COOKIE, hasAccess } from "@/lib/more-projects-auth";
import { MoreProjectsGate } from "@/components/more-projects-gate";
import { AiProjectGrid } from "@/components/ai-project-grid";

export const metadata: Metadata = {
  title: "More projects",
  robots: { index: false, follow: false },
};

/* Private area for the AI case studies and prototypes. Without the access
   cookie it shows the password prompt; content is never sent before unlock. */
export default async function MoreProjectsPage() {
  const cookieStore = await cookies();
  if (!hasAccess(cookieStore.get(MORE_PROJECTS_COOKIE)?.value)) {
    return <MoreProjectsGate />;
  }

  return (
    <div className="min-h-screen pb-16">
      <AiProjectGrid />
    </div>
  );
}
