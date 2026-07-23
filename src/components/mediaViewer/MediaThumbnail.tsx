"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { MediaThumbnailProps } from "./types";
import Image from "next/image";

const MediaThumbnail = memo(
  ({
    item,
    index,
    onClick,
    className = "",
    width = "w-24",
    height = "h-24",
    rounded = "rounded-lg",
    showPlayIcon = true,
    overlayClassName = "",
  }: MediaThumbnailProps) => {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onClick(index)}
        role="button"
        tabIndex={0}
        // Keyboard accessibility
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onClick(index);
        }}
        aria-label={`Open ${item.type} ${index + 1}`}
        className={`relative shrink-0 cursor-pointer overflow-hidden ${width} ${height} ${rounded} ${className}`}
      >
        {/* ── Image ─────────────────────────────────────────── */}
        {item.type === "image" && (
          <Image
            src={item.src}
            alt={item.alt ?? `Image ${index + 1}`}
            className="object-cover transition-transform duration-300"
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            width={500}
            height={500}
          />
        )}

        {/* ── Video ─────────────────────────────────────────── */}
        {item.type === "video" && (
          <div className="relative h-full w-full bg-gray-900">
            {/*
             * preload="metadata" fetches only the first frame +
             * duration — much lighter than preload="auto"
             */}
            <video
              src={item.src}
              className="h-full w-full object-cover"
              muted
              playsInline
              preload="metadata"
            />
            {showPlayIcon && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                  <Play size={18} fill="white" color="white" />
                </div>
                <span className="mt-1 text-xs font-medium text-white/80">
                  Video
                </span>
              </div>
            )}
          </div>
        )}

        {/* ── Hover Overlay ─────────────────────────────────── */}
        <div
          className={`absolute inset-0 bg-black/0 transition-all duration-200 hover:bg-black/20 ${overlayClassName}`}
        />
      </motion.div>
    );
  },
);

MediaThumbnail.displayName = "MediaThumbnail";

export default MediaThumbnail;
