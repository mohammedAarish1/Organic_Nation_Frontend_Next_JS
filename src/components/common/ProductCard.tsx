// // "use client";

// // import { Star } from "lucide-react";
// // import { useState } from "react";
// // // import { useDispatch } from "react-redux";
// // import AddToCartBtn from "./AddToCartBtn";
// // import Link from "next/link";
// // import Image from "next/image";
// // import WishlistBtn from "./WishlistBtn";
// // import { Product } from "@/types";

// // export default function ProductCard({
// //   product,
// //   index,
// // }: {
// //   product: Product;
// //   index: number;
// // }) {
// //   // const dispatch = useDispatch();
// //   // const [isWishlisted, setIsWishlisted] = useState(false);
// //   const [imageLoaded, setImageLoaded] = useState(false);

// //   // const discount = Math.round(
// //   //   ((product.originalPrice - product.price) / product.originalPrice) * 100,
// //   // );
// //   //  const mainImage = product.img?.[0];
// //   const mainImage = product.img?.filter((image) =>
// //     image.lg.includes("front"),
// //   )[0];

// //   return (
// //     <div
// //       className="group relative flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:shadow-xl"
// //       style={{
// //         animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`,
// //       }}
// //     >
// //       <Link
// //         href={`/shop/${product["category-url"]?.toLowerCase()}/${product["name-url"]}`}
// //         className="absolute inset-0 z-1"
// //         aria-label={`View ${product.name}`}
// //       />
// //       {/* Badge */}
// //       {product.meta.best_seller && (
// //         <div className="bg-gradient-btn absolute top-3 left-3 z-10 rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
// //           {product.meta.best_seller && "Best Seller"}
// //         </div>
// //       )}

// //       {/* Wishlist Button */}
// //       <div className="absolute top-3 right-3 z-10">
// //         <WishlistBtn productId={product["name-url"]} extraClasses="" />
// //       </div>

// //       {/* <button
// //         onClick={() => setIsWishlisted(!isWishlisted)}
// //         className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow-md backdrop-blur-sm transition-all hover:scale-110"
// //         aria-label="Add to wishlist"
// //       >
// //         <Heart
// //           className={`h-5 w-5 transition-colors ${
// //             isWishlisted ? "fill-red-500 text-red-500" : "text-muted"
// //           }`}
// //         />
// //       </button> */}

// //       {/* Product Image */}
// //       <div className="relative aspect-square overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
// //         {!imageLoaded && (
// //           <div className="absolute inset-0 animate-pulse bg-linear-to-br from-gray-200 to-gray-300" />
// //         )}

// //         <Image
// //           src={mainImage?.lg}
// //           alt={product.name}
// //           fill
// //           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
// //           // quality={80}
// //           placeholder="blur"
// //           blurDataURL={mainImage?.blur}
// //           className="object-contain transition-all duration-500 group-hover:scale-110"
// //         />

// //         {/* Quick View Overlay */}
// //         {/* <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
// //           <button className="text-primary rounded-full bg-white px-6 py-2 font-semibold transition-transform hover:scale-105">
// //             Quick View
// //           </button>
// //         </div> */}
// //       </div>

// //       {/* Product Info */}
// //       <div className="flex flex-1 flex-col p-2 sm:p-4">
// //         {/* Category */}
// //         <span className="text-muted mb-1 text-xs font-medium">
// //           {product.category}
// //         </span>

// //         {/* Product Name */}
// //         <h3 className="text-secondary mb-1 line-clamp-1 text-xs font-bold sm:mb-2 sm:text-lg">
// //           {product.name}
// //         </h3>

// //         {/* Rating */}
// //         <div className="mb-1 flex items-center gap-2 sm:mb-3">
// //           <div className="flex items-center gap-1">
// //             <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
// //             <span className="text-secondary text-sm font-semibold">
// //               {product.reviewsAndRating.averageRating}
// //             </span>
// //           </div>
// //           <span className="text-muted text-xs">
// //             ({product.reviewsAndRating.totalReviews} reviews)
// //           </span>
// //         </div>

// //         {/* Price */}
// //         <div className="mb-2 flex flex-wrap items-baseline gap-2">
// //           <span className="text-secondary text-sm font-semibold sm:text-2xl">
// //             ₹
// //             {Math.round(
// //               product.price - (product.price * product.discount) / 100,
// //             )}
// //           </span>
// //           <span className="text-muted text-xs line-through sm:text-sm">
// //             ₹{product.price}
// //           </span>
// //           {product.discount > 0 && (
// //             <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700">
// //               {product.discount}% OFF
// //             </span>
// //           )}
// //         </div>

