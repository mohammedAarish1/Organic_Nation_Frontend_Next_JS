"use client";
import React, { useState } from "react";
import {
  Package,
  RotateCcw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Calendar,
  FileText,
  Image as ImageIcon,
  Video,
  ChevronDown,
  ChevronUp,
  X,
  Eye,
  Download,
} from "lucide-react";
import {
  useCancelReturnMutation,
  useGetAllReturnsQuery,
} from "@/lib/services/api/ordersApi";
import { toast } from "react-toastify";
import Image from "next/image";

// Types
interface ReturnItem {
  _id: string;
  user: string;
  invoiceNumber: string;
  itemName: string;
  weight: string;
  quantity: number;
  reason: string;
  returnStatus: string;
  returnOptions: string;
  images: string[];
  video: string;
  createdAt: string;
  img?: string;
  title?: string;
}

// Sample Data
// const sampleReturns: ReturnItem[] = [
//   {
//     _id: "697b472934e642df99a55ced",
//     user: "692feff257af0439eb8f4df5",
//     invoiceNumber: "ON/2025-26/240",
//     itemName: "garlic-pickle",
//     weight: "250 gm",
//     quantity: 2,
//     reason: "Product quality not as expected. Received damaged packaging.",
//     returnStatus: "requested",
//     returnOptions: "replacement",
//     images: [
//       "https://returned-item-images.s3.ap-south-1.amazonaws.com/returns/ON-2025-26-240-1769686824591/1.jpg"
//     ],
//     video: "https://returned-item-images.s3.ap-south-1.amazonaws.com/returns/ON-2025-26-240-1769686824591/video/return-video.mp4",
//     createdAt: "2026-01-29T11:40:25.660Z"
//   },
//   {
//     _id: "697b472934e642df99a55cee",
//     user: "692feff257af0439eb8f4df5",
//     invoiceNumber: "ON/2025-26/235",
//     itemName: "honey-organic",
//     weight: "500 gm",
//     quantity: 1,
//     reason: "Wrong item delivered",
//     returnStatus: "approved",
//     returnOptions: "refund",
//     images: [
//       "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/honey.webp"
//     ],
//     video: "",
//     createdAt: "2026-01-25T09:20:15.660Z"
//   },
//   {
//     _id: "697b472934e642df99a55cef",
//     user: "692feff257af0439eb8f4df5",
//     invoiceNumber: "ON/2025-26/220",
//     itemName: "oats-organic",
//     weight: "1 kg",
//     quantity: 1,
//     reason: "Expired product received",
//     returnStatus: "rejected",
//     returnOptions: "replacement",
//     images: [],
//     video: "",
//     createdAt: "2026-01-20T14:15:30.660Z"
//   },
//   {
//     _id: "697b472934e642df99a55cf0",
//     user: "692feff257af0439eb8f4df5",
//     invoiceNumber: "ON/2025-26/210",
//     itemName: "tea-green",
//     weight: "100 gm",
//     quantity: 2,
//     reason: "Product not as described",
//     returnStatus: "completed",
//     returnOptions: "refund",
//     images: [
//       "https://organicnationmages.s3.ap-south-1.amazonaws.com/categories_images_WEBP/tea.webp"
//     ],
//     video: "",
//     createdAt: "2026-01-15T08:30:45.660Z"
//   }
// ];

