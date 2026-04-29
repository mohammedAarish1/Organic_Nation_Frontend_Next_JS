"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { AccordionItem } from "./AccordionItem";

export interface FAQ {
  id: number;
  header: string;
  text: string;
  category?: string;
}

interface FAQSearchProps {
  faqs: FAQ[];
}

export function FAQSearch({ faqs }: FAQSearchProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs =
    searchQuery.trim() === ""
      ? faqs
      : faqs.filter(
          (faq) =>
            faq.header.toLowerCase().includes(searchQuery.toLowerCase()) ||
            faq.text.toLowerCase().includes(searchQuery.toLowerCase()),
        );

  return (
    <>
      {/* Search Bar */}
      <div className="mx-auto mt-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search for answers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-full border-2 border-emerald-200 bg-white py-4 pr-4 pl-12 text-gray-900 placeholder-gray-500 shadow-sm transition-all focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          />
        </div>
      </div>

      {/* Accordion List */}
      <div className="mt-12 space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, index) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              defaultOpen={index === 0 && searchQuery === ""}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-md">
            <div className="mb-4 rounded-full bg-gradient-to-r from-emerald-100 to-amber-100 p-6">
              <Search className="h-12 w-12 text-emerald-700" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">
              No Results Found
            </h3>
            <p className="mb-6 text-gray-600">
              Try searching with different keywords
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="rounded-full bg-gradient-to-r from-emerald-600 to-green-600 px-6 py-3 font-semibold text-white transition-all hover:shadow-lg"
            >
              Clear Search
            </button>
          </div>
        )}
      </div>
    </>
  );
}
