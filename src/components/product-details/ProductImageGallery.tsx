"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import ImageModal from "../modals/ImageModal";
import Image from "next/image";

export default function ProductImageGallery({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  // const [imageLoading, setImageLoading] = useState(false);

  const nextImage = useCallback(
    () => setSelectedImage((prev) => (prev + 1) % images.length),
    [images.length],
  );

  const prevImage = useCallback(
    () =>
      setSelectedImage((prev) => (prev - 1 + images.length) % images.length),
    [images.length],
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Main Image */}
        <div className="relative">
          <motion.div
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-3xl shadow-2xl"
            style={{ backgroundColor: "#FFFFFF" }}
            whileHover={{ scale: 1.02, rotateY: 2 }}
            transition={{ duration: 0.4, type: "spring" }}
            onClick={() => setIsFullScreen(true)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedImage}
                src={images[selectedImage].lg}
                alt={productName}
                className="h-full w-full object-cover"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              />
            </AnimatePresence>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100" />

            {/* Navigation Arrows */}
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute top-1/2 left-4 -translate-y-1/2 transform rounded-full bg-amber-50 p-3 text-amber-900 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
            >
              <ChevronLeft />
            </motion.button>
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute top-1/2 right-4 -translate-y-1/2 transform rounded-full bg-amber-50 p-3 text-amber-900 opacity-0 shadow-lg transition-all duration-300 group-hover:opacity-100"
            >
              <ChevronRight />
            </motion.button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 transform rounded-full bg-amber-900/80 px-4 py-2 text-sm font-semibold text-white">
              {selectedImage + 1} / {images.length}
            </div>
          </motion.div>
        </div>

        {/* Thumbnail Gallery */}
        <div className="scrollbar-hide flex space-x-4 overflow-x-auto p-2">
          {images.map((image, index) => (
            <motion.button
              key={index}
              onClick={() => {
                // setImageLoading(true);
                setSelectedImage(index);
                // setTimeout(() => setImageLoading(false), 300);
              }}
              className={`h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-3 transition-all duration-300 ${
                selectedImage === index
                  ? "scale-105 transform shadow-xl ring-4 ring-amber-600"
                  : "border-amber-200 shadow-md hover:scale-110"
              }`}
            >
              <Image
                src={image.lg}
                alt={`${productName} view ${index + 1}`}
                width={200}
                height={50}
                // className="h-full w-full object-cover"
              />
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Full Screen Image Modal */}
      <ImageModal
        isOpen={isFullScreen}
        close={() => setIsFullScreen(false)}
        src={images[selectedImage].lg}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        images={images}
      />
    </>
  );
}
