import AboutHero from "@/src/components/about/AboutHero";
import MilestonesTimeline from "@/src/components/about/MilestonesTimeline";
import OurStory from "@/src/components/about/OurStory";
import TeamSection from "@/src/components/about/TeamSection";
import ValuesGrid from "@/src/components/about/ValuesGrid";
import CTABanner from "@/src/components/home/CTABanner";
import StatsSection from "@/src/components/home/StatsSection";

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <OurStory />
      <ValuesGrid />
      <StatsSection />
      <MilestonesTimeline />
      <TeamSection />
      <CTABanner />
    </main>
  );
}