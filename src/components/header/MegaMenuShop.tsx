"use client";

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getCatogoriesWithImages } from "@/lib/utils"; // adjust to your actual type
import { useProducts } from "../providers/ProductsProvider";

// ✅ memo: if parent re-renders for any reason, skip re-render if props unchanged
export const MegaMenuShop = memo(function MegaMenuShop() {
  const { categories } = useProducts();
  const [isHovered, setIsHovered] = useState(false);

  const categoriesWithImages = getCatogoriesWithImages(categories);

  // ✅ useCallback: stable references so child motion.div never sees new props
  const handleEnter = useCallback(() => setIsHovered(true), []);
  const handleLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <Link href="/shop/all">
        <button
          className="group relative flex cursor-pointer items-center gap-1 font-medium text-gray-700 hover:text-amber-700"
          aria-haspopup="true"
          aria-expanded={isHovered}
        >
          Shop
          <ChevronDown
            className={`h-4 w-4 transition-transform duration-200 ${isHovered ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          <span
            className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#7A7D3F] transition-[width] duration-300 group-hover:w-full"
            aria-hidden="true"
          />
        </button>
      </Link>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full left-1/2 mt-2 w-[600px] -translate-x-1/2 rounded-2xl border border-[#E8DCC4] bg-white p-6 shadow-2xl"
            role="region"
            aria-label="Shop categories"
          >
            {categoriesWithImages.length > 0 && (
              <div className="grid grid-cols-3 gap-4">
                {categoriesWithImages.map((category, i) => (
                  <Link
                    key={category.categoryUrl} // ✅ stable key — not array index
                    href={`/shop/${category.categoryUrl.toLowerCase()}`}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      whileHover={{ x: 5, backgroundColor: "#F5F5DC" }}
                      className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all hover:shadow-md"
                    >
                      <Image
                        src={category.image}
                        alt={category.category}
                        width={40}
                        height={40}
                        // ✅ No priority here — mega menu is below the fold
                        // ✅ Explicit sizes stop Next.js from fetching oversized srcsets
                        sizes="40px"
                      />
                      <span className="text-sm font-medium text-[#3E2723]">
                        {category.category}
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            )}

            <div className="mt-4 border-t border-[#E8DCC4] pt-4">
              <Link
                href="/shop/all"
                className="flex items-center gap-2 font-semibold text-[#7A7D3F] transition-all hover:gap-3"
              >
                View All Products →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
