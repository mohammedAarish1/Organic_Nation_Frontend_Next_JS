"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

// Animated Section Component
const AnimatedSection = ({ section, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div
      ref={ref}
      className={`overflow-hidden rounded-3xl ${
        index % 2 === 0
          ? "bg-gradient-to-br from-amber-50 to-orange-50"
          : "bg-gradient-to-br from-emerald-50 to-teal-50"
      } shadow-xl`}
    >
      <div
        className={`flex flex-col ${
          section.imageFirst ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        {/* Image */}
        <motion.div
          initial={{ opacity: 0, x: section.imageFirst ? 50 : -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="relative h-64 w-full overflow-hidden sm:h-80 lg:h-auto lg:w-1/2"
        >
          <div className="group h-full w-full">
            <Image
              src={section.imageSrc}
              alt={section.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: section.imageFirst ? -50 : 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex w-full flex-col justify-center p-6 sm:p-8 lg:w-1/2 lg:p-12"
        >
          <h3 className="text-secondary mb-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
            {section.title}
          </h3>
          <div className="mb-6 h-1 w-12 bg-gradient-to-r from-amber-600 to-orange-600" />
          <p className="mb-6 text-base leading-relaxed text-gray-700 sm:text-lg">
            {section.content}
          </p>

          {/* Decorative Element */}
          <div className="flex items-center gap-2 text-sm font-semibold text-amber-700">
            <span>Learn More</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AnimatedSection;
