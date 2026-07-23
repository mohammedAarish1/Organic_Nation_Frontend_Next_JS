// "use client";

// import { useRef, useState, useCallback, useEffect } from "react";

// // ─── Types ────────────────────────────────────────────────────────────────────

// interface VideoPlayerProps {
//   /** S3 (or any remote) URL to the video file */
//   src: string;
//   /** Optional poster image shown before playback */
//   poster?: string;
//   /** Accessible label for the video (for screen-readers) */
//   ariaLabel?: string;
//   /** Additional classes applied to the outermost wrapper */
//   className?: string;
//   /** Whether the video should loop (default: false) */
//   loop?: boolean;
//   /** Whether the video should be muted (default: false) */
//   muted?: boolean;
//   /**
//    * Preload strategy once the video enters the viewport (default: "metadata").
//    * "none"     – no data fetched until user presses play.
//    * "metadata" – fetches only duration / dimensions (~20 KB). Recommended.
//    * "auto"     – browser decides how much to buffer. Use only above-the-fold.
//    */
//   preload?: "none" | "metadata" | "auto";
//   /**
//    * How many pixels BEFORE the video enters the viewport should the S3
//    * request begin. Gives the browser a head-start so there's no perceived
//    * loading delay. (default: 200)
//    */
//   rootMargin?: number;
// }

// // ─── Icons ────────────────────────────────────────────────────────────────────

// const PlayIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className="h-7 w-7 translate-x-0.5"
//     aria-hidden="true"
//   >
//     <path d="M8 5.14v14l11-7-11-7z" />
//   </svg>
// );

// const PauseIcon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 24 24"
//     fill="currentColor"
//     className="h-7 w-7"
//     aria-hidden="true"
//   >
//     <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
//   </svg>
// );

// // ─── Component ────────────────────────────────────────────────────────────────

// /**
//  * VideoPlayer
//  *
//  * A fully accessible, performance-optimised video player for Next.js
//  * specifically designed for videos hosted on AWS S3.
//  *
//  * Performance strategy
//  * --------------------
//  * 1. The `src` is withheld from the <video> element on mount.
//  *    → Zero S3 network requests for off-screen videos on page load.
//  *
//  * 2. An IntersectionObserver watches the wrapper div.
//  *    → When the player is `rootMargin`px away from the viewport, the S3
//  *      URL is injected and `preload="metadata"` kicks in.
//  *    → By the time the user sees the player, the browser already has the
//  *      video metadata (duration, dimensions) — no perceived loading delay.
//  *
//  * 3. The observer disconnects immediately after firing (observe-once).
//  *    → No ongoing observer overhead after the src is loaded.
//  *
//  * 4. All event listeners are cleaned up on unmount.
//  *    → No memory leaks.
//  *
//  * Usage
//  * -----
//  * ```tsx
//  * <VideoPlayer
//  *   src="https://your-bucket.s3.amazonaws.com/videos/demo.mp4"
//  *   poster="https://your-bucket.s3.amazonaws.com/posters/demo.jpg"
//  *   ariaLabel="Product showcase video"
//  *   className="rounded-2xl"
//  * />
//  * ```
//  */
// export default function VideoPlayer({
//   src,
//   poster,
//   ariaLabel = "Video player",
//   className = "",
//   loop = false,
//   muted = false,
//   preload = "metadata",
//   rootMargin = 200,
// }: VideoPlayerProps) {
//   const wrapperRef = useRef<HTMLDivElement>(null);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   // ── Lazy-load gate ───────────────────────────────────────────────────────
//   // `shouldLoad` flips to true when the wrapper enters the expanded viewport.
//   // Until then, the <video> has no src → zero S3 requests.
//   const [shouldLoad, setShouldLoad] = useState(false);

//   // ── Playback state ───────────────────────────────────────────────────────
//   const [isPlaying, setIsPlaying] = useState(false);

//   // ── 1. Intersection Observer — inject S3 src when near viewport ──────────
//   useEffect(() => {
//     const wrapper = wrapperRef.current;
//     if (!wrapper) return;

//     // If IntersectionObserver is unavailable (very old browsers / SSR edge),
//     // fall back to loading immediately so the video still works.
//     if (typeof IntersectionObserver === "undefined") {
//       setShouldLoad(true);
//       return;
//     }

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShouldLoad(true); // inject src → browser starts S3 fetch
//           observer.disconnect(); // observe-once; no further overhead
//         }
//       },
//       // rootMargin expands the "virtual viewport" so the fetch begins
//       // before the element is actually visible to the user.
//       { rootMargin: `${rootMargin}px` },
//     );

//     observer.observe(wrapper);

