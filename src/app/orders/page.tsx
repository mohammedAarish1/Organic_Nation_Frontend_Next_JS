import { FilteredOrderList } from "@/components/order-history-page/FilteredOrderList";
import { PageHeader } from "@/components/order-history-page/PageHeader";
import OrderListSkeleton from "@/components/skeletons/OrderListSkeleton";
import { Suspense } from "react";

// Next.js metadata — only works in Server Components
export const metadata = {
  title: "Order History | Organic Nation",
  description: "Track and manage all your orders in one place",
};

export default function OrderHistoryPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-emerald-50/30 to-white pt-20">
      {/* Decorative blobs — pure CSS, zero JS, rendered on server */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-20"
        aria-hidden="true"
      >
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Server-rendered heading — zero JS */}
        <PageHeader />

        <Suspense fallback={<OrderListSkeleton />}>
          <FilteredOrderList />
        </Suspense>
      </div>
    </div>
  );
}
