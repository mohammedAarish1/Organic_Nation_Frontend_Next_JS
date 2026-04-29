import { MessageCircle, Star, ThumbsUp, Quote } from "lucide-react";
import Image from "next/image";
import { FadeInView } from "../animations/animation2";
import SectionHeader from "./SectionHeader";

interface Testimonial {
  id: string;
  image: string;
  platform: "whatsapp" | "instagram" | "google" | "facebook";
  customerName: string;
  rating?: number;
  featured?: boolean;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

// Platform badge component
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

// Testimonial Card Component
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

// Stats Component
const StatsBar = () => {
  return (
    <div className="mx-auto mb-10 grid max-w-4xl grid-cols-2 gap-4 sm:mb-12 sm:grid-cols-4 sm:gap-6">
      {[
        { value: "10K+", label: "Happy Customers" },
        { value: "4.9", label: "Average Rating" },
        { value: "5K+", label: "Reviews" },
        { value: "98%", label: "Satisfaction" },
      ].map((stat, i) => (
        <div
          key={i}
          className="rounded-2xl border border-amber-100 bg-white p-4 text-center shadow-sm"
        >
          <div className="text-primary text-2xl font-bold sm:text-3xl">
            {stat.value}
          </div>
          <div className="text-muted text-xs sm:text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  );
};

// Main Server Component
export default function TestimonialSection({
  testimonials,
}: TestimonialSectionProps) {
  // Placeholder testimonials if none provided
  const defaultTestimonials: Testimonial[] = [
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
    {
      id: "4",
      //   image: 'https://placehold.co/300x400/8b5cf6/white?text=Review+4',
      image: "/rev1.jpeg",
      platform: "facebook",
      customerName: "Amit Kumar",
      rating: 4,
    },
    {
      id: "5",
      //   image: 'https://placehold.co/300x400/ef4444/white?text=Review+5',
      image: "/rev1.jpeg",
      platform: "whatsapp",
      customerName: "Sneha Reddy",
      rating: 5,
      featured: true,
    },
    {
      id: "6",
      //   image: 'https://placehold.co/300x400/f59e0b/white?text=Review+6',
      image: "/rev1.jpeg",
      platform: "instagram",
      customerName: "Vikram Singh",
      rating: 5,
    },
    {
      id: "7",
      //   image: 'https://placehold.co/300x400/10b981/white?text=Review+7',
      image: "/rev1.jpeg",
      platform: "google",
      customerName: "Deepika Joshi",
      rating: 5,
    },
    {
      id: "8",
      //   image: 'https://placehold.co/300x400/3b82f6/white?text=Review+8',
      image: "/rev1.jpeg",
      platform: "whatsapp",
      customerName: "Rohan Mehta",
      rating: 4,
    },
  ];

  const displayTestimonials =
    testimonials?.length > 0 ? testimonials : defaultTestimonials;

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-amber-50/30 to-white py-12 sm:py-16 lg:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subTitle="Real Reviews"
          title="What Our Customers Say"
          content="Genuine reviews from real customers across WhatsApp, Instagram, Google, and Facebook"
        />

        {/* Stats Bar */}
        <StatsBar />

        {/* Testimonials Grid - Client Component for animations */}
        <FadeInView>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-3 lg:grid-cols-4">
            {displayTestimonials.map((testimonial, index) => (
              <div key={testimonial.id} data-index={index}>
                <TestimonialCard testimonial={testimonial} index={index} />
              </div>
            ))}
          </div>
        </FadeInView>

        {/* Trust Badge */}
        <div className="mt-10 text-center sm:mt-12">
          <div className="inline-flex items-center gap-3 rounded-full border-2 border-emerald-200 bg-emerald-50 px-6 py-3">
            <Quote className="h-5 w-5 text-emerald-700" />
            <span className="text-sm font-semibold text-emerald-900">
              100% Authentic Reviews from Real Customers
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
