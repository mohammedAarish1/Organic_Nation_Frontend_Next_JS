import { Star, Heart, ShoppingBag, Users, User2Icon } from "lucide-react";
import {
  FadeInFromLeft,
  FadeInFromRight,
  FadeInView,
  FloatingBackground2,
  ShimmerReveal,
} from "@/components/animations/animations";
import FeaturedTestimonials from "@/components/testimonials/FeaturedTestimonials";
// import SocialMediaReviews from "@/components/testimonials/SocialMediaReviews";
import axios from "axios";
import { API_BASE_URL } from "@/constants";
import VideoPlayer from "@/components/common/VideoPlayer";
// import SocialDMReviews from "@/components/testimonials/SocialDMReviews";
import Link from "next/link";

const getAllReviews = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/reviews`);
    if (response.status === 200) {
      return response.data;
    } else {
      return [];
    }
  } catch (error) {
    if (error) {
      return error.message;
    }
  }
};

export default async function TestimonialsPage() {
  const reviews = await getAllReviews();

  const feturedReviews = reviews.filter((r) => r.reviewTag === "featured");
  const topPicksReviews = reviews.filter((r) => r.reviewTag === "top_picks");
  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/30 to-white">
      <HeroSection />
      <StatsSection />
      <FeaturedTestimonials feturedReviews={feturedReviews} />
      <TestimonialGrid topPicksReviews={topPicksReviews} />
      <VideoTestimonials />
      {/* <SocialMediaReviews /> */}
      {/* <SocialDMReviews/> */}
      <CTASection />
    </div>
  );
}

// Hero Section
const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-linear-to-br from-amber-600 via-orange-500 to-red-600 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
      {/* Animated Background */}
      <FloatingBackground2 />

      <div className="relative z-10 mx-auto max-w-4xl text-center text-white">
        <FadeInView>
          <div className="mb-6 inline-block rounded-full bg-white/20 px-6 py-2 backdrop-blur-sm">
            <span className="text-sm font-semibold">💚 Loved by Thousands</span>
          </div>
        </FadeInView>
        <FadeInFromLeft>
          <h1 className="mb-6 text-4xl font-bold drop-shadow-2xl sm:text-5xl lg:text-6xl">
            What Our Customers Say
          </h1>
        </FadeInFromLeft>
        <FadeInFromRight>
          <p className="text-lg drop-shadow-lg sm:text-xl">
            Real stories from real people who trust our organic products
          </p>
        </FadeInFromRight>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 100"
          className="w-full"
        >
          <path
            fill="white"
            fillOpacity="1"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,64C960,53,1056,43,1152,42.7C1248,43,1344,53,1392,58.7L1440,64L1440,100L1392,100C1344,100,1248,100,1152,100C1056,100,960,100,864,100C768,100,672,100,576,100C480,100,384,100,288,100C192,100,96,100,48,100L0,100Z"
          />
        </svg>
      </div>
    </section>
  );
};

// Stats Section
const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "10K+",
      label: "Happy Customers",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Star,
      value: "4.9",
      label: "Average Rating",
      color: "from-amber-500 to-yellow-600",
    },
    {
      icon: ShoppingBag,
      value: "50K+",
      label: "Orders Delivered",
      color: "from-orange-500 to-red-600",
    },
    {
      icon: Heart,
      value: "98%",
      label: "Satisfaction Rate",
      color: "from-pink-500 to-rose-600",
    },
  ];

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <FadeInView key={index}>
              <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-shadow hover:shadow-2xl">
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-linear-to-br ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`}
                />

                <div className="relative z-10">
                  <div
                    className={`mb-4 inline-flex rounded-full bg-linear-to-br ${stat.color} p-3 text-white shadow-lg`}
                  >
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="text-secondary mb-2 text-3xl font-bold sm:text-4xl">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 sm:text-base">
                    {stat.label}
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
};

// Testimonial Grid
const TestimonialGrid = ({ topPicksReviews }) => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeInView>
          <div className="mb-12 text-center">
            <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              More Happy Customers
            </h2>
            <div className="mx-auto h-1 w-16 bg-linear-to-r from-amber-600 to-orange-600" />
          </div>
        </FadeInView>
        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topPicksReviews.map((testimonial, index) => (
            <ShimmerReveal delay={0.7} key={index}>
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-2xl"
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-linear-to-br from-amber-100 to-orange-100 opacity-0 transition-opacity duration-300 group-hover:opacity-30" />

                <div className="relative z-10">
                  {/* Rating */}
                  <div className="mb-4 flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>

                  {/* Text */}
                  <p className="mb-4 text-gray-700">{testimonial.review}</p>

                  {/* Product Badge */}
                  <div className="mb-4 inline-block rounded-full bg-amber-100 px-3 py-1">
                    <span className="text-xs font-semibold text-amber-800">
                      {testimonial.productName}
                    </span>
                  </div>

                  {/* Author */}
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full ring-2 ring-amber-200">
                      {/* <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                      sizes="48px"
                    /> */}
                      <User2Icon size={30} color="gray" />
                    </div>
                    <div>
                      <h4 className="text-secondary font-bold">
                        {testimonial.userName}
                      </h4>
                      <p className="text-xs text-gray-600">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ShimmerReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// Video Testimonials
const VideoTestimonials = () => {
  const videos = [
    "https://organicnationmages.s3.ap-south-1.amazonaws.com/product-detail-page-videos/Vinni_Review.MP4",
    "https://organicnationmages.s3.ap-south-1.amazonaws.com/product-detail-page-videos/Honey_A_Reveiew.MOV",
  ];
  return (
    <section className="bg-linear-to-b from-white to-emerald-50/30 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <FadeInView>
          <div className="mb-12 text-center">
            <h2 className="text-secondary mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
              Video Reviews
            </h2>
            <div className="mx-auto mb-6 h-1 w-16 bg-linear-to-r from-amber-600 to-orange-600" />
            <p className="text-lg text-gray-700">
              See what our customers have to say on video
            </p>
          </div>
        </FadeInView>

        {/* Video Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((src, index) => (
            <ShimmerReveal delay={0.7} key={src}>
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-linear-to-br from-gray-100 to-gray-200 shadow-lg transition-all hover:shadow-2xl"
              >
                <div className="w-full">
                  <div className="flex h-full items-center justify-center">
                    {/* <VideoPlayer
                      src={src}
                      poster="/images/pickle.jpg"
                      blurDataURL="/images/pickle-blur.jpg"
                      autoPlay={false}
                      loop={true}
                      className="mx-auto max-w-2xl"
                    /> */}

                    <VideoPlayer src={src} />
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-center text-sm font-semibold text-gray-700">
                    Customer Review #{index}
                  </p>
                </div>
              </div>
            </ShimmerReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

// CTA Section
const CTASection = () => {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <FadeInView>
        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-linear-to-br from-amber-600 via-orange-500 to-red-600 p-8 text-center text-white shadow-2xl sm:p-12">
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
            Join Our Happy Family
          </h2>
          <p className="mb-8 text-lg opacity-90">
            Experience the organic difference. Shop now and share your story!
          </p>
          <Link
            href="/shop/all"
            className="rounded-full bg-white px-8 py-4 font-bold text-amber-700 shadow-xl transition-all hover:scale-105 hover:shadow-2xl"
          >
            Start Shopping
          </Link>
        </div>
      </FadeInView>
    </section>
  );
};
