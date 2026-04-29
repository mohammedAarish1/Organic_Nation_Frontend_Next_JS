// import Link from "next/link";

// export default function Categories(){
//     return (
//          <div
//             ref={scrollRef}
//             onScroll={handleScroll}
//             className="scrollbar-hide flex snap-x snap-mandatory gap-4 overflow-x-auto py-4 sm:gap-6"
//             style={{
//               scrollbarWidth: "none",
//               msOverflowStyle: "none",
//             }}
//           >
//             {categories.map((item, index) => (
//               <Link
//                 href={`/shop/${item.category.toLowerCase()}`}
//                 key={item.category}
//                 className="group relative flex shrink-0 snap-center flex-col items-center"
//                 onMouseEnter={() => setHoveredIndex(index)}
//                 onMouseLeave={() => setHoveredIndex(null)}
//               >
//                 <motion.div
//                   whileHover={{ y: -8 }}
//                   transition={{ type: "spring", stiffness: 400, damping: 17 }}
//                   className="relative"
//                 >
//                   {/* Gradient Background on Hover */}
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
//                     className={`absolute -inset-2 -z-10 rounded-full bg-linear-to-br ${item.gradient} blur-xl`}
//                   />

//                   {/* Category Circle */}
//                   <div
//                     className={`relative flex h-20 w-20 items-center justify-center rounded-full border-3 transition-all duration-300 sm:h-24 sm:w-24 md:h-28 md:w-28 ${
//                       hoveredIndex === index
//                         ? "border-amber-600 bg-white shadow-2xl"
//                         : "border-amber-400 bg-white shadow-lg"
//                     }`}
//                   >
//                     <div className="relative h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16">
//                       <Image
//                         src={item.icon}
//                         alt={`${item.name} category`}
//                         fill
//                         sizes="(max-width: 640px) 48px, (max-width: 768px) 56px, 64px"
//                         className="object-contain"
//                         loading="lazy"
//                       />
//                     </div>

//                     {/* Floating Animation Elements */}
//                     <AnimatePresence>
//                       {hoveredIndex === index && (
//                         <>
//                           <motion.div
//                             initial={{ scale: 0, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0, opacity: 0 }}
//                             className="absolute -top-1 -right-1 text-xl"
//                           >
//                             ✨
//                           </motion.div>
//                           <motion.div
//                             initial={{ scale: 0, opacity: 0 }}
//                             animate={{ scale: 1, opacity: 1 }}
//                             exit={{ scale: 0, opacity: 0 }}
//                             transition={{ delay: 0.1 }}
//                             className="absolute -bottom-1 -left-1 text-xl"
//                           >
//                             🌟
//                           </motion.div>
//                         </>
//                       )}
//                     </AnimatePresence>
//                   </div>
//                 </motion.div>

//                 {/* Category Name */}
//                 <motion.span
//                   animate={{
//                     scale: hoveredIndex === index ? 1.05 : 1,
//                     color: hoveredIndex === index ? "#92400e" : "#78350f",
//                   }}
//                   className="mt-3 max-w-20 text-center text-sm font-semibold transition-all duration-300 sm:text-base md:max-w-[100px]"
//                 >
//                   {item.name}
//                 </motion.span>

//                 {/* Hover Indicator */}
//                 <motion.div
//                   initial={{ scaleX: 0 }}
//                   animate={{ scaleX: hoveredIndex === index ? 1 : 0 }}
//                   className="mt-1 h-0.5 w-12 rounded-full bg-linear-to-r from-amber-600 to-red-600"
//                 />
//               </Link>
//             ))}
//           </div>
//     )
// }
