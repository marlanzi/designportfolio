import { HomepageHero } from "@/components/homepage-hero";
import { ProjectGrid } from "@/components/project-grid";
import {
  AboutPreview,
  AllWorkLink,
  DesignEngineering,
  HomepageStatement,
  HowIThink,
} from "@/components/homepage-sections";

export default function Home() {
  return (
    <>
      <HomepageHero />
      <ProjectGrid />
      <AllWorkLink />
      <HomepageStatement />
      <HowIThink />
      <DesignEngineering />
      <AboutPreview />
    </>
  );
}
