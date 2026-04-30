// ─── Sub Types ────────────────────────────────────────────────────────────────

type CouponDetails = {
  id: string;
  name: string;
};

type Address = {
  _id?: string;
  addressType?: string;
  address?: string;
  pinCode: string;
  city: string;
  state: string;
};

type CartItem = {
  productId: string;
  quantity: number;
  productName: string;
};

type Cart = {
  items: CartItem[];
  totalCartAmount: number;
  totalTaxes: number;
  couponCodeApplied: CouponDetails[];
};

type ReferralCoupon = {
  _id?: string;
  couponId?: string;
  orderId?: string;
  isUsed: boolean;
  type: "referrer" | "referred";
  createdAt: string;
};

// ─── Main User Type ───────────────────────────────────────────────────────────

export type User = {
  _id: string;
  fullName?: string;
  phoneNumber: string;
  email?: string;
  createdAt: string;
  cart: Cart;
  role: string;
  addresses: Address[];
  refreshToken?: string | null;
  resetPasswordToken?: string;
  resetPasswordExpires?: string;
  referralCode?: string;
  referredBy?: string | null;
  referralCoupons: ReferralCoupon[];
  wishlist: string[];
  success?: boolean;
};
