import type { MongoID, MongoDate } from "@/types/common";
import type {
  PaymentMethod,
  PaymentStatus,
  OrderStatus,
} from "./order-status.types";

// ── Sub-shapes ────────────────────────────────────────────────────────────────

export interface ShippingAddress {
  address: string;
  pinCode: string;
  city: string;
  state: string;
}

export interface ReturnInfo {
  isItemReturned: boolean;
  returnedQuantity: number;
}

// ── Core types ────────────────────────────────────────────────────────────────

export interface OrderItem {
  id: MongoID;
  "name-url": string; // product slug — links to Product
  quantity: number;
  weight: string;
  tax: number;
  hsnCode: number;
  unitPrice: number;
  actualAmountPaid: number;
  returnInfo: ReturnInfo;
}

export interface Order {
  _id: MongoID;
  orderNo: string;
  userEmail: string;
  userName: string;
  phoneNumber: string;
  invoiceNumber: string;
  shippingAddress: ShippingAddress;
  orderDetails: OrderItem[];
  subTotal: number;
  taxAmount: number;
  shippingFee: number;
  CODCharge: number;
  paymentMethod: PaymentMethod; // ✅ was raw string
  paymentStatus: PaymentStatus; // ✅ was raw string
  orderStatus: OrderStatus; // ✅ was raw string
  deliveryDate: string | null;
  createdAt: MongoDate | string;
  couponCodeApplied: CouponCode[]; // ✅ was unknown[] — define when ready
}

// Placeholder — replace with real shape when coupon feature is built
export type CouponCode = Record<string, unknown>;