//     return () => observer.disconnect();
//   }, [rootMargin]);

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handlePlay = () => setIsPlaying(true);
//     const handlePause = () => setIsPlaying(false);
//     const handleEnded = () => setIsPlaying(false);

//     video.addEventListener("play", handlePlay);
//     video.addEventListener("pause", handlePause);
//     video.addEventListener("ended", handleEnded);

//     return () => {
//       video.removeEventListener("play", handlePlay);
//       video.removeEventListener("pause", handlePause);
//       video.removeEventListener("ended", handleEnded);
//     };
//   }, []);

//   // ── 3. Toggle play / pause ───────────────────────────────────────────────
//   const togglePlayback = useCallback(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     if (video.paused || video.ended) {
//       video.play().catch(() => {
//         // Browser blocked autoplay — state stays paused, no crash.
//       });
//     } else {
//       video.pause();
//     }
//   }, []);

//   // ── 4. Keyboard handler (Space / Enter) ──────────────────────────────────
//   const handleKeyDown = useCallback(
//     (e: React.KeyboardEvent<HTMLDivElement>) => {
//       if (e.key === " " || e.key === "Enter") {
//         e.preventDefault();
//         togglePlayback();
//       }
//     },
//     [togglePlayback],
//   );

//   // ─────────────────────────────────────────────────────────────────────────

//   return (
//     <div
//       ref={wrapperRef} // watched by IntersectionObserver
//       className={`group relative w-full overflow-hidden bg-black ${className}`}
//       role="region"
//       aria-label={ariaLabel}
//     >
//       {/* ── Native video element ──────────────────────────────────────────
//           src is undefined until shouldLoad flips — no S3 request until then.
//           preload is forced to "none" while waiting to avoid any prefetch.   */}
//       <video
//         ref={videoRef}
//         src={shouldLoad ? src : undefined}
//         poster={poster}
//         loop={loop}
//         muted={muted}
//         preload={shouldLoad ? preload : "none"}
//         playsInline
//         controls={false}
//         className="h-full w-full object-cover"
//         aria-label={ariaLabel}
//       />

//       {/* ── Click / keyboard overlay ──────────────────────────────────────
//           Covers the full player area so the user can click anywhere.        */}
//       <div
//         role="button"
//         tabIndex={0}
//         aria-label={isPlaying ? "Pause video" : "Play video"}
//         aria-pressed={isPlaying}
//         onClick={togglePlayback}
//         onKeyDown={handleKeyDown}
//         className="absolute inset-0 flex cursor-pointer items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2"
//       >
//         {/* ── Play / Pause button ────────────────────────────────────────
//             • Paused  → fully visible play button
//             • Playing → invisible at rest; fades in on hover via group-hover */}
//         <span
//           className={[
//             "flex items-center justify-center rounded-full",
//             "h-16 w-16",
//             "bg-white/20 ring-1 ring-white/30 backdrop-blur-sm",
//             "text-white shadow-xl",
//             "transition-all duration-300 ease-out",
//             isPlaying
//               ? "scale-75 opacity-0 group-hover:scale-100 group-hover:opacity-100"
//               : "scale-100 opacity-100",
//           ].join(" ")}
//         >
//           {isPlaying ? <PauseIcon /> : <PlayIcon />}
//         </span>
//       </div>
//     </div>
//   );
// }

"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface VideoPlayerProps {
  src: string;
  poster?: string;
  ariaLabel?: string;
  className?: string;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  rootMargin?: number;
}

// ─── Icons ────────────────────────────────────────────────────────────────────

const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5 translate-x-0.5"
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
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
  </svg>
);

const FullscreenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
  </svg>
);

const ExitFullscreenIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className="h-5 w-5"
    aria-hidden="true"
  >
    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
  </svg>
);

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTime(seconds: number): string {
  if (isNaN(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ─── Component ────────────────────────────────────────────────────────────────

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

  const [shouldLoad, setShouldLoad] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Progress state
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  // Controls visibility — hide after 3 s of inactivity during playback
  const [controlsVisible, setControlsVisible] = useState(true);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Lazy-load via IntersectionObserver ───────────────────────────────────
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: `${rootMargin}px` },
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [rootMargin]);

  // ── Video event listeners ─────────────────────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => setIsPlaying(false);
    const onTimeUpdate = () => {
      if (!isScrubbing) setCurrentTime(video.currentTime);
    };
    const onLoadedMetadata = () => setDuration(video.duration);

    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);
    video.addEventListener("ended", onEnded);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, [isScrubbing]);

  // ── Fullscreen change listener ────────────────────────────────────────────
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  // ── Auto-hide controls ────────────────────────────────────────────────────
  const resetHideTimer = useCallback(() => {
    setControlsVisible(true);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      if (isPlaying) setControlsVisible(false);
    }, 3000);
  }, [isPlaying]);

  // Show controls again whenever playback pauses
  useEffect(() => {
    if (!isPlaying) {
      setControlsVisible(true);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    }
  }, [isPlaying]);

  // ── Playback toggle ───────────────────────────────────────────────────────
  const togglePlayback = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  // ── Fullscreen toggle ─────────────────────────────────────────────────────
  const toggleFullscreen = useCallback(async () => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    try {
      if (!document.fullscreenElement) {
        await wrapper.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch {
      // Fullscreen blocked by browser / permissions policy — fail silently.
    }
  }, []);

  // ── Progress bar scrubbing ────────────────────────────────────────────────
  const seek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    video.currentTime = newTime;
  }, []);

  const onScrubStart = useCallback(() => setIsScrubbing(true), []);
  const onScrubEnd = useCallback(() => setIsScrubbing(false), []);

  // ── Keyboard handler ──────────────────────────────────────────────────────
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const video = videoRef.current;
      if (!video) return;
      switch (e.key) {
        case " ":
        case "Enter":
          e.preventDefault();
          togglePlayback();
          break;
        case "ArrowRight":
          e.preventDefault();
          video.currentTime = Math.min(video.currentTime + 5, video.duration);
          break;
        case "ArrowLeft":
          e.preventDefault();
          video.currentTime = Math.max(video.currentTime - 5, 0);
          break;
        case "f":
        case "F":
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    },
    [togglePlayback, toggleFullscreen],
  );

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div
      ref={wrapperRef}
      className={`group relative w-full overflow-hidden bg-black ${className}`}
      role="region"
      aria-label={ariaLabel}
      onMouseMove={resetHideTimer}
      onMouseEnter={resetHideTimer}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* ── Video element ──────────────────────────────────────────────────── */}
      <video
        ref={videoRef}
        src={shouldLoad ? src : undefined}
        poster={poster}
        loop={loop}
        muted={muted}
        preload={shouldLoad ? preload : "none"}
        playsInline
        controls={false}
        onClick={togglePlayback}
        className="h-full w-full cursor-pointer object-cover"
        aria-label={ariaLabel}
      />

      {/* ── Centre play/pause overlay (fades out when playing + idle) ──────── */}
      <div
        role="button"
        tabIndex={-1}
        aria-label={isPlaying ? "Pause video" : "Play video"}
        aria-pressed={isPlaying}
        onClick={togglePlayback}
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
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

      {/* ── Bottom control bar ─────────────────────────────────────────────── */}
      <div
        className={[
          "absolute right-0 bottom-0 left-0 z-10",
          "bg-gradient-to-t from-black/70 to-transparent",
          "px-4 pt-8 pb-3",
          "transition-opacity duration-300",
          controlsVisible ? "opacity-100" : "pointer-events-none opacity-0",
        ].join(" ")}
      >
        {/* Progress bar */}
        <div className="relative mb-2 h-1 w-full">
          {/* Filled track */}
          <div
            className="pointer-events-none absolute top-0 left-0 h-full rounded-full bg-white"
            style={{ width: `${progressPercent}%` }}
          />
          {/* Background track */}
          <div className="pointer-events-none absolute inset-0 rounded-full bg-white/30" />
          {/* Range input — invisible but interactive, sits on top */}
          <input
            type="range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={currentTime}
            onChange={seek}
            onMouseDown={onScrubStart}
            onMouseUp={onScrubEnd}
            onTouchStart={onScrubStart}
            onTouchEnd={onScrubEnd}
            aria-label="Seek video"
            className={[
              "absolute inset-0 h-full w-full cursor-pointer opacity-0",
              // Grow the hit-area on hover/focus without a layout shift
              "hover:-top-1/2 hover:h-[200%]",
            ].join(" ")}
          />
        </div>

        {/* Time + fullscreen row */}
        <div className="flex items-center justify-between">
          {/* Play/pause + timestamps */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlayback}
              aria-label={isPlaying ? "Pause" : "Play"}
              className="rounded p-1 text-white/80 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white"
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>
            <span className="font-mono text-xs text-white/80 select-none">
              {formatTime(currentTime)}
              <span className="mx-1 text-white/40">/</span>
              {formatTime(duration)}
            </span>
          </div>

          {/* Fullscreen button */}
          <button
            onClick={toggleFullscreen}
            aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            className="rounded p-1 text-white/80 transition hover:text-white focus-visible:ring-2 focus-visible:ring-white"
          >
            {isFullscreen ? <ExitFullscreenIcon /> : <FullscreenIcon />}
          </button>
        </div>
      </div>
    </div>
  );
}
