import HeroText from "./server/HeroText";
import HeroImage from "./client/HeroImage";
import { AnimatedBackground } from "../animations/animation2";

export default function HeroSection() {
  return (
    <section className="bg-gradient-primary relative flex min-h-screen items-center overflow-hidden pt-12">
      {/* Animated Background */}
      <AnimatedBackground />
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-4 py-12 sm:px-6 sm:py-20 md:grid-cols-2 lg:px-8">
        {/* Hero Text */}
        <HeroText />
        {/* Hero Image Slider */}
        <HeroImage />
      </div>
    </section>
  );
}
