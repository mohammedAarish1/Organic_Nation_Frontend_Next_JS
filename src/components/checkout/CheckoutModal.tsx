"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingCart, ChevronDown } from "lucide-react";
import Image from "next/image";
import CheckoutForm from "./CheckoutForm";
import { useCart } from "@/lib/custom-hooks/useCart";
import AuthForm from "../auth/AuthForm";
import { useAppSelector } from "@/lib/hooks";
import { useCheckoutModal } from "../providers/CheckoutModalProvider";
import FamilyCoupon from "./FamilyCoupon";

// Types
interface CartItem {
  _id: string;
  "name-url": string;
  name: string;
  img: Array<{ sm: string; md: string; lg: string }>;
  price: number;
  discount: number;
  quantity: number;
}

// interface CheckoutModalProps {
//   // isOpen: boolean;
//   // onClose: () => void;
//   // cartItems: CartItem[];
//   // totalAmount: number;
//   // discountAmount: number;
//   // shippingFee: number;
//   // user: any;
// }

// Accordion Component
const Accordion = ({
  title,
  icon: Icon,
  isOpen,
  setIsOpen,
  children,
}: {
  title: string;
  icon: any;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  children: React.ReactNode;
}) => {
  return (
    <div className="mb-4">
      <button
        className="flex w-full items-center justify-between rounded-xl bg-gray-50 p-4 shadow-sm transition-colors hover:bg-gray-100"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="flex items-center gap-2 font-semibold text-gray-800">
          <Icon className="h-5 w-5 text-amber-700" />
          {title}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown className="h-5 w-5 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 rounded-xl bg-gray-50 p-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Cart Item Component
const CartItem = ({ item, index }: { item: CartItem; index: number }) => {
  const itemPrice =
    item.discount > 0
      ? item.price - (item.price * item.discount) / 100
      : item.price;
  const itemTotal = itemPrice * item.quantity;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.05 * index }}
      className="flex items-center gap-3 border-b border-gray-200 pb-3 last:border-b-0 last:pb-0"
    >
      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-lg bg-gray-50">
        <Image
          src={item.img[0].lg}
          alt={item.name}
          fill
          sizes="64px"
          className="object-contain p-1"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
      </div>
      <p className="font-semibold text-gray-900">
        ₹{itemTotal.toLocaleString("en-IN")}
      </p>
    </motion.div>
  );
};

// Order Summary Component
const OrderSummary = ({
  cartItems,
  subtotal,
  discountAmount,
  shippingFee,
  total,
}: {
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  shippingFee: number;
  total: number;
}) => (
  <>
    <div className="space-y-3">
      {cartItems.length > 0 &&
        cartItems.map((item, index) => (
          <CartItem key={item._id} item={item} index={index} />
        ))}
    </div>

    <motion.div
      className="mt-4 space-y-2 border-t border-gray-200 pt-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between text-sm text-gray-700">
        <span>Subtotal</span>
        <span>₹{subtotal.toLocaleString("en-IN")}</span>
      </div>
      {discountAmount > 0 && (
        <div className="flex justify-between text-sm font-semibold text-emerald-600">
          <span>Discount Applied</span>
          <span>-₹{discountAmount.toLocaleString("en-IN")}</span>
        </div>
      )}
      <div className="flex justify-between text-sm text-gray-700">
        <span>Shipping</span>
        <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
      </div>
      <div className="flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
        <span className="text-gray-900">Total</span>
        <span className="text-amber-700">
          ₹{(total + shippingFee).toLocaleString("en-IN")}
        </span>
      </div>
      <p className="mt-4 text-xs text-gray-500">
        *Shipping will be calculated on the next step based on delivery address
        and total cart value.
      </p>
    </motion.div>
  </>
);

export default function CheckoutModal(
  {
    // isOpen,
    // onClose,
    // cartItems,
    // totalAmount,
    // discountAmount,
    // shippingFee,
    // user,
  },
) {
  const { isOpen, closeCheckout } = useCheckoutModal();
  const {
    cartItems,
    totalCartAmount,
    // totalTax,
    totalMRP,
    discountAmount,
    // discountProgress,
    // isLoading,
    // updateQuantity,
    // removeFromCart,
    // isUpdatingQty,
    // isRemovingFromCart,
  } = useCart();
  // const {totalCartAmount:tcamount}=useAppSelector(state=>state.cart);
  const [step, setStep] = useState(1);
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const { user } = useAppSelector((state) => state.auth);
  const { shippingFee } = useAppSelector((state) => state.cart);
  // const subtotal = cartItems?.reduce((sum, item) => {
  //   const itemPrice =
  //     item.discount > 0
  //       ? item.price - (item.price * item.discount) / 100
  //       : item.price;
  //   return sum + itemPrice * item.quantity;
  // }, 0);

  // const total = Math.round(totalCartAmount + 0); // 0 is shippin fee
  // useEffect(() => {
  //   if (user) {
  //     setPhoneVerified(true);
  //     setStep(2);
  //   }else{
  //     setPhoneVerified(false);
  //     setStep(1);
  //   }
  // }, [user]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCheckout}
          />

          {/* Modal */}
          <motion.div
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Close Button */}
            <button
              onClick={closeCheckout}
              className="absolute top-4 right-4 z-20 rounded-full bg-white p-2 text-gray-500 shadow-md transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Header */}
            <div className="border-b border-gray-200 bg-gradient-to-r from-amber-50 to-orange-50 px-6 py-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative h-12 w-12">
                    <Image
                      src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.png"
                      alt="Organic Nation"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Order Total</p>
                    <p className="text-2xl font-bold text-gray-900">
                      ₹{(totalCartAmount + shippingFee).toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Body */}
            <div className="max-h-[70vh] overflow-y-auto px-2 py-6 sm:px-6">
              {/* Order Summary Accordion */}
              {user && <FamilyCoupon />}
              <Accordion
                title="Order Summary"
                icon={ShoppingCart}
                isOpen={orderSummaryOpen}
                setIsOpen={setOrderSummaryOpen}
              >
                <OrderSummary
                  cartItems={cartItems}
                  subtotal={totalMRP}
                  discountAmount={discountAmount}
                  // shippingFee={shippingFee}
                  shippingFee={shippingFee}
                  total={totalCartAmount}
                />
              </Accordion>

              {/* Checkout Steps */}
              <AnimatePresence mode="wait">
                {step === 1 && !phoneVerified && (
                  <motion.div
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {/* OTP Login Component */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 text-center sm:p-6">
                      {/* <p className="mb-4 text-gray-700">
                        Please login to continue
                      </p> */}
                      {/* Add your OTP Login component here */}
                      <AuthForm isCheckout={true} />
                      {/* <Login
                        isCheckout={true}
                        onSendOTP={(phoneNumber, referralCode) => {
                        }}
                      /> */}
                    </div>
                  </motion.div>
                )}

                {step === 2 && phoneVerified && (
                  <motion.div
                    key="checkout"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {/* Checkout Form Component */}
                    <div className="rounded-xl border border-gray-200 bg-gray-50 p-3 sm:p-6">
                      <p className="mb-4 font-semibold text-gray-900">
                        Delivery Details
                      </p>
                      {/* Add your Checkout Form component here */}
                      <CheckoutForm />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
