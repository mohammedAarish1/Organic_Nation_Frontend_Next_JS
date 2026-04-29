// "use client";

// import { useState } from "react";
// import { motion } from "framer-motion";
// import { Heart, ShoppingCart, Star } from "lucide-react";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   originalPrice: number;
//   rating: number;
//   reviews: number;
//   image: string;
//   badge: string;
// }

// interface ProductCardListProps {
//   product: Product;
// }

// export default function ProductCardList({ product }: ProductCardListProps) {
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const discount = Math.round(
//     ((product.originalPrice - product.price) / product.originalPrice) * 100
//   );

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -20 }}
//       animate={{ opacity: 1, x: 0 }}
//       className="group flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:flex-row"
//     >
//       {/* Image */}
//       <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 sm:w-48">
//         <div className="absolute top-2 left-2 z-10 rounded-full bg-gradient-to-r from-amber-600 to-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
//           {product.badge}
//         </div>
//         <button
//           onClick={() => setIsWishlisted(!isWishlisted)}
//           className="absolute top-2 right-2 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-gray-100"
//         >
//           <Heart
//             className={`h-4 w-4 ${
//               isWishlisted ? "fill-red-500 text-red-500" : "text-gray-400"
//             }`}
//           />
//         </button>
//       </div>

//       {/* Content */}
//       <div className="flex flex-1 flex-col justify-between">
//         <div>
//           <span className="text-xs font-medium text-gray-500">
//             {product.category}
//           </span>
//           <h3 className="mb-2 text-lg font-semibold text-gray-900">
//             {product.name}
//           </h3>
//           <div className="mb-3 flex items-center gap-2">
//             <div className="flex items-center gap-1">
//               <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
//               <span className="text-sm font-medium">{product.rating}</span>
//             </div>
//             <span className="text-xs text-gray-500">({product.reviews})</span>
//           </div>
//         </div>

//         <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//           <div className="flex items-baseline gap-2">
//             <span className="text-2xl font-bold text-gray-900">
//               ₹{product.price}
//             </span>
//             <span className="text-sm text-gray-400 line-through">
//               ₹{product.originalPrice}
//             </span>
//             <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
//               {discount}% OFF
//             </span>
//           </div>
//           <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-red-700 px-6 py-2.5 font-semibold text-white shadow-sm transition-all hover:shadow-md">
//             <ShoppingCart className="h-4 w-4" />
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </motion.div>
//   );
// }

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Star } from "lucide-react";
import AddToCartBtn from "../common/AddToCartBtn";
import Image from "next/image";
import WishlistBtn from "../common/WishlistBtn";
import { Product } from "@/types";

// interface Product {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   originalPrice: number;
//   rating: number;
//   reviews: number;
//   image: string;
//   badge: string;
// }

// interface ProductCardListProps {
//   product: Product;
// }

export default function ProductCardList({ product }: { product: Product }) {
  // const discount = Math.round(
  //   ((product.originalPrice - product.price) / product.originalPrice) * 100
  // );

  const mainImage = product.img?.filter((image) =>
    image.lg.includes("front"),
  )[0];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex flex-col gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 transition-all hover:shadow-md sm:flex-row"
    >
      {/* Image */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 sm:w-48">
        <div className="absolute top-2 left-2 z-10 rounded-full bg-gradient-to-r from-amber-600 to-red-600 px-3 py-1 text-xs font-bold text-white shadow-sm">
          {product.badge}
        </div>
        <div className="absolute top-3 right-3 z-10">
          <WishlistBtn productId={product["name-url"]} extraClasses="" />
        </div>

        <Image
          src={mainImage?.lg}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          quality={80}
          placeholder="blur"
          blurDataURL={mainImage?.blur}
          className="object-contain transition-all duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between">
        <div>
          <span className="text-xs font-medium text-gray-500">
            {product.category}
          </span>
          <h3 className="mb-2 text-lg font-semibold text-gray-900">
            {product.name}
          </h3>
          <div className="mb-3 flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="text-sm font-medium">
                {product.reviewsAndRating.averageRating}
              </span>
            </div>
            <span className="text-xs text-gray-500">
              ({product.reviewsAndRating.totalReviews} reviews){" "}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-400 line-through">
              ₹{product.price}
            </span>
            <span className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-semibold text-green-700">
              {product.discount}% OFF
            </span>
          </div>
          <AddToCartBtn product={product} quantity={1} />

          {/* <button className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-red-700 px-6 py-2.5 font-semibold text-white shadow-sm transition-all hover:shadow-md">
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button> */}
        </div>
      </div>
    </motion.div>
  );
}
