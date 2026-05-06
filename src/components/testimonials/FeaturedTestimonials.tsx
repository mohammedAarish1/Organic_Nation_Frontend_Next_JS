// Featured Testimonials Carousel
"use client";

import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, User2 } from "lucide-react";
import Image from "next/image";
import { FadeInView, ShimmerReveal } from "@/components/animations/animations";

const FeaturedTestimonials = ({ feturedReviews: testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // const testimonials = [
  //   {
  //     id: 1,
  //     name: "Priya Sharma",
  //     location: "Delhi",
  //     image: "https://i.pravatar.cc/150?img=1",
  //     rating: 5,
  //     text: "The organic honey from Organic Nation is absolutely pure! You can taste the difference. My family has been using it for 6 months now and we won't switch to any other brand. The packaging is excellent and delivery is always on time.",
  //     product: "Organic Honey",
  //     verified: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Rajesh Kumar",
  //     location: "Mumbai",
  //     image: "https://i.pravatar.cc/150?img=12",
  //     rating: 5,
  //     text: "These homestyle pickles remind me of my grandmother's recipes! Authentic taste, no preservatives, and made with love. I've ordered multiple times and gifted to friends too. Highly recommended for anyone who loves traditional flavors.",
  //     product: "Homestyle Pickles",
  //     verified: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Sneha Patel",
  //     location: "Bangalore",
  //     image: "https://i.pravatar.cc/150?img=5",
  //     rating: 5,
  //     text: "As a health-conscious person, finding truly organic products is challenging. Organic Nation delivers on their promise. The oats are fresh, the quality is consistent, and I love supporting a brand that cares about sustainability.",
  //     product: "Organic Oats",
  //     verified: true,
  //   },
  // ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  };

  return (
    <section className="bg-linear-to-b from-white to-emerald-50/30 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <FadeInView>
          <div className="mb-12 text-center">
            <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Featured Stories
            </h2>
            <div className="mx-auto h-1 w-16 bg-linear-to-r from-amber-600 to-orange-600" />
          </div>
        </FadeInView>
        {/* Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-0 z-20 -translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all hover:bg-amber-50 hover:shadow-2xl sm:-translate-x-6"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-6 w-6 text-amber-700" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-0 z-20 translate-x-4 -translate-y-1/2 rounded-full bg-white p-3 shadow-xl transition-all hover:bg-amber-50 hover:shadow-2xl sm:translate-x-6"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-6 w-6 text-amber-700" />
          </button>

          {/* Testimonial Card */}
          <ShimmerReveal delay={0.5}>
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-white to-amber-50 p-8 shadow-2xl sm:p-12">
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="h-24 w-24 text-amber-600 sm:h-32 sm:w-32" />
              </div>

              <div className="relative z-10">
                {/* Rating */}
                <div className="mb-6 flex gap-1">
                  {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-amber-500 text-amber-500"
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="mb-8 text-lg leading-relaxed text-gray-700 sm:text-xl">
                  {testimonials[currentIndex].review}
                </p>

                {/* Product Badge */}
                <div className="mb-6 inline-block rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-4 py-2">
                  <span className="text-sm font-semibold text-amber-800">
                    {testimonials[currentIndex].productName.replace("-", " ")}
                  </span>
                </div>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative flex h-16 w-16 items-center justify-center overflow-hidden rounded-full ring-4 ring-amber-200">
                    {/* <Image
                      src={testimonials[currentIndex].image}
                      alt={testimonials[currentIndex].name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    /> */}
                    <User2 size={35} color="gray" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-secondary text-lg font-bold">
                        {testimonials[currentIndex].userName}
                      </h4>
                      {testimonials[currentIndex].verified && (
                        <div className="rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
                          Verified
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      {testimonials[currentIndex].location}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </ShimmerReveal>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "w-8 bg-amber-600"
                    : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTestimonials;
