"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share2, X, Copy, Check } from "lucide-react";
import { toast } from "react-toastify";

export default function ShareBtn({ product, className = "" }) {
  const [showShareModal, setShowShareModal] = useState(false);
  // const [copied, setCopied] = useState(false);

  // Generate share URL (current page)
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareTitle = product?.details?.name || "Check out this product";
  const shareDescription =
    product?.productInfo?.description || "Amazing product from Organic Nation";
  // const shareImage = product?.details?.img?.[0]?.lg || "";

  // Social Share Functions
  // const shareLinks = {
  //   facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
  //   twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
  //   linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  //   whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${shareUrl}`)}`,
  //   email: `mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareDescription}\n\n${shareUrl}`)}`,
  //   telegram: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`,
  //   pinterest: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&description=${encodeURIComponent(shareTitle)}`,
  // };

  // const socialPlatforms = [
  //   {
  //     name: "Facebook",
  //     icon: "📘",
  //     color: "#1877F2",
  //     bgColor: "bg-blue-50",
  //     hoverColor: "hover:bg-blue-100",
  //     action: () => window.open(shareLinks.facebook, "_blank", "width=600,height=400"),
  //   },
  //   {
  //     name: "Twitter",
  //     icon: "🐦",
  //     color: "#1DA1F2",
  //     bgColor: "bg-sky-50",
  //     hoverColor: "hover:bg-sky-100",
  //     action: () => window.open(shareLinks.twitter, "_blank", "width=600,height=400"),
  //   },
  //   {
  //     name: "LinkedIn",
  //     icon: "💼",
  //     color: "#0A66C2",
  //     bgColor: "bg-blue-50",
  //     hoverColor: "hover:bg-blue-100",
  //     action: () => window.open(shareLinks.linkedin, "_blank", "width=600,height=400"),
  //   },
  //   {
  //     name: "WhatsApp",
  //     icon: "💬",
  //     color: "#25D366",
  //     bgColor: "bg-green-50",
  //     hoverColor: "hover:bg-green-100",
  //     action: () => window.open(shareLinks.whatsapp, "_blank"),
  //   },
  //   {
  //     name: "Telegram",
  //     icon: "✈️",
  //     color: "#0088cc",
  //     bgColor: "bg-blue-50",
  //     hoverColor: "hover:bg-blue-100",
  //     action: () => window.open(shareLinks.telegram, "_blank"),
  //   },
  //   {
  //     name: "Email",
  //     icon: "📧",
  //     color: "#EA4335",
  //     bgColor: "bg-red-50",
  //     hoverColor: "hover:bg-red-100",
  //     action: () => (window.location.href = shareLinks.email),
  //   },
  // ];

  // Copy Link to Clipboard
  // const handleCopyLink = useCallback(async () => {
  //   try {
  //     await navigator.clipboard.writeText(shareUrl);
  //     setCopied(true);
  //     toast.success("Link copied to clipboard!");
  //     setTimeout(() => setCopied(false), 2000);
  //   } catch (err) {
  //     toast.error("Failed to copy link");
  //   }
  // }, [shareUrl]);

  // Native Share API (Mobile)
  const handleNativeShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        });
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Share failed:", err);
        }
      }
    } else {
      setShowShareModal(true);
    }
  }, [shareTitle, shareDescription, shareUrl]);

  return (
    <>
      {/* Share Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleNativeShare}
        className={`flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-gray-300 p-4 transition-all hover:border-orange-500 active:border-orange-600 sm:flex-none ${className}`}
        aria-label="Share product"
      >
        <Share2 size={22} color="#6B7280" />
        <span className="text-sm font-medium text-gray-700 sm:hidden">
          Share
        </span>
      </motion.button>

      {/* Share Modal */}
      {/* <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                  <Share2 size={24} className="text-orange-500" />
                  Share Product
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl mb-6 border border-orange-100">
                {shareImage && (
                  <img
                    src={shareImage}
                    alt={shareTitle}
                    className="w-16 h-16 rounded-lg object-cover border-2 border-white shadow-sm"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm line-clamp-2">
                    {shareTitle}
                  </h4>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3 mb-6">
                {socialPlatforms.map((platform, index) => (
                  <motion.button
                    key={platform.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      platform.action();
                      setShowShareModal(false);
                      toast.success(`Sharing on ${platform.name}`);
                    }}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl ${platform.bgColor} ${platform.hoverColor} transition-all shadow-sm hover:shadow-md border border-transparent hover:border-gray-200`}
                  >
                    <span className="text-3xl">{platform.icon}</span>
                    <span className="text-xs font-medium text-gray-700">
                      {platform.name}
                    </span>
                  </motion.button>
                ))}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700 block">
                  Or copy link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm text-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    onClick={(e) => e.target.select()}
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopyLink}
                    className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg ${
                      copied
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white hover:bg-orange-600"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check size={18} />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        Copy
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  );
}
