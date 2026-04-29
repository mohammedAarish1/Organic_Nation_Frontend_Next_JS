"use client";
import { freeShippingEligibleAmt } from "@/constants";
import { Truck } from "lucide-react";
import { motion } from "framer-motion";

const FreeShippingAlert = ({
  totalCartAmount,
}: {
  totalCartAmount: number;
}) => {
  const remaining = Math.max(0, freeShippingEligibleAmt - totalCartAmount);
  const progress = Math.min(
    (totalCartAmount / freeShippingEligibleAmt) * 100,
    100,
  );

  if (totalCartAmount >= freeShippingEligibleAmt) return null;

  return (
    <div className="mb-6 overflow-hidden rounded-xl border-2 border-emerald-200 bg-gradient-to-r from-emerald-50 to-green-50 p-4">
      <div className="mb-2 flex items-start gap-3">
        <Truck className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-600" />
        <div className="flex-1">
          <p className="mb-1 text-sm font-semibold text-emerald-900">
            Add ₹{Math.round(remaining)} more for FREE shipping!
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-emerald-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gradient-to-r from-emerald-500 to-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeShippingAlert;
