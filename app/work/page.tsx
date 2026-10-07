import { ProjectGrid } from "@/components/project-grid";
import { ALL_PROJECTS } from "@/lib/projects";

export default function WorkPage() {
  return (
    <div className="min-h-screen pb-16">
      <ProjectGrid
        as="h1"
        items={ALL_PROJECTS}
        subtitle="Complex products, made clearer — across fintech, enterprise platforms and consumer experiences."
        topSpacing="pt-36 lg:pt-44"
      />
    </div>
  );
}
