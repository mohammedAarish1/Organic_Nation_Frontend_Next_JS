"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { redirect } from "next/navigation";

interface BannerData {
  image?: string;
  src?: string;
  title?: string;
  redirectionUrl?: string;
  [key: string]: unknown;
}

interface BannerImageProps {
  banner: BannerData | string;
  index: number;
  onClick: (banner: BannerData | string, index: number) => void;
}

interface DotsIndicatorProps {
  banners: (BannerData | string)[];
  currentIndex: number;
  onDotClick: (index: number) => void;
}

interface ProgressBarProps {
  currentIndex: number;
  autoSlideInterval: number;
  isPaused: boolean;
}

interface BannerSliderProps {
  banners?: (BannerData | string)[];
  autoSlideInterval?: number;
  onBannerClick?: (banner: BannerData | string, index: number) => void;
  isLoading?: boolean;
}

// Memoized loading skeleton component
// const LoadingSkeleton = React.memo(() => (
//   <div className="relative w-full bg-gray-200 animate-pulse overflow-hidden rounded-lg mt-20">
//     <div className="w-full bg-gray-300" style={{ aspectRatio: '1519/600' }}>
//       <div className="absolute inset-0 flex items-center justify-center">
//         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-500" />
//       </div>
//     </div>
//   </div>
// ));
// LoadingSkeleton.displayName = 'LoadingSkeleton';

// Memoized banner image component
const BannerImage = React.memo<BannerImageProps>(
  ({ banner, index, onClick }) => {
    const imageSrc = (banner["image"] as string) || "";
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="absolute inset-0 cursor-pointer"
        onClick={() => onClick(banner, index)}
      >
        <Image
          src={imageSrc}
          alt={"banner-image"}
          fill
          draggable={false}
          loading="lazy"
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>
    );
  },
);
BannerImage.displayName = "BannerImage";

// Memoized dots indicator component
const DotsIndicator = React.memo<DotsIndicatorProps>(
  ({ banners, currentIndex, onDotClick }) => (
    <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
      {banners.map((_, index) => (
        <button
          key={index}
          onClick={() => onDotClick(index)}
          className={`h-2 w-2 rounded-full transition-all duration-200 md:h-3 md:w-3 ${
            index === currentIndex
              ? "scale-110 bg-white"
              : "bg-opacity-50 hover:bg-opacity-75 bg-white"
          }`}
          aria-label={`Go to banner ${index + 1}`}
        />
      ))}
    </div>
  ),
);
DotsIndicator.displayName = "DotsIndicator";

// Memoized progress bar component
const ProgressBar = React.memo<ProgressBarProps>(
  ({ currentIndex, autoSlideInterval, isPaused }) => {
    if (isPaused) return null;

    return (
      <div className="bg-opacity-20 absolute bottom-0 left-0 h-1 w-full bg-black">
        <motion.div
          className="h-full bg-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: autoSlideInterval / 1000,
            ease: "linear",
          }}
          key={currentIndex}
        />
      </div>
    );
  },
);
ProgressBar.displayName = "ProgressBar";

const BannerSlider: React.FC<BannerSliderProps> = ({
  banners = [],
  autoSlideInterval = 5000,
  onBannerClick = () => {},
  // isLoading = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Memoize next slide function
  const nextSlide = useCallback(() => {
    if (banners.length === 0) return;
    setCurrentIndex((prevIndex) =>
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1,
    );
  }, [banners.length]);

  // Auto slide effect - only when needed
  useEffect(() => {
    if (isPaused || banners.length <= 1) return;

    const interval = setInterval(nextSlide, autoSlideInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval, isPaused, banners.length]);

  // Memoized handlers
  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleBannerClick = useCallback(
    (banner: BannerData | string, index: number) => {
      onBannerClick(banner, index);
    },
    [onBannerClick],
  );

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => setIsPaused(false), []);

  // Early returns for edge cases
  // if (isLoading) return <LoadingSkeleton />;

  if (!banners?.length) {
    return (
      <div
        className="flex w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500"
        style={{ aspectRatio: "1519/600" }}
      >
        No banners available
      </div>
    );
  }

  const showMultipleControls = banners.length > 1;
  const currentBanner = banners[currentIndex];

  return (
    <div
      className="group relative mt-20 w-full overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ aspectRatio: "1519/600" }}
    >
      {/* Main slider container */}
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <BannerImage
            banner={currentBanner}
            index={currentIndex}
            onClick={handleBannerClick}
          />
        </AnimatePresence>
      </div>

      {/* Controls - only render when needed */}
      {showMultipleControls && (
        <>
          <DotsIndicator
            banners={banners}
            currentIndex={currentIndex}
            onDotClick={goToSlide}
          />
          <ProgressBar
            currentIndex={currentIndex}
            autoSlideInterval={autoSlideInterval}
            isPaused={isPaused}
          />
        </>
      )}
    </div>
  );
};

const BannerSection = ({ banners }) => {
  // Memoized banner click handler
  const handleBannerClick = useCallback((banner: BannerData | string) => {
    const redirectionUrl =
      typeof banner === "string" ? undefined : banner.redirectionUrl;
    if (!redirectionUrl) return;

    const redirectUrl = `/shop/${redirectionUrl.toLowerCase()}`;
    // router.push(redirectUrl);
    redirect(redirectUrl);
  }, []);

  // Memoized props
  const bannerProps = useMemo(
    () => ({
      banners,
      // isLoading,
      onBannerClick: handleBannerClick,
      autoSlideInterval: 4000,
    }),
    [banners, handleBannerClick],
  );

  return <BannerSlider {...bannerProps} />;
};

export default BannerSection;
