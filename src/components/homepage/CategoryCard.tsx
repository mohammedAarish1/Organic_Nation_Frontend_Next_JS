"use client";

import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CategoryCard({
  category,
  index,
}: {
  category: any;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);
  // const [isHovered, setIsHovered] = useState(false);
  return (
    <Link
      href={`/shop/${category.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-2xl"
      style={{
        animation: `fadeInScale 0.6s ease-out ${index * 0.05}s both`,
      }}
      // onMouseEnter={() => setIsHovered(true)}
      // onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div
        className={`relative aspect-4/3 overflow-hidden bg-linear-to-br ${category.gradient} transition-all duration-500`}
      >
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-gray-200 to-gray-300" />
        )}

        {/* Category Image */}
        <div className="absolute inset-0 flex items-center justify-center p-2">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className={`w-full object-contain transition-all duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } `}
            // onLoadingComplete={() => setImageLoaded(true)}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Gradient Overlay on Hover */}
        <div
          className={`absolute inset-0 bg-linear-to-t from-black/30 to-transparent opacity-0 transition-opacity duration-300`}
        />

        {/* Product Count Badge */}
        {/* <div className="absolute top-3 right-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-gray-700 shadow-md backdrop-blur-sm">
          {category.productCount}+ items
        </div> */}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="text-secondary mb-1 text-lg font-bold transition-colors group-hover:text-amber-700 sm:text-xl">
          {category.name}
        </h3>
        <p className="text-muted mb-4 text-sm">{category.description}</p>

        {/* Shop Now Link */}
        <div className="text-primary mt-auto flex items-center gap-2 text-sm font-semibold">
          <span className="transition-colors group-hover:text-red-700">
            Shop Now
          </span>
          <ArrowRight className={`h-4 w-4 transition-all`} />
        </div>
      </div>

      {/* Hover Border Effect */}
      <div
        className={`border-primary absolute inset-0 rounded-2xl border-2 opacity-0 transition-opacity duration-300`}
      />
    </Link>
  );
}
