import BlogSection from "@/components/common/BlogSection";
import { BlogsSkeleton } from "@/components/skeletons/BlogsSkeleton";
import { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";

// Static metadata for SEO
export const metadata: Metadata = {
  title: "The Blog - Organic Nation",
  description:
    "Explore our blog for informative articles, industry news, and company updates.",
  openGraph: {
    title: "The Blog - Organic Nation",
    description:
      "Explore our blog for informative articles, industry news, and company updates.",
    url: "https://organicnation.co.in/our-blogs",
    images: [
      {
        url: "https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.png",
        width: 478,
        height: 446,
        alt: "Organic Nation Blog",
      },
    ],
    siteName: "Organic Nation",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Blog - Organic Nation",
    description:
      "Explore our blog for informative articles, industry news, and company updates.",
    images: [
      "https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.png",
    ],
    site: "@organicnation_",
    creator: "@organicnation_",
  },
  alternates: {
    canonical: "https://organicnation.co.in/our-blogs",
  },
};

// Fetch blogs server-side
// async function getBlogs() {
//   try {
//     const res = await fetch('http://localhost:8000/api/blogs', {
//       // Revalidate every 1 hour
//       next: { revalidate: 3600 }
//     });

//     if (!res.ok) {
//       throw new Error('Failed to fetch blogs');
//     }

//     return res.json();
//   } catch (error) {
//     console.error('Error fetching blogs:', error);
//     return [];
//   }
// }

// Loading skeleton component

// Main page component (Server Component)
export default async function Blogs() {
  // Fetch blogs on the server
  // const blogs = await getBlogs();

  return (
    <div className="bg-gradient-primary relative items-center overflow-hidden pt-20">
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full sm:h-[600px]">
        <Image
          src="https://organicnationmages.s3.ap-south-1.amazonaws.com/other_banners/blog.webp"
          alt="Organic Nation Blog"
          fill
          priority
          sizes="100vw"
          className="object-cover sm:object-fill"
        />
      </div>

      {/* Blog Section with Suspense */}
      <Suspense fallback={<BlogsSkeleton />}>
        <BlogSection homePage={false} />
      </Suspense>
    </div>
  );
}
