import { AlertCircle } from "lucide-react";

const CODEligibility = () => (
  <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
    <div className="flex items-start gap-3">
      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
      <div>
        <p className="text-sm font-semibold text-amber-900">Cash on Delivery</p>
        <p className="mt-1 text-xs text-amber-700">
          COD available for orders above ₹199
        </p>
      </div>
    </div>
  </div>
);

export default CODEligibility;
