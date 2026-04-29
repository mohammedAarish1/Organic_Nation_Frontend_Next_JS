"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import { ReactNode, useState } from "react";

// ─────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────

interface MotionWrapperProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

// ─────────────────────────────────────────────
// INTERNAL HELPER
// ─────────────────────────────────────────────

function LazyMotionWrapper({ children }: { children: ReactNode }) {
  return <LazyMotion features={domAnimation}>{children}</LazyMotion>;
}

// ─────────────────────────────────────────────
// 1. FADE IN (from below) — general sections
// Usage: Wrap any section/card to fade up on scroll
// ─────────────────────────────────────────────
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
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 2. FADE IN FROM LEFT — testimonials, feature rows
// Usage: <FadeInFromLeft delay={0.2}>...</FadeInFromLeft>
// ─────────────────────────────────────────────
export function FadeInFromLeft({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ opacity: 0, x: -60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 3. FADE IN FROM RIGHT — alternating feature sections
// Usage: <FadeInFromRight delay={0.2}>...</FadeInFromRight>
// ─────────────────────────────────────────────
export function FadeInFromRight({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ opacity: 0, x: 60 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 4. STAGGER CONTAINER — product grids, feature lists
// Wrap the grid container; wrap each child in <StaggerItem>
// Usage:
//   <StaggerContainer>
//     {products.map(p => <StaggerItem key={p.id}><ProductCard /></StaggerItem>)}
//   </StaggerContainer>
// ─────────────────────────────────────────────
export function StaggerContainer({
  children,
  className = "",
  staggerDelay = 0.1,
  delayChildren = 0.1,
}: StaggerContainerProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: staggerDelay, delayChildren },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// Child of StaggerContainer
export function StaggerItem({ children, className = "" }: MotionWrapperProps) {
  return (
    <m.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
      className={className}
    >
      {children}
    </m.div>
  );
}

// ─────────────────────────────────────────────
// 5. SCALE ON HOVER — product cards, CTA buttons
// Usage: <ScaleOnHover><ProductCard /></ScaleOnHover>
// ─────────────────────────────────────────────
export function ScaleOnHover({ children, className = "" }: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        whileHover={{ scale: 1.04, y: -6 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 6. PRESS (tap feedback) — Add to Cart / Buy Now buttons
// Usage: <PressEffect><button>Add to Cart</button></PressEffect>
// ─────────────────────────────────────────────
export function PressEffect({ children, className = "" }: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 7. IMAGE ZOOM ON HOVER — product image thumbnails
// Usage: <ImageZoom><img src={...} /></ImageZoom>
// Note: parent must have overflow-hidden
// ─────────────────────────────────────────────
export function ImageZoom({ children, className = "" }: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 8. SHIMMER REVEAL — hero headings, big text reveals
// Usage: <ShimmerReveal delay={0.2}><h1>Big Heading</h1></ShimmerReveal>
// ─────────────────────────────────────────────
export function ShimmerReveal({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ opacity: 0, filter: "blur(12px)", y: 20 }}
        whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 9. CLIP REVEAL — banners, sale announcements
// Animates a wipe/clip from left to right
// Usage: <ClipReveal delay={0.3}><Banner /></ClipReveal>
// ─────────────────────────────────────────────
export function ClipReveal({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true }}
        transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 10. ROTATE ON HOVER — icon buttons, logo marks
// Usage: <RotateOnHover><CartIcon /></RotateOnHover>
// ─────────────────────────────────────────────
export function RotateOnHover({
  children,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        whileHover={{ rotate: 360 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 11. BOUNCE IN — badges, notification dots, tags
// Usage: <BounceIn delay={0.4}><Badge>New</Badge></BounceIn>
// ─────────────────────────────────────────────
export function BounceIn({
  children,
  delay = 0,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{
          delay,
          type: "spring",
          stiffness: 500,
          damping: 20,
        }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 12. PULSE — "Live", "In Stock", attention badges
// Usage: <PulseDot /> or <PulseRing><div /></PulseRing>
// ─────────────────────────────────────────────
export function PulseRing({ children, className = "" }: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        animate={{ scale: [1, 1.08, 1], opacity: [1, 0.75, 1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 13. FLOAT — hero product images, feature illustrations
// Gentle infinite floating effect
// Usage: <FloatEffect><ProductImage /></FloatEffect>
// ─────────────────────────────────────────────
export function FloatEffect({ children, className = "" }: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 14. COUNTER ANIMATE — stats sections (orders, users, reviews)
// Animates a number from 0 to target value on scroll
// Usage: <AnimatedCounter from={0} to={1500} suffix="+" />
// ─────────────────────────────────────────────
export function AnimatedCounter({
  from = 0,
  to,
  suffix = "",
  duration = 1.8,
  className = "",
}: {
  from?: number;
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  return (
    <LazyMotionWrapper>
      <m.span
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <m.span>
          {/* Uses CSS counter trick via framer's useMotionValue if needed; 
              simple version animates via transition on display value */}
          <CounterInner
            from={from}
            to={to}
            suffix={suffix}
            duration={duration}
          />
        </m.span>
      </m.span>
    </LazyMotionWrapper>
  );
}

function CounterInner({
  from,
  to,
  suffix,
  duration,
}: {
  from: number;
  to: number;
  suffix: string;
  duration: number;
}) {
  // Client-only counter using useState + useEffect
  const [count, setCount] = useState(from);
  const [started, setStarted] = useState(false);

  return (
    <m.span
      onViewportEnter={() => {
        if (started) return;
        setStarted(true);
        const startTime = performance.now();
        const animate = (now: number) => {
          const elapsed = (now - startTime) / 1000;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease out cubic
          setCount(Math.floor(from + (to - from) * eased));
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </m.span>
  );
}

// ─────────────────────────────────────────────
// 15. DRAW LINE — dividers, underline reveals, decorative lines
// Animates an SVG line drawing itself
// Usage: <DrawLine width={200} />
// ─────────────────────────────────────────────
export function DrawLine({
  width = 200,
  color = "currentColor",
  strokeWidth = 2,
  delay = 0,
  className = "",
}: {
  width?: number;
  color?: string;
  strokeWidth?: number;
  delay?: number;
  className?: string;
}) {
  return (
    <LazyMotionWrapper>
      <m.svg
        width={width}
        height={strokeWidth + 4}
        viewBox={`0 0 ${width} ${strokeWidth + 4}`}
        className={className}
      >
        <m.line
          x1="0"
          y1={(strokeWidth + 4) / 2}
          x2={width}
          y2={(strokeWidth + 4) / 2}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay, duration: 0.8, ease: "easeOut" }}
        />
      </m.svg>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 16. PARALLAX SCROLL — hero backgrounds, decorative layers
// Usage: <ParallaxScroll speed={0.3}><BgImage /></ParallaxScroll>
// Note: speed between 0.1 (subtle) and 0.5 (dramatic)
// ─────────────────────────────────────────────
export function ParallaxScroll({
  children,
  speed = 0.2,
  className = "",
}: MotionWrapperProps & { speed?: number }) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ y: 0 }}
        whileInView={{ y: `-${speed * 100}px` }}
        viewport={{ once: false, amount: 0 }}
        transition={{ ease: "linear", duration: 0 }}
        style={{ willChange: "transform" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 17. SLIDE IN MODAL / DRAWER — cart drawer, filter panel
// Slides in from right edge
// Usage: <SlideInPanel isOpen={open}><CartDrawer /></SlideInPanel>
// ─────────────────────────────────────────────
export function SlideInPanel({
  children,
  isOpen,
  from = "right",
  className = "",
}: {
  children: ReactNode;
  isOpen: boolean;
  from?: "right" | "left" | "bottom";
  className?: string;
}) {
  const variants = {
    right: { open: { x: 0, opacity: 1 }, closed: { x: "100%", opacity: 0 } },
    left: { open: { x: 0, opacity: 1 }, closed: { x: "-100%", opacity: 0 } },
    bottom: { open: { y: 0, opacity: 1 }, closed: { y: "100%", opacity: 0 } },
  };

  return (
    <LazyMotionWrapper>
      <m.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={variants[from]}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 18. ACCORDION ITEM — FAQ, product details expand/collapse
// Usage:
//   <AccordionItem isOpen={open}>
//     <p>Expanded content</p>
//   </AccordionItem>
// ─────────────────────────────────────────────
export function AccordionItem({
  children,
  isOpen,
  className = "",
}: {
  children: ReactNode;
  isOpen: boolean;
  className?: string;
}) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: "hidden" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 19. ANIMATED BACKGROUND DOTS — hero sections
// Usage: <AnimatedBackground />  (absolute positioned, needs relative parent)
// ─────────────────────────────────────────────
export function AnimatedBackground() {
  return (
    <LazyMotionWrapper>
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
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

// ─────────────────────────────────────────────
// 20. FLOATING RINGS BACKGROUND — CTA sections, hero
// Usage: <FloatingBackground />  (absolute positioned)
// ─────────────────────────────────────────────
export function FloatingBackground() {
  return (
    <LazyMotionWrapper>
      <div className="pointer-events-none absolute inset-0 opacity-10">
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

export function FloatingBackground2() {
  return (
    <LazyMotionWrapper>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10" />
        {[...Array(12)].map((_, i) => (
          <m.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
            }}
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1000),
              y: Math.random() * 300,
            }}
            animate={{
              y: [null, Math.random() * 300],
              x: [
                null,
                Math.random() *
                  (typeof window !== "undefined" ? window.innerWidth : 1000),
              ],
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 21. ANIMATED GRID CONTAINER — original from your file (kept + improved)
// Usage: <AnimationGrid><Cards /></AnimationGrid>
// ─────────────────────────────────────────────
export function AnimationGrid({ children }: { children: ReactNode }) {
  return (
    <LazyMotionWrapper>
      <m.div
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.1 },
          },
        }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 22. MAGNETIC HOVER — nav links, icon buttons
// Creates a subtle magnet-pull effect on hover
// Usage: <MagneticHover><NavLink /></MagneticHover>
// ─────────────────────────────────────────────
export function MagneticHover({
  children,
  className = "",
}: MotionWrapperProps) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPos({
      x: (e.clientX - centerX) * 0.25,
      y: (e.clientY - centerY) * 0.25,
    });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  return (
    <LazyMotionWrapper>
      <m.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ x: pos.x, y: pos.y }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 23. TILT CARD — premium product cards, feature highlights
// 3D tilt on mouse move
// Usage: <TiltCard><ProductCard /></TiltCard>
// ─────────────────────────────────────────────
export function TiltCard({ children, className = "" }: MotionWrapperProps) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * 14;
    const y = -((e.clientX - rect.left) / rect.width - 0.5) * 14;
    setTilt({ x, y });
  };

  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <LazyMotionWrapper>
      <m.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{ rotateX: tilt.x, rotateY: tilt.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ transformStyle: "preserve-3d", perspective: 800 }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 24. SHAKE — error states, invalid form inputs
// Usage: <ShakeOnError trigger={hasError}><Input /></ShakeOnError>
// ─────────────────────────────────────────────
export function ShakeOnError({
  children,
  trigger,
  className = "",
}: {
  children: ReactNode;
  trigger: boolean;
  className?: string;
}) {
  return (
    <LazyMotionWrapper>
      <m.div
        animate={trigger ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}

// ─────────────────────────────────────────────
// 25. PAGE TRANSITION WRAPPER — wrap each page layout
// Usage: <PageTransition><YourPageContent /></PageTransition>
// ─────────────────────────────────────────────
export function PageTransition({
  children,
  className = "",
}: MotionWrapperProps) {
  return (
    <LazyMotionWrapper>
      <m.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </m.div>
    </LazyMotionWrapper>
  );
}
