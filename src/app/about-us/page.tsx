import HeroBanner from "@/components/about-us/HeroBanner";
import IntroSection from "@/components/about-us/IntroSection";
import ValueSection from "@/components/about-us/ValueSection";
import ContentSections from "@/components/about-us/ContentSections";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-emerald-50/30 to-white">
      <HeroBanner />
      <IntroSection />
      <ValueSection />
      <ContentSections />
    </div>
  );
}
