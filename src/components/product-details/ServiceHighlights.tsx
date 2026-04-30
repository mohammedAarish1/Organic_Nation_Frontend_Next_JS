"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, Shield } from "lucide-react";

const FeatureIcon = ({ icon: Icon, title, color = "#7A2E1D" }) => (
  <motion.div
    className="xs:p-4 flex flex-col items-center gap-2 rounded-xl bg-white shadow-sm"
    whileHover={{ y: -4, boxShadow: "0 8px 16px rgba(0,0,0,0.1)" }}
  >
    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-50">
      <Icon size={24} style={{ color }} />
    </div>
    <span className="text-center text-xs font-medium text-gray-700">
      {title}
    </span>
  </motion.div>
);

export default function ServiceHighlights() {
  return (
    <div className="bg-white py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8 text-center">
          <FeatureIcon icon={Truck} title="Fast Delivery" color="#3B82F6" />
          <FeatureIcon icon={RotateCcw} title="Easy Returns" color="#9333EA" />
          <FeatureIcon icon={Shield} title="Secure Checkout" color="#10B981" />
        </div>
      </div>
    </div>
  );
}
