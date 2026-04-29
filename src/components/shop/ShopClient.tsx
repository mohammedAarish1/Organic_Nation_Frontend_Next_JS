"use client";

import { useState, useMemo, useEffect, useRef, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowUpDown,
  LayoutGrid,
  LayoutList,
  Tag,
  PackageSearch,
} from "lucide-react";
import { useProducts } from "../providers/ProductsProvider";
import ProductCard from "../common/ProductCard";
import ProductCardList from "./ProductCardList";

// ─── Types ──────────────────────────────────────────────────────────────────────

type SortKey =
  | "default"
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc";
type ViewMode = "grid" | "list";

interface PriceRange {
  label: string;
  value: string;
  min: number;
  max: number;
}

const PRICE_RANGES: PriceRange[] = [
  { label: "Under ₹100", value: "under_100", min: 0, max: 100 },
  { label: "₹100 – ₹200", value: "100-200", min: 100, max: 200 },
  { label: "₹200 – ₹400", value: "200-400", min: 200, max: 400 },
  { label: "₹400 – ₹600", value: "400-600", min: 400, max: 600 },
  { label: "₹600 and above", value: "600+", min: 600, max: Infinity },
];

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "default", label: "Default" },
  { key: "price-asc", label: "Price: Low → High" },
  { key: "price-desc", label: "Price: High → Low" },
  { key: "name-asc", label: "Name A–Z" },
  { key: "name-desc", label: "Name Z–A" },
];

const ITEMS_PER_PAGE = 9;

const SearchInput = memo(function SearchInput({
  initialValue,
  onCommit,
}: {
  initialValue: string;
  onCommit: (value: string) => void;
}) {
  const [localValue, setLocalValue] = useState(initialValue);
  const inputRef = useRef<HTMLInputElement>(null);

  // If parent resets (e.g. clearFilters), mirror it down
  useEffect(() => {
    setLocalValue(initialValue);
  }, [initialValue]);

  return (
    <div className="relative flex flex-1 items-center">
      <Search className="pointer-events-none absolute left-3.5 h-4 w-4 text-[#B8A898]" />
      <input
        ref={inputRef}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onCommit(localValue);
        }}
        placeholder="Search products…"
        className="w-full rounded-xl border border-[#E8E0D0] bg-white py-2.5 pr-10 pl-10 text-sm text-[#2C2418] transition-shadow outline-none placeholder:text-[#C0B4A8] focus:border-[#C9A96E] focus:ring-2 focus:ring-[#C9A96E]/20"
      />
      {localValue && (
        <button
          onClick={() => {
            setLocalValue("");
            onCommit("");
            inputRef.current?.focus();
          }}
          className="absolute right-3 rounded-full p-0.5 text-[#B8A898] hover:text-[#5C4A1E]"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      )}
    </div>
  );
});

// ─── SortDropdown ────────────────────────────────────────────────────────────────

