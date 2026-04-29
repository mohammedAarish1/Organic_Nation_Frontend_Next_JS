import { STATUS_CONFIG } from "@/features/order/utils/orderHistoryUtils";
import { Clock, Package, Truck, CheckCircle, XCircle } from "lucide-react";

// Icons can't live in the shared/utils constant because they're JSX —
// but they are server-rendered SVG, not client JS bundles.
const STATUS_ICONS: Record<string, React.ReactNode> = {
  pending: <Clock className="h-3.5 w-3.5" aria-hidden="true" />,
  active: <Package className="h-3.5 w-3.5" aria-hidden="true" />,
  dispatched: <Truck className="h-3.5 w-3.5" aria-hidden="true" />,
  completed: <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />,
  cancelled: <XCircle className="h-3.5 w-3.5" aria-hidden="true" />,
};

export function StatusBadge({ status }: { status: string }) {
  const key = status.toLowerCase();
  const config = STATUS_CONFIG[key] ?? STATUS_CONFIG.pending;
  const icon = STATUS_ICONS[key] ?? STATUS_ICONS.pending;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.color}`}
      aria-label={`Order status: ${config.text}`}
    >
      {icon}
      <span>{config.text}</span>
    </div>
  );
}

export function PaymentBadge({ status }: { status: string }) {
  const isPaid = status.toLowerCase() === "completed";

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        isPaid
          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
          : "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700"
      }`}
      aria-label={`Payment status: ${isPaid ? "Paid" : "Pending"}`}
    >
      {isPaid ? (
        <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
      ) : (
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
      )}
      <span>{isPaid ? "Paid" : "Pending"}</span>
    </div>
  );
}
