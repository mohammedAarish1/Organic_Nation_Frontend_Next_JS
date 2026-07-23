"use client";

import { useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ArrowButton } from "../buttons/ArrowButton";

interface ScrollableCarouselProps {
  children: React.ReactNode;
  scrollAmount?: number;
  className?: string;
}

export default function ArrowButtonWrapper({
  children,
  scrollAmount = 340,
  className = "",
}: ScrollableCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = useCallback(
    (direction: "left" | "right") => {
      if (!scrollContainerRef.current) return;
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    },
    [scrollAmount],
  );

  return (
    <div className="relative">
      {/* Left Arrow */}
      <ArrowButton
        action={() => scroll("left")}
        disabled={false}
        aria-label="Scroll left"
        className="group absolute top-1/2 left-0 z-20 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-300 hover:bg-amber-50 hover:shadow-xl sm:-translate-x-6 sm:p-3"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" color="black" />
      </ArrowButton>

      {/* Right Arrow */}
      <ArrowButton
        action={() => scroll("right")}
        disabled={false}
        aria-label="Scroll right"
        className="group absolute top-1/2 right-0 z-20 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-300 hover:bg-amber-50 hover:shadow-xl sm:translate-x-6 sm:p-3"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" color="black" />
      </ArrowButton>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className={`flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 py-8 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden ${className}`}
      >
        {children}
      </div>

      {/* Fade Indicators */}
      <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-8 bg-linear-to-r from-emerald-50/50 to-transparent sm:w-12" />
      <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-linear-to-l from-emerald-50/50 to-transparent sm:w-12" />
    </div>
  );
}
