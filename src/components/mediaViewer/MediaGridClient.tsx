"use client";

import { useState, useCallback, memo } from "react";
import MediaThumbnail from "./MediaThumbnail";
import MediaViewer from "./MediaViewer";
import type { MediaItem } from "./types";

interface MediaGridClientProps {
  media: MediaItem[];
  thumbnailWidth?: string;
  thumbnailHeight?: string;
  thumbnailRounded?: string;
  thumbnailClassName?: string;
  overlayClassName?: string;
  showPlayIcon?: boolean;
  gridClassName?: string;
}

// memo — prevents re-render if parent re-renders with same props
const MediaGridClient = memo(
  ({
    media,
    thumbnailWidth,
    thumbnailHeight,
    thumbnailRounded,
    thumbnailClassName,
    overlayClassName,
    showPlayIcon,
    gridClassName = "flex flex-wrap gap-3",
  }: MediaGridClientProps) => {
    const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
    const [activeIndex, setActiveIndex] = useState<number>(0);

    // useCallback — stable reference, prevents child re-renders
    const openLightbox = useCallback((index: number) => {
      setActiveIndex(index);
      setLightboxOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
      setLightboxOpen(false);
    }, []);

    return (
      <>
        {/* ── Thumbnail Grid ──────────────────────────────── */}
        <div className={gridClassName}>
          {media.map((item, idx) => (
            <MediaThumbnail
              key={`${item.src}-${idx}`} // stable key using src
              item={item}
              index={idx}
              onClick={openLightbox}
              width={thumbnailWidth}
              height={thumbnailHeight}
              rounded={thumbnailRounded}
              className={thumbnailClassName}
              overlayClassName={overlayClassName}
              showPlayIcon={showPlayIcon}
            />
          ))}
        </div>

        {/* ── Lightbox (lazy — only mounts when opened) ───── */}
        {lightboxOpen && (
          <MediaViewer
            isOpen={lightboxOpen}
            onClose={closeLightbox}
            media={media}
            activeIndex={activeIndex}
            onIndexChange={setActiveIndex}
          />
        )}
      </>
    );
  },
);

MediaGridClient.displayName = "MediaGridClient";

export default MediaGridClient;
