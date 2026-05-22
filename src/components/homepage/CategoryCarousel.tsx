"use client";

import { useState, useRef, useEffect, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

import { ArrowButton } from "../buttons/ArrowButton";
import SectionHeader from "../common/SectionHeader";
import { getCatogoriesWithImages } from "../../lib/utils";
import { useProducts } from "../providers/ProductsProvider";

interface CategoryCardProps {
  item: ReturnType<typeof getCatogoriesWithImages>[number];
}

const CategoryCard = memo(function CategoryCard({ item }: CategoryCardProps) {
  return (
    <Link
      href={`/shop/${item.categoryUrl.toLowerCase()}`}
      key={item.category}
      className="group relative flex shrink-0 snap-center flex-col items-center"
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="relative"
      >
        {/* Gradient glow — CSS opacity transition, no framer state needed */}
        <div
          className={`absolute -inset-2 -z-10 rounded-full bg-gradient-to-br ${item.gradient} opacity-0 blur-xl transition-opacity duration-300 hover:opacity-100`}
          aria-hidden="true"
        />

        {/* Category circle */}
        <div
          className={`relative flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-amber-400 bg-white shadow-lg transition-all duration-300 hover:border-amber-600 hover:shadow-2xl sm:h-24 sm:w-24 md:h-28 md:w-28`}
        >
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
            <Image
              src={item.image}
              alt={`${item.category} category`}
              fill
              sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
              className="w-auto object-contain"
              loading="lazy"
            />
          </div>
        </div>
      </motion.div>

      {/* Category name */}
      <span className="text-primary mt-3 max-w-20 text-center text-sm font-medium underline-offset-4 hover:underline">
        {item.category}
      </span>

      {/* Hover underline — pure CSS, no state read from parent */}
      {/* <div
        className={`mt-1 h-0.5 w-12 rounded-full bg-gradient-to-r from-amber-600 to-red-600 transition-transform duration-300 origin-center  `}
        aria-hidden="true"
      /> */}
    </Link>
  );
});

// ─────────────────────────────────────────────────────────────────────────────
// CategoryCarousel
// ─────────────────────────────────────────────────────────────────────────────
export default function CategoryCarousel() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const { categories: categoryList } = useProducts();

  // ✅ Memoised: getCatogoriesWithImages only re-runs when categoryList changes
  const categories = useMemo(
    () => getCatogoriesWithImages(categoryList),
    [categoryList],
  );

  // ✅ Stable reference — never recreated between renders
  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container) return;
    setShowLeftArrow(container.scrollLeft > 0);
    setShowRightArrow(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 10,
    );
  }, []); // scrollRef is a stable ref object — safe to omit from deps

  // ✅ Stable reference, correct primitive type `string` (not `String`)
  const scroll = useCallback((direction: "left" | "right") => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollTo({
      left: container.scrollLeft + (direction === "left" ? -280 : 280),
      behavior: "smooth",
    });
  }, []);

  const scrollLeft = useCallback(() => scroll("left"), [scroll]);
  const scrollRight = useCallback(() => scroll("right"), [scroll]);

  // Seed arrow visibility on mount
  useEffect(() => {
    handleScroll();
  }, [handleScroll]);

  return (
    <section className="relative overflow-hidden py-12 sm:py-16">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader subTitle="" title="Shop by Category" content="" />

        <div className="relative flex items-center gap-2 sm:gap-4">
          {/* Left arrow */}
          <ArrowButton
            action={scrollLeft}
            disabled={!showLeftArrow}
            className={`z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 sm:h-12 sm:w-12 ${
              showLeftArrow
                ? "text-amber-700 hover:bg-amber-50"
                : "cursor-not-allowed text-gray-300 opacity-50"
            }`}
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
          </ArrowButton>

          {/* Scrollable track */}
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 sm:gap-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            role="list"
            aria-label="Product categories"
          >
            {categories?.map((item) => (
              // ✅ Stable key (category name), not array index
              // ✅ memo'd card — zero sibling re-renders on hover
              <CategoryCard key={item.category} item={item} />
            ))}
          </div>

          {/* Right arrow */}
          <ArrowButton
            action={scrollRight}
            disabled={!showRightArrow}
            className={`z-20 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white shadow-lg transition-all duration-200 sm:h-12 sm:w-12 ${
              showRightArrow
                ? "text-amber-700 hover:bg-amber-50"
                : "cursor-not-allowed text-gray-300 opacity-50"
            }`}
          >
            <ChevronRight
              className="h-5 w-5 sm:h-6 sm:w-6"
              aria-hidden="true"
            />
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
