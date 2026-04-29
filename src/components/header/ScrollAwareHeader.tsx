"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Props {
  children: React.ReactNode;
}

export function ScrollAwareHeader({ children }: Props) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // ✅  Passive listener — never blocks scroll jank
    const onScroll = () => setScrolled(window.scrollY > 20);

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []); // ← empty dep array: runs once, never re-subscribes

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className={`fixed top-0 z-30 w-full transition-[background-color,box-shadow] duration-300 ${
        scrolled ? "bg-white/98 shadow-lg backdrop-blur-md" : "bg-[#fffbeb]"
      }`}
      role="navigation"
      aria-label="Site header"
    >
      {/* children = server HTML — NOT re-rendered when `scrolled` changes */}
      {children}
    </motion.nav>
  );
}
