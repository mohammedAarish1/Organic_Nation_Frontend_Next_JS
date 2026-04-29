import {
  Ban,
  Building,
  Globe,
  HeartHandshake,
  Leaf,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sprout,
} from "lucide-react";
import Link from "next/link";
import Newsletter from "./Newsletter";
import SocialLinks from "./SocialLinks";
import Image from "next/image";

interface FooterProps {
  categories?: Array<{ categoryUrl: string; category: string }>;
}

// Company links
const companyLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blogs", label: "Blogs" },
];

// Quick links
const quickLinks = [
  { href: "/our-recipes", label: "Recipes" },
  { href: "/frequently-asked-questions", label: "FAQ's" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions/introduction", label: "Terms & Conditions" },
  { href: "/csr-policy", label: "CSR Policy" },
];

// Quality badges
const qualities = [
  { icon: Sprout, text: "Sustainable Farming", color: "text-emerald-500" },
  { icon: ShieldCheck, text: "Pesticide-Free", color: "text-blue-500" },
  { icon: HeartHandshake, text: "Ethically Sourced", color: "text-rose-500" },
  { icon: Ban, text: "Non-GMO", color: "text-orange-500" },
  { icon: Globe, text: "Global Standards", color: "text-purple-500" },
];

// Payment methods
const paymentMethods = [
  {
    src: "https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/reduced_quality/maestro.webp",
    alt: "Maestro",
  },
  {
    src: "https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/reduced_quality/visa.webp",
    alt: "Visa",
  },
  {
    src: "https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/reduced_quality/rupay.webp",
    alt: "RuPay",
  },
  {
    src: "https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/reduced_quality/mastercard.webp",
    alt: "Mastercard",
  },
  {
    src: "https://organicnationmages.s3.ap-south-1.amazonaws.com/payments/reduced_quality/upi.webp",
    alt: "UPI",
  },
];

export default function Footer({ categories = [] }: FooterProps) {
  const categoryLinks = categories
    .filter((cat) => cat.category !== "All")
    .slice(0, 8)
    .map((cat) => ({
      href: `/shop/${cat.categoryUrl.toLowerCase()}`,
      label: cat.category,
    }));

  return (
    <footer className="relative overflow-hidden bg-linear-to-br from-slate-900 via-amber-950 to-slate-900">
      {/* Decorative Background Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-20 -left-20 h-96 w-96 rounded-full bg-amber-500 blur-[120px]" />
        <div className="absolute -right-20 bottom-20 h-96 w-96 rounded-full bg-emerald-500 blur-[120px]" />
      </div>

      <div className="relative">
        {/* Main Content */}
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Top Section: Brand + Newsletter + Social */}
          <div className="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Brand */}
            <div>
              <Link
                href="/"
                className="group mb-6 inline-flex items-center gap-3"
              >
                <div className="relative flex h-14 w-14 items-center justify-center">
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-amber-500 to-red-600 opacity-20 blur-xl transition-opacity group-hover:opacity-30" />
                  <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-amber-600 to-red-700 shadow-lg">
                    <Leaf className="h-7 w-7 text-white" />
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold text-white">
                    ORGANIC NATION
                  </span>
                  <span className="text-sm text-amber-300">
                    Brings Homemade Taste
                  </span>
                </div>
              </Link>
              <p className="mb-6 text-sm leading-relaxed tracking-wide text-gray-300">
                Welcome to <span className="font-bold">ORGANIC NATION</span> (A
                Unit of <span className="font-semibold">Foodsbay India</span>),
                we pride ourselves on producing chemical preservative free
                homestyle pickles, chutneys, and murrabbas. Our products are
                crafted with traditional recipes and the finest organic
                ingredients, ensuring a delightful and authentic taste
                experience in every jar.
              </p>
              <div className="mb-6 flex flex-wrap gap-3">
                {qualities.map((quality, index) => {
                  const Icon = quality.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 backdrop-blur-sm"
                    >
                      <Icon className={`h-4 w-4 ${quality.color}`} />
                      <span className="text-xs font-medium text-gray-300">
                        {quality.text}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <Newsletter />
            </div>

            {/* Social Links */}
            <div>
              <h4 className="mb-6 text-lg font-bold text-white">
                Connect With Us
              </h4>
              <SocialLinks />
              <div className="mt-8">
                <h4 className="mb-4 text-sm font-semibold text-gray-300">
                  Secure Payments
                </h4>
                <div className="flex flex-wrap gap-3">
                  {paymentMethods.map((payment, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-center rounded-lg bg-white/10 p-2 backdrop-blur-sm transition-transform hover:scale-105"
                    >
                      <Image
                        src={payment.src}
                        alt={payment.alt}
                        width={30}
                        height={30}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="mb-12 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />

          {/* Links Section */}
          <div className="mb-12 grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {/* Company */}
            <div>
              <h4 className="mb-4 text-base font-bold text-white">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-amber-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-4 text-base font-bold text-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.href}
                      className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-amber-400"
                    >
                      <span className="h-1 w-1 rounded-full bg-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            {categoryLinks.length > 0 && (
              <div>
                <h4 className="mb-4 text-base font-bold text-white">
                  Categories
                </h4>
                <ul className="space-y-3">
                  {categoryLinks.slice(0, 5).map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="group flex items-center gap-2 text-sm text-gray-300 transition-colors hover:text-amber-400"
                      >
                        <span className="h-1 w-1 rounded-full bg-amber-500 opacity-0 transition-opacity group-hover:opacity-100" />
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Contact - Spans 2 columns */}
            <div className="col-span-2">
              <h4 className="mb-4 text-base font-bold text-white">
                Get in Touch
              </h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-amber-500/10 p-2">
                    <Phone className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <a
                      href="tel:+919999532041"
                      className="text-sm text-gray-200 hover:text-amber-400"
                    >
                      +91-9999532041
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-amber-500/10 p-2">
                    <Mail className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <a
                      href="mailto:info@organicnation.co.in"
                      className="text-sm text-gray-200 hover:text-amber-400"
                    >
                      info@organicnation.co.in
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-amber-500/10 p-2">
                    <Building className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Corporate Office</p>
                    <p className="text-sm text-gray-200">
                      D 166/25, Ground Floor, Sector-50, Noida, UP 201301
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-lg bg-amber-500/10 p-2">
                    <MapPin className="h-4 w-4 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Manufacturing</p>
                    <p className="text-sm text-gray-200">
                      Bailparao, Nainital, Uttarakhand 263140
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
              <p className="text-sm text-gray-400">
                © {new Date().getFullYear()} Organic Nation. All Rights
                Reserved. A Unit of Foodsbay India.
              </p>
              {/* <p className="flex items-center gap-2 text-sm text-gray-400">
                Made with <span className="text-emerald-500">💚</span> for a healthier planet
              </p> */}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
