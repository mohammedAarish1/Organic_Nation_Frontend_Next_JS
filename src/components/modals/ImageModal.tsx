// import { motion, AnimatePresence } from "framer-motion";
// import { ChevronLeft, ChevronRight, X } from "lucide-react";
// import Image from "next/image";
// import { useCallback } from "react";

// const ImageModal = ({
//   isOpen,
//   close,
//   src,
//   selectedImage,
//   setSelectedImage,
//   images,
// }) => {
//   const nextImage = useCallback(
//     () => setSelectedImage((prev) => (prev + 1) % images.length),
//     [images.length],
//   );

//   const prevImage = useCallback(
//     () =>
//       setSelectedImage((prev) => (prev - 1 + images.length) % images.length),
//     [images.length],
//   );
//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           exit={{ opacity: 0 }}
//           className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
//           onClick={() => close()}
//         >
//           <motion.div
//             initial={{ scale: 0.8, opacity: 0 }}
//             animate={{ scale: 1, opacity: 1 }}
//             exit={{ scale: 0.8, opacity: 0 }}
//             className="relative max-h-full max-w-2xl"
//             onClick={(e) => e.stopPropagation()}
//           >
//             <Image src={src} alt={"productName"} width={600} height={100} />

//             {/* Close Button */}
//             <motion.button
//               onClick={() => close()}
//               className="absolute top-6 right-6 rounded-full bg-amber-900/80 p-2 text-white shadow-lg"
//               whileHover={{
//                 scale: 1.1,
//                 backgroundColor: "#7A2E1D",
//                 rotate: 90,
//               }}
//               whileTap={{ scale: 0.9 }}
//             >
//               <X size={16} />
//             </motion.button>

//             {/* Navigation */}
//             <motion.button
//               onClick={prevImage}
//               className="absolute top-1/2 left-1 -translate-y-1/2 transform rounded-full bg-amber-900/80 p-2 text-white shadow-lg"
//             >
//               <ChevronLeft size={16} />
//             </motion.button>
//             <motion.button
//               onClick={nextImage}
//               className="absolute top-1/2 right-1 -translate-y-1/2 transform rounded-full bg-amber-900/80 p-2 text-white shadow-lg"
//             >
//               <ChevronRight size={16} />
//             </motion.button>

//             {/* Image Counter */}
//             <div className="absolute bottom-6 left-1/2 -translate-x-1/2 transform rounded-full bg-amber-900/90 px-4 py-1 font-bold text-white">
//               {selectedImage + 1} / {images.length}
//             </div>
//           </motion.div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default ImageModal;
