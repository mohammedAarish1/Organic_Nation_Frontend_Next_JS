import {
  ArrowLeft,
  Calendar,
  Clock,
  User,
  Tag,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import { API_BASE_URL } from "@/constants";
import { FloatingBackground } from "@/components/animations/animation2";
import {
  BounceIn,
  ClipReveal,
  FadeInFromLeft,
  FadeInFromRight,
  FadeInView,
  ShimmerReveal,
} from "@/components/animations/animations";
import ShareBox from "@/components/blog-details-page/ShareBox";
import type { Components } from "react-markdown";
// ─── Blog data (replace with your MongoDB / fetch call) ───────────────────────

type AuthorCardProps = {
  author: string;
  date: string;
  mins: number;
};

export function unescapeMarkdown(str: string): string {
  return str
    .replace(/\\n/g, "\n") // fix escaped newlines
    .replace(/\\t/g, "\t") // fix escaped tabs (just in case)
    .trim();
}

// utils/parseBlogContent.ts

export function extractTocItems(description: string): string[] {
  return description
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) =>
      line
        .replace(/^##\s+/, "") // remove "## "
        .replace(/\*\*/g, "") // remove bold markers
        .replace(/:$/, "") // remove trailing colon
        .trim(),
    );
}

export function extractKeyBenefits(description: string): string[] {
  const lines = description.split("\n");

  const startIndex = lines.findIndex((line) =>
    line.toLowerCase().includes("nutritional benefits"),
  );

  if (startIndex === -1) return [];

  const benefits: string[] = [];

  for (let i = startIndex + 1; i < lines.length; i++) {
    const line = lines[i].trim();

    // Stop at next heading
    if (line.startsWith("#")) break;

    // Match numbered list items like: 1. **Rich in Minerals**: ...
    const match = line.match(/^\d+\.\s+\*\*(.+?)\*\*/);
    if (match) {
      benefits.push(match[1].replace(/:$/, "").trim());
    }
  }

  return benefits;
}

