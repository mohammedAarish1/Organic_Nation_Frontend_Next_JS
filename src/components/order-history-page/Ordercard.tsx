"use client";

import { useState, useCallback, memo } from "react";
import {
  Calendar,
  ShoppingBag,
  IndianRupee,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  FileText,
} from "lucide-react";
import { PaymentBadge, StatusBadge } from "./Badges";
import { formatDate } from "@/features/order/utils/orderHistoryUtils";
import ReviewModal from "../product-details/ReviewModal";
import { OrderDetailsModal } from "./Orderdetailsmodal";
import { ModalContent } from "./ModalContent";
import { OrderItemActions } from "./Orderitemactions";
import { Order, OrderItem } from "@/features/order/types";
import { ProductMap } from "@/features/product/types";
import ReturnItemForm from "./ReturnItemForm";
import Image from "next/image";
import { useCancelOrderMutation } from "@/lib/services/api/ordersApi";
import { toast } from "react-toastify";
import { Product } from "@/types";

interface Props {
  order: Order;
  productMap: ProductMap;
}

export const OrderCard = memo(function OrderCard({ order, productMap }: Props) {
  const [curItem, setCurItem] = useState<Product | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [isReturnFormVisible, setReturnFormVisible] = useState(false);
  const [cancelOrder, { isLoading: isCancellingOrder }] =
    useCancelOrderMutation();

  const totalAmount = order.subTotal + order.shippingFee;

  // ── Stable handlers ─────────────────────────────────────────────────────
  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);
  const closeReview = useCallback(() => setShowReviewModal(false), []);
  const closeReturn = useCallback(() => setReturnFormVisible(false), []);
  const toggleExpanded = useCallback(() => setIsExpanded((p) => !p), []);

  const handleOpenReview = useCallback((item) => {
    setCurItem(item);
    setShowReviewModal(true);
  }, []);

  const handleOpenReturn = useCallback((item) => {
    setCurItem(item);
    setReturnFormVisible(true);
  }, []);

  const handleOrderCancel = async (orderId: string) => {
    try {
      const result = await cancelOrder(orderId).unwrap();
      toast.info(result?.msg);
    } catch (error) {
      toast.error(error?.data || "Something went wrong");
    }
  };

  const visibleItems = isExpanded
    ? order.orderDetails
    : order.orderDetails.slice(0, 2);

  return (
    <>
      <article className="rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl">
        {/* ── Card header ─────────────────────────────────────────────── */}
        <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Order #{order.orderNo}
                </h3>
                {/* Server component used inside client — totally valid */}
                <StatusBadge status={order.orderStatus} />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  <span>{formatDate(order.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ShoppingBag className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {order.orderDetails.length}{" "}
                    {order.orderDetails.length === 1 ? "Item" : "Items"}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-2 sm:items-end">
              <div className="flex items-center text-2xl font-bold text-gray-900">
                <IndianRupee className="h-5 w-5" aria-hidden="true" />
                <span>{totalAmount}</span>
              </div>
              <PaymentBadge status={order.paymentStatus} />
            </div>
          </div>
        </div>

        {/* ── Items ───────────────────────────────────────────────────── */}
        <div className="p-4 sm:p-6">
          <div className="space-y-4">
            {visibleItems.map((item, idx) => {
              const product = productMap.get(item["name-url"]); // O(1)

              return (
                <div
                  key={`${item["name-url"]}-${idx}`}
                  className="rounded-xl border border-emerald-100 bg-gradient-to-r from-emerald-50/20 to-amber-50/20 p-3 transition-all hover:shadow-md sm:p-4"
                >
                  {/* Static display — no state, no handlers, inert HTML */}
                  <div className="flex gap-4 sm:gap-6">
                    <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white sm:h-28 sm:w-28">
                      {product && (
                        <Image
                          src={product.img[0].sm}
                          alt={product.name}
                          width={200}
                          height={50}
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="mb-2 flex-1">
                        <h4 className="mb-1 line-clamp-2 font-semibold text-gray-900 sm:text-lg">
                          {product?.name ?? item["name-url"]}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {item.weight} • Qty: {item.quantity}
                        </p>
                        {item.returnInfo.isItemReturned && (
                          <div className="mt-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                              <RotateCcw
                                className="h-3 w-3"
                                aria-hidden="true"
                              />
                              Returned ({item.returnInfo.returnedQuantity} Qty)
                            </span>
                          </div>
                        )}
                      </div>
                      {product && (
                        <div className="flex items-center justify-between border-t border-emerald-100 pt-2">
                          <div className="text-sm text-gray-600">
                            ₹{product.price} × {item.quantity}
                          </div>
                          <div className="text-lg font-bold text-gray-900">
                            ₹{product.price * item.quantity}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Client island — only the 4 action buttons */}
                  <OrderItemActions
                    item={item}
                    product={product}
                    orderStatus={order.orderStatus}
                    onReview={handleOpenReview}
                    onReturn={handleOpenReturn}
                  />
                </div>
              );
            })}

            {/* Show more / less */}
            {order.orderDetails.length > 2 && (
              <button
                onClick={toggleExpanded}
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-emerald-200 py-2 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-50"
              >
                {isExpanded ? (
                  <>
                    Show Less <ChevronUp className="h-4 w-4" />
                  </>
                ) : (
                  <>
                    Show {order.orderDetails.length - 2} More Items{" "}
                    <ChevronDown className="h-4 w-4" />
                  </>
                )}
              </button>
            )}
          </div>

          {/* Order details button */}
          <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-50/30 to-amber-50/30 p-4">
            <button
              onClick={openModal}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Order Details
            </button>
          </div>
        </div>
      </article>

      {/* ── Modals — mounted only when needed ─────────────────────────── */}
      {showReviewModal && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={closeReview}
          productId={curItem?.["name-url"]}
        />
      )}

      {isReturnFormVisible && curItem && (
        <ReturnItemForm
          product={curItem}
          returnedQuantity={0}
          paymentMethod="online_payment"
          amountPaid={315}
          invoiceNumber={order.invoiceNumber}
          onCancel={closeReturn}
          isSubmitting={false}
        />
      )}

      {/*
        Modal shell is a Client component (open/close mechanics).
        ModalContent is a Server component passed as children —
        its HTML is never re-rendered when showModal toggles.
      */}
      <OrderDetailsModal
        isOpen={showModal}
        onClose={closeModal}
        orderNo={order.orderNo}
      >
        <ModalContent
          order={order}
          productMap={productMap}
          handleOrderCancel={handleOrderCancel}
        />
      </OrderDetailsModal>
    </>
  );
});
