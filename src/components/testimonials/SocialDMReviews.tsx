"use client";

import { useState } from "react";
import Image from "next/image";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ThumbsUp,
  Star,
} from "lucide-react";
import { FadeInView } from "@/components/animations/animation2";
import { Instagram } from "../svg-icons/svgIcons";

interface Testimonial {
  id: string;
  image: string;
  platform: "whatsapp" | "instagram" | "google" | "facebook";
  customerName: string;
  rating?: number;
  featured?: boolean;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    //   image: 'https://placehold.co/300x400/f59e0b/white?text=Review+1',
    image: "/rev1.jpeg",
    platform: "whatsapp",
    customerName: "Priya Sharma",
    rating: 5,
    featured: true,
  },
  {
    id: "2",
    //   image: 'https://placehold.co/300x400/10b981/white?text=Review+2',
    image: "/rev1.jpeg",
    platform: "instagram",
    customerName: "Rahul Verma",
    rating: 5,
  },
  {
    id: "3",
    //   image: 'https://placehold.co/300x400/3b82f6/white?text=Review+3',
    image: "/rev1.jpeg",
    platform: "google",
    customerName: "Anjali Patel",
    rating: 5,
  },
];

const PlatformBadge = ({ platform }: { platform: string }) => {
  const platforms = {
    whatsapp: { icon: "💬", color: "bg-green-500", label: "WhatsApp" },
    instagram: {
      icon: "📷",
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      label: "Instagram",
    },
    google: { icon: "⭐", color: "bg-blue-500", label: "Google" },
    facebook: { icon: "👍", color: "bg-blue-600", label: "Facebook" },
  };

  const data =
    platforms[platform as keyof typeof platforms] || platforms.whatsapp;

  return (
    <div
      className={`flex items-center gap-1.5 rounded-full ${data.color} px-2.5 py-1 text-xs font-semibold text-white shadow-sm`}
    >
      <span>{data.icon}</span>
      <span>{data.label}</span>
    </div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <div className="group relative h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-gray-100 bg-white p-3 shadow-md transition-all duration-300 hover:border-amber-200 hover:shadow-xl">
        {/* Platform Badge */}
        <div className="absolute top-3 right-3 z-10">
          <PlatformBadge platform={testimonial.platform} />
        </div>

        {/* Featured Badge */}
        {testimonial.featured && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow-sm">
            <Star className="h-3 w-3 fill-white" />
            <span>Featured</span>
          </div>
        )}

        {/* Review Screenshot */}
        <div className="relative mb-3 overflow-hidden rounded-xl bg-gray-50">
          <div className="relative aspect-3/4">
            <Image
              src={testimonial.image}
              alt={`Review from ${testimonial.customerName}`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />

            {/* Subtle overlay for authenticity */}
            <div className="absolute inset-0 bg-linear-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </div>
        </div>

        {/* Customer Info */}
        <div className="mt-auto flex items-center justify-between">
          {/* <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-700">
              {testimonial.customerName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-800">{testimonial.customerName}</p>
              {testimonial.rating && (
                <div className="flex items-center gap-0.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              )}
            </div>
          </div> */}

          {/* Verified Badge */}
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <ThumbsUp className="h-3.5 w-3.5" />
            <span className="font-medium">Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Lightbox Component
// ─────────────────────────────────────────────
const Lightbox = ({
  screenshots,
  activeIndex,
  onClose,
  onPrev,
  onNext,
}: {
  screenshots: typeof testimonials;
  activeIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Modal Box */}
      <div
        className="relative flex max-h-[90vh] w-full max-w-sm flex-col overflow-hidden rounded-3xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()} // prevent close on inner click
      >
        {/* Top Bar */}
        <div className="flex items-center justify-between bg-linear-to-r from-amber-600 to-orange-500 px-5 py-3">
          <div className="flex items-center gap-2 text-white">
            <Instagram />
            <span className="text-sm font-semibold">
              {screenshots[activeIndex].platform}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full bg-white/20 p-1.5 text-white transition hover:bg-white/30"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Screenshot Image */}
        <div className="relative flex-1 overflow-y-auto">
          <Image
            src={screenshots[activeIndex].image}
            alt={"social-media-review"}
            width={400}
            height={800}
            className="h-auto w-full object-contain"
          />
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between border-t border-gray-100 bg-white px-5 py-3">
          <button
            onClick={onPrev}
            className="flex items-center gap-1 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            <ChevronLeft className="h-4 w-4" />
            Prev
          </button>
          <span className="text-xs text-gray-400">
            {activeIndex + 1} / {screenshots.length}
          </span>
          <button
            onClick={onNext}
            className="flex items-center gap-1 rounded-full bg-amber-50 px-4 py-2 text-sm font-semibold text-amber-700 transition hover:bg-amber-100"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Section
// ─────────────────────────────────────────────
const SocialDMReviews = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const displayTestimonials = testimonials;

  const goPrev = () =>
    setLightboxIndex((prev) =>
      prev !== null
        ? (prev - 1 + displayTestimonials.length) % displayTestimonials.length
        : 0,
    );

  const goNext = () =>
    setLightboxIndex((prev) =>
      prev !== null ? (prev + 1) % displayTestimonials.length : 0,
    );

  return (
    <>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* ── Section Header ── */}
          <FadeInView>
            <div className="mb-12 text-center">
              {/* Instagram pill badge */}
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-purple-100 to-pink-100 px-6 py-2">
                <Instagram />
                <span className="text-sm font-semibold text-purple-700">
                  Direct Messages
                </span>
              </div>

              <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                What Customers DM Us 💬
              </h2>
              <div className="mx-auto mb-6 h-1 w-16 bg-linear-to-r from-amber-600 to-orange-600" />
              <p className="mx-auto max-w-xl text-base text-gray-600 sm:text-lg">
                Unfiltered love straight from our {"customers'"} DMs — these are
                real messages {"we've"} received on Instagram.
              </p>
            </div>
          </FadeInView>

          {/* ── Screenshot Grid ── */}

          <FadeInView>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
              {displayTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="group relative cursor-pointer"
                  data-index={index}
                  onClick={() => openLightbox(index)}
                >
                  <TestimonialCard testimonial={testimonial} index={index} />
                  <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="rounded-full bg-white/90 p-3 shadow-xl backdrop-blur-sm">
                      <ZoomIn className="h-5 w-5 text-amber-700" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* Zoom Icon on hover */}
          </FadeInView>

          {/* ── Bottom Note ── */}
          <FadeInView>
            <div className="mt-10 flex items-center justify-center gap-2 rounded-2xl border border-amber-100 bg-amber-50 px-6 py-4">
              <Instagram />
              <p className="text-center text-sm text-gray-600">
                These are{" "}
                <span className="font-semibold text-amber-700">
                  real DMs from real customers
                </span>{" "}
                — shared with their permission. 🙏
              </p>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <Lightbox
          screenshots={displayTestimonials}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goPrev}
          onNext={goNext}
        />
      )}
    </>
  );
};

export default SocialDMReviews;