const getBlogDetails = async (
  titleUrl = "Discover-the-Sweetness-of-Jaggery-Powder:-A-Healthier-Alternative-to-Refined-Sugar",
) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/blogs/${titleUrl}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    throw error;
  }
};
// ─── Helpers ──────────────────────────────────────────────────────────────────
function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
function readingTime(text: string) {
  return Math.ceil(text.replace(/[#*`_]/g, "").split(/\s+/).length / 200);
}

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .replace(/\*\*/g, "") // remove bold markers
    .replace(/:$/, "") // remove trailing colon
    .trim()
    .replace(/\s+/g, "-") // spaces → hyphens
    .replace(/[^\w-]/g, ""); // remove special chars
}

// ─── Markdown components — pure Tailwind ──────────────────────────────────────
const mdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="mt-10 mb-4 text-2xl font-bold text-gray-900 sm:text-3xl">
      {children}
    </h1>
  ),
  h2: ({ children }) => {
    const id = slugify(
      Array.isArray(children) ? children.join("") : String(children ?? ""),
    );
    return (
      <h2
        id={id}
        className="mt-8 mb-3 scroll-mt-24 border-b-2 border-amber-200 pb-2 text-xl font-bold text-gray-900 sm:text-2xl"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }) => (
    <h3 className="mt-6 mb-2 text-lg font-semibold text-amber-800">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 leading-relaxed text-gray-700 sm:text-lg">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900">{children}</strong>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-4 list-decimal space-y-3 marker:font-semibold marker:text-amber-600">
      {children}
    </ol>
  ),
  ul: ({ children }) => (
    <ul className="mb-6 ml-4 list-disc space-y-3 marker:text-amber-600">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="pl-1 leading-relaxed text-gray-700 sm:text-lg">
      {children}
    </li>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-6 rounded-r-2xl border-l-4 border-amber-500 bg-amber-50/60 py-4 pr-4 pl-5 text-amber-900 italic">
      {children}
    </blockquote>
  ),
  hr: () => (
    <div className="my-8 flex items-center gap-3">
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-amber-300 to-transparent" />
      <span className="text-xs text-amber-400">✦</span>
      <div className="h-px flex-1 bg-linear-to-r from-transparent via-amber-300 to-transparent" />
    </div>
  ),
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export default async function BlogDetailPage({
  params,
}: {
  params: { blogId: string };
}) {
  const { blogId } = await params;

  const post = await getBlogDetails(blogId);
  const description = unescapeMarkdown(post.description);
  const mins = readingTime(post.description);
  const tocItems = extractTocItems(description); // ✅ dynamic
  const keyBenefits = extractKeyBenefits(description);

  return (
    <div className="min-h-screen bg-linear-to-b from-white via-amber-50/30 to-emerald-50/30 pt-20">
      {/* ── Hero Banner ─────────────────────────────────────────────────────── */}
      <section className="relative h-[62vh] w-full overflow-hidden bg-linear-to-br from-amber-600 via-orange-500 to-red-600 sm:h-[68vh]">
        {/* Hero image */}
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/20 to-black/60" />

        {/* Floating background circles — same as AboutPage */}
        <FloatingBackground />
        {/* Content */}
        <div className="relative z-10 flex h-full flex-col items-center justify-end px-4 pb-10 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <BounceIn delay={0.7}>
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="rounded-full bg-white/20 px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm sm:text-sm"
              >
                🌿 {tag}
              </span>
            ))}
            {post.recent && (
              <span className="rounded-full bg-amber-500/80 px-4 py-1 text-xs font-semibold tracking-widest text-white uppercase backdrop-blur-sm sm:text-sm">
                ✦ New
              </span>
            )}
          </BounceIn>
          {/* Title */}
          <ShimmerReveal>
            <h1 className="mb-5 max-w-4xl text-2xl leading-tight font-bold text-white drop-shadow-2xl sm:text-3xl lg:text-5xl">
              {post.title}
            </h1>
          </ShimmerReveal>
          {/* Divider line */}
          <BounceIn>
            <div className="mb-5 h-1 w-20 bg-white" />
          </BounceIn>

          {/* Meta */}
          <FadeInView>
            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/90 sm:text-base">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {post.author}
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" /> {formatDate(post.date)}
              </span>
              <span className="text-white/40">|</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {mins} min read
              </span>
            </div>
          </FadeInView>
        </div>

        {/* Bottom wave — exact same pattern as AboutPage */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="w-full"
          >
            <path
              fill="white"
              fillOpacity="1"
              d="M0,64L48,58.7C96,53,192,43,288,42.7C384,43,480,53,576,58.7C672,64,768,64,864,58.7C960,53,1056,43,1152,37.3C1248,32,1344,32,1392,32L1440,32L1440,100L0,100Z"
            />
          </svg>
        </div>
      </section>

      {/* ── Breadcrumb ───────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <FadeInFromLeft>
          <div className="flex items-center gap-1.5 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-amber-600">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <Link
              href="/blog"
              className="transition-colors hover:text-amber-600"
            >
              Blog
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            <span className="line-clamp-1 font-medium text-amber-700">
              Jaggery Powder
            </span>
          </div>
        </FadeInFromLeft>
      </div>

      {/* ── Main Content ─────────────────────────────────────────────────────── */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3 lg:gap-14">
            {/* ── Article ──────────────────────────────────────────────────── */}
            <main className="lg:col-span-2">
              {/* Author card */}
              <AuthorCard author={post.author} date={post.date} mins={mins} />

              {/* Prose card */}
              <ClipReveal>
                <div className="rounded-3xl border border-gray-100 bg-white p-6 shadow-xl sm:p-8 lg:p-10">
                  <article>
                    <ReactMarkdown components={mdComponents}>
                      {description}
                    </ReactMarkdown>
                  </article>
                </div>
              </ClipReveal>

              {/* Tags row */}
              <TagsRow tags={post.tags} />

              {/* Share box */}
              <ShareBox title={post.title} />

              {/* Back link */}
              <div className="mt-8">
                <Link
                  href="/blogs"
                  className="group inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-5 py-2.5 text-sm font-semibold text-amber-700 shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-amber-400 hover:shadow-md"
                >
                  <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                  Back to Blogs
                </Link>
              </div>
            </main>

            {/* ── Sidebar ──────────────────────────────────────────────────── */}
            <aside className="space-y-6 lg:col-span-1">
              <Sidebar
                tags={post.tags}
                tocItems={tocItems}
                keyBenefits={keyBenefits}
              />
            </aside>
          </div>
        </div>
      </section>

      {/* Copied toast */}
      {/* <div
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full bg-gray-900 px-5 py-2.5 text-sm font-medium whitespace-nowrap text-white shadow-2xl transition-all duration-300 ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        ✓ Link copied to clipboard
      </div> */}
    </div>
  );
}

