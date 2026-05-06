"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  ArrowUpRight,
  Clock,
  TrendingUp,
  Loader2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types";

// ─── Types ────────────────────────────────────────────────────────────────────

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   image?: string;
//   slug: string;
// }

interface SearchComponentProps {
  /** Fetch suggestions from your API. Return max 6–8 items. */
  fetchSuggestions: (query: string) => Promise<Product[]>;
  /** Called when the user navigates to a product */
  onProductSelect?: (product: Product) => void;
  /** Placeholder text */
  placeholder?: string;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const TRENDING: string[] = [
  "Homestyle Pickles",
  "Organic Honey",
  "Organic Oils",
  "Oats",
];
const DEBOUNCE_MS = 280;

// ─── Utility ──────────────────────────────────────────────────────────────────

function useDebounce<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

function getHistory(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("search_history") || "[]");
  } catch {
    return [];
  }
}

function pushHistory(query: string) {
  if (typeof window === "undefined") return;
  const prev = getHistory().filter((h) => h !== query);
  localStorage.setItem(
    "search_history",
    JSON.stringify([query, ...prev].slice(0, 5)),
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

const Pill = ({ label, onClick }: { label: string; onClick: () => void }) => (
  <button
    onClick={onClick}
    className="rounded-full border border-[#E8E0D0] bg-[#FAFAF7] px-3 py-1 text-xs font-medium text-[#5C5044] transition-colors hover:border-[#C9A96E] hover:bg-[#F5F0E8] hover:text-[#8B6914]"
  >
    {label}
  </button>
);

const ProductRow = ({
  product,
  query,
  onClick,
}: {
  product: Product;
  query: string;
  onClick: () => void;
}) => {
  // Highlight matching text
  const highlight = (text: string) => {
    if (!query) return text;
    const idx = text.toLowerCase().indexOf(query.toLowerCase());
    if (idx === -1) return text;
    return (
      <>
        {text.slice(0, idx)}
        <mark className="bg-transparent font-semibold text-[#8B6914]">
          {text.slice(idx, idx + query.length)}
        </mark>
        {text.slice(idx + query.length)}
      </>
    );
  };

  return (
    <button
      onClick={onClick}
      className="group flex w-full cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-[#F5F0E8]"
    >
      {/* Thumbnail */}
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#F0EBE0]">
        {product.img.length > 0 ? (
          <Image
            src={product.img[0].sm}
            alt={product.name}
            width={50}
            height={50}
          />
        ) : (
          <Search className="h-4 w-4 text-[#B8A898]" />
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm text-[#2C2418]">
          {highlight(product.name)}
        </p>
        <p className="text-xs text-[#9C8E80]">{product.category}</p>
      </div>

      {/* Price + arrow */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-semibold text-[#5C4A1E]">
          ₹{product.price.toFixed(2)}
        </span>
        <ArrowUpRight className="h-3.5 w-3.5 text-[#B8A898] opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </button>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SearchButton({
  fetchSuggestions,
  onProductSelect,
  placeholder = "Search products…",
}: SearchComponentProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const debouncedQuery = useDebounce(query, DEBOUNCE_MS);

  // Open / focus
  const openSearch = useCallback(() => {
    setOpen(true);
    setHistory(getHistory());
    setTimeout(() => inputRef.current?.focus(), 80);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSuggestions([]);
  }, []);

  // Fetch suggestions
  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      setLoading(false);
      return;
    }
    let alive = true;
    setLoading(true);
    fetchSuggestions(debouncedQuery)
      .then((res) => {
        if (alive) setSuggestions(res);
      })
      .catch(() => {
        if (alive) setSuggestions([]);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [debouncedQuery, fetchSuggestions]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        openSearch();
      }
      if (e.key === "Escape") closeSearch();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openSearch, closeSearch]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleProductClick = (product: Product) => {
    pushHistory(product.name);
    closeSearch();
    onProductSelect?.(product);
    router.push(
      `/shop/${product["category-url"].toLowerCase()}/${product["name-url"]}`,
    );
  };

  const handleQuerySubmit = (q: string) => {
    if (!q.trim()) return;
    pushHistory(q);
    closeSearch();
    // router.push(`/shop/all?q=${encodeURIComponent(q)}`);
    router.push(`/shop/${q.toLowerCase().trim().replace(" ", "-")}`);
  };

  const showEmpty = !loading && debouncedQuery && suggestions.length === 0;
  const showSuggestions = !loading && suggestions.length > 0;
  const showIdle = !debouncedQuery;

  return (
    <>
      {/* ── Trigger Button ── */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={openSearch}
        aria-label="Open search"
        className="rounded-full p-2 transition-colors hover:bg-[#F5F5DC]"
      >
        <Search className="text-muted h-5 w-5" />
      </motion.button>

      {/* ── Modal Overlay ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={closeSearch}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px]"
            />

            {/* Panel */}
            <motion.div
              key="panel"
              ref={overlayRef}
              initial={{ opacity: 0, y: -16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 380, damping: 28 }}
              className="fixed top-[5vh] left-1/2 z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-[#E8E0D0] bg-white shadow-2xl shadow-black/10 sm:top-[8vh]"
              style={{ maxHeight: "82vh" }}
            >
              {/* ── Search Input ── */}
              <div className="flex items-center gap-3 border-b border-[#F0EBE0] px-4 py-3.5">
                {loading ? (
                  <Loader2 className="h-5 w-5 shrink-0 animate-spin text-[#C9A96E]" />
                ) : (
                  <Search className="h-5 w-5 shrink-0 text-[#B8A898]" />
                )}

                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && handleQuerySubmit(query)
                  }
                  placeholder={placeholder}
                  className="flex-1 bg-transparent text-[15px] text-[#2C2418] outline-none placeholder:text-[#C0B4A8]"
                  autoComplete="off"
                  spellCheck={false}
                />

                <div className="flex items-center gap-2">
                  {query && (
                    <button
                      onClick={() => {
                        setQuery("");
                        inputRef.current?.focus();
                      }}
                      className="rounded-full p-1 text-[#B8A898] transition-colors hover:bg-[#F0EBE0] hover:text-[#5C4A1E]"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                  <kbd className="hidden rounded-md border border-[#E8E0D0] bg-[#FAFAF7] px-1.5 py-0.5 text-[10px] text-[#B8A898] sm:inline">
                    ESC
                  </kbd>
                </div>
              </div>

              {/* ── Body ── */}
              <div
                className="overflow-y-auto"
                style={{ maxHeight: "calc(82vh - 64px)" }}
              >
                {/* Idle State: history + trending */}
                {showIdle && (
                  <div className="space-y-5 p-4">
                    {history.length > 0 && (
                      <section>
                        <div className="mb-2.5 flex items-center justify-between">
                          <p className="flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#B8A898] uppercase">
                            <Clock className="h-3 w-3" /> Recent
                          </p>
                          <button
                            onClick={() => {
                              localStorage.removeItem("search_history");
                              setHistory([]);
                            }}
                            className="text-[10px] text-[#C0B4A8] hover:text-[#8B6914]"
                          >
                            Clear
                          </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {history.map((h) => (
                            <Pill
                              key={h}
                              label={h}
                              onClick={() => {
                                setQuery(h);
                                inputRef.current?.focus();
                              }}
                            />
                          ))}
                        </div>
                      </section>
                    )}

                    <section>
                      <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#B8A898] uppercase">
                        <TrendingUp className="h-3 w-3" /> Trending
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {TRENDING.map((t) => (
                          <Pill
                            key={t}
                            label={t}
                            onClick={() => {
                              setQuery(t);
                              inputRef.current?.focus();
                            }}
                          />
                        ))}
                      </div>
                    </section>
                  </div>
                )}

                {/* Loading skeleton */}
                {loading && (
                  <div className="space-y-1 p-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                      >
                        <div className="h-11 w-11 shrink-0 animate-pulse rounded-lg bg-[#F0EBE0]" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3.5 w-3/4 animate-pulse rounded-full bg-[#F0EBE0]" />
                          <div className="h-2.5 w-1/3 animate-pulse rounded-full bg-[#F5F2EC]" />
                        </div>
                        <div className="h-3.5 w-12 animate-pulse rounded-full bg-[#F0EBE0]" />
                      </div>
                    ))}
                  </div>
                )}

                {/* Suggestions list */}
                {showSuggestions && (
                  <div className="p-2">
                    <p className="mb-1 px-3 text-[10px] font-semibold tracking-widest text-[#C0B4A8] uppercase">
                      Products
                    </p>
                    {suggestions.map((product) => (
                      <ProductRow
                        key={product._id}
                        product={product}
                        query={debouncedQuery}
                        onClick={() => handleProductClick(product)}
                      />
                    ))}

                    {/* View all */}
                    <button
                      onClick={() => handleQuerySubmit(query)}
                      className="mt-1 flex w-full items-center justify-center gap-1.5 rounded-xl py-2.5 text-sm font-medium text-[#8B6914] transition-colors hover:bg-[#F5F0E8]"
                    >
                      View all results for &quot;{query}&quot;
                      <ArrowUpRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                {/* Empty state */}
                {showEmpty && (
                  <div className="flex flex-col items-center gap-2 px-6 py-10 text-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F5F0E8]">
                      <Search className="h-5 w-5 text-[#C9A96E]" />
                    </div>
                    <p className="text-sm font-medium text-[#5C4A1E]">
                      No results found
                    </p>
                    <p className="text-xs text-[#B8A898]">
                      Try different keywords or browse our categories
                    </p>
                  </div>
                )}
              </div>

              {/* ── Footer ── */}
              <div className="flex items-center justify-between border-t border-[#F0EBE0] px-4 py-2">
                <span className="text-[10px] text-[#C0B4A8]">
                  Press{" "}
                  <kbd className="rounded border border-[#E8E0D0] bg-[#FAFAF7] px-1 py-px text-[10px]">
                    ↵
                  </kbd>{" "}
                  to search
                </span>
                <span className="text-[10px] text-[#C0B4A8]">
                  <kbd className="rounded border border-[#E8E0D0] bg-[#FAFAF7] px-1 py-px text-[10px]">
                    ⌘K
                  </kbd>{" "}
                  to open
                </span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
