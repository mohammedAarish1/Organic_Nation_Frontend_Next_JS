"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";
import Image from "next/image";

const heroMedia = [
  // {
  //   type: "video",
  //   emoji: "🥗",
  //   gradient: "from-[#A8B575] to-[#7A7D3F]",
  //   src: "https://organicnationmages.s3.ap-south-1.amazonaws.com/product-detail-page-videos/women.mp4",

  // },
  {
    type: "image",
    emoji: "🥗",
    gradient: "from-[#A8B575] to-[#7A7D3F]",
    src: "https://organic-nation-product-images.s3.ap-south-1.amazonaws.com/products/Stuffed-Red-chilli-pickle/md/front.webp",
  },
];

export default function HeroImage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % heroMedia.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + heroMedia.length) % heroMedia.length);

  return (
    <>
      {/* Hero Image Slider */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative"
      >
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-3xl bg-white shadow-2xl"
            >
              <div
                className={`aspect-square bg-linear-to-br ${heroMedia[currentSlide].gradient} flex items-center justify-center text-[200px]`}
              >
                {heroMedia[currentSlide].type === "image" ? (
                  <img
                    src={heroMedia[currentSlide].src}
                    alt="product"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <video
                    src={heroMedia[currentSlide].src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute top-1/2 left-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
          >
            <ChevronLeft className="h-6 w-6 text-[#7A7D3F]" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm"
          >
            <ChevronRight className="h-6 w-6 text-[#7A7D3F]" />
          </motion.button>

          {/* Dots Indicator */}
          <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
            {heroMedia.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 w-2 rounded-full transition-all ${
                  i === currentSlide ? "w-8 bg-white" : "bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute -top-4 -left-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#8B4545] text-3xl shadow-xl"
        >
          🌿
        </motion.div>
        <motion.div
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -right-4 -bottom-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-[#E8DCC4] text-3xl shadow-xl"
        >
          🍃
        </motion.div>
      </motion.div>
    </>
  );
}
