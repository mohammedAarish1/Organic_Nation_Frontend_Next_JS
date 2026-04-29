"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Trash2 } from "lucide-react";
import { QuantityControl } from "./QuantityControl";
import { useCart } from "@/lib/custom-hooks/useCart";

const CartItem = () => {
  const {
    cartItems,
    removeFromCart,
    isUpdatingQty,
    isRemovingFromCart,
    mergeCart,
  } = useCart();

  return (
    <AnimatePresence>
      {cartItems?.map((item) => {
        const itemPrice =
          item.discount > 0
            ? item.price - (item.price * item.discount) / 100
            : item.price;
        const itemTotal = itemPrice * item.quantity;

        // ✅ Get product name - handle both formats
        const productName = item.productName || item["name-url"];

        return (
          <motion.div
            key={item._id || productName}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="border-b border-gray-100 p-4 last:border-b-0"
          >
            <div className="grid grid-cols-1 gap-4 md:grid-cols-12">
              {/* Product Info */}
              <div className="md:col-span-6">
                <div className="flex items-start gap-4">
                  {/* ✅ FIXED: Proper image handling */}
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                    {item?.img &&
                    Array.isArray(item.img) &&
                    item.img.length > 0 &&
                    item.img[0]?.lg ? (
                      <Image
                        src={item.img[0].lg}
                        alt={item.name || "Product"}
                        fill
                        sizes="96px"
                        className="object-contain p-2"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gray-100">
                        <ShoppingBag className="h-8 w-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  <div className="">
                    <h3 className="mb-1 font-semibold text-gray-900">
                      {item.name}
                    </h3>

                    {/* Mobile Price */}
                    <div className="mb-2 flex items-center gap-2 md:hidden">
                      <span className="text-base font-bold text-gray-900 sm:text-lg">
                        ₹{itemPrice?.toFixed(2)}
                      </span>
                      {item.discount > 0 && (
                        <>
                          <span className="text-xs text-gray-500 line-through">
                            ₹{item.price.toFixed(2)}
                          </span>
                          <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                            {item.discount}% OFF
                          </span>
                        </>
                      )}
                    </div>

                    {/* Mobile Quantity */}
                    <div className="mb-3 md:hidden">
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
                      {item.quantity >= item.availability && (
                        <p className="mt-1 text-xs text-amber-600">
                          Max quantity reached
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() =>
                        removeFromCart(
                          item.productName !== undefined
                            ? item.productName
                            : item["name-url"],
                        )
                      }
                      disabled={isRemovingFromCart}
                      className="flex items-center gap-1.5 text-sm font-medium text-red-600 transition-colors hover:text-red-700 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                      {isRemovingFromCart ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Desktop Price */}
              <div className="hidden items-center justify-center md:col-span-2 md:flex">
                <div className="text-center">
                  <p className="font-semibold text-gray-900">
                    ₹{itemPrice?.toFixed(2)}
                  </p>
                  {item.discount > 0 && (
                    <>
                      <p className="text-xs text-gray-500 line-through">
                        ₹{item.price.toFixed(2)}
                      </p>
                      <span className="mt-1 inline-block rounded-full bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                        {item.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Desktop Quantity */}
              <div className="hidden items-center justify-center md:col-span-2 md:flex md:flex-col">
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
                {item.quantity >= item.availability && (
                  <p className="mt-1 text-xs text-amber-600">Max stock</p>
                )}
              </div>

              {/* Subtotal */}
              <div className="flex items-center justify-between md:col-span-2 md:justify-end">
                <span className="text-sm text-gray-600 md:hidden">
                  Subtotal:
                </span>
                <span className="text-lg font-bold text-gray-900">
                  ₹{itemTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default CartItem;
