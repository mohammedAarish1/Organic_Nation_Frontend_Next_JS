export const STATUS_CONFIG: Record<string, { color: string; text: string }> = {
  pending: {
    color: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700",
    text: "Pending",
  },
  active: {
    color: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700",
    text: "Processing",
  },
  dispatched: {
    color: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700",
    text: "Shipped",
  },
  completed: {
    color: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700",
    text: "Delivered",
  },
  cancelled: {
    color: "bg-gradient-to-r from-red-100 to-rose-100 text-red-700",
    text: "Cancelled",
  },
};

export const FILTER_OPTIONS = [
  { value: "all", label: "All Orders" },
  { value: "completed", label: "Delivered" },
  { value: "dispatched", label: "Shipped" },
  { value: "active", label: "Processing" },
  { value: "cancelled", label: "Cancelled" },
] as const;

export type FilterValue = (typeof FILTER_OPTIONS)[number]["value"];

/**
 * Format a date string or MongoDB date object for display.
 * Pure function — no side effects, safe anywhere.
 */
export function formatDate(
  dateString: string | { $date: string } | null | undefined,
  style: "short" | "long" = "short",
): string {
  const raw = typeof dateString === "string" ? dateString : dateString?.$date;
  if (!raw) return "—";
  return new Date(raw).toLocaleDateString("en-IN", {
    day: "numeric",
    month: style === "long" ? "long" : "short",
    year: "numeric",
  });
}
