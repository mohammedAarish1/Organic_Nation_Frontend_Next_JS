"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const AccordionItem = ({ title, content, isOpen, onClick }) => (
  <motion.div
    className="overflow-hidden rounded-xl border border-gray-200 shadow-sm"
    initial={false}
  >
    <button
      onClick={onClick}
      className="flex w-full items-center justify-between bg-white px-5 py-3.5 transition-colors hover:bg-gray-50"
    >
      <span className="text-left text-lg font-semibold text-gray-800">
        {title}
      </span>
      {isOpen ? (
        <ChevronUp size={20} className="text-orange-500" />
      ) : (
        <ChevronDown size={20} className="text-gray-500" />
      )}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gray-50"
        >
          <p className="px-5 py-4 leading-relaxed text-gray-700">{content}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

export default function ProductDescriptionSection({ productInfo }) {
  const [openAccordion, setOpenAccordion] = useState(1);

  if (!productInfo) return;
  const sections = [
    { id: 1, title: "Product Description", content: productInfo.description },
    { id: 2, title: "Health Benefits", content: productInfo.healthBenefits },
    { id: 3, title: "Taste & Texture", content: productInfo.tasteTexture },
    { id: 4, title: "How to Use", content: productInfo.howToUse },
    {
      id: 5,
      title: "Storage Guidelines",
      content: productInfo.storageGuidelines,
    },
  ];

  return (
    <section className="mb-10" id="description">
      <h2 className="mb-6 border-b pb-3 text-3xl font-bold text-gray-900">
        Product Information
      </h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <AccordionItem
            key={section.id}
            title={section.title}
            content={section.content}
            isOpen={openAccordion === section.id}
            onClick={() =>
              setOpenAccordion(openAccordion === section.id ? null : section.id)
            }
          />
        ))}
      </div>
    </section>
  );
}
