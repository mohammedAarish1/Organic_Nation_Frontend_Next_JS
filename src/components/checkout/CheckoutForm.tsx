"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Briefcase,
  MapPin,
  CreditCard,
  Banknote,
  ChevronLeft,
  Truck,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Loader2,
} from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useAppSelector } from "@/lib/hooks";
import { useCart } from "@/lib/custom-hooks/useCart";
import {
  additionalDiscountforOnlinePayment,
  generateTransactionID,
} from "@/lib/utils";
import {
  useAddOrderMutation,
  useInitiatePaymentMutation,
  useLazyCheckDeliveryAvailabilityQuery,
} from "@/lib/services/api/ordersApi";
import { useRouter } from "next/navigation";
import { useCheckoutModal } from "../providers/CheckoutModalProvider";
import {
  useCalculateCODChargesMutation,
  useCalculateShippingFeeMutation,
} from "@/lib/services/api/cartApi";
import { freeShippingEligibleAmt } from "@/constants";
import { Product } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Address {
  _id: string;
  addressType: "Home" | "Office" | "Other";
  address: string;
  pinCode: string;
  city: string;
  state: string;
}

interface FormValues {
  phoneNumber: string;
  fullName: string;
  email: string;
  address: string;
  pinCode: string;
  city: string;
  state: string;
  addressType: "Home" | "Office" | "Other";
  paymentMethod: "online_payment" | "cash_on_delivery";
}

// Delivery availability states for the pincode field
type DeliveryStatus = "idle" | "checking" | "available" | "unavailable";

// ─── Validation Schema ────────────────────────────────────────────────────────

const getValidationSchema = (showAddressForm: boolean) => {
  if (!showAddressForm) {
    return Yup.object().shape({
      paymentMethod: Yup.string()
        .oneOf(["online_payment", "cash_on_delivery"])
        .required(),
    });
  }

  return Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^\d{10}$/, "Please enter a valid 10-digit phone number")
      .required("Phone number is required"),
    fullName: Yup.string()
      .min(2, "Name must be at least 2 characters")
      .required("Full name is required"),
    email: Yup.string()
      .email("Please enter a valid email")
      .required("Email is required"),
    address: Yup.string()
      .min(10, "Address must be at least 10 characters")
      .required("Address is required"),
    pinCode: Yup.string()
      .matches(/^\d{6}$/, "Please enter a valid 6-digit pincode")
      .required("Pincode is required"),
    city: Yup.string().required("City is required"),
    state: Yup.string().required("State is required"),
    addressType: Yup.string().oneOf(["Home", "Office", "Other"]).required(),
    paymentMethod: Yup.string()
      .oneOf(["online_payment", "cash_on_delivery"])
      .required(),
  });
};

// ─── Saved Address Card ───────────────────────────────────────────────────────

