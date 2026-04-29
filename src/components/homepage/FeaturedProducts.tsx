"use client";
import { ArrowRight } from "lucide-react";
import ProductCard from "../common/ProductCard";
import Link from "next/link";
import { useProducts } from "../providers/ProductsProvider";

// Main Server Component
export default function FeaturedProducts() {
  const { products } = useProducts();
  // In your actual implementation, fetch this data from your API/database
  // const featuredProducts = [
  //   {
  //     id: 1,
  //     name: "Raw Organic Honey",
  //     category: "Honey",
  //     price: 499,
  //     originalPrice: 599,
  //     rating: 4.8,
  //     reviews: 234,
  //     image:
  //       "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/honey.webp",
  //     badge: "Bestseller",
  //     inStock: true,
  //   },
  //   {
  //     id: 2,
  //     name: "Mango Pickle",
  //     category: "Pickles",
  //     price: 299,
  //     originalPrice: 399,
  //     rating: 4.9,
  //     reviews: 456,
  //     image:
  //       "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/pickle.webp",
  //     badge: "Limited",
  //     inStock: true,
  //   },
  //   {
  //     id: 3,
  //     name: "Steel Cut Oats",
  //     category: "Oats",
  //     price: 249,
  //     originalPrice: 299,
  //     rating: 4.7,
  //     reviews: 189,
  //     image:
  //       "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/oats.webp",
  //     badge: "New",
  //     inStock: true,
  //   },
  //   {
  //     id: 4,
  //     name: "Organic Green Tea",
  //     category: "Tea",
  //     price: 349,
  //     originalPrice: 449,
  //     rating: 4.6,
  //     reviews: 312,
  //     image:
  //       "https://organicnationmages.s3.ap-south-1.amazonaws.com/category_carousel_new/reduced-quality/tea.webp",
  //     badge: "Popular",
  //     inStock: true,
  //   },
  // ];

  // const {products}=useAppSelector(state=>state.products)

  const featured = products?.filter((p) => p.meta.best_seller);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-amber-50/30 to-white py-12 sm:py-16 lg:py-20">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-4 inline-block rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-4 py-2">
            <span className="text-primary text-sm font-semibold">
              ⭐ Handpicked for You
            </span>
          </div>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
                <span className="bg-gradient-text bg-clip-text text-transparent">
                  Featured Products
                </span>
              </h2>
              <p className="text-muted text-base sm:text-lg">
                Discover our most loved organic treasures
              </p>
            </div>
            <Link
              href={"/shop/all"}
              className="group hover:bg-primary flex items-center gap-2 rounded-full border-2 border-amber-700 px-6 py-3 font-semibold text-amber-700 transition-all hover:text-white"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div
          // className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 "
          className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 sm:gap-6"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {featured?.map((product, index) => (
            <div key={product["name-url"]} className="min-w-64">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
