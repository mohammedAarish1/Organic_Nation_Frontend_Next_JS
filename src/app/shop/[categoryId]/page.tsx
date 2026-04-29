import { Suspense } from "react";
import ShopClient from "@/components/shop/ShopClient";
import SectionHeader from "@/components/common/SectionHeader";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { categoryId: string };
}): Promise<Metadata> {
  const { categoryId: category } = await params;
  // const category = await getCategory(category)
  return {
    title: `${category.replaceAll("-", " ").replace("%26", "and").toUpperCase()} — Shop Online at Organic Nation`,
    description: `Explore our collection of ${category}.Best prices guaranteed.`,
    openGraph: {
      title: category,
      description: `Shop ${category} online at Organic Nation`,
      url: `https://organicnation.co.in/shop/${category}`,
      images: [{ url: "", width: 1200, height: 630, alt: category }],
      type: "website",
    },
  };
}

export default async function ShopPage({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) {
  const { categoryId } = await params;
  const category = decodeURIComponent(categoryId || "all").toLowerCase();

  return (
    <div className="min-h-screen bg-[#FAFAF7] pt-20">
      {/* Hero — server rendered */}
      <section className="relative overflow-hidden border-b border-[#EDE8DF] bg-linear-to-br from-amber-50 via-[#FAFAF7] to-emerald-50 py-14">
        {/* Subtle grain overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            subTitle="Premium Organic Products"
            title="Shop Our Collection"
            content="Discover handpicked organic treasures"
          />
        </div>
      </section>

      {/* Shop content — client */}
      <Suspense fallback={<ShopLoadingSkeleton />}>
        <ShopClient categoryId={category} />
      </Suspense>
    </div>
  );
}

// ─── Loading skeleton ──────────────────────────────────────────────────────────

function ShopLoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Sticky bar skeleton */}
      <div className="mb-6 h-12 w-full animate-pulse rounded-xl bg-[#F0EBE0]" />

      <div className="flex gap-6">
        {/* Sidebar skeleton */}
        <div className="hidden w-56 shrink-0 lg:block">
          <div className="space-y-3 rounded-2xl">
            <div className="h-4 w-24 animate-pulse rounded-full bg-[#F0EBE0]" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 animate-pulse rounded-lg bg-[#F0EBE0]"
              />
            ))}
            <div className="mt-4 h-4 w-20 animate-pulse rounded-full bg-[#F0EBE0]" />
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-9 animate-pulse rounded-lg bg-[#F0EBE0]"
              />
            ))}
          </div>
        </div>

        {/* Grid skeleton */}
        <div className="flex-1">
          <div className="mb-4 h-4 w-32 animate-pulse rounded-full bg-[#F0EBE0]" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-2xl border border-[#EDE8DF] bg-white"
              >
                <div className="aspect-square animate-pulse bg-[#F5F2EC]" />
                <div className="space-y-2 p-3.5">
                  <div className="h-3 w-16 animate-pulse rounded-full bg-[#F0EBE0]" />
                  <div className="h-4 w-4/5 animate-pulse rounded-full bg-[#F0EBE0]" />
                  <div className="h-5 w-20 animate-pulse rounded-full bg-[#F0EBE0]" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
