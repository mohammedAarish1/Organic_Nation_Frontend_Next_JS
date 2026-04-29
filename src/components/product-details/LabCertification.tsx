import { Shield } from "lucide-react";

export default function LabCertification() {
  return (
    <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-4 sm:flex-nowrap">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gray-200">
            <Shield size={24} className="text-green-600" />
          </div>
          <div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              Lab Tested & Certified
            </h3>
            <p className="mb-3 text-sm text-gray-700 sm:text-base">
              Our products undergo rigorous third-party laboratory testing to
              ensure purity, quality, and safety. Each batch is tested for
              contaminants, pesticides, and heavy metals.
            </p>
            <div className="flex flex-wrap gap-2 text-xs sm:text-sm">
              <span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-700">
                Pesticide Free
              </span>
              <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">
                Heavy Metal Tested
              </span>
              <span className="rounded-full bg-purple-100 px-3 py-1 font-medium text-purple-700">
                Microbiological Safe
              </span>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-max">
          <button className="w-full rounded-lg bg-gray-900 px-4 py-2 font-semibold whitespace-nowrap text-white transition-colors hover:bg-gray-800">
            View Report
          </button>
        </div>
      </div>
    </div>
  );
}
