"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Check,
  CircleX,
  Clock,
  MapPin,
  ArrowRight,
  Archive,
  Truck,
  ShoppingBag,
} from "lucide-react";
import {
  useGetSingleOrderDetailsQuery,
  useInitiatePaymentMutation,
} from "@/lib/services/api/ordersApi";
import { useClearCartMutation } from "@/lib/services/api/cartApi";

// Types
interface OrderStage {
  name: string;
  icon: string;
  complete: boolean;
}

interface OrderData {
  orderNo: string;
  createdAt: string;
  shippingAddress: {
    address: string;
    city: string;
    state: string;
    pinCode: string;
  };
  paymentMethod: string;
  subTotal: number;
  shippingFee: number;
  orderStatus: string;
}

interface OrderSuccessClientProps {
  orderStatus: "confirmed" | "failure" | "error";
  retryToken?: string;
  paymentStatus?: string;
}

// Icon mapping
const iconMap = {
  check: Check,
  archive: Archive,
  truck: Truck,
  "shopping-bag": ShoppingBag,
};

// Confetti configuration
const CONFETTI_COLORS = ["#d97706", "#dc2626", "#059669"];

// Helper functions
function formatAddress(address: {
  address: string;
  city: string;
  state: string;
  pinCode: string;
}) {
  return `${address.address}, ${address.city}, ${address.state} - ${address.pinCode}`;
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function getEstimatedDeliveryDate(createdAt: string) {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + 4);
  return date.toDateString();
}

function calculateOrderStages(orderStatus: string): OrderStage[] {
  return [
    { name: "Order Placed", icon: "check", complete: true },
    { name: "Processing", icon: "archive", complete: true },
    {
      name: "Dispatched",
      icon: "truck",
      complete: orderStatus === "dispatched" || orderStatus === "completed",
    },
    {
      name: "Delivered",
      icon: "shopping-bag",
      complete: orderStatus === "completed",
    },
  ];
}

function calculateProgress(stages: OrderStage[]): number {
  const completedStages = stages.filter((stage) => stage.complete).length;
  return stages.length > 0
    ? ((completedStages - 0.5) / (stages.length - 1)) * 100
    : 0;
}

// Loading Component
function LoadingState() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90">
      <div className="text-center">
        <div className="mx-auto mb-4 h-16 w-16 animate-spin rounded-full border-4 border-amber-600 border-t-transparent"></div>
        <p className="text-gray-600">Loading order details...</p>
      </div>
    </div>
  );
}

