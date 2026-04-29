"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AddToCartBtn from "../common/AddToCartBtn";
import { QuantityControl } from "../cart/QuantityControl";
import BuyNowBtn from "../common/BuyNowBtn";

export default function StickyAddToCart({ product, finalPrice }) {
  const [isSticky, setIsSticky] = useState(false);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const checkSticky = () => {
      setIsSticky(window.scrollY > 800);
    };

    window.addEventListener("scroll", checkSticky);
    return () => window.removeEventListener("scroll", checkSticky);
  }, []);

  return (
    <AnimatePresence>
      {isSticky && (
        <motion.div
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed right-0 bottom-0 left-0 z-10 border-t-4 border-orange-500 bg-white shadow-2xl"
        >
          <div className="mx-auto max-w-7xl px-3 py-3 sm:px-4 sm:py-4">
            {/* Mobile Layout (< md) */}
            <div className="space-y-3 md:hidden">
              {/* Product Info Row */}
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <h4 className="mb-1 line-clamp-1 text-sm font-bold text-gray-900">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-extrabold text-orange-600">
                      ₹{finalPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                  </div>
                </div>

                {/* Quantity Control - Compact */}
                <QuantityControl quantity={qty} setQuantity={setQty} />
              </div>

              {/* Action Buttons Row */}
              <div className="flex gap-2">
                <AddToCartBtn
                  product={product}
                  quantity={qty}
                  extraClasses="flex-1"
                />

                <BuyNowBtn product={product} quantity={qty} />
              </div>
            </div>

            {/* Tablet Layout (md to lg) */}
            <div className="hidden items-center justify-between gap-4 md:flex lg:hidden">
              {/* Left: Product Info */}
              <div className="flex min-w-0 flex-shrink flex-col gap-1">
                <h4 className="line-clamp-1 text-base font-bold text-gray-900">
                  {product.name}
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-orange-600">
                    ₹{finalPrice}
                  </span>
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.price}
                  </span>
                </div>
              </div>

              {/* Middle: Quantity */}
              <div className="flex flex-shrink-0 items-center gap-3">
                <span className="text-sm font-semibold text-gray-700">
                  Qty:
                </span>
                <QuantityControl quantity={qty} setQuantity={setQty} />
                <div className="flex items-center overflow-hidden rounded-lg border border-gray-300"></div>
              </div>

              {/* Right: Actions */}
              <div className="flex flex-shrink-0 gap-3">
                <AddToCartBtn product={product} quantity={qty} />
                <BuyNowBtn
                  product={product}
                  quantity={qty}
                  extraClasses="px-2"
                />
              </div>
            </div>

            {/* Desktop Layout (lg+) */}
            <div className="hidden items-center justify-between gap-6 lg:flex">
              {/* Left: Product Info */}
              <div className="flex min-w-0 flex-1 items-center gap-4">
                <div className="flex flex-col gap-1">
                  <h4 className="line-clamp-1 text-lg font-bold text-gray-900">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-extrabold text-orange-600">
                      ₹{finalPrice}
                    </span>
                    <span className="text-lg text-gray-500 line-through">
                      ₹{product.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Middle: Quantity */}
              <div className="flex flex-shrink-0 items-center gap-4">
                <span className="font-semibold text-gray-700">Quantity:</span>
                <QuantityControl quantity={qty} setQuantity={setQty} />
              </div>

              {/* Right: Actions */}
              <div className="flex shrink-0 gap-3">
                <AddToCartBtn product={product} quantity={qty} />
                <BuyNowBtn
                  product={product}
                  quantity={qty}
                  extraClasses="px-4"
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
