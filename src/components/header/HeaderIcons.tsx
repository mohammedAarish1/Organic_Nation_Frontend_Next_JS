"use client";

import { useState, useCallback, useRef, useEffect, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart, Heart, User, LogIn } from "lucide-react";

import { useAppSelector } from "@/lib/hooks";
import { useLogoutMutation } from "@/lib/services/api/authApi";
import UserMenu from "../user/UserMenu";
import SearchButton from "../menu/SearchButton";
import { useProducts } from "../providers/ProductsProvider";
import { Product } from "@/types";

export const HeaderIcons = memo(function HeaderIcons() {
  const { products } = useProducts();
  const { wishlistProducts } = useAppSelector((state) => state.wishlist);
  const { user } = useAppSelector((state) => state.auth);
  const { totalCartItems } = useAppSelector((state) => state.cart);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const [logout] = useLogoutMutation();
  // ✅ useCallback: stable reference, no re-subscription on every render
  const handleLogout = useCallback(async () => {
    await logout();
    setShowUserMenu(false);
  }, [logout]);

  const toggleUserMenu = useCallback(
    () => setShowUserMenu((prev) => !prev),
    [],
  );
  console.log("userr", user);

  // Close on outside click
  useEffect(() => {
    if (!showUserMenu) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showUserMenu]);

  // Close on Escape
  useEffect(() => {
    if (!showUserMenu) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShowUserMenu(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [showUserMenu]);

  // ✅ Search suggestions are memoised per product list reference
  const fetchSuggestions = useCallback(
    async (query: string): Promise<Product[]> => {
      const q = query.toLowerCase().trim();
      return products
        .filter(
          (p) =>
            p.name.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        )
        .slice(0, 8);
    },
    [products], // only recalculates when the products list reference changes
  );

  return (
    <div className="flex items-center">
      {/* Search */}
      <SearchButton fetchSuggestions={fetchSuggestions} />

      {/* Wishlist */}
      <Link href="/wishlist">
        <motion.button
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
          className="relative hidden rounded-full p-2 transition-colors hover:bg-[#F5F5DC] sm:block"
          aria-label={`Wishlist (${wishlistProducts?.length ?? 0} items)`}
        >
          <Heart className="text-muted h-5 w-5" aria-hidden="true" />
          {/* ✅ Only render badge when there are items — skip empty DOM node */}
          {wishlistProducts?.length > 0 && (
            <span className="text-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
              {wishlistProducts.length}
            </span>
          )}
        </motion.button>
      </Link>

      {/* Cart */}
      <Link href="/cart">
        <motion.button
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          className="relative rounded-full p-2 transition-colors hover:bg-[#F5F5DC]"
          aria-label={`Cart (${totalCartItems} items)`}
        >
          <ShoppingCart className="text-muted h-5 w-5" aria-hidden="true" />
          {totalCartItems > 0 && (
            <span className="text-primary absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold">
              {totalCartItems}
            </span>
          )}
        </motion.button>
      </Link>

      {/* User / Login */}
      {user ? (
        <div className="relative" ref={menuRef}>
          <motion.button
            onClick={toggleUserMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full p-2 transition-colors hover:bg-[#F5F5DC]"
            aria-label="Open user menu"
            aria-expanded={showUserMenu}
          >
            <User className="text-muted h-5 w-5" aria-hidden="true" />
          </motion.button>
          <UserMenu
            showMenu={showUserMenu}
            setShowUserMenu={setShowUserMenu}
            user={user}
            menuRef={menuRef}
            onLogout={handleLogout}
          />
        </div>
      ) : (
        <Link href="/login">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="rounded-full p-2 transition-colors hover:bg-[#F5F5DC]"
            aria-label="Log in"
          >
            <LogIn className="text-muted h-5 w-5" aria-hidden="true" />
          </motion.button>
        </Link>
      )}
    </div>
  );
});
