"use client";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import Link from "next/link";
import AddToCartBtn from "./AddToCartBtn";
import WishlistBtn from "./WishlistBtn";
import Image from "next/image";

const ProductCardAlternate = ({ item, idx }) => {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.05 }}
      whileHover={{
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      }}
      className="group overflow-hidden rounded-2xl border border-gray-200 bg-white"
    >
      <Link
        href={`/shop/${item["category-url"]?.toLowerCase()}/${item["name-url"]}`}
        className="absolute inset-0 z-0"
        aria-label={`View ${item.name}`}
      />

      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <Image src={item.img[0].lg} alt={item.name} width={500} height={400} />

        {/* Tag Badge */}
        {item.tag && (
          <motion.span
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            className={`absolute top-3 left-3 rounded-full px-2 py-1 text-xs font-bold text-white ${
              item.tag === "Bestseller"
                ? "bg-purple-500"
                : item.tag === "New"
                  ? "bg-blue-500"
                  : item.tag === "Hot Deal"
                    ? "bg-red-500"
                    : "bg-orange-500"
            }`}
          >
            {item.tag}
          </motion.span>
        )}

        {/* Discount Badge */}
        <span className="absolute top-3 right-3 rounded-full bg-orange-500 px-2 py-1 text-xs font-bold text-white">
          {item.discount}% OFF
        </span>

        {/* Quick Actions */}
        <div className="absolute right-3 bottom-3 left-3 flex gap-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <AddToCartBtn
            product={item}
            quantity={1}
            extraClasses="flex-1 py-1"
          />
        </div>
        <div className="absolute top-3 left-3">
          <WishlistBtn
            productId={item["name-url"]}
            extraClasses="px-2 py-1"
            size={26}
          />
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Rating */}
        {item.reviewsAndRating && (
          <div className="mb-2 flex items-center gap-2">
            <div className="flex items-center gap-1 rounded bg-green-50 px-2 py-0.5">
              <Star size={12} fill="#22C55E" color="#22C55E" />
              <span className="text-xs font-semibold text-green-700">
                {item.reviewsAndRating.averageRating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({item.reviewsAndRating.totalReviews})
            </span>
          </div>
        )}

        {/* Name */}
        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 transition-colors group-hover:text-orange-600">
          {item.name}
        </h3>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{Math.round(item.price - (item.price * item.discount) / 100)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ₹{item.price}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCardAlternate;