function SortDropdown({
  sortBy,
  setSortBy,
}: {
  sortBy: SortKey;
  setSortBy: (k: SortKey) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 rounded-xl border border-[#E8E0D0] bg-white px-3 py-2.5 text-sm font-medium text-[#5C4A1E] transition-colors hover:bg-[#F5F0E8]"
      >
        <ArrowUpDown className="h-3.5 w-3.5" />
        {SORT_OPTIONS.find((s) => s.key === sortBy)?.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full right-0 z-30 mt-1.5 w-52 overflow-hidden rounded-xl border border-[#EDE8DF] bg-white shadow-lg shadow-black/8"
          >
            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.key}
                onClick={() => {
                  setSortBy(opt.key);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors hover:bg-[#F5F0E8] ${
                  sortBy === opt.key
                    ? "font-semibold text-[#8B6914]"
                    : "text-[#5C4A1E]"
                }`}
              >
                {opt.label}
                {sortBy === opt.key && (
                  <span className="text-[#C9A96E]">✓</span>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── FilterSidebar ───────────────────────────────────────────────────────────────

function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  selectedPriceRanges,
  setSelectedPriceRanges,
  hasActiveFilters,
  clearFilters,
  products,
}: {
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (r: string[]) => void;
  hasActiveFilters: boolean;
  clearFilters: () => void;
  products: any[];
}) {
  const router = useRouter();
  const togglePrice = (value: string) => {
    setSelectedPriceRanges(
      selectedPriceRanges.includes(value)
        ? selectedPriceRanges.filter((v) => v !== value)
        : [...selectedPriceRanges, value],
    );
  };

  return (
    <aside className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-[65px] space-y-6">
        <div>
          <p className="mb-2.5 flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#9C8E80] uppercase">
            <Tag className="h-3 w-3" /> Category
          </p>
          <div className="space-y-0.5">
            {categories.map((cat, i) => (
              <button
                key={i}
                onClick={() =>
                  router.push(`/shop/${cat.categoryUrl.toLowerCase()}`)
                }
                // onClick={() => setSelectedCategory(cat.categoryUrl.toLowerCase())}
                className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                  selectedCategory === cat.categoryUrl.toLowerCase()
                    ? "bg-[#F5F0E8] font-semibold text-[#8B6914]"
                    : "text-[#5C4A1E] hover:bg-[#F7F4EE]"
                }`}
              >
                <span className="capitalize">
                  {cat.category === "All" ? "All Products" : cat.categoryUrl}
                </span>
                <span className="text-xs text-[#C0B4A8]">
                  {cat.category === "All"
                    ? products.length
                    : products.filter(
                        (p: any) =>
                          p["category-url"]?.toLowerCase() ===
                          cat.categoryUrl.toLowerCase(),
                      ).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 text-xs font-semibold tracking-widest text-[#9C8E80] uppercase">
            Price Range
          </p>
          <div className="space-y-1.5">
            {PRICE_RANGES.map((range) => {
              const active = selectedPriceRanges.includes(range.value);
              return (
                <button
                  key={range.value}
                  onClick={() => togglePrice(range.value)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${
                    active
                      ? "bg-[#F5F0E8] font-medium text-[#8B6914]"
                      : "text-[#5C4A1E] hover:bg-[#F7F4EE]"
                  }`}
                >
                  <span
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors ${
                      active
                        ? "border-[#8B6914] bg-[#8B6914]"
                        : "border-[#D4C9B8]"
                    }`}
                  >
                    {active && (
                      <svg viewBox="0 0 8 8" className="h-2.5 w-2.5 fill-white">
                        <path
                          d="M1 4l2 2 4-4"
                          stroke="white"
                          strokeWidth="1.5"
                          fill="none"
                        />
                      </svg>
                    )}
                  </span>
                  {range.label}
                </button>
              );
            })}
          </div>
        </div>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg border border-[#E8E0D0] py-2 text-xs font-medium text-[#8B6914] transition-colors hover:bg-[#F5F0E8]"
          >
            <X className="h-3 w-3" /> Clear all filters
          </button>
        )}
      </div>
    </aside>
  );
}

// ─── MobileFilterDrawer ──────────────────────────────────────────────────────────

function MobileFilterDrawer({
  open,
  onClose,
  categories,
  selectedCategory,
  setSelectedCategory,
  sortBy,
  setSortBy,
  selectedPriceRanges,
  setSelectedPriceRanges,
  clearFilters,
  hasActiveFilters,
  resultCount,
}: {
  open: boolean;
  onClose: () => void;
  categories: any[];
  selectedCategory: string;
  setSelectedCategory: (c: string) => void;
  sortBy: SortKey;
  setSortBy: (k: SortKey) => void;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: (r: string[]) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
  resultCount: number;
}) {
  const togglePrice = (value: string) => {
    setSelectedPriceRanges(
      selectedPriceRanges.includes(value)
        ? selectedPriceRanges.filter((v) => v !== value)
        : [...selectedPriceRanges, value],
    );
  };

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 lg:hidden"
        >
          <div className="absolute inset-0 bg-black/40" onClick={onClose} />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="absolute top-0 right-0 bottom-0 w-72 overflow-y-auto bg-[#FAFAF7] p-5 shadow-xl"
          >
            <div className="mb-5 flex items-center justify-between">
              <p className="font-semibold text-[#2C2418]">Filters</p>
              <button onClick={onClose}>
                <X className="h-5 w-5 text-[#9C8E80]" />
              </button>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-bold tracking-widest text-[#9C8E80] uppercase">
                Sort By
              </p>
              <div className="space-y-0.5">
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => setSortBy(opt.key)}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${sortBy === opt.key ? "bg-[#F5F0E8] font-semibold text-[#8B6914]" : "text-[#5C4A1E] hover:bg-[#F7F4EE]"}`}
                  >
                    {opt.label}
                    {sortBy === opt.key && (
                      <span className="text-[#C9A96E]">✓</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-bold tracking-widest text-[#9C8E80] uppercase">
                Category
              </p>
              <div className="space-y-0.5">
                {categories.map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedCategory(cat.categoryUrl.toLowerCase());
                      onClose();
                    }}
                    className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${selectedCategory === cat.categoryUrl.toLowerCase() ? "bg-[#F5F0E8] font-semibold text-[#8B6914]" : "text-[#5C4A1E] hover:bg-[#F7F4EE]"}`}
                  >
                    <span className="capitalize">
                      {cat.category === "All"
                        ? "All Products"
                        : cat.categoryUrl}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <p className="mb-2 text-xs font-bold tracking-widest text-[#9C8E80] uppercase">
                Price Range
              </p>
              <div className="space-y-1.5">
                {PRICE_RANGES.map((range) => {
                  const active = selectedPriceRanges.includes(range.value);
                  return (
                    <button
                      key={range.value}
                      onClick={() => togglePrice(range.value)}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-[#F5F0E8] font-medium text-[#8B6914]" : "text-[#5C4A1E] hover:bg-[#F7F4EE]"}`}
                    >
                      <span
                        className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${active ? "border-[#8B6914] bg-[#8B6914]" : "border-[#D4C9B8]"}`}
                      >
                        {active && (
                          <svg
                            viewBox="0 0 8 8"
                            className="h-2.5 w-2.5 fill-white"
                          >
                            <path
                              d="M1 4l2 2 4-4"
                              stroke="white"
                              strokeWidth="1.5"
                              fill="none"
                            />
                          </svg>
                        )}
                      </span>
                      {range.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="mb-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg border border-[#E8E0D0] py-2 text-xs font-medium text-[#8B6914] hover:bg-[#F5F0E8]"
              >
                <X className="h-3 w-3" /> Clear all filters
              </button>
            )}
            <button
              onClick={onClose}
              className="w-full rounded-xl bg-[#8B6914] py-2.5 text-sm font-semibold text-white"
            >
              Show {resultCount} product{resultCount !== 1 ? "s" : ""}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ─── ShowMoreFooter ──────────────────────────────────────────────────────────────

function ShowMoreFooter({
  visibleCount,
  totalCount,
  onShowMore,
}: {
  visibleCount: number;
  totalCount: number;
  onShowMore: () => void;
}) {
  if (totalCount <= ITEMS_PER_PAGE) return null;
  return (
    <div className="mt-8 flex flex-col items-center gap-2">
      {visibleCount < totalCount ? (
        <>
          <p className="text-xs text-[#B8A898]">
            Showing {visibleCount} of {totalCount} products
          </p>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onShowMore}
            className="flex cursor-pointer items-center gap-2 rounded-full border border-[#C9A96E] bg-white px-6 py-2.5 text-sm font-semibold text-[#8B6914] transition-colors hover:bg-[#F5F0E8]"
          >
            Show more <ChevronDown className="h-4 w-4" />
          </motion.button>
        </>
      ) : (
        <p className="text-xs text-[#C0B4A8]">
          All {totalCount} products loaded
        </p>
      )}
    </div>
  );
}

// ─── Main ShopClient ─────────────────────────────────────────────────────────────

export default function ShopClient({ categoryId }: { categoryId?: string }) {
  const { products: initialProducts, categories } = useProducts();
  const searchParams = useSearchParams();

  const [searchQuery, setSearchQuery] = useState(
    () => searchParams.get("q") ?? "",
  );
  const [selectedCategory, setSelectedCategory] = useState(
    () => categoryId || "all",
  );
  const [sortBy, setSortBy] = useState<SortKey>("default");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  // Track previous values to avoid no-op state updates
  const prevSearchParamsKey = useRef(searchParams.toString());
  const prevCategoryId = useRef(categoryId);

  // Respond to external navigation (back/forward, redirect from SearchComponent)
  useEffect(() => {
    const key = searchParams.toString();
    if (key === prevSearchParamsKey.current) return;
    prevSearchParamsKey.current = key;

    const q = searchParams.get("q") ?? "";
    setSearchQuery(q);
    if (q) setSelectedCategory("all"); // search overrides category
  }, [searchParams]);

  // Respond to route segment changes (user navigates /shop/[categoryId])
  useEffect(() => {
    if (categoryId === prevCategoryId.current) return;
    prevCategoryId.current = categoryId;
    // Only apply if no active search is in control
    if (!searchQuery) {
      setSelectedCategory(categoryId || "all");
    }
  }, [categoryId, searchQuery]);

  // ── Single URL-write effect ────────────────────────────────────────────────────
  // This is the ONLY place that calls history.replaceState.
  // It runs after state settles, so there is no race between category and query.
  useEffect(() => {
    const url = new URL(window.location.href);
    url.pathname = `/shop/${selectedCategory === "all" ? "all" : selectedCategory}`;
    if (searchQuery) {
      url.searchParams.set("q", searchQuery);
    } else {
      url.searchParams.delete("q");
    }
    if (url.toString() !== window.location.href) {
      window.history.replaceState(null, "", url.toString());
    }
  }, [selectedCategory, searchQuery]);

  // Reset "show more" whenever filters change
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [searchQuery, selectedCategory, sortBy, selectedPriceRanges]);

  // ── FIX 2: commit-only handler — no keystroke re-renders ──────────────────────
  const handleSearchCommit = useCallback((value: string) => {
    const q = value.trim();
    setSearchQuery(q);
    if (q) setSelectedCategory("all");
  }, []);

  // ── Filter + sort ──────────────────────────────────────────────────────────────
  const filteredProducts = useMemo(() => {
    let filtered = [...(initialProducts || [])];

    if (searchQuery) {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (p) => p["category-url"]?.toLowerCase() === selectedCategory,
      );
    }
    if (selectedPriceRanges.length > 0) {
      filtered = filtered.filter((p) =>
        selectedPriceRanges.some((rv) => {
          const range = PRICE_RANGES.find((r) => r.value === rv);
          return range ? p.price >= range.min && p.price < range.max : false;
        }),
      );
    }
    switch (sortBy) {
      case "name-asc":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        filtered.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-asc":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        filtered.sort((a, b) => b.price - a.price);
        break;
    }
    return filtered;
  }, [
    initialProducts,
    searchQuery,
    selectedCategory,
    sortBy,
    selectedPriceRanges,
  ]);

  const clearFilters = useCallback(() => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSortBy("default");
    setSelectedPriceRanges([]);
  }, []);

  const hasActiveFilters =
    !!searchQuery ||
    selectedCategory !== "all" ||
    sortBy !== "default" ||
    selectedPriceRanges.length > 0;

  const activeFilterCount =
    (selectedCategory !== "all" ? 1 : 0) +
    (selectedPriceRanges.length > 0 ? 1 : 0) +
    (sortBy !== "default" ? 1 : 0);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-[#FAFAF7]">
      {/* ── Sticky bar ── */}
      <div className="sticky top-0 z-20 border-b border-[#EDE8DF] bg-[#FAFAF7]/90 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* FIX 2: isolated input component */}
            <SearchInput
              initialValue={searchQuery}
              onCommit={handleSearchCommit}
            />

            <button
              onClick={() => setShowMobileFilters(true)}
              className="relative flex items-center gap-1.5 rounded-xl border border-[#E8E0D0] bg-white px-3 py-2.5 text-sm font-medium text-[#5C4A1E] transition-colors hover:bg-[#F5F0E8] lg:hidden"
            >
              <SlidersHorizontal className="h-4 w-4" />
              {activeFilterCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#8B6914] text-[9px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <div className="hidden lg:block">
              <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
            </div>

            <div className="hidden items-center gap-0.5 rounded-xl border border-[#E8E0D0] bg-white p-1 sm:flex">
              {(["grid", "list"] as ViewMode[]).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`rounded-lg p-1.5 transition-colors ${viewMode === mode ? "bg-[#F5F0E8] text-[#8B6914]" : "text-[#B8A898] hover:text-[#5C4A1E]"}`}
                >
                  {mode === "grid" ? (
                    <LayoutGrid className="h-4 w-4" />
                  ) : (
                    <LayoutList className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex gap-6">
          <FilterSidebar
            categories={categories ?? []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPriceRanges={selectedPriceRanges}
            setSelectedPriceRanges={setSelectedPriceRanges}
            hasActiveFilters={hasActiveFilters}
            clearFilters={clearFilters}
            products={initialProducts ?? []}
          />

          <MobileFilterDrawer
            open={showMobileFilters}
            onClose={() => setShowMobileFilters(false)}
            categories={categories ?? []}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            sortBy={sortBy}
            setSortBy={setSortBy}
            selectedPriceRanges={selectedPriceRanges}
            setSelectedPriceRanges={setSelectedPriceRanges}
            clearFilters={clearFilters}
            hasActiveFilters={hasActiveFilters}
            resultCount={filteredProducts.length}
          />

          {/* ── Results ── */}
          <main className="min-w-0 flex-1">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm text-[#9C8E80]">
                {searchQuery ? (
                  <>
                    <span className="font-medium text-[#2C2418]">
                      {filteredProducts.length}
                    </span>{" "}
                    result{filteredProducts.length !== 1 ? "s" : ""} for{" "}
                    <span className="font-medium text-[#2C2418]">
                      {searchQuery}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="font-medium text-[#2C2418]">
                      {filteredProducts.length}
                    </span>{" "}
                    product{filteredProducts.length !== 1 ? "s" : ""}
                  </>
                )}
              </p>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex cursor-pointer items-center gap-1 text-xs font-medium text-[#8B6914] hover:underline"
                >
                  <X className="h-3 w-3" />
                  Clear {activeFilterCount > 0 ? `${activeFilterCount} ` : ""}
                  filter{activeFilterCount !== 1 ? "s" : ""}
                </button>
              )}
            </div>

            {filteredProducts.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-2xl bg-white p-12 text-center"
              >
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F0E8]">
                  <PackageSearch className="h-7 w-7 text-[#C9A96E]" />
                </div>
                <div>
                  <p className="text-base font-semibold text-[#2C2418]">
                    {searchQuery
                      ? `No results for "${searchQuery}"`
                      : "No products found"}
                  </p>
                  <p className="mt-1 text-sm text-[#9C8E80]">
                    Try different keywords or adjust your filters
                  </p>
                </div>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="cursor-pointer rounded-full bg-[#8B6914] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  >
                    Clear all filters
                  </button>
                )}
              </motion.div>
            )}

            {filteredProducts.length > 0 && viewMode === "grid" && (
              <>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product["name-url"]}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.26,
                        delay: Math.min(index % ITEMS_PER_PAGE, 8) * 0.04,
                      }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </div>
                <ShowMoreFooter
                  visibleCount={visibleCount}
                  totalCount={filteredProducts.length}
                  onShowMore={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                />
              </>
            )}

            {filteredProducts.length > 0 && viewMode === "list" && (
              <>
                <div className="space-y-2.5">
                  {visibleProducts.map((product, index) => (
                    <motion.div
                      key={product["name-url"]}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        duration: 0.22,
                        delay: Math.min(index % ITEMS_PER_PAGE, 8) * 0.035,
                      }}
                    >
                      <ProductCardList product={product} />
                    </motion.div>
                  ))}
                </div>
                <ShowMoreFooter
                  visibleCount={visibleCount}
                  totalCount={filteredProducts.length}
                  onShowMore={() => setVisibleCount((v) => v + ITEMS_PER_PAGE)}
                />
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
