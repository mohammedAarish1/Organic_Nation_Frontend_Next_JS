// "use client";

// import { ChevronLeft, ChevronRight } from "lucide-react";

// interface PaginationProps {
//   currentPage: number;
//   totalPages: number;
//   setCurrentPage: (page: number) => void;
// }

// export default function Pagination({
//   currentPage,
//   totalPages,
//   setCurrentPage,
// }: PaginationProps) {
//   const getPageNumbers = () => {
//     const pages = [];
//     const showPages = 5;

//     if (totalPages <= showPages) {
//       for (let i = 1; i <= totalPages; i++) {
//         pages.push(i);
//       }
//     } else {
//       if (currentPage <= 3) {
//         for (let i = 1; i <= 4; i++) pages.push(i);
//         pages.push('...');
//         pages.push(totalPages);
//       } else if (currentPage >= totalPages - 2) {
//         pages.push(1);
//         pages.push('...');
//         for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
//       } else {
//         pages.push(1);
//         pages.push('...');
//         pages.push(currentPage - 1);
//         pages.push(currentPage);
//         pages.push(currentPage + 1);
//         pages.push('...');
//         pages.push(totalPages);
//       }
//     }

//     return pages;
//   };

//   return (
//     <div className="mt-8 flex items-center justify-center gap-2">
//       <button
//         onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//         disabled={currentPage === 1}
//         className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all hover:border-amber-600 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white"
//       >
//         <ChevronLeft className="h-5 w-5" />
//       </button>

//       {getPageNumbers().map((page, index) => (
//         typeof page === 'number' ? (
//           <button
//             key={index}
//             onClick={() => setCurrentPage(page)}
//             className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all ${
//               currentPage === page
//                 ? "bg-gradient-to-r from-amber-600 to-red-700 text-white shadow-sm"
//                 : "border border-gray-200 hover:border-amber-600 hover:bg-amber-50"
//             }`}
//           >
//             {page}
//           </button>
//         ) : (
//           <span key={index} className="flex h-10 w-10 items-center justify-center text-gray-400">
//             {page}
//           </span>
//         )
//       ))}

//       <button
//         onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//         disabled={currentPage === totalPages}
//         className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 transition-all hover:border-amber-600 hover:bg-amber-50 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-200 disabled:hover:bg-white"
//       >
//         <ChevronRight className="h-5 w-5" />
//       </button>
//     </div>
//   );
// }
