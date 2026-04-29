"use client";

import { useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import {
  Star,
  CheckCircle,
  Truck,
  Wallet,
  Shield,
  Award,
  CreditCard,
  Plus,
  Minus,
  Heart,
  Share2,
  RotateCcw,
} from "lucide-react";
import AddToCartBtn from "../common/AddToCartBtn";
import BuyNowBtn from "../common/BuyNowBtn";
import WishlistBtn from "../common/WishlistBtn";
import ShareBtn from "../common/ShareBtn";
import { useLazyCheckDeliveryAvailabilityQuery } from "@/lib/services/api/ordersApi";
import CheckDeliveryAvailability from "./CheckDeliveryAvailability";
import { QuantityControl } from "../cart/QuantityControl";
import { freeShippingEligibleAmt } from "../../constants";

const offers = [
  // {
  //   tag: "BUNDLE",
  //   text: "FLAT 40% OFF on buying 2 or more items",
  //   code: null,
  //   highlight: true,
  //   category: "Organic Honey",
  // },
  {
    tag: "BUNDLE",
    text: "Click to check our Combos",
    code: null,
    highlight: true,
    category: "Organic Honey",
  },
  {
    tag: "BANK",
    text: "Instant 5% Off on Online Payments",
    code: null,
    highlight: false,
    category: "all",
  },
  // {
  //   tag: "COUPON",
  //   text: "Use code ORGANIC15 for extra 15% off",
  //   code: "ORGANIC15",
  //   highlight: false,
  // },
  // {
  //   tag: "FREEBIE",
  //   text: "Free sample pack on orders above ₹999",
  //   code: null,
  //   highlight: false,
  // },
];

const StarRating = ({ rating, size = 20 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => {
        const filled = i < Math.floor(rating);
        const half = i === Math.floor(rating) && rating % 1 !== 0;
        return (
          <div key={i}>
            {filled ? (
              <Star size={size} fill="#F59E0B" color="#F59E0B" />
            ) : half ? (
              <div className="relative">
                <Star size={size} color="#D1D5DB" />
                <div
                  className="absolute inset-0 overflow-hidden"
                  style={{ width: "50%" }}
                >
                  <Star size={size} fill="#F59E0B" color="#F59E0B" />
                </div>
              </div>
            ) : (
              <Star size={size} color="#D1D5DB" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default function ProductInfo({ product, finalPrice }) {
  const [qty, setQty] = useState(1);
  const [checkDeliveryAvailability, { data, isLoading }] =
    useLazyCheckDeliveryAvailabilityQuery();
  const actionButtonRef = useRef(null);
  const pricePerGram = useMemo(() => {
    const weightMatch = product.details.weight.match(/(\d+)/);
    const weightInGrams = weightMatch ? parseInt(weightMatch[1]) : 1;
    return (finalPrice / weightInGrams).toFixed(2);
  }, [finalPrice, product.details.weight]);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = window.innerWidth < 768 ? 60 : 0;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-1">
        {/* Title and Ratings */}
        <h1 className="mb-1 text-xl font-extrabold text-gray-900">
          {product.details.title || product.details.name}
        </h1>

        {/* USPs */}
        <div className="mb-2 flex flex-wrap gap-2">
          {product.productInfo?.usps.map((usp, idx) => (
            <span
              key={idx}
              className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-sm font-medium text-green-700"
            >
              <CheckCircle size={16} />
              {usp}
            </span>
          ))}
        </div>

        <div className="mb-1 flex items-center gap-4 border-b border-gray-100 pb-2">
          <StarRating rating={product.averageRating} size={16} />
          <span className="font-semibold text-gray-900">
            {product.averageRating}
          </span>
          <button
            onClick={() => scrollToSection("reviews")}
            className="font-medium text-orange-600 underline-offset-4 transition-colors hover:text-orange-700 hover:underline"
          >
            ({product.reviews.length} reviews)
          </button>
        </div>

        {/* Net Content & Price per Gram */}
        <div className="mb-2 flex items-center gap-4 text-sm text-gray-600">
          <p className="text-center">
            <span className="text-xs font-medium">Net Content</span>{" "}
            <span className="font-semibold text-gray-900">
              ({product.details.weight})
            </span>
          </p>
          <div className="h-6 w-px bg-gray-300"></div>
          <div className="text-center">
            <span className="text-xs font-medium">Price per Gram</span>{" "}
            <span className="font-semibold text-gray-900">
              (₹{pricePerGram}/g)
            </span>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="mb-4 rounded-xl bg-orange-50 px-4 py-2 shadow-inner">
          <div className="mb-2 flex items-center gap-3">
            <span className="text-3xl font-extrabold text-gray-900">
              ₹{finalPrice}
            </span>

            {product.details.discount > 0 && (
              <span className="text-xl text-gray-500 line-through">
                ₹{product.details.price}
              </span>
            )}

            {product.details.discount > 0 && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-sm font-semibold text-white shadow-md">
                {product.details.discount}% OFF
              </span>
            )}
          </div>
          <p className="mb-3 text-xs text-gray-600">Inclusive of all taxes</p>

          {/* Shipping & COD Info */}
          <div className="mb-1 flex flex-wrap gap-2">
            <div className="flex items-center gap-2 rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-green-700">
              <Truck size={14} />
              Free Shipping (Above ₹{freeShippingEligibleAmt})
            </div>
            <div className="flex items-center gap-2 rounded-lg bg-blue-100 px-2 py-1 text-xs font-semibold text-blue-700">
              <Wallet size={14} />
              COD Available
            </div>
          </div>
        </div>

        {/* Available Offers */}
        <div className="mb-2">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900">
            <motion.div
              animate={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-orange-500"
              >
                <path d="M21.5 12H16c-.7 2-2 3-4 3s-3.3-1-4-3H2.5" />
                <path d="M5.5 5.1L2 12v6c0 1.1.9 2 2 2h16a2 2 0 002-2v-6l-3.4-6.9A2 2 0 0016.8 4H7.2a2 2 0 00-1.8 1.1z" />
              </svg>
            </motion.div>
            Available Offers
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="rounded-full bg-red-500 px-2 py-0.5 text-xs font-bold text-white"
            >
              HOT
            </motion.span>
          </h3>

          <div className="scrollbar-hide flex gap-4 overflow-x-auto py-4">
            {offers.map((offer, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className={`flex h-20 w-72 min-w-32 cursor-pointer flex-col items-center rounded-lg p-1 transition-all ${
                  offer.highlight
                    ? "border-2 border-orange-300 bg-gradient-to-r from-orange-50 to-yellow-50 shadow-md"
                    : "border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50"
                }`}
              >
                <motion.span
                  animate={offer.highlight ? { scale: [1, 1.1, 1] } : {}}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                  className={`flex-shrink-0 rounded-full px-2 py-0.5 text-xs font-bold text-white ${
                    offer.highlight ? "bg-orange-500" : "bg-green-600"
                  }`}
                >
                  {offer.tag}
                </motion.span>

                <div className="mt-2 flex-1 text-center">
                  <p
                    className={`text-[11px] font-medium ${
                      offer.highlight ? "text-orange-800" : "text-gray-800"
                    }`}
                  >
                    {offer.text}
                    <br />
                    {offer.highlight && (
                      <motion.span
                        animate={{ opacity: [1, 0.5, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-xs font-bold text-red-600"
                      >
                        🔥 Limited time deal
                      </motion.span>
                    )}
                  </p>
                  {offer.code && (
                    <div className="mt-1">
                      <span className="text-xs text-gray-600">Code:</span>
                      <span className="rounded border border-dashed border-green-500 bg-white px-2 py-0.5 text-xs font-bold text-green-700">
                        {offer.code}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Limited Time Banner */}
          {/* <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative overflow-hidden rounded-lg bg-gradient-to-r from-red-500 to-orange-500 p-2"
          >
            <motion.div
              animate={{ x: ["100%", "-100%"] }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="text-xs font-semibold whitespace-nowrap text-white"
            >
              ⏰ Limited Time Offer! • Sale ends in 24 hours • Don't miss out! •
              ⏰ Limited Time Offer! • Sale ends in 24 hours • Don't miss out!
            </motion.div>
          </motion.div> */}
        </div>

        {/* Action Buttons & Quantity */}
        <div
          ref={actionButtonRef}
          className="border-b pb-6 lg:border-none lg:pb-0"
        >
          <div className="mb-4 flex items-center gap-4">
            <span className="font-semibold text-gray-700">Quantity:</span>
            <QuantityControl quantity={qty} setQuantity={setQty} />
            {/* <div className="flex items-center overflow-hidden rounded-xl border border-gray-300">
              <motion.button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-4 py-2 transition-colors hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
              >
                <Minus size={18} />
              </motion.button>
              <span className="w-16 border-x border-gray-300 px-6 py-2 text-center font-bold">
                {qty}
              </span>
              <motion.button
                onClick={() => setQty(qty + 1)}
                className="px-4 py-2 transition-colors hover:bg-gray-100"
                whileTap={{ scale: 0.95 }}
              >
                <Plus size={18} />
              </motion.button>
            </div> */}
          </div>

          <div className="w-full space-y-3 sm:space-y-0">
            {/* Mobile: Stacked layout */}
            <div className="flex flex-col gap-3 sm:hidden">
              <AddToCartBtn
                product={product.details}
                quantity={qty}
                extraClasses="flex-1 py-4"
              />
              <BuyNowBtn product={product.details} quantity={qty} />
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-orange-500 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-orange-600 active:bg-orange-700"
              >
                Add to CartYY
              </motion.button> */}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full rounded-xl bg-gray-900 py-4 text-base font-bold text-white shadow-lg transition-all hover:bg-gray-800 active:bg-gray-700"
              >
                Buy Now
              </motion.button> */}
              <div className="flex gap-3">
                <WishlistBtn productId={product.details["name-url"]} />

                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-300 p-4 transition-all hover:border-red-500 active:border-red-600"
                >
                  <Heart
                    size={22}
                    fill={isWishlisted ? "#EF4444" : "none"}
                    color={isWishlisted ? "#EF4444" : "#6B7280"}
                  />
                  <span className="text-sm font-medium text-gray-700">
                    WishlistY
                  </span>
                </motion.button> */}
                <ShareBtn product={product.details} />
                {/* <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-gray-300 p-4 transition-all hover:border-orange-500 active:border-orange-600"
                >
                  <Share2 size={22} color="#6B7280" />
                  <span className="text-sm font-medium text-gray-700">
                    Share
                  </span>
                </motion.button> */}
              </div>
            </div>

            {/* Tablet+: All in one line */}
            <div className="hidden gap-3 sm:flex">
              <AddToCartBtn
                product={product.details}
                quantity={qty}
                extraClasses="flex-1"
              />
              <BuyNowBtn product={product.details} quantity={qty} />
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all"
              >
                Add to Cart
              </motion.button> */}
              {/* <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-gray-900 hover:bg-gray-800 text-white font-bold text-lg py-4 rounded-xl shadow-lg transition-all"
              >
                Buy Now
              </motion.button> */}
              <WishlistBtn productId={product.details["name-url"]} />

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsWishlisted(!isWishlisted)}
                className="rounded-xl border-2 border-gray-300 p-4 transition-all hover:border-red-500"
              >
                <Heart
                  size={24}
                  fill={isWishlisted ? "#EF4444" : "none"}
                  color={isWishlisted ? "#EF4444" : "#6B7280"}
                />
              </motion.button> */}
              <ShareBtn product={product.details} />

              {/* <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="rounded-xl border-2 border-gray-300 p-4 transition-all hover:border-orange-500"
              >
                <Share2 size={24} color="#6B7280" />
              </motion.button> */}
            </div>
          </div>

          {/* Trust Line */}
          <div className="mt-1 flex flex-col items-center justify-between gap-2 text-xs sm:flex-row sm:text-sm">
            <div className="flex items-center gap-2 text-gray-600 sm:gap-4">
              <span className="flex items-center gap-1">
                <Shield size={16} className="text-green-600" />
                Secure payment
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Truck size={16} className="text-blue-600" />
                Fast delivery
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <RotateCcw size={16} className="text-purple-600" />
                Easy returns
              </span>
            </div>
            <button className="flex items-center gap-1 font-semibold text-orange-600 hover:text-orange-700">
              <CheckCircle size={16} />
              7-Day Return Policy
            </button>
          </div>
        </div>

        {/* Pincode Checker */}
        <CheckDeliveryAvailability />

        {/* Trust Badges */}
        <div className="grid grid-cols-2 gap-2 pt-3 sm:grid-cols-4">
          <div className="flex flex-col items-center gap-1 rounded-lg bg-white p-2 shadow-md">
            <Shield size={18} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">FSSAI</span>
            <span className="text-xs text-gray-500">
              Lic: {product.productInfo?.additionalInfo.fssaiLicense}
            </span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-white p-2 shadow-md">
            <CheckCircle size={18} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">
              Lab Tested
            </span>
            <span className="text-xs text-gray-500">Certified</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-white p-2 shadow-md">
            <Award size={18} className="text-green-600" />
            <span className="text-xs font-semibold text-gray-700">Pure</span>
            <span className="text-xs text-gray-500">Verified</span>
          </div>
          <div className="flex flex-col items-center gap-1 rounded-lg bg-white p-2 shadow-md">
            <CreditCard size={18} className="text-blue-600" />
            <span className="text-xs font-semibold text-gray-700">Secure</span>
            <span className="text-xs text-gray-500">Payment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
