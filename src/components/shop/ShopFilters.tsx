// "use client";

// import { X } from "lucide-react";
// import { useRouter } from "next/navigation";

// interface PriceRange {
//   label: string;
//   value: string;
//   min: number;
//   max: number;
// }

// interface ShopFiltersProps {
//   categories: string[];
//   selectedCategory: string;
//   setSelectedCategory: (category: string) => void;
//   sortBy: string;
//   setSortBy: (sort: string) => void;
//   priceRanges: PriceRange[];
//   selectedPriceRanges: string[];
//   setSelectedPriceRanges: (ranges: string[]) => void;
//   hasActiveFilters: boolean;
//   clearFilters: () => void;
//   setCurrentPage: (page: number) => void;
//   isOpen: boolean;
//   setIsOpen: (isOpen: boolean) => void;
// }

// export default function ShopFilters({
//   categories,
//   selectedCategory,
//   setSelectedCategory,
//   sortBy,
//   setSortBy,
//   priceRanges,
//   selectedPriceRanges,
//   setSelectedPriceRanges,
//   hasActiveFilters,
//   clearFilters,
//   setCurrentPage,
//   isOpen,
//   setIsOpen,
// }: ShopFiltersProps) {
//   const router = useRouter();
//   const handlePriceRangeChange = (rangeValue: string) => {
//     const updatedRanges = selectedPriceRanges.includes(rangeValue)
//       ? selectedPriceRanges.filter((range) => range !== rangeValue)
//       : [...selectedPriceRanges, rangeValue];

//     setSelectedPriceRanges(updatedRanges);
//     setCurrentPage(1);
//   };
//   const handleCategoryFilter = (categoryUrl) => {
//     setSelectedCategory(categoryUrl.toLowerCase());
//     setCurrentPage(1);
//     setIsOpen(false);
//     // router.push(`/shop/${categoryUrl.toLowerCase()}`);
//   };

//   return (
//     <>
//       {/* Overlay for mobile */}
//       {isOpen && (
//         <div
//           onClick={() => setIsOpen(false)}
//           className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
//         />
//       )}

//       {/* Filters Sidebar */}
//       <aside
//         className={`fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-3xl bg-white p-6 shadow-2xl transition-transform duration-300 lg:static lg:z-0 lg:max-h-none lg:w-64 lg:shrink-0 lg:translate-y-0 lg:rounded-2xl lg:shadow-sm lg:ring-1 lg:ring-gray-100 ${
//           isOpen ? "translate-y-0" : "translate-y-full lg:translate-y-0"
//         }`}
//       >
//         <div className="mb-4 flex items-center justify-between lg:hidden">
//           <h2 className="text-lg font-bold text-gray-900">Filters</h2>
//           <button onClick={() => setIsOpen(false)}>
//             <X className="h-6 w-6 text-gray-500" />
//           </button>
//         </div>

//         <div className="space-y-6">
//           {/* Clear Filters */}
//           {hasActiveFilters && (
//             <button
//               onClick={() => {
//                 clearFilters();
//                 setIsOpen(false);
//               }}
//               className="flex w-full items-center justify-center gap-2 rounded-full border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-100"
//             >
//               <X className="h-4 w-4" />
//               Clear Filters
//             </button>
//           )}

//           {/* Categories */}
//           <div>
//             <h3 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase">
//               Category
//             </h3>
//             <div className="space-y-1">
//               {categories.map((category) => (
//                 <button
//                   key={category.category}
//                   // onClick={() => {
//                   //   setSelectedCategory(category.categoryUrl);
//                   //   setCurrentPage(1);
//                   //   setIsOpen(false);
//                   // }}
//                   onClick={() => handleCategoryFilter(category.categoryUrl)}
//                   className={`w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium transition-all ${
//                     selectedCategory === category.categoryUrl.toLowerCase()
//                       ? "bg-gradient-to-r from-amber-600 to-red-700 text-white shadow-sm"
//                       : "text-gray-700 hover:bg-gray-50"
//                   }`}
//                 >
//                   {category.category}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Sort By */}
//           <div>
//             <h3 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase">
//               Sort By
//             </h3>
//             <select
//               value={sortBy}
//               onChange={(e) => {
//                 setSortBy(e.target.value);
//                 setCurrentPage(1);
//                 setIsOpen(false);
//               }}
//               className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm transition-all focus:border-amber-500 focus:ring-2 focus:ring-amber-200 focus:outline-none"
//             >
//               <option value="default">Default</option>
//               <option value="name-asc">Name (A-Z)</option>
//               <option value="name-desc">Name (Z-A)</option>
//               <option value="price-asc">Price (Low to High)</option>
//               <option value="price-desc">Price (High to Low)</option>
//             </select>
//           </div>

//           {/* Price Range with Checkboxes */}
//           <div>
//             <h3 className="mb-3 text-sm font-bold tracking-wide text-gray-500 uppercase">
//               Price Range
//             </h3>
//             <div className="space-y-2.5">
//               {priceRanges.map((range) => (
//                 <label
//                   key={range.value}
//                   className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-gray-50"
//                 >
//                   <input
//                     type="checkbox"
//                     checked={selectedPriceRanges.includes(range.value)}
//                     onChange={() => handlePriceRangeChange(range.value)}
//                     className="h-4 w-4 cursor-pointer rounded border-gray-300 text-amber-600 focus:ring-2 focus:ring-amber-500 focus:ring-offset-0"
//                   />
//                   <span className="text-sm text-gray-700">{range.label}</span>
//                 </label>
//               ))}
//             </div>
//           </div>
//         </div>
//       </aside>
//     </>
//   );
// }
