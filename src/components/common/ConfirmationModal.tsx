"use client";

import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

type ConfirmationModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: ConfirmationModalProps) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <Trash2 size={32} className="text-red-500" />
          </div>
          <h3 className="mb-3 text-center text-xl font-bold text-gray-900">
            Clear Wishlist?
          </h3>
          <p className="mb-6 text-center text-gray-600">
            Are you sure you want to remove all items from your wishlist? This
            action cannot be undone.
          </p>
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="flex-1 rounded-xl border-2 border-gray-300 px-4 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              Cancel
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              className="flex-1 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-red-600"
            >
              Clear All
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default ConfirmationModal;