// //         {/* Add to Cart Button */}
// //         <AddToCartBtn
// //           product={product}
// //           quantity={1}
// //           extraClasses="py-2 sm:py-3"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { Star } from "lucide-react";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import AddToCartBtn from "./AddToCartBtn";
// import Link from "next/link";
// import Image from "next/image";
// import WishlistBtn from "./WishlistBtn";
// import { Product } from "@/types";

// // ─────────────────────────────────────────────────────────────────────────────
// // ProductCard
// //
// // - Staggered scroll-reveal entrance (whileInView) instead of a fixed CSS
// //   keyframe delay — feels intentional rather than "everything pops at once".
// // - Image zooms + a soft gradient sweeps in on hover, with a "View Product"
// //   pill that slides up from the bottom.
// // - Best Seller badge now has a subtle shimmer/pulse.
// // - Price block restyled with a bolder gradient-highlighted final price.
// // ─────────────────────────────────────────────────────────────────────────────
// export default function ProductCard({
//   product,
//   index,
// }: {
//   product: Product;
//   index: number;
// }) {
//   const [imageLoaded, setImageLoaded] = useState(false);

//   const mainImage = product.img?.filter((image) =>
//     image.lg.includes("front"),
//   )[0];

//   const finalPrice = Math.round(
//     product.price - (product.price * product.discount) / 100,
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 28 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, margin: "-40px" }}
//       transition={{
//         duration: 0.5,
//         delay: Math.min(index, 8) * 0.06,
//         ease: [0.22, 1, 0.36, 1],
//       }}
//       whileHover={{ y: -6 }}
//       className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-shadow duration-300 hover:shadow-2xl"
//     >
//       <Link
//         href={`/shop/${product["category-url"]?.toLowerCase()}/${product["name-url"]}`}
//         className="absolute inset-0 z-10"
//         aria-label={`View ${product.name}`}
//       />

//       {/* Best Seller badge */}
//       {product.meta.best_seller && (
//         <div className="bg-gradient-btn absolute top-3 left-3 z-20 flex items-center gap-1 overflow-hidden rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
//           <span className="relative z-10">Best Seller</span>
//           {/* shimmer sweep */}
//           <span className="animate-shimmer absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
//         </div>
//       )}

//       {/* Discount ribbon */}
//       {product.discount > 0 && (
//         <div className="absolute top-3 right-12 z-20 rounded-full bg-emerald-500 px-2.5 py-1 text-xs font-bold text-white shadow-lg">
//           -{product.discount}%
//         </div>
//       )}

//       {/* Wishlist */}
//       <div className="absolute top-3 right-3 z-20">
//         <WishlistBtn productId={product["name-url"]} extraClasses="" />
//       </div>

//       {/* Image */}
//       <div className="relative aspect-square overflow-hidden bg-linear-to-br from-amber-50 to-orange-50">
//         {!imageLoaded && (
//           <div className="absolute inset-0 animate-pulse bg-linear-to-br from-gray-200 to-gray-300" />
//         )}

//         <Image
//           src={mainImage?.lg}
//           alt={product.name}
//           fill
//           sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//           placeholder="blur"
//           blurDataURL={mainImage?.blur}
//           onLoad={() => setImageLoaded(true)}
//           className="object-contain transition-transform duration-500 ease-out group-hover:scale-110"
//         />

//         {/* Hover gradient + "View Product" pill */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
//         <div className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 translate-y-6 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
//           <span className="rounded-full bg-white px-4 py-1.5 text-xs font-semibold text-gray-900 shadow-lg">
//             View Product
//           </span>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="relative z-20 flex flex-1 flex-col p-2 sm:p-4">
//         <span className="text-muted mb-1 text-xs font-medium">
//           {product.category}
//         </span>

//         <h3 className="text-secondary mb-1 line-clamp-1 text-xs font-bold sm:mb-2 sm:text-lg">
//           {product.name}
//         </h3>

//         {/* Rating */}
//         <div className="mb-1 flex items-center gap-2 sm:mb-3">
//           <div className="flex items-center gap-1">
//             <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
//             <span className="text-secondary text-sm font-semibold">
//               {product.reviewsAndRating.averageRating}
//             </span>
//           </div>
//           <span className="text-muted text-xs">
//             ({product.reviewsAndRating.totalReviews} reviews)
//           </span>
//         </div>

