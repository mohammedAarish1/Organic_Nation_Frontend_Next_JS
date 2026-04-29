// "use client";

// import { useGetCategoriesQuery } from "@/lib/services/api/productsApi";
// import { getCatogoriesWithImages } from "@/lib/utils";
// import { AnimatePresence, motion } from "framer-motion";
// import { ChevronDown } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";
// const ShopMenu = () => {
//   const [isShopHovered, setIsShopHovered] = useState(false);
//   const {data,isLoading,error}=useGetCategoriesQuery()

//   const categories=getCatogoriesWithImages(data?.categories)

//   if(isLoading){
//     <div>Loading...</div>
//   }

//   return (
//     <div
//       className="relative"
//       onMouseEnter={() => setIsShopHovered(true)}
//       onMouseLeave={() => setIsShopHovered(false)}
//     >
//       <Link href={"/shop"}>
//         <motion.button
//           className="group relative flex cursor-pointer items-center gap-1 font-medium text-gray-700 hover:text-amber-700"
//           whileHover={{ y: -2 }}
//         >
//           Shop <ChevronDown className="h-4 w-4" />
//           <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#7A7D3F] transition-all duration-300 group-hover:w-full" />
//         </motion.button>
//       </Link>
//       {/* Mega Menu */}
//       <AnimatePresence>
//         {isShopHovered && (
//           <motion.div
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: 10 }}
//             transition={{ duration: 0.2 }}
//             className="absolute top-full left-1/2 mt-2 w-[600px] -translate-x-1/2 rounded-2xl border border-[#E8DCC4] bg-white p-6 shadow-2xl"
//           >
//             <div className="grid grid-cols-3 gap-4">
//               {categories.map((category, i) => (
//                 <motion.a
//                   key={i}
//                   href={`#${category["category-url"].toLowerCase().replace(/\s+/g, "-")}`}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   transition={{ delay: i * 0.03 }}
//                   whileHover={{ x: 5, backgroundColor: "#F5F5DC" }}
//                   className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition-all hover:shadow-md"
//                 >
//                   <Image
//                     src={category.image}
//                     alt={category.cateogry}
//                     width={40}
//                     height={20}
//                   />
//                   {/* <span className="text-2xl">{category.icon}</span> */}
//                   <span className="text-sm font-medium text-[#3E2723]">
//                     {category.category}
//                   </span>
//                 </motion.a>
//               ))}
//             </div>
//             <div className="mt-4 border-t border-[#E8DCC4] pt-4">
//               <motion.a
//                 href="#all-products"
//                 whileHover={{ x: 5 }}
//                 className="flex items-center gap-2 font-semibold text-[#7A7D3F] transition-all hover:gap-3"
//               >
//                 View All Products →
//               </motion.a>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default ShopMenu;
