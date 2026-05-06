"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Loader2,
  CheckCircle,
  XCircle,
  Truck,
  Package,
} from "lucide-react";
import { useLazyCheckDeliveryAvailabilityQuery } from "@/lib/services/api/ordersApi";

export default function CheckDeliveryAvailability() {
  const [checkDeliveryAvailability, { data, isLoading }] =
    useLazyCheckDeliveryAvailabilityQuery();
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [touched, setTouched] = useState(false);

  // Validation
  const validatePincode = useCallback((value: string) => {
    const pincodeRegExp = /^[1-9][0-9]{5}$/;

    if (!value || value.trim() === "") {
      return "Please enter your pincode";
    }
    if (!pincodeRegExp.test(value)) {
      return "Please enter a valid 6-digit pincode";
    }
    return "";
  }, []);

  // Handle input change
  const handlePincodeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, 6);
      setPincode(value);

      if (touched) {
        const validationError = validatePincode(value);
        setError(validationError);
      }
    },
    [touched, validatePincode],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-10 mb-6 border-b border-gray-200 pb-6"
    >
      <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
        <MapPin size={18} className="text-orange-500" />
        Check Delivery Availability
      </h3>

      <div className="space-y-3">
        {/* Input Form */}
        <div className="flex gap-2">
          <div className="flex-1">
            <input
              type="text"
              value={pincode}
              onChange={handlePincodeChange}
              onBlur={() => setTouched(true)}
              placeholder="Enter 6-digit pincode"
              maxLength={6}
              disabled={isLoading}
              className={`w-full rounded-lg border px-4 py-2.5 text-black transition-all focus:ring-2 focus:outline-none ${
                error && touched
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:border-transparent focus:ring-orange-500"
              } disabled:cursor-not-allowed disabled:bg-gray-100`}
            />

            {/* Validation Error */}
            <AnimatePresence>
              {error && touched && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mt-1.5 flex items-center gap-1 text-xs text-red-500"
                >
                  <XCircle size={12} />
                  {error}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <motion.button
            type="button"
            onClick={() => checkDeliveryAvailability(pincode)}
            disabled={isLoading || !pincode || pincode.length !== 6}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="flex items-center gap-2 rounded-lg bg-gray-900 px-6 py-2 font-semibold whitespace-nowrap text-white shadow-sm transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Checking...
              </>
            ) : (
              "Check"
            )}
          </motion.button>
        </div>

        {/* Delivery Status Messages */}
        <AnimatePresence mode="wait">
          {data?.available === true && (
            <motion.div
              key="available"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-500">
                  <CheckCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-green-900">
                    Delivery Available!
                  </h4>
                  <p className="text-sm text-green-700">{data?.message}</p>

                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-green-700">
                      <Truck size={14} />
                      <span>Expected delivery: 3-5 business days</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-green-700">
                      <Package size={14} />
                      <span>Free shipping on orders above ₹500</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {data?.available === false && (
            <motion.div
              key="unavailable"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-500">
                  <XCircle size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-red-900">
                    Delivery Not Available
                  </h4>
                  <p className="text-sm text-red-700">{data?.message}</p>
                  <p className="mt-2 text-xs text-red-600">
                    {"We're"} expanding our delivery network. Check back soon!
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Help Text */}
        {!data?.available && !isLoading && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-1 text-xs text-gray-500"
          >
            <MapPin size={12} />
            Enter your pincode to check if we deliver to your area
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}
