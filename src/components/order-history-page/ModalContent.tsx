import { MapPin, Phone, Mail, RotateCcw } from "lucide-react";
import { StatusBadge, PaymentBadge } from "./Badges";
import { formatDate } from "@/features/order/utils/orderHistoryUtils";
import Image from "next/image";
import { Order } from "@/features/order/types";
import { ProductMap } from "@/features/product/types";

interface Props {
  order: Order;
  productMap: ProductMap;
  handleOrderCancel: (orderId) => void;
}

export function ModalContent({ order, productMap, handleOrderCancel }: Props) {
  const mrpTotal = order.orderDetails.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const totalDiscount = Math.round(mrpTotal + order.CODCharge - order.subTotal);
  const totalAmount = order.subTotal + order.shippingFee;

  return (
    <div className="p-4 sm:p-6">
      {/* Status & Dates */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-4">
        <div>
          <div className="mb-2 text-sm text-gray-600">Order Status</div>
          <StatusBadge status={order.orderStatus} />
        </div>
        <div>
          <div className="mb-2 text-sm text-gray-600">Order Date</div>
          <div className="text-sm font-semibold text-gray-900">
            {formatDate(order.createdAt, "long")}
          </div>
        </div>
        {order.deliveryDate && (
          <div>
            <div className="mb-2 text-sm text-gray-600">Delivered On</div>
            <div className="text-sm font-semibold text-gray-900">
              {formatDate(order.deliveryDate, "long")}
            </div>
          </div>
        )}
      </div>

      {/* Order Items */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Order Items</h3>
        <div className="space-y-4">
          {order.orderDetails.map((item, idx) => {
            const product = productMap.get(item["name-url"]);
            return (
              <div
                key={`${item["name-url"]}-${idx}`}
                className="flex gap-4 rounded-xl border border-emerald-100 p-4"
              >
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-white">
                  {product && (
                    <Image
                      src={product.img[0].sm}
                      alt={product.name}
                      width={100}
                      height={10}
                    />
                  )}
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-gray-900">
                    {product?.name ?? item["name-url"]}
                  </h4>
                  <p className="mb-2 text-sm text-gray-600">
                    {item.weight} • Qty: {item.quantity}
                  </p>
                  {product && (
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        ₹{product.price} × {item.quantity}
                      </div>
                      <div className="font-bold text-gray-900">
                        ₹{product.price * item.quantity}
                      </div>
                    </div>
                  )}
                  {item.returnInfo.isItemReturned && (
                    <div className="mt-2">
                      <span className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">
                        <RotateCcw className="h-3 w-3" aria-hidden="true" />
                        Returned ({item.returnInfo.returnedQuantity} Qty)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="mb-6 rounded-xl border border-emerald-100 p-4">
        <h3 className="mb-4 text-lg font-bold text-gray-900">
          Payment Summary
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-black">
              Subtotal ({order.orderDetails.length} items)
            </span>
            <span className="font-medium">₹{mrpTotal}</span>
          </div>
          {totalDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount Applied</span>
              <span className="font-medium">- ₹{totalDiscount}</span>
            </div>
          )}
          {order.shippingFee > 0 ? (
            <div className="flex justify-between">
              <span className="text-gray-900">Shipping Fee</span>
              <span className="font-medium">₹{order.shippingFee}</span>
            </div>
          ) : (
            <div className="flex justify-between text-green-600">
              <span>Shipping Fee</span>
              <span className="font-medium">FREE</span>
            </div>
          )}
          {order.CODCharge > 0 && (
            <div className="flex justify-between">
              <span className="text-black">COD Charges</span>
              <span className="font-medium">₹{order.CODCharge}</span>
            </div>
          )}
          <div className="border-t border-emerald-200 pt-2">
            <div className="flex justify-between text-base font-bold">
              <span className="text-black">Total Amount</span>
              <span className="text-emerald-700">₹{totalAmount}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div className="mb-6 rounded-xl border border-emerald-100 p-4">
        <h3 className="mb-3 text-lg font-bold text-gray-900">
          Shipping Address
        </h3>
        <div className="space-y-2 text-sm text-gray-900">
          <div className="flex items-start gap-2">
            <MapPin
              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
              aria-hidden="true"
            />
            <div>
              <div className="font-semibold text-gray-900">
                {order.userName}
              </div>
              <div>{order.shippingAddress.address}</div>
              <div>
                {order.shippingAddress.city}, {order.shippingAddress.state} —{" "}
                {order.shippingAddress.pinCode}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>{order.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-emerald-600" aria-hidden="true" />
            <span>{order.userEmail}</span>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="rounded-xl border border-emerald-100 p-4">
        <div className="mb-2 text-sm text-gray-800">Payment Method</div>
        <div className="font-semibold text-gray-900 capitalize">
          {order.paymentMethod.replaceAll("_", " ")}
        </div>
        <div className="mt-2">
          <PaymentBadge status={order.paymentStatus} />
        </div>
      </div>
    </div>
  );
}
