"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useCart } from "@/lib/custom-hooks/useCart";
import { useCheckoutModal } from "../providers/CheckoutModalProvider";
import { freeShippingEligibleAmt } from "@/constants";
import FreeShippingAlert from "./FreeShippingAlert";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";
import { useAppSelector } from "@/lib/hooks";

// Types
interface CartItem {
  _id: string;
  "name-url": string;
  productName?: string;
  name: string;
  img: Array<{ sm: string; md: string; lg: string }>;
  price: number;
  discount: number;
  quantity: number;
  availability: number;
}

export default function CartClient() {
  const {
    cartItems,
    totalCartItems,
    totalMRP,
    totalCartAmount,
    discountAmount,
    isLoading,
    refreshCart,
    // updateQuantity,
    // removeFromCart,
    // isUpdatingQty,
    // isRemovingFromCart,
    // mergeCart,
  } = useCart();
  // const dispatch = useDispatch();
  // const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  // const { fetchGuestCartDetails } = useCart();
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { openCheckout } = useCheckoutModal();
  useEffect(() => {
    refreshCart();
  }, [isAuthenticated, cartItems.length, totalCartItems]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="mt-20 min-h-screen pb-24">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center md:px-6">
          <div className="animate-pulse">
            <div className="mx-auto h-16 w-16 rounded-full bg-gray-200"></div>
            <p className="mt-4 text-gray-600">Loading your cart items...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show empty cart
  if (!cartItems || cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 md:px-6">
      {/* Back to Shopping */}
      <Link
        href="/shop"
        className="group mt-6 mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-700 transition-colors hover:text-amber-700"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
        Continue Shopping
      </Link>

      {/* Cart with Items */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Cart Items Section */}
        <div className="lg:w-2/3">
          <div className="overflow-hidden rounded-2xl bg-white shadow-md">
            {/* Desktop Header */}
            <div className="hidden border-b border-gray-100 bg-gray-50 p-4 md:grid md:grid-cols-12 md:gap-4">
              <div className="col-span-6 text-sm font-semibold text-gray-700">
                Product
              </div>
              <div className="col-span-2 text-center text-sm font-semibold text-gray-700">
                Price
              </div>
              <div className="col-span-2 text-center text-sm font-semibold text-gray-700">
                Quantity
              </div>
              <div className="col-span-2 text-right text-sm font-semibold text-gray-700">
                Subtotal
              </div>
            </div>

            {/* Cart Items */}
            <CartItem />
          </div>
        </div>

        {/* Order Summary Section */}
        <div className="lg:w-1/3">
          <div className="rounded-2xl bg-white p-6 shadow-md">
            <h2 className="mb-6 text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            {/* Alerts */}
            {totalCartAmount < freeShippingEligibleAmt && (
              <>
                {/* <CODEligibility /> */}
                <FreeShippingAlert totalCartAmount={totalCartAmount} />
              </>
            )}

            {/* Calculations */}
            <div className="space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold text-gray-900">
                  ₹{totalMRP.toFixed(2)}
                </span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Discount Applied</span>
                  <span className="font-semibold text-emerald-600">
                    -₹{discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              {/* {totalTax > 0 && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (GST)</span>
                    <span className="font-semibold text-gray-900">
                      ₹{totalTax.toFixed(2)}
                    </span>
                  </div>
                )} */}
              <div className="flex justify-between border-t border-gray-200 pt-3 text-lg font-bold">
                <span className="text-gray-900">Total</span>
                <span className="text-amber-700">
                  ₹{totalCartAmount.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => openCheckout()}
              className="mt-6 w-full cursor-pointer rounded-xl bg-gradient-to-r from-amber-600 to-red-700 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Proceed to Checkout
            </button>

            <p className="mt-4 text-xs text-gray-500">
              *Shipping will be calculated on the next step based on delivery
              address.
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 rounded-2xl bg-white p-6 shadow-md">
            <h3 className="mb-3 text-sm font-semibold text-gray-900">
              Accepted Payments
            </h3>
            <div className="flex flex-wrap gap-2">
              {["Debit Card", "Credit Card", "UPI", "Net Banking"].map(
                (method) => (
                  <span
                    key={method}
                    className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700"
                  >
                    {method}
                  </span>
                ),
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
