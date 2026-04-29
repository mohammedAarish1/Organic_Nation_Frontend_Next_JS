"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
export function ArrowButton({
  children,
  action = () => {},
  disabled = true,
  className = "",
}: {
  children: ReactNode;
  action: () => void;
  disabled: boolean;
  className?: string;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.1, x: -3 }}
      whileTap={{ scale: 0.9 }}
      onClick={action}
      aria-label="Previous Categories"
      disabled={disabled}
      className={className}
    >
      {children}
    </motion.button>
  );
}
