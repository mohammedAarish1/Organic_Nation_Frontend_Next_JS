// ✅ SERVER COMPONENT — zero JS sent to client for this shell
// Renders static structure: logo, nav links, layout. Never re-renders.

import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { Leaf } from "lucide-react";

import { ScrollAwareHeader } from "./ScrollAwareHeader";
import { MegaMenuShop } from "./MegaMenuShop";
import { HeaderIcons } from "./HeaderIcons";
import { MobileMenu } from "./MobileMenu";

export default async function Header() {
  return (
    // ScrollAwareHeader is the ONLY client boundary — it manages the
    // `scrolled` class swap without re-rendering children.
    <ScrollAwareHeader>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* ── Logo ── pure static markup, zero client JS ── */}
          <Logo />

          {/* ── Desktop nav ── */}
          <nav
            className="hidden items-center gap-10 lg:flex"
            aria-label="Main navigation"
          >
            <NavLink href="/">Home</NavLink>

            {/* Shop gets its own client island for the hover mega-menu */}
            <MegaMenuShop />

            <NavLink href="/about-us">About</NavLink>
            <NavLink href="/contact-us">Contact Us</NavLink>
          </nav>

          {/* ── Icons (cart / wishlist / user / search) — client island ── */}
          <Suspense fallback={<IconsSkeleton />}>
            <HeaderIcons />
          </Suspense>

          {/* ── Mobile hamburger + drawer — client island ── */}
          <MobileMenu />
        </div>
      </div>
    </ScrollAwareHeader>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sub-components (server, no "use client")
// ─────────────────────────────────────────────────────────────────────────────

function Logo() {
  return (
    <Link
      href="/"
      className="flex cursor-pointer items-center gap-2 sm:gap-3"
      aria-label="Organic Nation — go to homepage"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#8B4545] to-[#7A3939] shadow-lg sm:h-14 sm:w-14">
        <Image
          src="https://organicnationmages.s3.ap-south-1.amazonaws.com/logo/logo.webp"
          alt="Organic Nation logo"
          width={100}
          height={100}
          priority // ✅ LCP image — load immediately
          className="object-cover"
        />
        {/* Fallback icon rendered server-side, hidden when image loads */}
        <Leaf className="h-7 w-7 text-[#F5F5DC]" aria-hidden="true" />
      </div>
      <div className="hidden sm:block">
        <h1 className="text-primary text-xl font-bold sm:text-2xl">
          Organic Nation
        </h1>
        <p className="text-secondary ml-1 text-xs font-medium">
          Pure. Natural. Organic.
        </p>
      </div>
    </Link>
  );
}

// Reusable server-rendered nav link with CSS-only underline animation
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative font-medium text-gray-700 transition-colors duration-200 hover:text-amber-700"
    >
      {children}
      {/* Pure CSS animated underline — no JS required */}
      <span
        className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#7A7D3F] transition-[width] duration-300 group-hover:w-full"
        aria-hidden="true"
      />
    </Link>
  );
}

// Placeholder while HeaderIcons hydrates
function IconsSkeleton() {
  return (
    <div className="flex items-center gap-1" aria-hidden="true">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="h-9 w-9 animate-pulse rounded-full bg-gray-200"
        />
      ))}
    </div>
  );
}
