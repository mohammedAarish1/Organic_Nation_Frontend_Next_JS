"use client";

import { Star } from "lucide-react";
import { useState } from "react";
// import { useDispatch } from "react-redux";
import AddToCartBtn from "./AddToCartBtn";
import Link from "next/link";
import Image from "next/image";
import WishlistBtn from "./WishlistBtn";
import { Product } from "@/types";

export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  // const dispatch = useDispatch();
  // const [isWishlisted, setIsWishlisted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  // const discount = Math.round(
  //   ((product.originalPrice - product.price) / product.originalPrice) * 100,
  // );
  //  const mainImage = product.img?.[0];
  const mainImage = product.img?.filter((image) =>
    image.lg.includes("front"),
  )[0];

  return (
    <div
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
      style={{
        animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
      }}
    >
      <Link
        href={`/shop/${product["category-url"]?.toLowerCase()}/${product["name-url"]}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${product.name}`}
      />
      {/* Badge */}
      {product.meta.best_seller && (
        <div className="bg-gradient-btn absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
          {product.meta.best_seller && "Best Seller"}
        </div>
      )}

      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistBtn productId={product["name-url"]} extraClasses="" />
      </div>

      {/* <button
        onClick={() => setIsWishlisted(!isWishlisted)}
        className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110"
        aria-label="Add to wishlist"
      >
        <Heart
          className={`h-5 w-5 transition-colors ${
            isWishlisted ? "fill-red-500 text-red-500" : "text-muted"
          }`}
        />
      </button> */}

      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
        {!imageLoaded && (
          <div className="absolute inset-0 animate-pulse bg-linear-to-br from-gray-200 to-gray-300" />
        )}

        <Image
          src={mainImage?.lg}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          // quality={80}
          placeholder="blur"
          blurDataURL={mainImage?.blur}
          className="object-contain transition-all duration-500 group-hover:scale-110"
        />

        {/* Quick View Overlay */}
        {/* <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <button className="text-primary rounded-full bg-white px-6 py-2 font-semibold transition-transform hover:scale-105">
            Quick View
          </button>
        </div> */}
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-2 sm:p-4">
        {/* Category */}
        <span className="text-muted mb-1 text-xs font-medium">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-secondary mb-1 line-clamp-2 text-xs font-bold sm:mb-2 sm:text-lg">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="mb-1 flex items-center gap-2 sm:mb-3">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-secondary text-sm font-semibold">
              {product.reviewsAndRating.averageRating}
            </span>
          </div>
          <span className="text-muted text-xs">
            ({product.reviewsAndRating.totalReviews} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="mb-2 flex flex-wrap items-baseline gap-2">
          <span className="text-secondary text-sm font-semibold sm:text-2xl">
            ₹
            {Math.round(
              product.price - (product.price * product.discount) / 100,
            )}
          </span>
          <span className="text-muted text-xs line-through sm:text-sm">
            ₹{product.price}
          </span>
          {product.discount > 0 && (
            <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
              {product.discount}% OFF
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <AddToCartBtn
          product={product}
          quantity={1}
          extraClasses="py-2 sm:py-3"
        />
      </div>
    </div>
  );
}
