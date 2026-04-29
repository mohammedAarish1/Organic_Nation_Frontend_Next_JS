import CartClient from "@/components/cart/CartClient";
import CartHeader from "@/components/cart/CartHeader";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart - Organic Nation",
  description: "Review and manage your cart items before checkout",
};

// Server Component - handles data fetching
export default async function CartPage() {
  return (
    <div className="mt-20 min-h-screen pb-24">
      {/* Header */}
      <CartHeader />

      <CartClient />
    </div>
  );
}
