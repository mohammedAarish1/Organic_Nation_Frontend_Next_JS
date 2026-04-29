"use client";

import { motion, useInView } from "framer-motion";
import { FloatingBackground } from "../animations/animation2";

// Hero Banner Component
const HeroBanner = () => {
  return (
    <section className="relative h-[60vh] w-full overflow-hidden bg-gradient-to-br from-amber-600 via-orange-500 to-red-600">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40" />

      {/* Animated Background Pattern */}
      <FloatingBackground />

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-4 inline-block rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm"
        >
          <span className="text-sm font-semibold">🌿 Est. 2019</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6 text-5xl font-bold drop-shadow-2xl sm:text-6xl lg:text-7xl"
        >
          Our Story
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-6 h-1 w-24 bg-white"
        />

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-2xl text-lg drop-shadow-lg sm:text-xl"
        >
          Rooted in tradition. Committed to purity. Dedicated to sustainability.
        </motion.p>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          className="w-full"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
};

export default HeroBanner;
