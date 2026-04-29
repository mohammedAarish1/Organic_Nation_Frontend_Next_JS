// "use client";

// import { Search, Grid3x3, List, SlidersHorizontal } from "lucide-react";

// interface ShopControlsProps {
//   searchQuery: string;
//   setSearchQuery: (query: string) => void;
//   viewMode: "grid" | "list";
//   setViewMode: (mode: "grid" | "list") => void;
//   setCurrentPage: (page: number) => void;
//   onFilterClick: () => void;
// }

// export default function ShopControls({
//   searchQuery,
//   setSearchQuery,
//   viewMode,
//   setViewMode,
//   setCurrentPage,
//   onFilterClick,
// }: ShopControlsProps) {
//   return (
//     <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
//       {/* Search Bar */}
//       <div className="relative flex-1 sm:max-w-md">
//         <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
//         <input
//           type="text"
//           placeholder="Search products..."
//           value={searchQuery}
//           onChange={(e) => {
//             setSearchQuery(e.target.value);
//             setCurrentPage(1);
//           }}
//           className="w-full rounded-full border border-gray-200 py-3 pl-12 pr-4 transition-all focus:border-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-200"
//         />
//       </div>

//       {/* View Toggle and Filter Button */}
//       <div className="flex gap-2">
//         {/* Mobile Filter Button */}
//         <button
//           onClick={onFilterClick}
//           className="flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2.5 font-semibold text-gray-700 transition-all hover:bg-gray-50 lg:hidden"
//         >
//           <SlidersHorizontal className="h-5 w-5" />
//           Filters
//         </button>

//         {/* View Toggle */}
//         <div className="flex gap-1 rounded-full border border-gray-200 p-1">
//           <button
//             onClick={() => setViewMode("grid")}
//             className={`rounded-full p-2.5 transition-all ${
//               viewMode === "grid"
//                 ? "bg-gradient-to-r from-amber-600 to-red-700 text-white shadow-sm"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <Grid3x3 className="h-5 w-5" />
//           </button>
//           <button
//             onClick={() => setViewMode("list")}
//             className={`rounded-full p-2.5 transition-all ${
//               viewMode === "list"
//                 ? "bg-gradient-to-r from-amber-600 to-red-700 text-white shadow-sm"
//                 : "text-gray-600 hover:bg-gray-100"
//             }`}
//           >
//             <List className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
