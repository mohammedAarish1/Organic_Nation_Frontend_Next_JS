import BlogSection from "@/components/common/BlogSection";
// import RecipeSection from "@/components/common/RecipeSection";
import CategoriesSection from "@/components/homepage/CategoriesSection";
import CategoryCarousel from "@/components/homepage/CategoryCarousel";
import CTASection from "@/components/homepage/CTASection";
import FeaturedProducts from "@/components/homepage/FeaturedProducts";
import FeaturesSection from "@/components/homepage/FeaturesSection";
import HeroSection from "@/components/homepage/HeroSection";
import WhyUs from "@/components/homepage/WhyUs";
import { BlogsSkeleton } from "@/components/skeletons/BlogsSkeleton";
import { Suspense } from "react";
import type { Metadata } from "next";
import CertificatesSection from "@/components/homepage/CertificatesSection";
import Banner from "@/components/homepage/Banner";
// import SocialDMReviews from "@/components/testimonials/SocialDMReviews";

export const metadata: Metadata = {
  title:
    "Organic Nation — Shop Organic Honey, Pickles, Jaggery & More at Organic Nation",
  description:
    "Explore top-quality organic honey, homestyle pickles, jaggery, oats, chutney, dip, and oil at Organic Nation. Enjoy natural, healthy, and tasty products! Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products",
  keywords: [
    "homestyle pickles",
    "organic honey",
    "pickles",
    "jaggeryorganic",
    "oatsorganic",
    "chutneyorganic",
    "diporganic",
    "oilOrganic",
    "pickleshealthy",
    "foodsbest",
    "organic",
    "products",
    "India",
    "authentic",
    "honeyfarm-fresh",
    "organic",
    "picklespremium",
    "jaggeryhealthy",
    "dipsorganic",
    "oilhomestyle",
    "organic",
    "treatsshop",
    "organic",
    "food",
    "onlineOrganic",
    "products",
  ],
  openGraph: {
    title: "Organic Nation — Shop Premium Pickles and organic honey",
    description:
      "Explore top-quality organic honey, homestyle pickles, jaggery, oats, chutney, dip, and oil at Organic Nation. Enjoy natural, healthy, and tasty products! Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products",
    url: "https://www.organicnation.co.in/",
    siteName: "Organic Nation",
    images: [
      {
        url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp", // 1200x630px image
        width: 1200,
        height: 630,
        alt: "Organic Nation",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Organic Nation — Shop Premium Pickles and organic honey online",
    description:
      "Explore top-quality organic honey, homestyle pickles, jaggery, oats, chutney, dip, and oil at Organic Nation. Enjoy natural, healthy, and tasty products! Explore our range of wholesome and sustainable food products, thoughtfully crafted to bring the essence of the Himalayas to your plate in Delhi-NCR & PAN India. ✓Organic products  ✓500+ Products",
    images: [
      "https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp",
    ],
  },
};

// This is a Server Component by default in Next.js App Router
export default async function HomePage() {
  return (
    <main className="flex min-h-screen flex-col gap-14 sm:gap-24">
      <Banner />
      {/* <HeroSection /> */}
      <CategoryCarousel />
      <FeaturedProducts />
      <FeaturesSection />
      <CategoriesSection />
      <WhyUs />
      <CertificatesSection />
      {/* <SocialDMReviews/> */}
      <Suspense fallback={<BlogsSkeleton />}>
        <BlogSection homePage />
      </Suspense>
      {/* <RecipeSection recipes={[]} showBtn={true} /> */}
      <CTASection />
    </main>
  );
}
