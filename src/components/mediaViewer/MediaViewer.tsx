"use client";

import { useEffect, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { MediaViewerProps, MediaItem } from "./types";
import Image from "next/image";

// ─────────────────────────────────────────────────────────────
// Sub-components (memoized to prevent unnecessary re-renders)
// ─────────────────────────────────────────────────────────────

interface MediaDisplayProps {
  item: MediaItem;
}

// Memoized — only re-renders when the active media item changes
const MediaDisplay = memo(({ item }: MediaDisplayProps) => {
  if (item.type === "image") {
    return (
      <Image
        src={item.src}
        alt={item.alt ?? "Media"}
        className="max-h-[85vh] max-w-[85vw] rounded-xl object-contain shadow-2xl ring-1 ring-white/10"
        // loading="eager"
        // decoding="async"
        width={1000}
        height={1000}
      />
    );
  }

  return (
    // key={src} forces a true remount when video src changes
    // preventing stale video state between navigation
    <video
      key={item.src}
      src={item.src}
      // controls
      autoPlay
      playsInline
      className="max-h-[85vh] max-w-[85vw] rounded-xl shadow-2xl ring-1 ring-white/10"
    />
  );
});
MediaDisplay.displayName = "MediaDisplay";

// ─────────────────────────────────────────────────────────────

interface ThumbnailStripProps {
  media: MediaItem[];
  activeIndex: number;
  onSelect: (i: number) => void;
}

// Memoized strip — re-renders only when activeIndex or media changes
const ThumbnailStrip = memo(
  ({ media, activeIndex, onSelect }: ThumbnailStripProps) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="absolute bottom-14 flex gap-2 overflow-x-auto px-4 py-1"
      onClick={(e) => e.stopPropagation()}
    >
      {media.map((item, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          aria-label={`View media ${i + 1}`}
          className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
            i === activeIndex
              ? "scale-110 border-orange-500"
              : "border-transparent opacity-50 hover:opacity-80"
          }`}
        >
          {item.type === "image" ? (
            <Image
              src={item.src}
              alt=""
              className="h-full w-full object-cover"
              loading="lazy"
              decoding="async"
              width={60}
              height={60}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-white/10 text-xs text-white">
              ▶ Video
            </div>
          )}
        </button>
      ))}
    </motion.div>
  ),
);
ThumbnailStrip.displayName = "ThumbnailStrip";

// ─────────────────────────────────────────────────────────────
// Main MediaViewer
// ─────────────────────────────────────────────────────────────

export default function MediaViewer({
  isOpen,
  onClose,
  media,
  activeIndex,
  onIndexChange,
}: MediaViewerProps) {
  const total = media.length;
  const current = media[activeIndex];

  const goPrev = useCallback(() => {
    onIndexChange((prev) => (prev === 0 ? total - 1 : prev - 1));
  }, [total, onIndexChange]);

  const goNext = useCallback(() => {
    onIndexChange((prev) => (prev === total - 1 ? 0 : prev + 1));
  }, [total, onIndexChange]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, goPrev, goNext, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Preload adjacent images for snappy navigation
  useEffect(() => {
    if (!isOpen || total <= 1) return;

    const preloadIndexes = [
      (activeIndex + 1) % total,
      (activeIndex - 1 + total) % total,
    ];

    preloadIndexes.forEach((i) => {
      const item = media[i];
      if (item?.type === "image") {
        const img = new window.Image();
        img.src = item.src;
      }
    });
  }, [activeIndex, isOpen, media, total]);

  return (
    <AnimatePresence>
      {isOpen && current && (
        // ── Backdrop ────────────────────────────────────────────
        <motion.div
          key="lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
        >
          {/* ── Close Button ──────────────────────────────────── */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.1 }}
            onClick={onClose}
            aria-label="Close viewer"
            className="absolute top-4 right-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-white/25"
          >
            <X size={20} />
          </motion.button>

          {/* ── Counter ───────────────────────────────────────── */}
          {total > 1 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              aria-live="polite"
              className="absolute top-4 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-white backdrop-blur-sm"
            >
              {activeIndex + 1} / {total}
            </motion.div>
          )}

          {/* ── Main Media ────────────────────────────────────── */}
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative flex max-h-[85vh] max-w-[85vw] items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <MediaDisplay item={current} />
          </motion.div>

          {/* ── Prev / Next ───────────────────────────────────── */}
          {total > 1 && (
            <>
              <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goPrev();
                }}
                aria-label="Previous media"
                className="absolute left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-white/25"
              >
                <ChevronLeft size={24} />
              </motion.button>

              <motion.button
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                onClick={(e) => {
                  e.stopPropagation();
                  goNext();
                }}
                aria-label="Next media"
                className="absolute right-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-sm transition hover:scale-110 hover:bg-white/25"
              >
                <ChevronRight size={24} />
              </motion.button>
            </>
          )}

          {/* ── Dot Indicators ────────────────────────────────── */}
          {total > 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-5 flex items-center gap-2"
              onClick={(e) => e.stopPropagation()}
            >
              {media.map((_, i) => (
                <button
                  key={i}
                  onClick={() => onIndexChange(i)}
                  aria-label={`Go to media ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "h-2.5 w-6 bg-orange-500"
                      : "h-2 w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </motion.div>
          )}

          {/* ── Thumbnail Strip ───────────────────────────────── */}
          {total > 1 && (
            <ThumbnailStrip
              media={media}
              activeIndex={activeIndex}
              onSelect={onIndexChange}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
