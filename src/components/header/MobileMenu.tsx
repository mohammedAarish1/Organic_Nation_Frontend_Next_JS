"use client";

// components/header/MobileMenu.tsx
//
// ✅ Client boundary scoped to the mobile drawer only.
// Desktop users never download or execute this code path's state logic.
// The drawer state lives here — not in the global header — keeping rerenders local.

import { useState, useCallback, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { getCatogoriesWithImages } from "@/lib/utils";
import { useProducts } from "../providers/ProductsProvider";

const NAV_LINKS = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop/all" },
  { label: "About", path: "/about-us" },
  { label: "Contact", path: "/contact-us" },
] as const;

export const MobileMenu = memo(function MobileMenu() {
  const { categories } = useProducts();

  const [isOpen, setIsOpen] = useState(false);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
  const categoriesWithImages = getCatogoriesWithImages(categories);

  return (
    <>
      {/* Hamburger button — only renders on mobile (lg:hidden) */}
      <button
        className="p-2 lg:hidden"
        onClick={toggle}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <Menu className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22, ease: "easeInOut" }}
            className="fixed inset-x-0 top-20 border-t border-[#E8DCC4] bg-white lg:hidden"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="h-screen space-y-4 overflow-y-auto px-4 py-6">
              {NAV_LINKS.map((item) => (
                <Link
                  key={item.label}
                  href={item.path}
                  className="block py-2 font-semibold text-[#3E2723] hover:text-[#7A7D3F]"
                  onClick={close}
                >
                  {item.label}
                </Link>
              ))}

              {categoriesWithImages.length > 0 && (
                <div className="border-t border-[#E8DCC4] pt-2">
                  <p className="mb-3 text-sm font-bold text-[#3E2723]">
                    Categories
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {categoriesWithImages.map((category) => (
                      <Link
                        key={category.categoryUrl} // ✅ stable key
                        href={`/shop/${category.categoryUrl.toLowerCase()}`}
                        className="flex items-center gap-2 rounded-lg p-1 transition-colors hover:bg-[#F5F5DC]"
                        onClick={close}
                      >
                        <Image
                          src={category.image}
                          alt={category.category}
                          width={30}
                          height={30}
                          sizes="30px" // ✅ prevent oversized srcset fetches
                        />
                        <span className="text-xs font-semibold text-[#3E2723]">
                          {category.category}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
});
