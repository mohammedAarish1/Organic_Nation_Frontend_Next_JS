// No "use client" here intentionally:
// The grid shell (layout + data merging) runs on the SERVER.
// State (lightbox open/index) is isolated in a small client island.

import MediaGridClient from "./MediaGridClient";
import type { MediaGridProps, MediaItem } from "./types";

// ─────────────────────────────────────────────────────────────
// SERVER component — receives props, merges media, passes down
// ─────────────────────────────────────────────────────────────
export default function MediaGrid({
  images = [],
  videos = [],
  thumbnailWidth,
  thumbnailHeight,
  thumbnailRounded,
  thumbnailClassName,
  overlayClassName,
  showPlayIcon,
  gridClassName = "flex flex-wrap gap-3",
}: MediaGridProps) {
  // Merge on the server — no JS needed on the client for this
  const media: MediaItem[] = [
    ...images.map((src): MediaItem => ({ type: "image", src })),
    ...videos.map((src): MediaItem => ({ type: "video", src })),
  ];

  if (media.length === 0) return null;

  return (
    <MediaGridClient
      media={media}
      thumbnailWidth={thumbnailWidth}
      thumbnailHeight={thumbnailHeight}
      thumbnailRounded={thumbnailRounded}
      thumbnailClassName={thumbnailClassName}
      overlayClassName={overlayClassName}
      showPlayIcon={showPlayIcon}
      gridClassName={gridClassName}
    />
  );
}
