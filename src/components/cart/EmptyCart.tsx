import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import Link from "next/link";
const EmptyCart = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-amber-50/30 to-white pb-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6"
      >
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-gray-100 p-6">
            <ShoppingBag className="h-16 w-16 text-gray-400" />
          </div>
        </div>
        <h2 className="mb-2 text-2xl font-bold text-gray-900">
          Your cart is empty
        </h2>
        <p className="mb-8 text-gray-600">
          Looks like you {"haven't"} added any items to your cart yet.
        </p>
        <Link
          href="/shop/all"
          className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-amber-600 to-red-700 px-8 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
        >
          Explore Products
        </Link>
      </motion.div>
    </div>
  );
};

export default EmptyCart;
