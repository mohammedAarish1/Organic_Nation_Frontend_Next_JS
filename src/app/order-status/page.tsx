import { Metadata } from "next";
import OrderSuccessClient from "../../components/order-status/OrderSuccessClient";

interface PageProps {
  searchParams: {
    status?: string;
    retryToken?: string;
    error?: string;
  };
}

// Generate metadata
export const metadata: Metadata = {
  title: "Order Confirmation - Organic Nation",
  description: "Your order has been placed successfully",
  robots: "noindex, nofollow", // Don't index order confirmation pages
};

export default async function OrderSuccessPage({ searchParams }: PageProps) {
  const { status, retryToken, error: urlError } = await searchParams;
  // Determine order status from URL params
  let orderStatus: "success" | "failure" | "error" = "success";
  if (status === "failure") orderStatus = "failure";
  if (urlError) orderStatus = "error";

  return (
    <OrderSuccessClient
      orderStatus={status}
      retryToken={retryToken}
      paymentStatus={status}
    />
  );
}
