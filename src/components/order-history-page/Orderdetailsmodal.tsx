"use client";

import { useEffect, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  orderNo: string;
  children: React.ReactNode; // ← server-rendered ModalContent
}

export const OrderDetailsModal = memo(function OrderDetailsModal({
  isOpen,
  onClose,
  orderNo,
  children,
}: Props) {
  // Lock body scroll while modal is open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`Order details for #${orderNo}`}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="scrollbar-hide max-h-[70vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Sticky header — only the close button is interactive */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-amber-50 p-4 sm:p-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  Order Details
                </h2>
                <p className="text-sm text-gray-600">Order #{orderNo}</p>
              </div>
              <button
                onClick={onClose}
                className="rounded-full p-2 transition-colors hover:bg-white/50"
                aria-label="Close order details"
              >
                <X className="h-6 w-6" color="black" />
              </button>
            </div>

            {/* Server-rendered content — never re-renders on modal state change */}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
