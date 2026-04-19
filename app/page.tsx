import { HomepageHero } from "@/components/homepage-hero";
import { HomepageMetrics } from "@/components/homepage-metrics";
import { HomepageRadar } from "@/components/homepage-radar";
import { HomepagePrinciples } from "@/components/homepage-principles";

export default function Home() {
  return (
    <>
      <HomepageHero />
      <HomepageMetrics />
      <HomepageRadar />
      <HomepagePrinciples />
    </>
  );
}
