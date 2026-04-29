import { CreditCard, Smartphone, Wallet, Package } from "lucide-react";

export default function PaymentMethods() {
  return (
    <div className="bg-gray-50 py-12">
      <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
        <h3 className="mb-4 text-center text-xl font-semibold text-gray-900">
          We Accept
        </h3>
        <div className="xs:p-4 w-full rounded-xl bg-white py-2 shadow-sm">
          <div className="flex flex-wrap items-center justify-center gap-4">
            {[
              { icon: CreditCard, label: "Cards" },
              { icon: Smartphone, label: "UPI" },
              { icon: Wallet, label: "Wallets" },
              { icon: Package, label: "COD" },
            ].map((payment, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-lg bg-gray-50 px-4 py-2"
              >
                <payment.icon size={20} color="#6B7280" />
                <span className="text-sm font-medium text-gray-700">
                  {payment.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
