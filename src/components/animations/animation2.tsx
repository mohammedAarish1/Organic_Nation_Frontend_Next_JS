"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode } from "react";

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

// Wrapper for all animation for lazy loading
function LazyMotionWrapper({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

// 1) Fade in animation
export function FadeInView({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// 2) Scale on hover animation
export function ScaleOnHover({ children, className = "" }: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        whileHover={{ scale: 1.05, y: -10 }}
        transition={{ duration: 0.3 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// 3) Rotate on hover animation
export function RotateOnHover({
  children,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.6 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// 4) Animated bacground
export function AnimationGrid({ children }: { children: ReactNode }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  return (
    <LazyMotionWrapper>
      <m.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

export function AnimatedBackground() {
  return (
    <LazyMotionWrapper>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <m.div
            key={i}
            className="absolute h-2 w-2 rounded-full bg-[#A8B575] opacity-20"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y:
                Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 1000),
            }}
            animate={{
              y: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerHeight : 1000),
              ],
              x: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
              ],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </LazyMotionWrapper>
  );
}

export function FloatingBackground() {
  return (
    <LazyMotionWrapper>
      <div className="absolute inset-0 opacity-10">
        {[...Array(10)].map((_, i) => (
          <m.div
            key={i}
            className="absolute h-24 w-24 rounded-full border-2 border-white sm:h-40 sm:w-40"
            initial={{ x: Math.random() * 1200, y: Math.random() * 600 }}
            animate={{
              y: [null, Math.random() * 600],
              x: [null, Math.random() * 1200],
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </LazyMotionWrapper>
  );
}
