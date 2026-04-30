"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Heart, Trash2, User, X } from "lucide-react";
import { motion } from "framer-motion";
import ProductCardAlternate from "@/components/common/ProductCardAlternate";
import { useAppSelector } from "@/lib/hooks";
import {
  useClearWishListMutation,
  useLazyGetWishlistProductsQuery,
  useRemoveFromWishListMutation,
} from "@/lib/services/api/wishlistApi";
import WishlistSkeleton from "@/components/skeletons/WishlistSkeleton";
import { BounceIn } from "@/components/animations/animations";
import ConfirmationModal from "@/components/common/ConfirmationModal";

// Empty State Component
const EmptyWishlist = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
    <div className="max-w-md text-center">
      <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100">
        <Heart size={48} className="text-orange-500" />
      </div>
      <h2 className="mb-3 text-3xl font-bold text-gray-900">
        Your Wishlist is Empty
      </h2>
      <p className="mb-8 text-gray-600">
        Start adding items you love to your wishlist and shop them later!
      </p>
      <Link
        href="/shop/all"
        className="inline-block rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-orange-600 hover:shadow-xl"
      >
        Start Shopping
      </Link>
    </div>
  </div>
);

// Login Required Component
const LoginRequired = () => (
  <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
    <BounceIn delay={0.9}>
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-orange-100 to-amber-100">
          <User size={40} className="text-orange-500" />
        </div>
        <h2 className="mb-3 text-2xl font-bold text-gray-900">
          Login Required
        </h2>
        <p className="mb-6 text-gray-600">
          Please log in to see your wishlist and save your favorite items.
        </p>
        <Link
          href="/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white shadow-lg transition-colors hover:bg-orange-600 hover:shadow-xl"
        >
          <User className="h-5 w-5" />
          Log In
        </Link>
      </div>
    </BounceIn>
  </div>
);

// Main Wishlist Component
export default function Wishlist() {
  const { user } = useAppSelector((state) => state.auth);
  const [showClearModal, setShowClearModal] = useState(false);
  const [getWishlistProducts, { data, isLoading, error }] =
    useLazyGetWishlistProductsQuery();
  const { wishlistProducts } = useAppSelector((state) => state.wishlist);
  const [removeFromWishList, { isLoading: removingFromList }] =
    useRemoveFromWishListMutation();
  const [clearWishList, { isLoading: claringWishlist }] =
    useClearWishListMutation();

  useEffect(() => {
    if (user) {
      getWishlistProducts(undefined);
    }
  }, [user]);

  // Loading State
  if (isLoading) {
    return <WishlistSkeleton />;
  }

  // Not Logged In
  if (!user) {
    return <LoginRequired />;
  }

  // Empty Wishlist
  if (wishlistProducts?.length === 0) {
    return <EmptyWishlist />;
  }

  // Wishlist Content
  return (
    <div className="min-h-screen bg-gray-100/50 py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center"
        >
          <div>
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900 sm:text-4xl">
              <Heart className="text-orange-500" size={32} />
              My Wishlist
            </h1>
            <p className="mt-2 text-gray-600">
              {wishlistProducts?.length}{" "}
              {wishlistProducts?.length === 1 ? "item" : "items"}
            </p>
          </div>

          {wishlistProducts?.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowClearModal(true)}
              className="flex items-center gap-2 rounded-xl border-2 border-red-500 px-5 py-2.5 font-semibold text-red-500 shadow-sm transition-colors hover:bg-red-50"
            >
              <Trash2 size={18} />
              Clear All
            </motion.button>
          )}
        </motion.div>

        {/* Wishlist Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-6 sm:justify-start"
        >
          {wishlistProducts?.map((item, _) => (
            <div key={item["name-url"]} className="relative w-64">
              <ProductCardAlternate item={item} idx={indexedDB} />

              {/* Remove Button */}
              <button
                onClick={() => removeFromWishList(item["name-url"])}
                className="absolute -top-4 -left-3 z-10 rounded-full border-2 border-gray-200 bg-white p-2 shadow-lg transition-colors hover:border-red-500 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Remove from wishlist"
              >
                <X size={10} className="text-red-500" />
              </button>
            </div>
          ))}
        </motion.div>

        {/* Continue Shopping */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <Link
            href="/shop/all"
            className="inline-block rounded-xl border-2 border-orange-500 px-8 py-3 font-semibold text-orange-500 shadow-sm transition-colors hover:bg-orange-50 hover:shadow-md"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>

      {/* Clear All Confirmation Modal */}
      <ConfirmationModal
        isOpen={showClearModal}
        onClose={() => setShowClearModal(false)}
        onConfirm={() => clearWishList(undefined)}
      />
    </div>
  );
}
