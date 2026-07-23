// "use client";
// import { ArrowRight } from "lucide-react";
// import ProductCard from "../common/ProductCard";
// import Link from "next/link";
// import { useProducts } from "../providers/ProductsProvider";

// // Main Server Component
// export default function FeaturedProducts() {
//   const { products } = useProducts();

//   const featured = products?.filter((p) => p.meta.best_seller);

//   return (
//     <section className="relative overflow-hidden bg-linear-to-b from-amber-50/30 to-white py-12 sm:py-16">
//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//         {/* Section Header */}
//         <div className="mb-8 sm:mb-12">
//           <div className="mb-4 inline-block rounded-full bg-linear-to-r from-amber-100 to-orange-100 px-4 py-2">
//             <span className="text-primary text-sm font-semibold">
//               ⭐ Handpicked for You
//             </span>
//           </div>
//           <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
//             <div>
//               <h2 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
//                 <span className="bg-gradient-text bg-clip-text text-transparent">
//                   Featured Products
//                 </span>
//               </h2>
//               <p className="text-muted text-base sm:text-lg">
//                 Discover our most loved organic treasures
//               </p>
//             </div>
//             <Link
//               href={"/shop/all"}
//               className="group hover:bg-primary flex items-center gap-2 rounded-full border-2 border-amber-700 px-6 py-3 font-semibold text-amber-700 transition-all hover:text-white"
//             >
//               View All
//               <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//             </Link>
//           </div>
//         </div>

//         {/* Products Grid */}
//         <div
//           // className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 "
//           className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 sm:gap-6"
//           style={{
//             scrollbarWidth: "none",
//             msOverflowStyle: "none",
//           }}
//         >
//           {featured?.map((product, index) => (
//             <div key={product["name-url"]} className="min-w-64">
//               <ProductCard product={product} index={index} />
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

"use client";

import { ArrowRight } from "lucide-react";
import ProductCard from "../common/ProductCard";
import Link from "next/link";
import { useProducts } from "../providers/ProductsProvider";
import ArrowButtonWrapper from "../common/ArrowButtonWrapper";

// Stays as a Client Component only because of useProducts hook
export default function FeaturedProducts() {
  const { products } = useProducts();

  const featured = products?.filter((p) => p.meta.best_seller);

  return (
    <section className="relative overflow-hidden bg-linear-to-b from-amber-50/30 to-white py-4">
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
              href="/shop/all"
              className="group hover:bg-primary flex items-center gap-2 rounded-full border-2 border-amber-700 px-6 py-3 font-semibold text-amber-700 transition-all hover:text-white"
            >
              View All
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Scrollable Products */}
        <ArrowButtonWrapper scrollAmount={280}>
          {featured?.map((product, index) => (
            <div key={product["name-url"]} className="min-w-64 snap-start">
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </ArrowButtonWrapper>
      </div>
    </section>
  );
}
