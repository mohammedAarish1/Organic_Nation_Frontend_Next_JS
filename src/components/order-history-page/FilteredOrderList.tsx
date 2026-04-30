"use client";

import { useState, useMemo, memo } from "react";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

import { useGetAllOrdersQuery } from "@/lib/services/api/ordersApi";
import { useProducts } from "@/components/providers/ProductsProvider";
import { OrderCard } from "./Ordercard";
import {
  FILTER_OPTIONS,
  FilterValue,
} from "@/features/order/utils/orderHistoryUtils";
import { ProductMap } from "@/features/product/types";
import { Product } from "@/types";

export const FilteredOrderList = memo(function FilteredOrderList() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const { products } = useProducts();
  const { data: orders, isLoading } = useGetAllOrdersQuery(undefined);

  // ✅ Built once when products change — O(1) lookups for all child cards
  const productMap = useMemo<ProductMap>(() => {
    const map = new Map<string, Product>();
    products?.forEach((p) => map.set(p["name-url"], p));
    return map;
  }, [products]);

  // ✅ Recomputed only when orders or filter changes
  const filteredOrders = useMemo(
    () =>
      filter === "all"
        ? orders
        : orders?.filter((o) => o.orderStatus.toLowerCase() === filter),
    [orders, filter],
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-600 border-t-transparent"
          role="status"
          aria-label="Loading orders"
        />
      </div>
    );
  }

  return (
    <>
      {/* Filter tabs */}
      <div className="mb-6 sm:mb-8">
        <div
          className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Filter orders by status"
        >
          {FILTER_OPTIONS.map((option) => (
            <button
              key={option.value}
              role="tab"
              aria-selected={filter === option.value}
              onClick={() => setFilter(option.value)}
              className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                filter === option.value
                  ? "bg-linear-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                  : "bg-white text-gray-700 hover:bg-emerald-50"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders */}
      {filteredOrders && filteredOrders.length > 0 ? (
        <div className="space-y-6" role="list" aria-label="Orders">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order._id.$oid ?? order.orderNo}
              order={order}
              productMap={productMap}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-md">
          <div className="mb-4 rounded-full bg-linear-to-r from-emerald-100 to-amber-100 p-6">
            <AlertCircle
              className="h-12 w-12 text-emerald-700"
              aria-hidden="true"
            />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            No Orders Found
          </h3>
          <p className="mb-6 text-gray-600">
            {filter === "all"
              ? "You haven't placed any orders yet"
              : `No ${filter} orders found`}
          </p>
          <Link href="/shop/all">
            <button className="rounded-full bg-linear-to-r from-emerald-600 to-green-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg">
              Start Shopping
            </button>
          </Link>
        </div>
      )}
    </>
  );
});
