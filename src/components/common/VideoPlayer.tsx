// "use client";

// import { useRef, useState, useEffect } from "react";

// export default function SmartVideo({
//   src,
//   poster,
//   blurDataURL,
//   autoPlay = false,
//   loop = false,
//   className = "",
// }) {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);

//   const [isPlaying, setIsPlaying] = useState(false);
//   const [isInView, setIsInView] = useState(false);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // 👁️ Viewport detection (lazy load trigger)
//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsInView(entry.isIntersecting);
//       },
//       { threshold: 0.5 },
//     );

//     if (containerRef.current) {
//       observer.observe(containerRef.current);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // 🎬 Auto play/pause based on viewport
//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (autoPlay && isInView) {
//       video.play().catch(() => {});
//       setIsPlaying(true);
//     } else if (autoPlay) {
//       video.pause();
//       setIsPlaying(false);
//     }
//   }, [autoPlay, isInView]);

//   // ▶️ Toggle play/pause
//   const togglePlay = () => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused) {
//       video.play();
//       setIsPlaying(true);
//     } else {
//       video.pause();
//       setIsPlaying(false);
//     }
//   };

//   return (
//     <div ref={containerRef} className={`group relative ${className}`}>

//       {/* 🎥 Video — always visible; poster shows before playback */}
//       <video
//         ref={videoRef}
//         className="h-auto w-full rounded-xl object-cover"  // ✅ Removed opacity toggle
//         loop={loop}
//         muted={autoPlay}
//         playsInline
//         preload="metadata"                  // ✅ Always preload metadata so poster shows
//         poster={poster}                     // ✅ Poster is shown until user hits play
//         onLoadedData={() => setIsLoaded(true)}
//         onClick={togglePlay}
//       >
//         {/* <source src={src} type="video/mp4" /> */}
//         <source src={`${src}#t=0.001`} type="video/mp4" />
//         <source src={src.replace(".mp4", ".webm")} type="video/webm" />
//       </video>

//       {/* ▶️ Play button — shown when paused (including on first load) */}
//       {!isPlaying && (
//         <button
//           onClick={togglePlay}
//           className="absolute inset-0 flex items-center justify-center"
//           aria-label="Play video"
//         >
//           <div className="rounded-full bg-black/60 px-5 py-1 cursor-pointer text-lg text-white backdrop-blur-sm transition hover:scale-105">
//             ▶
//           </div>
//         </button>
//       )}
//     </div>
//   );
// }

"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface VideoPlayerProps {
  /** S3 (or any remote) URL to the video file */
  src: string;
  /** Optional poster image shown before playback */
  poster?: string;
  /** Accessible label for the video (for screen-readers) */
  ariaLabel?: string;
  /** Additional classes applied to the outermost wrapper */
  className?: string;
  /** Whether the video should loop (default: false) */
  loop?: boolean;
  /** Whether the video should be muted (default: false) */
  muted?: boolean;
  /**
   * Preload strategy once the video enters the viewport (default: "metadata").
   * "none"     – no data fetched until user presses play.
   * "metadata" – fetches only duration / dimensions (~20 KB). Recommended.
   * "auto"     – browser decides how much to buffer. Use only above-the-fold.
   */
  preload?: "none" | "metadata" | "auto";
  /**
   * How many pixels BEFORE the video enters the viewport should the S3
   * request begin. Gives the browser a head-start so there's no perceived
   * loading delay. (default: 200)
   */
  rootMargin?: number;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-7 w-7 translate-x-0.5"
    aria-hidden="true"
  >
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
);

const PauseIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-7 w-7"
    aria-hidden="true"
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * VideoPlayer
 *
 * A fully accessible, performance-optimised video player for Next.js
 * specifically designed for videos hosted on AWS S3.
 *
 * Performance strategy
 * --------------------
 * 1. The `src` is withheld from the <video> element on mount.
 *    → Zero S3 network requests for off-screen videos on page load.
 *
 * 2. An IntersectionObserver watches the wrapper div.
 *    → When the player is `rootMargin`px away from the viewport, the S3
 *      URL is injected and `preload="metadata"` kicks in.
 *    → By the time the user sees the player, the browser already has the
 *      video metadata (duration, dimensions) — no perceived loading delay.
 *
 * 3. The observer disconnects immediately after firing (observe-once).
 *    → No ongoing observer overhead after the src is loaded.
 *
 * 4. All event listeners are cleaned up on unmount.
 *    → No memory leaks.
 *
 * Usage
 * -----
 * ```tsx
 * <VideoPlayer
 *   src="https://your-bucket.s3.amazonaws.com/videos/demo.mp4"
 *   poster="https://your-bucket.s3.amazonaws.com/posters/demo.jpg"
 *   ariaLabel="Product showcase video"
 *   className="rounded-2xl"
 * />
 * ```
 */
export default function VideoPlayer({
  src,
  poster,
  ariaLabel = "Video player",
  className = "",
  loop = false,
  muted = false,
  preload = "metadata",
  rootMargin = 200,
}: VideoPlayerProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // ── Lazy-load gate ───────────────────────────────────────────────────────
  // `shouldLoad` flips to true when the wrapper enters the expanded viewport.
  // Until then, the <video> has no src → zero S3 requests.
  const [shouldLoad, setShouldLoad] = useState(false);

  // ── Playback state ───────────────────────────────────────────────────────
  const [isPlaying, setIsPlaying] = useState(false);

  // ── 1. Intersection Observer — inject S3 src when near viewport ──────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    // If IntersectionObserver is unavailable (very old browsers / SSR edge),
    // fall back to loading immediately so the video still works.
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true); // inject src → browser starts S3 fetch
          observer.disconnect(); // observe-once; no further overhead
        }
      },
      // rootMargin expands the "virtual viewport" so the fetch begins
      // before the element is actually visible to the user.
      { rootMargin: `${rootMargin}px` },
    );

    observer.observe(wrapper);

    return () => observer.disconnect();
  }, [rootMargin]);

  // ── 2. Sync React state with native video events ─────────────────────────
  // Handles edge-cases: browser autoplay policy blocks, external .play() calls,
  // video reaching its end, etc.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("ended", handleEnded);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  // ── 3. Toggle play / pause ───────────────────────────────────────────────
  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused || video.ended) {
      video.play().catch(() => {
        // Browser blocked autoplay — state stays paused, no crash.
      });
    } else {
      video.pause();
    }
  }, []);

  // ── 4. Keyboard handler (Space / Enter) ──────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlayback();
      }
    },
    [togglePlayback],
  );

  // ─────────────────────────────────────────────────────────────────────────

  return (
    <div
      ref={wrapperRef} // watched by IntersectionObserver
      className={`group relative w-full overflow-hidden bg-black ${className}`}
      role="region"
      aria-label={ariaLabel}
    >
      {/* ── Native video element ──────────────────────────────────────────
          src is undefined until shouldLoad flips — no S3 request until then.
          preload is forced to "none" while waiting to avoid any prefetch.   */}
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        loop={loop}
        muted={muted}
        preload={shouldLoad ? preload : "none"}
        playsInline
        controls={false}
        className="h-full w-full object-cover"
        aria-label={ariaLabel}
      />

      {/* ── Click / keyboard overlay ──────────────────────────────────────
          Covers the full player area so the user can click anywhere.        */}
      <div
        role="button"
        tabIndex={0}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        aria-pressed={isPlaying}
        onClick={togglePlayback}
        onKeyDown={handleKeyDown}
        className="absolute inset-0 flex cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
      >
        {/* ── Play / Pause button ────────────────────────────────────────
            • Paused  → fully visible play button
            • Playing → invisible at rest; fades in on hover via group-hover */}
        <span
          className={[
            "flex items-center justify-center rounded-full",
            "h-16 w-16",
            "bg-white/20 ring-1 ring-white/30 backdrop-blur-sm",
            "text-white shadow-xl",
            "transition-all duration-300 ease-out",
            isPlaying
              ? "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
              : "scale-100 opacity-100",
          ].join(" ")}
        >
          {isPlaying ? <PauseIcon /> : <PlayIcon />}
        </span>
      </div>
    </div>
  );
}
