import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AnimationGrid } from "../animations/animation2";
import { BlogsSkeleton } from "../skeletons/BlogsSkeleton";
import SectionHeader from "./SectionHeader";
import { NavigationButton } from "../buttons/NavigationButton";
import { API_BASE_URL } from "@/constants";

interface Blog {
  _id: string;
  title: string;
  "title-url": string;
  image: string;
  excerpt?: string;
  date: string;
}

interface BlogSectionProps {
  // blogs: Blog[];
  homePage?: boolean;
}

async function getBlogs() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/blogs`, {
      // Revalidate every 1 hour
      // next: { revalidate: 10 },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch blogs");
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching blogsss:", error);
    return [];
  }
}

// Blog Card Component (Server Component)
const BlogCard = ({ blog, index }: { blog: Blog; index: number }) => {
  return (
    <Link href={`/blogs/${blog["title-url"]}`} className="group block h-full">
      <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-md transition-all duration-500 hover:shadow-2xl">
        {/* Card Number Badge */}
        <div className="absolute top-4 left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-r from-amber-600 to-red-700 text-sm font-bold text-white shadow-lg">
          {String(index + 1).padStart(2, "0")}
        </div>

        {/* Image Container */}
        <div className="relative aspect-16/10 overflow-hidden rounded-t-3xl bg-amber-50">
          <Image
            src={blog.image}
            alt={blog.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />

          {/* Gradient overlay on hover */}
          <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

          {/* Reading time badge */}
          <div className="absolute right-4 bottom-4 flex translate-y-2 items-center gap-1 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <Clock className="h-4 w-4" />
            <span>5 min read</span>
          </div>
        </div>

        {/* Content Container */}
        <div className="flex grow flex-col p-6">
          {/* Date */}
          <div className="mb-4 flex items-center gap-2">
            <Calendar className="text-primary h-4 w-4" />
            <span className="text-sm font-medium tracking-wide text-gray-600 uppercase">
              {new Date(blog.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>

          {/* Title */}
          <h3 className="group-hover:text-primary mb-4 line-clamp-2 text-xl font-bold text-gray-900 transition-colors duration-300">
            {blog.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-6 line-clamp-3 grow text-sm leading-relaxed text-gray-600">
            {blog.excerpt ||
              "Discover insights and tips for sustainable living and organic lifestyle choices that make a difference."}
          </p>

          {/* Read More Button */}
          <div className="flex items-center justify-between border-t border-gray-100 pt-4">
            <div className="flex items-center gap-3">
              <span className="text-primary relative overflow-hidden text-sm font-semibold tracking-wider uppercase">
                Continue Reading
                <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-amber-700 transition-all duration-300 group-hover:w-full" />
              </span>
              <div className="text-primary rounded-full bg-amber-50 p-2 transition-colors duration-300 group-hover:bg-amber-700 group-hover:text-white">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

// Main Server Component
export default async function BlogSection({
  // blogs = [],
  homePage = false,
}: BlogSectionProps) {
  // const {data,isLoading}=useGetBlogsQuery()
  const blogs = (await getBlogs()) || [];
  const displayBlogs = homePage ? blogs?.slice(0, 3) : blogs;
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-white to-amber-50/30 py-12 sm:py-16 lg:py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-1/3 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-1/3 bottom-20 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <SectionHeader
          subTitle="Latest Stories"
          title="Our Blogs"
          content="Passionate about sustainable living, discover expert tips,
            eco-friendly products, and inspiring stories for a greener,
            healthier lifestyle"
        />

        {displayBlogs.length === 0 ? (
          <BlogsSkeleton length={homePage ? 3 : displayBlogs.length} />
        ) : (
          <AnimationGrid>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {displayBlogs?.map((blog, index) => (
                <div key={blog._id} data-index={index}>
                  <BlogCard blog={blog} index={index} />
                </div>
              ))}
            </div>
          </AnimationGrid>
        )}

        {/* View All Button */}
        {homePage && (
          <div className="mt-10 flex items-center justify-center sm:mt-12">
            <NavigationButton title="View All Blogs" path="/blogs" />
          </div>
        )}
      </div>
    </section>
  );
}