const SavedAddressCard = ({
  user,
  addresses,
  selectedAddress,
  onSelect,
  onAddNew,
}: {
  user: any;
  addresses: Address[];
  selectedAddress: string | null;
  onSelect: (id: string) => void;
  onAddNew: () => void;
}) => (
  <div className="mb-6">
    <h3 className="mb-4 text-lg font-semibold text-gray-900">
      Select Delivery Address
    </h3>
    <div className="space-y-3">
      {addresses.map((address) => (
        <motion.div
          key={address._id}
          className={`cursor-pointer rounded-xl border-2 p-4 transition-all ${
            selectedAddress === address._id
              ? "border-amber-500 bg-amber-50 shadow-md"
              : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
          }`}
          onClick={() => onSelect(address._id)}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <div className="flex items-start gap-3">
            <input
              type="radio"
              checked={selectedAddress === address._id}
              onChange={() => onSelect(address._id)}
              className="mt-1 h-4 w-4 text-amber-600"
            />
            <div className="flex-1">
              <div className="mb-2 flex items-center justify-between">
                <p className="font-semibold text-gray-900">{user?.fullName}</p>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    address.addressType === "Home"
                      ? "bg-emerald-100 text-emerald-700"
                      : address.addressType === "Office"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {address.addressType}
                </span>
              </div>
              <p className="mb-1 text-sm text-gray-600">
                <span className="font-medium">Phone:</span> {user?.phoneNumber}
              </p>
              <p className="text-sm text-gray-700">{address.address}</p>
              <p className="text-sm text-gray-700">
                {address.city}, {address.state} - {address.pinCode}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
    <button
      type="button"
      onClick={onAddNew}
      className="mt-4 w-full cursor-pointer rounded-xl border-2 border-dashed border-amber-400 bg-amber-50 py-3 font-medium text-amber-700 transition-colors hover:bg-amber-100"
    >
      <span className="mr-2 text-xl">+</span> Add New Address
    </button>
  </div>
);

// ─── Address Type Buttons ─────────────────────────────────────────────────────

const AddressTypeButtons = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (val: string) => void;
}) => {
  const types = [
    { value: "Home", icon: Home },
    { value: "Office", icon: Briefcase },
    { value: "Other", icon: MapPin },
  ];

  return (
    <div className="flex gap-2">
      {types.map(({ value: type, icon: Icon }) => (
        <button
          key={type}
          type="button"
          className={`flex flex-1 items-center justify-center gap-2 rounded-xl border-2 py-3 transition-all ${
            value === type
              ? "border-amber-500 bg-amber-50 shadow-sm"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => onChange(type)}
        >
          <Icon className="h-4 w-4" />
          <span className="font-medium">{type}</span>
        </button>
      ))}
    </div>
  );
};

// ─── Payment Method Buttons ───────────────────────────────────────────────────

const PaymentMethodButtons = ({
  value,
  onChange,
  CODCharge,
  onlineDiscount,
}: {
  value: string;
  onChange: (val: string) => void;
  CODCharge: number;
  onlineDiscount: number;
}) => {
  const methods = [
    {
      value: "cash_on_delivery",
      icon: Banknote,
      label: "Cash on Delivery",
      badge: `COD Charge: ₹${CODCharge}`,
    },
    {
      value: "online_payment",
      icon: CreditCard,
      label: "Online Payment",
      badge: `Save ₹${onlineDiscount}`,
    },
  ];

  return (
    <div className="space-y-3">
      {methods.map(({ value: method, icon: Icon, label, badge }) => (
        <button
          key={method}
          type="button"
          className={`flex w-full cursor-pointer items-center justify-between rounded-xl border-2 p-4 transition-all ${
            value === method
              ? "border-amber-500 bg-amber-50 shadow-md"
              : "border-gray-300 hover:border-gray-400"
          }`}
          onClick={() => onChange(method)}
        >
          <div className="flex items-center gap-1 sm:gap-3">
            <Icon className="h-5 w-5 text-gray-700" />
            <span className="text-xs font-medium text-gray-900 sm:text-base">
              {label}
            </span>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              method === "cash_on_delivery"
                ? "bg-red-500 text-white"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {badge}
          </span>
        </button>
      ))}
    </div>
  );
};

// ─── Formik Input ─────────────────────────────────────────────────────────────

const FormikInput = ({
  label,
  name,
  type = "text",
  placeholder,
  disabled = false,
  required = false,
  as = "input",
  rows = 3,
  rightElement,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  as?: "input" | "textarea";
  rows?: number;
  // Slot for inline status icons (used by pincode field)
  rightElement?: React.ReactNode;
}) => (
  <div>
    <label
      htmlFor={name}
      className="mb-2 block text-sm font-medium text-gray-700"
    >
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <Field name={name}>
      {({ field, meta }: any) => (
        <div className="relative">
          {as === "textarea" ? (
            <textarea
              {...field}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              rows={rows}
              className={`w-full rounded-xl border-2 p-3 focus:border-amber-500 focus:outline-none ${
                disabled ? "bg-gray-100" : "border-gray-300"
              } ${meta.touched && meta.error ? "border-red-500" : ""}`}
            />
          ) : (
            <input
              {...field}
              id={name}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              // Extra right padding so text never overlaps the icon
              className={`w-full rounded-xl border-2 p-3 focus:border-amber-500 focus:outline-none ${
                rightElement ? "pr-10" : ""
              } ${disabled ? "bg-gray-100" : "border-gray-300"} ${
                meta.touched && meta.error ? "border-red-500" : ""
              }`}
            />
          )}
          {/* Inline status icon slot */}
          {rightElement && (
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              {rightElement}
            </div>
          )}
        </div>
      )}
    </Field>
    <ErrorMessage
      name={name}
      component="p"
      className="mt-1 text-sm text-red-500"
    />
  </div>
);

// ─── Delivery Status Badge ────────────────────────────────────────────────────
// Small banner that appears below the pincode field to surface availability info.

const DeliveryStatusBadge = ({
  status,
  message,
}: {
  status: DeliveryStatus;
  message: string;
}) => {
  if (status === "idle" || status === "checking") return null;

  const isAvailable = status === "available";

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`mt-2 flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium ${
        isAvailable
          ? "bg-emerald-50 text-emerald-700"
          : "bg-red-50 text-red-600"
      }`}
    >
      {isAvailable ? (
        <CheckCircle2 className="h-4 w-4 shrink-0" />
      ) : (
        <XCircle className="h-4 w-4 shrink-0" />
      )}
      {message}
    </motion.div>
  );
};

// ─── Free Shipping Alert ──────────────────────────────────────────────────────

const FreeShippingAlert = ({
  totalAmount,
  threshold = 199,
}: {
  totalAmount: number;
  threshold?: number;
}) => {
  const remaining = threshold - totalAmount;
  const progress = Math.min((totalAmount / threshold) * 100, 100);

  if (totalAmount >= threshold) return null;

  return (
    <div className="mb-4 overflow-hidden rounded-xl border-2 border-emerald-200 bg-linear-to-r from-emerald-50 to-green-50 p-4">
      <div className="mb-2 flex items-start gap-3">
        <Truck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
        <div className="flex-1">
          <p className="mb-2 text-sm font-semibold text-emerald-900">
            Add ₹{remaining} more for FREE shipping!
          </p>
          <div className="h-2 overflow-hidden rounded-full bg-emerald-200">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-linear-to-r from-emerald-500 to-green-600"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── COD Eligibility Alert ────────────────────────────────────────────────────

const CODEligibility = () => (
  <div className="mb-4 rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
    <div className="flex items-start gap-3">
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
      <div>
        <p className="text-sm font-semibold text-amber-900">Cash on Delivery</p>
        <p className="mt-1 text-xs text-amber-700">
          COD available for orders above ₹199
        </p>
      </div>
    </div>
  </div>
);

// ─── Main Component ───────────────────────────────────────────────────────────

export default function CheckoutForm() {
  const router = useRouter();
  const [savedAddresses, setSavedAddresses] = useState<Address[]>([]);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

  // Delivery availability state for the new-address form's pincode field
  const [deliveryStatus, setDeliveryStatus] = useState<DeliveryStatus>("idle");
  const [deliveryMessage, setDeliveryMessage] = useState("");

  // Debounce timer ref — avoids firing on every keystroke
  const pinDebounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [addOrder, { isLoading }] = useAddOrderMutation();
  const { user } = useAppSelector((state) => state.auth);

  const [calculateShippingFee, { isLoading: isCalculatingShippingFee }] =
    useCalculateShippingFeeMutation();
  const [calculateCODCharges, { isLoading: isCalculatingCODCharges }] =
    useCalculateCODChargesMutation();
  const [checkDeliveryAvailability, { data, isLoading: ischecking }] =
    useLazyCheckDeliveryAvailabilityQuery();
  const [initiatePayment, { isLoading: isPaymentInitiated }] =
    useInitiatePaymentMutation();
  const { shippingFee, CODCharge } = useAppSelector((state) => state.cart);
  const { closeCheckout } = useCheckoutModal();
  const [isTestingProduct, setIsTestingProduct] = useState(false);

  const {
    cartItems,
    totalCartAmount,
    totalTax,
    discountAmount,
    couponCodeApplied,
  } = useCart();

  const { onlineDiscount } = additionalDiscountforOnlinePayment(
    totalCartAmount,
    totalTax,
  );

  const initialValues: FormValues = {
    phoneNumber: user?.phoneNumber?.replace("+91", "") || "",
    fullName: user?.fullName || "",
    email: user?.email || "",
    address: "",
    pinCode: "",
    city: "",
    state: "",
    addressType: "Home",
    paymentMethod: "online_payment",
  };

  // ── Bootstrap: load saved addresses & COD charges once ──────────────────────
  useEffect(() => {
    if (user?.addresses?.length) {
      setSavedAddresses(user.addresses as Address[]);
      setSelectedAddress(user.addresses[0]._id);
    } else {
      setShowAddressForm(true);
    }
  }, [user]);

  useEffect(() => {
    calculateCODCharges({});
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Auto-calculate shipping when selected saved address changes ──────────────
  useEffect(() => {
    if (!selectedAddress || !savedAddresses.length) return;

    const matched = savedAddresses.find((a) => a._id === selectedAddress);
    if (matched?.pinCode) {
      calculateShippingFee({ pinCode: matched.pinCode });
    }
  }, [selectedAddress, savedAddresses]); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Pincode check handler (used by the new-address form) ────────────────────
  const handlePincodeCheck = useCallback(
    async (
      pinCode: string,
      setFieldValue: (field: string, value: string) => void,
    ) => {
      if (!/^\d{6}$/.test(pinCode)) {
        setDeliveryStatus("idle");
        setDeliveryMessage("");
        return;
      }

      setDeliveryStatus("checking");
      setDeliveryMessage("");

      try {
        const result = await checkDeliveryAvailability(pinCode).unwrap();
        if (result.available) {
          // ← changed key
          setFieldValue("city", result.data.city ?? "");
          setFieldValue("state", result.data.state ?? "");
          await calculateShippingFee({ pinCode });
          setDeliveryStatus("available");
          setDeliveryMessage(
            result.message || "Delivery available for this pincode ✓",
          );
        } else {
          setFieldValue("city", "");
          setFieldValue("state", "");
          setDeliveryStatus("unavailable");
          setDeliveryMessage(
            result.message || "Delivery not available for this pincode.",
          );
        }
      } catch {
        setFieldValue("city", "");
        setFieldValue("state", "");
        setDeliveryStatus("unavailable");
        setDeliveryMessage("Unable to verify pincode. Please try again.");
      }
    },
    [checkDeliveryAvailability, calculateShippingFee],
  );

  // ── Order processing ────────────────────────────────────────────────────────
  const processOrder = async (shippingInfo: any) => {
    try {
      const merchantTransactionId = generateTransactionID();
      const orderDetails = cartItems.map((item) => ({
        id: item._id,
        "name-url": item["name-url"],
        quantity: item.quantity,
        weight: item.weight,
        tax: item.tax,
        hsnCode: item["hsn-code"],
        unitPrice: item.price,
      }));

      const checkoutData = {
        fullName: shippingInfo.fullName,
        userEmail: shippingInfo.email,
        phoneNumber: shippingInfo.phoneNumber,
        addressType: shippingInfo.addressType,
        shippingAddress: {
          address: shippingInfo.address,
          pinCode: shippingInfo.pinCode,
          city: shippingInfo.city,
          state: shippingInfo.state,
        },
        orderDetails,
        subTotal:
          shippingInfo.paymentMethod === "cash_on_delivery"
            ? totalCartAmount + CODCharge || 0
            : totalCartAmount - discountAmount,
        taxAmount:
          shippingInfo.paymentMethod === "cash_on_delivery"
            ? totalTax
            : totalTax - 0,
        shippingFee: totalCartAmount < 399 ? shippingFee : 0,
        CODCharge:
          shippingInfo.paymentMethod === "cash_on_delivery" ? CODCharge : 0,
        paymentMethod: shippingInfo.paymentMethod,
        paymentStatus: "pending",
        merchantTransactionId:
          shippingInfo.paymentMethod === "cash_on_delivery"
            ? ""
            : merchantTransactionId,
        couponCodeApplied: couponCodeApplied || user?.cart?.couponCodeApplied,
      };

      if (user && cartItems.length > 0) {
        const result = await addOrder(checkoutData).unwrap();
        if (result.success) {
          sessionStorage.setItem("newOrderId", result.orderId);
          // =======  handles COD order  ============
          if (shippingInfo.paymentMethod === "cash_on_delivery") {
            closeCheckout();
            router.push(`/order-status?status=confirmed`);
            // =======  handles Online order  ============
          } else {
            const payload = {
              number: shippingInfo.phoneNumber.replace("+91", ""),
              amount:
                totalCartAmount -
                discountAmount +
                (isTestingProduct || totalCartAmount >= freeShippingEligibleAmt
                  ? 0
                  : shippingFee),
              merchantTransactionId: merchantTransactionId,
            };
            await initiatePayment(payload).unwrap();
            setIsTestingProduct(false);
          }
        }
      }
    } catch (error) {
      throw error;
    }
  };

  const handleFormSubmit = (values: FormValues) => {
    const shippingInfo = showAddressForm
      ? { ...values, phoneNumber: `+91${values.phoneNumber}` }
      : {
          ...savedAddresses.find((addr) => addr._id === selectedAddress),
          phoneNumber: user?.phoneNumber,
          fullName: user?.fullName,
          email: user?.email,
          paymentMethod: values.paymentMethod,
        };

    processOrder(shippingInfo);
  };

  useEffect(() => {
    const value = cartItems?.some(
      (product: Product) => product?.category === "Demo",
    );
    setIsTestingProduct(value);
  }, [isTestingProduct, cartItems]);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema(showAddressForm)}
      onSubmit={handleFormSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => {
        const currentTotal = Math.round(
          totalCartAmount +
            (totalCartAmount < freeShippingEligibleAmt ? shippingFee : 0) +
            (values.paymentMethod === "cash_on_delivery" ? CODCharge : 0) -
            (values.paymentMethod === "online_payment" ? onlineDiscount : 0),
        );

        // Inline icon shown inside the pincode input
        const pincodeRightIcon =
          deliveryStatus === "checking" ? (
            <Loader2 className="h-4 w-4 animate-spin text-amber-500" />
          ) : deliveryStatus === "available" ? (
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          ) : deliveryStatus === "unavailable" ? (
            <XCircle className="h-4 w-4 text-red-500" />
          ) : null;

        return (
          <Form className="space-y-6">
            {/* ── Address Section ────────────────────────────────────────── */}
            {savedAddresses.length > 0 && !showAddressForm ? (
              <SavedAddressCard
                user={user}
                addresses={savedAddresses}
                selectedAddress={selectedAddress}
                onSelect={setSelectedAddress}
                onAddNew={() => setShowAddressForm(true)}
              />
            ) : (
              <>
                {savedAddresses.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddressForm(false);
                      // Reset delivery status when going back
                      setDeliveryStatus("idle");
                      setDeliveryMessage("");
                    }}
                    className="mb-4 flex items-center gap-2 text-amber-700 hover:underline"
                  >
                    <ChevronLeft className="h-4 w-4" /> Back to saved addresses
                  </button>
                )}

                <div className="space-y-4">
                  <FormikInput
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="10-digit phone number"
                    disabled
                    required
                  />
                  <FormikInput
                    label="Full Name"
                    name="fullName"
                    placeholder="Enter your full name"
                    disabled={!!user?.fullName}
                    required
                  />
                  <FormikInput
                    label="Email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled={!!user?.email}
                    required
                  />
                  <FormikInput
                    label="Address"
                    name="address"
                    as="textarea"
                    placeholder="Enter your complete address"
                    required
                  />

                  <div className="grid gap-4">
                    {/* ── Pincode with live delivery check ───────────────── */}
                    <div>
                      <Field name="pinCode">
                        {({ field, meta, form }: any) => (
                          <>
                            <label
                              htmlFor="pinCode"
                              className="mb-2 block text-sm font-medium text-gray-700"
                            >
                              Pincode <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                              <input
                                {...field}
                                id="pinCode"
                                type="text"
                                maxLength={6}
                                placeholder="6-digit pincode"
                                className={`w-full rounded-xl border-2 border-gray-300 p-3 pr-10 focus:border-amber-500 focus:outline-none ${
                                  meta.touched && meta.error
                                    ? "border-red-500"
                                    : ""
                                }`}
                                onChange={(e) => {
                                  const val = e.target.value
                                    .replace(/\D/g, "")
                                    .slice(0, 6);
                                  form.setFieldValue("pinCode", val);

                                  // Reset status on every new keystroke
                                  setDeliveryStatus("idle");
                                  setDeliveryMessage("");

                                  // Clear any pending debounce timer
                                  if (pinDebounceRef.current) {
                                    clearTimeout(pinDebounceRef.current);
                                  }

                                  // Fire check 500 ms after the user stops typing
                                  pinDebounceRef.current = setTimeout(() => {
                                    handlePincodeCheck(val, form.setFieldValue);
                                  }, 500);
                                }}
                              />
                              {pincodeRightIcon && (
                                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                                  {pincodeRightIcon}
                                </div>
                              )}
                            </div>
                            <ErrorMessage
                              name="pinCode"
                              component="p"
                              className="mt-1 text-sm text-red-500"
                            />
                            {/* Delivery status banner below the field */}
                            <DeliveryStatusBadge
                              status={deliveryStatus}
                              message={deliveryMessage}
                            />
                          </>
                        )}
                      </Field>
                    </div>

                    {/* City — auto-filled after successful pin check */}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <FormikInput
                      label="City"
                      name="city"
                      placeholder="City"
                      // Lock field once auto-filled so user doesn't accidentally clear it
                      disabled={deliveryStatus === "available"}
                      required
                    />
                    {/* State — auto-filled after successful pin check */}
                    <FormikInput
                      label="State"
                      name="state"
                      placeholder="State"
                      disabled={deliveryStatus === "available"}
                      required
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Save Address As
                    </label>
                    <AddressTypeButtons
                      value={values.addressType}
                      onChange={(val) => setFieldValue("addressType", val)}
                    />
                  </div>
                </div>
              </>
            )}

            {/* ── Payment Method ─────────────────────────────────────────── */}
            <div>
              <label className="mb-3 block text-sm font-medium text-gray-700">
                Payment Method
              </label>
              <PaymentMethodButtons
                value={values.paymentMethod}
                onChange={(val) => setFieldValue("paymentMethod", val)}
                CODCharge={CODCharge}
                onlineDiscount={onlineDiscount || 0}
              />
            </div>

            {/* ── Alerts ────────────────────────────────────────────────── */}
            {totalCartAmount < 199 && (
              <>
                <CODEligibility />
                <FreeShippingAlert totalAmount={totalCartAmount} />
              </>
            )}

            {/* ── Submit ────────────────────────────────────────────────── */}
            <button
              type="submit"
              disabled={
                isLoading ||
                // Block submission if pincode check is in-flight or failed
                (showAddressForm && deliveryStatus === "unavailable") ||
                (showAddressForm && deliveryStatus === "checking")
              }
              className="w-full cursor-pointer rounded-xl bg-linear-to-r from-amber-600 to-red-700 py-4 font-semibold text-white shadow-lg transition-all hover:shadow-xl disabled:opacity-50"
            >
              {isLoading
                ? "Processing..."
                : isCalculatingShippingFee
                  ? "Calculating shipping..."
                  : isPaymentInitiated
                    ? "Placing order..."
                    : `Place Order (₹${currentTotal.toLocaleString("en-IN")})`}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
}
