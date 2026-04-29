"use client";
import { Facebook, LinkedIn, Twitter } from "@/components/svg-icons/svgIcons";
import { FadeInFromLeft } from "../animations/animations";
import { CheckCircle2, Link2, Share2 } from "lucide-react";
import { useState } from "react";

export default function ShareBox({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const shareButtons = [
    {
      label: "Twitter",
      icon: <Twitter />,
      gradient: "from-sky-100 to-sky-200",
      text: "text-sky-700",
      onClick: () =>
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(window.location.href)}`,
          "_blank",
        ),
    },
    {
      label: "Facebook",
      icon: <Facebook />,
      gradient: "from-blue-100 to-blue-200",
      text: "text-blue-700",
      onClick: () =>
        window.open(
          `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
          "_blank",
        ),
    },
    {
      label: "LinkedIn",
      icon: <LinkedIn />,
      gradient: "from-indigo-100 to-indigo-200",
      text: "text-indigo-700",
      onClick: () =>
        window.open(
          `https://linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
          "_blank",
        ),
    },
    {
      label: copied ? "Copied!" : "Copy Link",
      icon: copied ? <CheckCircle2 /> : <Link2 />,
      gradient: "from-emerald-100 to-green-200",
      text: "text-emerald-700",
      onClick: copyLink,
    },
  ];

  return (
    <FadeInFromLeft>
      <div className="mt-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-amber-50 to-orange-50 p-6 shadow-md">
        <div className="mb-4 flex items-center gap-2">
          <Share2 className="h-5 w-5 text-amber-600" />
          <h3 className="font-bold text-gray-900">
            Enjoyed this article? Share it!
          </h3>
        </div>
        <div className="flex flex-wrap gap-3">
          {shareButtons.map(({ label, icon, gradient, text, onClick }) => (
            <button
              key={label}
              onClick={onClick}
              className={`group flex items-center gap-2 rounded-xl bg-gradient-to-br ${gradient} px-4 py-2.5 text-sm font-semibold ${text} shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      </div>
    </FadeInFromLeft>
  );
}