// Error Component
function ErrorState({
  message,
  onReturnHome,
}: {
  message: string;
  onReturnHome: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 p-4">
      <div className="max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div className="mb-4 text-5xl">⚠️</div>
        <h2 className="mb-2 text-xl font-bold">Order Not Found</h2>
        <p className="mb-6 text-gray-600">{message}</p>
        <button
          onClick={onReturnHome}
          className="rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}

// Success Modal Component
function SuccessModal({
  orderData,
  orderStages,
  progressPercentage,
  paymentStatus,
}: {
  orderData: OrderData;
  orderStages: OrderStage[];
  progressPercentage: number;
  paymentStatus?: string;
}) {
  const router = useRouter();
  const totalAmount = Math.round(orderData.subTotal + orderData.shippingFee);

  return (
    <motion.div
      className="relative z-10 my-6 flex h-[650px] w-full max-w-md flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-8 md:max-w-lg"
      initial={{ scale: 0.8, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      exit={{ scale: 0.8, y: 30, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-amber-600 via-red-700 to-emerald-600 px-6 py-8 text-white">
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.3,
          }}
        >
          <div className="rounded-full bg-white/30 p-4 shadow-lg backdrop-blur-sm">
            <Check className="h-8 w-8" />
          </div>
        </motion.div>

        <motion.h2
          className="mb-1 text-center text-2xl font-bold"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {paymentStatus === "success"
            ? "Payment Successful!"
            : "Order Placed Successfully!"}
        </motion.h2>

        <motion.p
          className="text-center text-sm text-white/90"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Thank you for your purchase
        </motion.p>
      </div>

      {/* Order Details */}
      <div className="max-h-[60vh] flex-1 overflow-y-auto px-6 py-5">
        <div className="space-y-6">
          {/* Order ID and Date */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-semibold text-gray-900">{orderData.orderNo}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Order Date</p>
              <p className="font-semibold text-gray-900">
                {formatDate(orderData.createdAt)}
              </p>
            </div>
          </motion.div>

          {/* Delivery Timeline */}
          <motion.div
            className="rounded-xl bg-blue-50 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="mb-3 flex items-center">
              <Clock className="mr-2 h-5 w-5 text-amber-700" />
              <h3 className="font-semibold text-gray-900">
                Estimated Delivery
              </h3>
            </div>

            <p className="mb-4 font-bold text-gray-900">
              {getEstimatedDeliveryDate(orderData.createdAt)}
            </p>

            {/* Timeline Progress */}
            <div className="relative pt-6 pb-8">
              {/* Background line */}
              <div className="absolute top-10 right-0 left-0 h-1 rounded-full bg-gray-200" />

              {/* Progress line */}
              <motion.div
                className="absolute left-0 h-1 rounded-full bg-gradient-to-r from-emerald-500 to-green-600"
                style={{ top: "2.5rem" }}
                initial={{ width: 0 }}
                animate={{ width: `${progressPercentage}%` }}
                transition={{ duration: 1, delay: 0.8 }}
              />

              {/* Stage icons */}
              <div className="relative flex justify-between">
                {orderStages.map((stage, index) => {
                  const Icon = iconMap[stage.icon as keyof typeof iconMap];
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <motion.div
                        className={`z-10 flex h-8 w-8 items-center justify-center rounded-full shadow-md ${
                          stage.complete ? "bg-emerald-500" : "bg-gray-200"
                        }`}
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                      >
                        <Icon
                          className={`h-4 w-4 ${stage.complete ? "text-white" : "text-gray-500"}`}
                        />
                      </motion.div>

                      <p
                        className={`mt-2 w-20 text-center text-xs ${
                          stage.complete
                            ? "font-medium text-emerald-600"
                            : "text-gray-500"
                        }`}
                      >
                        {stage.name}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Delivery Address */}
          <motion.div
            className="flex items-start rounded-xl bg-gray-50 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <MapPin className="mt-0.5 mr-3 h-5 w-5 flex-shrink-0 text-red-500" />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">Delivery Address</h3>
              <p className="mt-1 text-sm break-words text-gray-600">
                {formatAddress(orderData.shippingAddress)}
              </p>
            </div>
          </motion.div>

          {/* Payment Method */}
          <motion.div
            className="flex items-center justify-between border-y border-gray-200 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <span className="text-sm text-gray-600">Payment Method</span>
            <span className="rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-orange-500 capitalize">
              {orderData.paymentMethod.replaceAll("_", " ")}
            </span>
          </motion.div>

          {/* Order Amount */}
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
          >
            <span className="text-sm text-gray-600">Order Amount</span>
            <motion.span
              className="text-xl font-bold text-amber-700"
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              ₹{totalAmount.toLocaleString("en-IN")}
            </motion.span>
          </motion.div>
        </div>
      </div>

      {/* Action Buttons */}
      <motion.div
        className="flex flex-col gap-3 border-t border-gray-200 p-4 sm:flex-row"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.3 }}
      >
        <button
          onClick={() => router.push("/shop/all")}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-amber-600 px-6 py-3 font-semibold text-amber-700 transition-all hover:bg-amber-50"
        >
          Continue Shopping
        </button>
        <button
          onClick={() => router.push("/orders")}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-red-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
        >
          Track Order <ArrowRight className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

// Failure Modal Component
function FailureModal({
  retryToken,
  orderId,
}: {
  retryToken?: string;
  orderId: string;
}) {
  const router = useRouter();
  const [initiatePayment, { isLoading: initiatingPayment }] =
    useInitiatePaymentMutation();
  const handleRetry = async () => {
    if (retryToken) {
      sessionStorage.setItem("newOrderId", orderId);
      const payload = { retryToken };
      try {
        await initiatePayment(payload).unwrap();
      } catch (error) {
        throw error;
      }
      // window.location.href = `/api/payment/retry?token=${retryToken}`;
    }
  };

  return (
    <motion.div
      className="relative z-10 my-6 w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl sm:my-8 md:max-w-lg"
      initial={{ scale: 0.8, y: 50, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <div className="relative overflow-hidden bg-gradient-to-r from-red-500 to-red-700 px-6 py-8 text-white">
        <motion.div
          className="mb-4 flex justify-center"
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", delay: 0.3 }}
        >
          <div className="rounded-full bg-white/30 p-4 shadow-lg backdrop-blur-sm">
            <CircleX className="h-8 w-8" />
          </div>
        </motion.div>

        <h2 className="mb-1 text-center text-2xl font-bold">Payment Failed</h2>
        <p className="text-center text-sm text-white/90">
          We were unable to process your payment
        </p>
      </div>

      <div className="px-6 py-8">
        <p className="mb-6 text-center text-gray-600">
          Please check your payment details and try again.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row">
          {retryToken && (
            <button
              onClick={handleRetry}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:shadow-xl"
            >
              Retry Payment
            </button>
          )}
          <button
            onClick={() => router.push("/shop/all")}
            className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-blue-600 px-6 py-3 font-semibold text-blue-600 transition-all hover:bg-blue-50"
          >
            Return to Shopping
          </button>
        </div>
      </div>
    </motion.div>
  );
}

// Main Client Component
export default function OrderSuccessClient({
  orderStatus,
  retryToken,
  paymentStatus,
}: OrderSuccessClientProps) {
  const [orderId, setOrderId] = useState<string | null>(null);
  // const [orderData, setOrderData] = useState<OrderData | null>(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(true);
  const router = useRouter();
  const [clearCartServer, { isLoading: isClearingCart }] =
    useClearCartMutation();

  // Use RTK Query hook
  const {
    data: orderData,
    isLoading,
    error,
  } = useGetSingleOrderDetailsQuery(orderId, {
    skip: !orderId, // Only fetch when orderId exists
  });

  if (!sessionStorage.getItem("newOrderId") && !orderData) {
    redirect("/");
  }

  const clearUserCart = async () => {
    try {
      await clearCartServer(undefined);
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    const storedOrderId = sessionStorage.getItem("newOrderId");
    if (storedOrderId) {
      setOrderId(storedOrderId);
    }
  }, []);

  // Clear session storage after successful fetch
  useEffect(() => {
    if (orderData && orderStatus === "confirmed") {
      sessionStorage.removeItem("newOrderId");
      clearUserCart();
    }
  }, [orderData]);

  // Confetti effect for successful orders
  useEffect(() => {
    if (orderStatus !== "confirmed" || !showConfetti || !orderData) return;

    const duration = 3000;
    const end = Date.now() + duration;

    const runConfetti = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 70,
        origin: { x: 0.2, y: 0.6 },
        colors: CONFETTI_COLORS,
      });

      confetti({
        particleCount: 3,
        angle: 120,
        spread: 70,
        origin: { x: 0.8, y: 0.6 },
        colors: CONFETTI_COLORS,
      });

      if (Date.now() < end) {
        requestAnimationFrame(runConfetti);
      }
    };

    runConfetti();
    const timer = setTimeout(() => setShowConfetti(false), duration);
    return () => clearTimeout(timer);
  }, [orderStatus, showConfetti, orderData]);

  // Clear cart on success
  useEffect(() => {
    if (orderStatus === "confirmed" && orderData) {
      localStorage.removeItem("cart");
    }
  }, [orderStatus, orderData]);

  // Loading state
  if (isLoading) {
    return <LoadingState />;
  }

  // Error state
  if (error || !orderData) {
    return (
      <ErrorState
        // message={error || "Order details not found"}
        message={typeof error === "string" ? error : "An error occurred"}
        onReturnHome={() => router.push("/")}
      />
    );
  }

  // Calculate order stages and progress
  const orderStages = calculateOrderStages(orderData.orderStatus);
  const progressPercentage = calculateProgress(orderStages);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className={`absolute inset-0 backdrop-blur-sm ${
            orderStatus === "confirmed"
              ? "bg-gradient-to-br from-black/60 to-blue-900/40"
              : "bg-gradient-to-br from-black/60 to-red-900/40"
          }`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />

        {/* Modal Content */}
        {orderStatus === "confirmed" ? (
          <SuccessModal
            orderData={orderData}
            orderStages={orderStages}
            progressPercentage={progressPercentage}
            paymentStatus={paymentStatus}
          />
        ) : (
          <FailureModal retryToken={retryToken} orderId={orderData?._id} />
        )}
      </motion.div>
    </AnimatePresence>
  );
}
