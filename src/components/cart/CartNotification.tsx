"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { ArrowRight, CheckCircle, ShoppingCart, Trash2 } from "lucide-react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { hideCartNotification } from "@/lib/features/cart/cartSlice";
import { useCart } from "@/lib/custom-hooks/useCart";
import { QuantityControl } from "./QuantityControl";
import { useAppSelector } from "@/lib/hooks";
import { useCheckoutModal } from "../providers/CheckoutModalProvider";
import { Product } from "@/types";
import { useRouter } from "next/navigation";

// Helper function
const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-IN").format(Math.round(price));
};

// Close Button Component
const CloseButton = ({ action }: { action: () => void }) => (
  <motion.button
    onClick={action}
    className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-600 transition-colors hover:bg-gray-200"
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.9 }}
    aria-label="Close cart"
  >
    <svg
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  </motion.button>
);

// Main Cart Notification Component
export default function CartNotification() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  // const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // const [cartItemsList, setcartItems] = useState(MOCK_CART_ITEMS);
  const { isCartNotificationVisible } = useAppSelector((state) => state.cart);
  // Mock data
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  const { openCheckout } = useCheckoutModal();

  const {
    cartItems,
    totalCartItems,
    totalMRP,
    totalCartAmount,
    // totalTax,
    discountAmount,
    // specialDiscount,
    // couponCodeApplied,
    // discountProgress,
    // isLoading,
    refreshCart,
    // updateQuantity,
    removeFromCart,
    // isUpdatingQty,
    isRemovingFromCart,
    // mergeCart,
  } = useCart();
  const lastAddedItem = cartItems[0];

  useEffect(() => {
    refreshCart();
  }, [isAuthenticated, totalCartItems]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeCartNotification = () => {
    dispatch(hideCartNotification());
  };

  // const handleUpdateQuantity = useCallback((itemId, newQuantity) => {
  //   setcartItems((prev) =>
  //     prev.map((item) =>
  //       item._id === itemId ? { ...item, quantity: newQuantity } : item,
  //     ),
  //   );
  // }, []);

  // const handleRemoveItem = useCallback((nameUrl) => {
  //   setcartItems((prev) => prev.filter((item) => item["name-url"] !== nameUrl));
  // }, []);

  const handleViewCart = useCallback(() => {
    dispatch(hideCartNotification());

    router.push("/cart");
  }, []);

  const handleCheckout = () => {
    dispatch(hideCartNotification());
    // setIsCheckoutOpen(true);
    openCheckout();
  };

  // Animation variants
  const mobileVariants: Variants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { y: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
  };

  const desktopVariants: Variants = {
    hidden: { x: "100%" },
    visible: {
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 30 },
    },
    exit: { x: "100%", transition: { ease: "easeInOut", duration: 0.3 } },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.1 * i, duration: 0.4, ease: "easeOut" },
    }),
  };

  return (
    <>
      <AnimatePresence>
        {isCartNotificationVisible && (
          <>
            {/* Overlay */}
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeCartNotification}
            />

            {/* Cart Panel */}
            <motion.div
              className={`fixed z-50 flex flex-col bg-white shadow-2xl ${
                isMobile
                  ? "right-0 bottom-0 left-0 max-h-[80vh] rounded-t-3xl"
                  : "top-0 right-0 bottom-0 w-full max-w-md rounded-l-2xl"
              }`}
              variants={isMobile ? mobileVariants : desktopVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Header */}
              <div className="border-b border-gray-200 bg-linear-to-r from-amber-50 to-orange-50 p-5">
                <motion.div
                  className="flex items-center justify-between"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-600 text-white">
                      <ShoppingCart size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">
                        Your Cart
                      </h3>
                      <p className="text-sm text-gray-600">
                        {cartItems.length > 0
                          ? `${cartItems.reduce(
                              (total: number, item: Product) =>
                                total + item.quantity,
                              0,
                            )} items added`
                          : "No items added"}
                      </p>
                    </div>
                  </div>
                  <CloseButton action={closeCartNotification} />
                </motion.div>

                {lastAddedItem && (
                  <motion.div
                    className="mt-3 flex w-fit items-center gap-2 rounded-full bg-amber-600 px-3 py-2 text-sm text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <CheckCircle size={16} />
                    <span>{lastAddedItem.name} added to cart</span>
                  </motion.div>
                )}
              </div>

              {/* Cart Items - Scrollable */}
              <div className="flex-1 overflow-y-auto p-4 pb-60">
                {cartItems.length === 0 ? (
                  <motion.div
                    className="flex h-48 flex-col items-center justify-center text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                      <ShoppingCart size={28} className="text-amber-600" />
                    </div>
                    <p className="text-lg font-medium text-gray-900">
                      Your cart is empty
                    </p>
                    <p className="mt-1 max-w-xs text-sm text-gray-500">
                      Add items to your cart to see them here
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <ul className="space-y-4">
                      {cartItems.map((item: Product, index: number) => (
                        <motion.li
                          key={item._id}
                          custom={index}
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          className="group relative flex gap-3 rounded-xl border-l-3 border-amber-600 bg-amber-50/30 p-3"
                        >
                          {item.discount > 0 && (
                            <div className="absolute top-4 left-4 z-20 rounded bg-red-500 px-2 py-1 text-sm font-semibold text-white">
                              {item.discount}% OFF
                            </div>
                          )}

                          {/* Item Image */}
                          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg bg-white shadow-md">
                            {item.img && item.img[0] ? (
                              <div className="relative h-full w-full">
                                <Image
                                  src={item.img[0].sm}
                                  alt={item.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <div className="flex h-full w-full items-center justify-center bg-gray-100">
                                <ShoppingCart className="text-amber-600" />
                              </div>
                            )}
                          </div>

                          {/* Item Details */}
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900">
                              {item.name}
                            </h4>

                            <div className="mt-2 flex items-center justify-between">
                              <QuantityControl
                                quantity={item.quantity}
                                setQuantity={() => {}}
                                curItem={item}
                                isCartPage
                                // availability={item.availability || 999}
                                // onIncrease={() =>
                                //   handleQuantityChange(productName, "increase")
                                // }
                                // onDecrease={() =>
                                //   handleQuantityChange(productName, "decrease")
                                // }
                                // isUpdating={isUpdatingQty}
                              />
                              <div className="font-semibold text-amber-700">
                                ₹
                                {formatPrice(
                                  item.discount > 0
                                    ? (item.price -
                                        (item.price * item.discount) / 100) *
                                        item.quantity
                                    : item.price * item.quantity,
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Remove Button */}
                          <motion.button
                            onClick={() =>
                              removeFromCart(
                                item.productName !== undefined
                                  ? item.productName
                                  : item["name-url"],
                              )
                            }
                            disabled={isRemovingFromCart}
                            className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-red-500 text-white opacity-0 shadow transition-opacity group-hover:opacity-100"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Remove item"
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </motion.li>
                      ))}
                    </ul>
                    <motion.div
                      className="absolute right-0 bottom-0 left-0 z-20 border-t border-gray-200 bg-white p-4 shadow-[0_-4px_10px_rgba(0,0,0,0.03)]"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Cart Summary */}
                      <div className="mb-4">
                        <div className="mb-1 flex items-center justify-between text-gray-600">
                          <span className="text-sm">Subtotal:</span>
                          <span>₹ {formatPrice(totalMRP)}</span>
                        </div>
                        {discountAmount > 0 && (
                          <div className="flex justify-between text-sm font-semibold text-emerald-600">
                            <span>Discount Applied</span>
                            <span>-₹{formatPrice(discountAmount)}</span>
                          </div>
                        )}

                        <div className="my-2 h-px w-full bg-gray-200"></div>

                        <div className="flex items-center justify-between">
                          <span className="font-bold text-gray-900">
                            Total:
                          </span>
                          <span className="text-xl font-bold text-amber-700">
                            ₹ {formatPrice(totalCartAmount)}
                          </span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          onClick={handleViewCart}
                          className="rounded-xl border-l-3 border-amber-600 bg-amber-50 py-3 font-medium text-amber-700 transition-all hover:bg-amber-100 hover:shadow-md"
                        >
                          View Cart
                        </button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleCheckout}
                          className="flex items-center justify-center gap-2 rounded-xl bg-amber-600 py-3 font-medium text-white shadow-md transition-colors hover:bg-amber-700"
                          disabled={cartItems.length === 0}
                        >
                          <span>Checkout</span>
                          <ArrowRight size={20} />
                        </motion.button>
                      </div>
                    </motion.div>
                  </>
                )}
              </div>

              {/* Fixed Footer */}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