// Status Badge Component
const ReturnStatusBadge = ({ status }: { status: string }) => {
  const statusConfig: {
    [key: string]: { color: string; icon: React.ReactNode; text: string };
  } = {
    requested: {
      color: "bg-gradient-to-r from-amber-100 to-orange-100 text-amber-700",
      icon: <Clock className="h-3.5 w-3.5" />,
      text: "Requested",
    },
    approved: {
      color: "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      text: "Approved",
    },
    picked: {
      color: "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700",
      icon: <Package className="h-3.5 w-3.5" />,
      text: "Picked Up",
    },
    completed: {
      color: "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700",
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      text: "Completed",
    },
    rejected: {
      color: "bg-gradient-to-r from-red-100 to-rose-100 text-red-700",
      icon: <XCircle className="h-3.5 w-3.5" />,
      text: "Rejected",
    },
  };

  const config = statusConfig[status.toLowerCase()] || statusConfig.requested;

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${config.color}`}
    >
      {config.icon}
      <span>{config.text}</span>
    </div>
  );
};

// Return Type Badge
const ReturnTypeBadge = ({ type }: { type: string }) => {
  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
        type === "refund"
          ? "bg-gradient-to-r from-green-100 to-emerald-100 text-green-700"
          : "bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700"
      }`}
    >
      <RotateCcw className="h-3.5 w-3.5" />
      <span className="capitalize">{type}</span>
    </div>
  );
};

