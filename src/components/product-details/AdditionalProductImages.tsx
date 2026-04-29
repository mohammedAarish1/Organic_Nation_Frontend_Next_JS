"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import ImageModal from "../modals/ImageModal";
import Image from "next/image";

export default function AdditionalProductImages({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  return (
    <div className="py-10">
      <h2 className="mb-6 border-b pb-3 text-center text-3xl font-bold text-gray-900">
        Product Gallery
      </h2>

      <div className="rounded-lg bg-white py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {images?.length > 0 &&
              images.map((image, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="aspect-square cursor-pointer overflow-hidden rounded-xl shadow-lg"
                  onClick={() => {
                    setSelectedImage(idx);
                    setIsFullScreen(true);
                  }}
                >
                  <Image
                    src={image}
                    alt={`${productName} Gallery ${idx + 1}`}
                    width={800}
                    height={500}
                    // style={{ objectFit: 'cover' }}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </div>

      {images?.length > 0 && (
        <ImageModal
          isOpen={isFullScreen}
          close={() => setIsFullScreen(false)}
          src={images[selectedImage]}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          images={images}
        />
      )}
    </div>
  );
}