// ─── Author Card ─────────────────────────────────────────────────────────────
function AuthorCard({ author, date, mins }: AuthorCardProps) {
  return (
    <FadeInFromLeft>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-gray-100 bg-linear-to-br from-amber-50 to-orange-50 p-5 shadow-md">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-amber-500 to-orange-500 text-lg font-bold text-white shadow-md">
            {author.charAt(0)}
          </div>
          <div>
            <p className="font-bold text-gray-900">{author}</p>
            <p className="text-sm text-gray-500">
              Organic Nation · Content Team
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 text-sm text-gray-500">
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4 text-amber-500" /> {formatDate(date)}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4 text-amber-500" /> {mins} min read
          </span>
        </div>
      </div>
    </FadeInFromLeft>
  );
}

// ─── Tags Row ─────────────────────────────────────────────────────────────────
function TagsRow({ tags }: { tags: string[] }) {
  return (
    <FadeInFromLeft>
      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-gray-100 pt-6">
        <Tag className="h-4 w-4 text-gray-400" />
        {tags.map((tag: string) => (
          <span
            key={tag}
            className="cursor-pointer rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-4 py-1 text-sm font-semibold text-amber-700 capitalize transition-all hover:from-amber-200 hover:to-orange-200"
          >
            {tag}
          </span>
        ))}
      </div>
    </FadeInFromLeft>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function Sidebar({
  tags,
  tocItems,
  keyBenefits,
}: {
  tags: string[];
  tocItems: string[];
  keyBenefits: string[];
}) {
  return (
    <>
      {/* Table of contents */}
      {tocItems.length > 0 && (
        <FadeInFromRight>
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <span className="h-1 w-5 rounded-full bg-linear-to-r from-amber-500 to-orange-500" />
              In This Article
            </h3>
            <ul className="space-y-1">
              {tocItems.map((item: string) => (
                <li key={item}>
                  <a
                    href={`#${slugify(item)}`}
                    className="group flex items-center gap-2 rounded-xl px-3 py-2 text-sm text-gray-600 transition-all duration-200 hover:bg-amber-50 hover:text-amber-700"
                  >
                    <ChevronRight className="h-3.5 w-3.5 text-amber-400 transition-transform group-hover:translate-x-0.5" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </FadeInFromRight>
      )}

      {/* Quick benefits card */}
      {keyBenefits.length > 0 && (
        <FadeInFromRight>
          <div className="rounded-2xl border border-gray-100 bg-linear-to-br from-amber-50 to-orange-50 p-6 shadow-lg">
            <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
              <span className="h-1 w-5 rounded-full bg-linear-to-r from-amber-500 to-orange-500" />
              Key Benefits
            </h3>
            <ul className="space-y-2.5">
              {keyBenefits.map((item: string) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm text-gray-700"
                >
                  <span className="mt-0.5 text-green-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeInFromRight>
      )}

      {/* Tags cloud */}
      <FadeInFromRight>
        <div className="rounded-2xl border border-gray-100 bg-linear-to-br from-green-50 to-emerald-50 p-6 shadow-lg">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
            <span className="h-1 w-5 rounded-full bg-linear-to-r from-emerald-500 to-green-500" />
            Related Tags
          </h3>
          <div className="flex flex-wrap gap-2">
            {[...tags, "organic", "natural", "nutrition", "wellness"].map(
              (tag) => (
                <span
                  key={tag}
                  className="cursor-pointer rounded-full bg-white px-3 py-1 text-xs font-semibold text-emerald-700 capitalize shadow-sm ring-1 ring-emerald-100 transition-all hover:bg-emerald-600 hover:text-white"
                >
                  {tag}
                </span>
              ),
            )}
          </div>
        </div>
      </FadeInFromRight>

      {/* Why Organic Nation */}
      <FadeInFromRight>
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-lg">
          <h3 className="mb-4 flex items-center gap-2 text-base font-bold text-gray-900">
            <span className="h-1 w-5 rounded-full bg-linear-to-r from-amber-500 to-orange-500" />
            Why Organic Nation?
          </h3>
          <ul className="space-y-2.5">
            {[
              "Direct from Farm to Table",
              "No Artificial Preservatives",
              "Eco-Friendly Packaging",
              "Fast & Reliable Delivery",
              "Assured Quality",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-2 text-sm text-gray-700"
              >
                <span className="mt-0.5 text-green-600">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/shop/all"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-linear-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:from-amber-600 hover:to-orange-600 hover:shadow-lg"
          >
            Shop Now <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </FadeInFromRight>
    </>
  );
}
