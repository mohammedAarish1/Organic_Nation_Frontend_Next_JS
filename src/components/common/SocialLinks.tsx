"use client";

import {
  Facebook,
  Instagram,
  LinkedIn,
  Twitter,
  YouTube,
} from "../svg-icons/svgIcons";

const socialData = [
  {
    href: "https://www.instagram.com/organicnationofficial/",
    label: "Instagram",
    bgColor: "from-purple-500 to-pink-500",
    icon: <Instagram />,
  },
  {
    href: "https://www.facebook.com/organicnationofficial",
    label: "Facebook",
    bgColor: "from-blue-600 to-blue-700",
    icon: <Facebook />,
  },
  {
    href: "https://www.linkedin.com/company/organicnationofficial",
    label: "LinkedIn",
    bgColor: "from-blue-500 to-blue-600",
    icon: <LinkedIn />,
  },
  {
    href: "https://x.com/organicnation_",
    label: "X (Twitter)",
    bgColor: "from-gray-700 to-gray-900",
    icon: <Twitter />,
  },
  {
    href: "https://www.youtube.com/@organicnationofficial",
    label: "YouTube",
    bgColor: "from-red-500 to-red-600",
    icon: <YouTube />,
  },
];

export default function SocialLinks() {
  return (
    <div className="flex flex-wrap gap-3">
      {socialData.map((social, index) => (
        <a
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={social.label}
          className={`group relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br ${social.bgColor} shadow-lg transition-all hover:scale-110 hover:shadow-xl`}
        >
          <div className="absolute inset-0 bg-white opacity-0 transition-opacity group-hover:opacity-10" />
          <div className="relative text-white">{social.icon}</div>
        </a>
      ))}
    </div>
  );
}