//         {/* Price */}
//         <div className="mb-2 flex flex-wrap items-baseline gap-2">
//           <span className="bg-gradient-text bg-clip-text text-sm font-bold text-transparent sm:text-2xl">
//             ₹{finalPrice}
//           </span>
//           {product.discount > 0 && (
//             <span className="text-muted text-xs line-through sm:text-sm">
//               ₹{product.price}
//             </span>
//           )}
//         </div>

//         <AddToCartBtn
//           product={product}
//           quantity={1}
//           extraClasses="py-2 sm:py-3 relative z-20"
//         />
//       </div>
//     </motion.div>
//   );
// }

// /*
//   Add this to your globals.css (once), for the Best Seller badge shimmer:

//   @keyframes shimmer {
//     100% { transform: translateX(100%); }
//   }
//   .animate-shimmer {
//     animation: shimmer 2.5s ease-in-out infinite;
//   }
// */

"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import AddToCartBtn from "./AddToCartBtn";
import Link from "next/link";
import Image from "next/image";
import WishlistBtn from "./WishlistBtn";
import { Product } from "@/types";

// ─────────────────────────────────────────────────────────────────────────────
// ProductCard
//
// Same data contract as before (product, index) — drop-in replacement.
// New:
//  - Framer Motion scroll-reveal (replaces the inline `animation: fadeInUp`)
//  - Subtle lift + shadow-glow on hover
//  - Image gets a soft zoom + slight rotate on hover
//  - Best-seller badge now has an animated shine sweep
//  - Discount pill gets a small "pop" entrance
// ─────────────────────────────────────────────────────────────────────────────
export default function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [imageLoaded, setImageLoaded] = useState(false);

  const mainImage = product.img?.filter((image) =>
    image.lg.includes("front"),
  )[0];

  const finalPrice = Math.round(
    product.price - (product.price * product.discount) / 100,
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.5,
        delay: (index % 8) * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/[0.03] transition-shadow duration-300 hover:shadow-2xl hover:ring-amber-200"
    >
      <Link
        href={`/shop/${product["category-url"]?.toLowerCase()}/${product["name-url"]}`}
        className="absolute inset-0 z-1"
        aria-label={`View ${product.name}`}
      />

      {/* Best Seller badge with shine sweep */}
      {product.meta.best_seller && (
        <div className="bg-gradient-btn absolute top-3 left-3 z-10 overflow-hidden rounded-full px-3 py-1 text-xs font-bold text-white shadow-lg">
          <span className="relative z-10">Best Seller</span>
          <span className="group-hover:animate-shine absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      )}

      {/* Wishlist Button */}
      <div className="absolute top-3 right-3 z-10">
        <WishlistBtn productId={product["name-url"]} extraClasses="" />
      </div>

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
          placeholder="blur"
          blurDataURL={mainImage?.blur}
          onLoad={() => setImageLoaded(true)}
          className="object-contain transition-transform duration-500 ease-out group-hover:scale-110 group-hover:rotate-1"
        />

        {/* Soft radial highlight on hover */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.5),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      </div>

      {/* Product Info */}
      <div className="flex flex-1 flex-col p-2 sm:p-4">
        {/* Category */}
        <span className="text-muted mb-1 text-xs font-medium">
          {product.category}
        </span>

        {/* Product Name */}
        <h3 className="text-secondary mb-1 line-clamp-1 text-xs font-bold sm:mb-2 sm:text-lg">
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
            ₹{finalPrice}
          </span>
          <span className="text-muted text-xs line-through sm:text-sm">
            ₹{product.price}
          </span>
          {product.discount > 0 && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + (index % 8) * 0.06, type: "spring" }}
              className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-bold text-green-700"
            >
              {product.discount}% OFF
            </motion.span>
          )}
        </div>

        {/* Add to Cart Button */}
        <AddToCartBtn
          product={product}
          quantity={1}
          extraClasses="py-2 sm:py-3"
        />
      </div>
    </motion.div>
  );
}

/*
  Add this keyframe to globals.css for the badge shine sweep:

  @keyframes shine {
    from { transform: translateX(-100%); }
    to   { transform: translateX(100%); }
  }
  .animate-shine {
    animation: shine 1.2s ease-in-out;
  }
*/