// Image/Video Modal
const MediaModal = ({
  media,
  type,
  onClose,
}: {
  media: string;
  type: "image" | "video";
  onClose: () => void;
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
      onClick={onClose}
    >
      <div
        className="relative max-h-[90vh] max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 rounded-full bg-white p-2 shadow-lg transition-transform hover:scale-110"
        >
          <X className="h-6 w-6 text-gray-700" />
        </button>

        {type === "image" ? (
          <Image src={media} alt="Return item" width={400} height={400} />
        ) : (
          <video
            src={media}
            controls
            className="max-h-[90vh] w-auto rounded-2xl shadow-2xl"
          >
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
};

// Return Details Modal
const ReturnDetailsModal = ({
  returnItem,
  onClose,
}: {
  returnItem: ReturnItem;
  onClose: () => void;
}) => {
  const [cancelReturn, { isLoading }] = useCancelReturnMutation();
  const [activeMedia, setActiveMedia] = useState<{
    url: string;
    type: "image" | "video";
  } | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleCancelReturn = async (returnId: string) => {
    const result = await cancelReturn(returnId);
    if (result.data.success) {
      toast.success(result.data.message);
      onClose();
    }
  };

  return (
    <>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
        onClick={onClose}
      >
        <div
          className="max-h-[70vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Modal Header */}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-amber-50 p-4 sm:p-6">
            <div>
              <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                Return Request Details
              </h2>
              <p className="text-sm text-gray-600">
                Invoice #{returnItem.invoiceNumber}
              </p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 transition-colors hover:bg-white/50"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-4 sm:p-6">
            {/* Status & Date */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-4">
              <div>
                <div className="mb-2 text-sm text-gray-600">Return Status</div>
                <ReturnStatusBadge status={returnItem.returnStatus} />
              </div>
              <div>
                <div className="mb-2 text-sm text-gray-600">Return Type</div>
                <ReturnTypeBadge type={returnItem.returnOptions} />
              </div>
              <div>
                <div className="mb-2 text-sm text-gray-600">Requested On</div>
                <div className="text-sm font-semibold text-gray-900">
                  {formatDate(returnItem.createdAt)}
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="mb-6 rounded-xl border border-emerald-100 p-4">
              <h3 className="mb-4 text-lg font-bold text-gray-900">
                Product Information
              </h3>
              <div className="flex gap-4">
                <div className="h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-white">
                  <Image
                    src={returnItem.img}
                    alt={returnItem.title}
                    width={150}
                    height={150}
                  />
                </div>
                <div className="flex-1">
                  <h4 className="mb-1 font-semibold text-gray-900">
                    {returnItem.title}
                  </h4>
                  <p className="mb-2 text-sm text-gray-600">
                    {returnItem.weight} • Quantity: {returnItem.quantity}
                  </p>
                  <div className="text-sm text-gray-600">
                    Invoice:{" "}
                    <span className="font-medium">
                      {returnItem.invoiceNumber}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Return Reason */}
            <div className="mb-6 rounded-xl border border-emerald-100 p-4">
              <h3 className="mb-3 text-lg font-bold text-gray-900">
                Return Reason
              </h3>
              <p className="text-gray-700">{returnItem.reason}</p>
            </div>

            {/* Media Evidence */}
            {(returnItem.images.length > 0 || returnItem.video) && (
              <div className="mb-6 rounded-xl border border-emerald-100 p-4">
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Evidence Provided
                </h3>

                {/* Images */}
                {returnItem.images.length > 0 && (
                  <div className="mb-4">
                    <div className="mb-2 text-sm font-semibold text-gray-700">
                      Images ({returnItem.images.length})
                    </div>
                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                      {returnItem.images.map((img, idx) => (
                        <div
                          key={idx}
                          className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg border-2 border-emerald-100 transition-all hover:border-emerald-400"
                          onClick={() =>
                            setActiveMedia({ url: img, type: "image" })
                          }
                        >
                          <Image
                            src={img}
                            width={200}
                            height={50}
                            alt={`Return evidence ${idx + 1}`}
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-all group-hover:bg-black/40">
                            <Eye className="h-6 w-6 text-white opacity-0 transition-opacity group-hover:opacity-100" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Video */}
                {returnItem.video && (
                  <div>
                    <div className="mb-2 text-sm font-semibold text-gray-700">
                      Video Evidence
                    </div>
                    <div
                      className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg border-2 border-emerald-100 bg-black transition-all hover:border-emerald-400"
                      onClick={() =>
                        setActiveMedia({ url: returnItem.video, type: "video" })
                      }
                    >
                      <video
                        src={returnItem.video}
                        className="h-full w-full object-contain"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all group-hover:bg-black/60">
                        <div className="flex flex-col items-center gap-2 text-white">
                          <Video className="h-12 w-12" />
                          <span className="text-sm font-semibold">
                            Click to Play
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 sm:flex-row">
              {returnItem.returnStatus === "requested" && (
                <button
                  onClick={() => handleCancelReturn(returnItem._id)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border-2 border-red-600 px-6 py-3 font-semibold text-red-700 transition-all hover:bg-red-50"
                >
                  <XCircle className="h-4 w-4" />
                  Cancel Return
                </button>
              )}
              {/* <button className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg">
                <Download className="h-4 w-4" />
                Contact Support
              </button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Media Modal */}
      {activeMedia && (
        <MediaModal
          media={activeMedia.url}
          type={activeMedia.type}
          onClose={() => setActiveMedia(null)}
        />
      )}
    </>
  );
};

// Return Card Component
const ReturnCard = ({ returnItem }: { returnItem: ReturnItem }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <>
      <div className="group rounded-2xl bg-white shadow-md transition-shadow hover:shadow-xl">
        {/* Header */}
        <div className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50/50 to-amber-50/50 p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
                  Return #{returnItem._id.slice(-8)}
                </h3>
                <ReturnStatusBadge status={returnItem.returnStatus} />
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(returnItem.createdAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <FileText className="h-4 w-4" />
                  <span>{returnItem.invoiceNumber}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ReturnTypeBadge type={returnItem.returnOptions} />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="p-4 sm:p-6">
          <div className="flex gap-4 rounded-xl bg-linear-to-r from-emerald-50/30 to-amber-50/30 p-4">
            {/* Product Image */}
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-white sm:h-28 sm:w-28">
              <Image
                src={returnItem.img}
                alt={returnItem.title}
                width={150}
                height={150}
              />
            </div>

            {/* Product Info */}
            <div className="flex flex-1 flex-col justify-between">
              <div>
                <h4 className="mb-1 line-clamp-2 font-semibold text-gray-900 sm:text-lg">
                  {returnItem.title}
                </h4>
                <p className="text-sm text-gray-600">
                  {returnItem.weight} • Qty: {returnItem.quantity}
                </p>
              </div>
            </div>
          </div>

          {/* Return Reason Preview */}
          <div className="mt-4 rounded-xl bg-gradient-to-r from-emerald-50/30 to-amber-50/30 p-4">
            <div className="mb-2 text-sm font-semibold text-gray-700">
              Reason for Return
            </div>
            <p
              className={`text-sm text-gray-700 ${!isExpanded && "line-clamp-2"}`}
            >
              {returnItem.reason}
            </p>
            {returnItem.reason.length > 100 && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700"
              >
                {isExpanded ? "Show Less" : "Read More"}
              </button>
            )}
          </div>

          {/* Evidence Summary */}
          {(returnItem.images.length > 0 || returnItem.video) && (
            <div className="mt-4 flex flex-wrap gap-3">
              {returnItem.images.length > 0 && (
                <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-blue-100 to-cyan-100 px-3 py-2 text-sm font-semibold text-blue-700">
                  <ImageIcon className="h-4 w-4" />
                  {returnItem.images.length}{" "}
                  {returnItem.images.length === 1 ? "Image" : "Images"}
                </div>
              )}
              {returnItem.video && (
                <div className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-2 text-sm font-semibold text-purple-700">
                  <Video className="h-4 w-4" />
                  Video Provided
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          <div className="mt-6">
            <button
              onClick={() => setShowModal(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              <Eye className="h-4 w-4" />
              View Full Details
            </button>
          </div>
        </div>
      </div>

      {/* Return Details Modal */}
      {showModal && (
        <ReturnDetailsModal
          returnItem={returnItem}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  );
};

// Main Component
export default function ReturnHistoryPage() {
  const [filter, setFilter] = useState<string>("all");
  const { data: returns, isLoading } = useGetAllReturnsQuery(undefined);
  const filterOptions = [
    { value: "all", label: "All Returns" },
    { value: "requested", label: "Requested" },
    { value: "approved", label: "Approved" },
    { value: "completed", label: "Completed" },
    { value: "rejected", label: "Rejected" },
  ];

  const filteredReturns =
    filter === "all"
      ? returns
      : returns?.filter((ret) => ret.returnStatus.toLowerCase() === filter);

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50/30 to-white py-20">
      {/* Decorative Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-20 left-1/4 h-64 w-64 rounded-full bg-amber-200 blur-3xl" />
        <div className="absolute right-1/4 bottom-20 h-64 w-64 rounded-full bg-emerald-200 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="mb-4 inline-block rounded-full bg-gradient-to-r from-emerald-100 to-amber-100 px-4 py-2">
            <span className="text-sm font-semibold text-emerald-700">
              🔄 Your Returns
            </span>
          </div>
          <h1 className="mb-2 text-3xl font-bold sm:text-4xl lg:text-5xl">
            <span className="bg-gradient-to-r from-emerald-700 to-green-600 bg-clip-text text-transparent">
              Return History
            </span>
          </h1>
          <p className="text-base text-gray-600 sm:text-lg">
            Track and manage all your return requests
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 sm:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all ${
                  filter === option.value
                    ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg"
                    : "bg-white text-gray-700 hover:bg-emerald-50"
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Returns List */}
        {filteredReturns?.length > 0 ? (
          <div className="space-y-6">
            {filteredReturns.map((returnItem) => (
              <ReturnCard key={returnItem._id} returnItem={returnItem} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-md">
            <div className="mb-4 rounded-full bg-gradient-to-r from-emerald-100 to-amber-100 p-6">
              <AlertCircle className="h-12 w-12 text-emerald-700" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              No Returns Found
            </h3>
            <p className="mb-6 text-gray-600">
              {filter === "all"
                ? "You haven't requested any returns yet"
                : `No ${filter} returns found`}
            </p>
            {/* <button className="rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-8 py-3 font-semibold text-white transition-all hover:shadow-lg">
              View Orders
            </button> */}
          </div>
        )}
      </div>
    </div>
  );
}
