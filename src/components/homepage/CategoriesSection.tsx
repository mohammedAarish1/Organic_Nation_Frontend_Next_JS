"use client";

import { useRef } from "react";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import CategoryCard from "./CategoryCard";
import SectionHeader from "../common/SectionHeader";
import { ArrowButton } from "../buttons/ArrowButton";
import Link from "next/link";

// Main Component (now Client Component for scroll functionality)
export default function CategoriesSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340; // Card width + gap
      const newScrollPosition =
        direction === "left"
          ? scrollContainerRef.current.scrollLeft - scrollAmount
          : scrollContainerRef.current.scrollLeft + scrollAmount;

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // In your actual implementation, fetch this data from your API/database
  const categories = [
    {
      id: 1,
      name: "Pickles",
      slug: "homestyle-pickles",
      description: "Traditional homemade pickles",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/pickles.webp",

      productCount: 12,
      gradient: "from-amber-100 to-orange-100",
      hoverGradient: "from-amber-200 to-orange-200",
    },
    {
      id: 2,
      name: "Honey",
      slug: "organic-honey",
      description: "Pure raw organic honey",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/honey.webp",
      productCount: 4,
      gradient: "from-yellow-100 to-amber-100",
      hoverGradient: "from-yellow-200 to-amber-200",
    },
    {
      id: 3,
      name: "Oats",
      slug: "oats",
      description: "Wholesome organic oats",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oats.webp",
      productCount: 3,
      gradient: "from-amber-100 to-yellow-100",
      hoverGradient: "from-amber-200 to-yellow-200",
    },
    {
      id: 4,
      name: "Vegan",
      slug: "vegan",
      description: "Plant-based goodness",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/vegan.webp",
      productCount: 2,
      gradient: "from-green-100 to-teal-100",
      hoverGradient: "from-green-200 to-teal-200",
    },
    {
      id: 5,
      name: "Dips & Chutney",
      slug: "chutney-and-dip",
      description: "Flavorful chutneys & dips",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/chutney%26dip.webp",
      productCount: 5,
      gradient: "from-red-100 to-pink-100",
      hoverGradient: "from-red-200 to-pink-200",
    },
    {
      id: 6,
      name: "Organic Oils",
      slug: "organic-oils",
      description: "Cold-pressed organic oils",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/oils.webp",
      productCount: 3,
      gradient: "from-yellow-100 to-lime-100",
      hoverGradient: "from-yellow-200 to-lime-200",
    },
    // {
    //   id: 7,
    //   name: "Tea",
    //   slug: "organic-tea",
    //   description: "Premium organic teas",
    //   image:
    //     "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/tea.webp",
    //   productCount: 5,
    //   gradient: "from-emerald-100 to-green-100",
    //   hoverGradient: "from-emerald-200 to-green-200",
    // },
    {
      id: 8,
      name: "Seasonings & Herbs",
      slug: "seasonings-and-herbs",
      description: "Aromatic herbs & spices",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/seasonings.webp",
      productCount: 17,
      gradient: "from-green-100 to-emerald-100",
      hoverGradient: "from-green-200 to-emerald-200",
    },
    {
      id: 9,
      name: "Salt",
      slug: "salt",
      description: "Natural mineral salts",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/salt.webp",
      productCount: 5,
      gradient: "from-slate-100 to-gray-100",
      hoverGradient: "from-slate-200 to-gray-200",
    },
    {
      id: 10,
      name: "Sweeteners",
      slug: "sweeteners",
      description: "Natural sweeteners",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/sweeteners.webp",
      productCount: 4,
      gradient: "from-purple-100 to-pink-100",
      hoverGradient: "from-purple-200 to-pink-200",
    },
    {
      id: 11,
      name: "Fruit Preserves",
      slug: "fruit-preserves",
      description: "Delicious fruit preserves",
      image:
        "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/fruit_preserves.webp",
      productCount: 5,
      gradient: "from-pink-100 to-rose-100",
      hoverGradient: "from-pink-200 to-rose-200",
    },
    // {
    //   id: 12,
    //   name: "Breakfast Cereals",
    //   slug: "breakfast-cereals",
    //   description: "Healthy breakfast options",
    //   image:
    //     "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/breakfast_cereals.webp",
    //   productCount: 7,
    //   gradient: "from-orange-100 to-red-100",
    //   hoverGradient: "from-orange-200 to-red-200",
    // },
  ];

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-emerald-50/30 py-12 sm:py-16 lg:py-20">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute top-20 -left-20 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute -right-20 bottom-20 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subTitle="Browse by Category"
          title="Explore Our Range"
          content="From traditional pickles to pure honey, discover our carefully curated
        collection of organic products"
        />

        {/* Horizontal Scrollable Categories with Navigation Arrows */}
        <div className="relative">
          {/* Left Arrow */}

          <ArrowButton
            action={() => scroll("left")}
            disabled={false}
            className="group absolute top-1/2 left-0 z-20 -translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-300 hover:bg-amber-50 hover:shadow-xl sm:-translate-x-6 sm:p-3"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" color="black" />
          </ArrowButton>

          {/* Right Arrow */}

          <ArrowButton
            action={() => scroll("right")}
            disabled={false}
            className="group absolute top-1/2 right-0 z-20 translate-x-4 -translate-y-1/2 rounded-full border border-gray-200 bg-white p-2 shadow-lg transition-all duration-300 hover:bg-amber-50 hover:shadow-xl sm:translate-x-6 sm:p-3"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" color="black" />
          </ArrowButton>

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category, index) => (
              <div
                key={category.id}
                className="w-[280px] flex-none snap-start sm:w-[320px]"
              >
                <CategoryCard category={category} index={index} />
              </div>
            ))}
          </div>

          {/* Scroll Indicators */}
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 w-8 bg-linear-to-r from-emerald-50/50 to-transparent sm:w-12" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 w-8 bg-linear-to-l from-emerald-50/50 to-transparent sm:w-12" />
        </div>

        {/* View All Button */}
        <div className="mt-10 flex items-center justify-center sm:mt-12">
          <Link
            href="/shop/all"
            className="bg-gradient-btn flex cursor-pointer items-center justify-center gap-2 rounded-full px-8 py-4 font-semibold text-white shadow-xl transition-shadow hover:shadow-2xl"
          >
            View All Products <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
