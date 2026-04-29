// String unions > raw strings — autocomplete + typo-safety everywhere
export type PaymentStatus = "pending" | "paid";

export type PaymentMethod = "cash_on_delivery" | "online_payment";

export type OrderStatus =
  | "pending"
  | "active"
  | "dispatched"
  | "completed"
  | "cancelled";
