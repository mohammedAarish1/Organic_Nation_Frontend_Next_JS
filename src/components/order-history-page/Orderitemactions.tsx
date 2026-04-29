"use client";

// client/OrderItemActions.tsx
// ─────────────────────────────────────────────────────────────────────────────
// CLIENT COMPONENT — the interactive action row per order item.
//
// Separated from the item display (which is server-rendered) so that
// the image, name, price HTML is static — only the 4 buttons are client JS.
// ─────────────────────────────────────────────────────────────────────────────

import { memo, useCallback } from "react";
import Link from "next/link";
import { Eye, ShoppingBag, Star, RotateCcw } from "lucide-react";
import { useAppDispatch } from "@/lib/hooks";
import { useCart } from "@/lib/custom-hooks/useCart";
import { showCartNotification } from "@/lib/features/cart/cartSlice";
import type { OrderItem, Product } from "../shared/types";

interface Props {
  item: OrderItem;
  product: Product | undefined;
  orderStatus: string;
  onReview: (item: OrderItem) => void;
  onReturn: (item: OrderItem) => void;
}

export const OrderItemActions = memo(function OrderItemActions({
  item,
  product,
  orderStatus,
  onReview,
  onReturn,
}: Props) {
  const dispatch = useAppDispatch();
  const { addToCart } = useCart();

  const handleBuyAgain = useCallback(async () => {
    if (!product) return;
    try {
      const result = await addToCart({
        productId: product._id,
        quantity: 1,
        productName: product["name-url"],
      });
      if (result.success) dispatch(showCartNotification());
    } catch {}
  }, [product, addToCart, dispatch]);

  const handleReview = useCallback(() => onReview(item), [item, onReview]);
  const handleReturn = useCallback(() => onReturn(item), [item, onReturn]);

  return (
    <div className="mt-4 grid grid-cols-2 gap-2 border-t border-emerald-100 pt-4 sm:grid-cols-4">
      {product && (
        <Link
          href={`/shop/${product["category-url"]?.toLowerCase()}/${product["name-url"]}`}
          className="flex items-center justify-center gap-1 rounded-lg border border-emerald-600 px-3 py-2 text-xs font-semibold text-emerald-700 transition-all hover:bg-emerald-50 sm:text-sm"
        >
          <Eye className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">View Product</span>
          <span className="sm:hidden">View</span>
        </Link>
      )}

      {product && (
        <button
          onClick={handleBuyAgain}
          className="flex items-center justify-center gap-1 rounded-lg border border-amber-600 px-3 py-2 text-xs font-semibold text-amber-700 transition-all hover:bg-amber-50 sm:text-sm"
        >
          <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Buy Again</span>
          <span className="sm:hidden">Buy</span>
        </button>
      )}

      {orderStatus === "completed" && (
        <button
          onClick={handleReview}
          className="flex items-center justify-center gap-1 rounded-lg border border-green-600 px-3 py-2 text-xs font-semibold text-green-700 transition-all hover:bg-green-50 sm:text-sm"
        >
          <Star className="h-3.5 w-3.5" aria-hidden="true" />
          <span className="hidden sm:inline">Review</span>
          <span className="sm:hidden">Rate</span>
        </button>
      )}

      {orderStatus === "completed" &&
        item.returnInfo.returnedQuantity < item.quantity && (
          <button
            onClick={handleReturn}
            className="flex items-center justify-center gap-1 rounded-lg border border-red-600 px-3 py-2 text-xs font-semibold text-red-700 transition-all hover:bg-red-50 sm:text-sm"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Return</span>
          </button>
        )}
    </div>
  );
});
