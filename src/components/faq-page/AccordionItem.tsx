"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";

export interface FAQ {
  id: number;
  header: string;
  text: string;
  category?: string;
}

interface AccordionItemProps {
  faq: FAQ;
  defaultOpen?: boolean;
}

export function AccordionItem({
  faq,
  defaultOpen = false,
}: AccordionItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="group rounded-2xl border-2 border-emerald-100 bg-white shadow-sm transition-all hover:border-emerald-300 hover:shadow-md">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-start justify-between gap-4 p-5 text-left transition-all sm:p-6"
      >
        <div className="flex items-start gap-3">
          <div
            className={`mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
              isOpen
                ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
                : "bg-gradient-to-r from-emerald-100 to-amber-100 text-emerald-700"
            }`}
          >
            <HelpCircle className="h-4 w-4" />
          </div>
          <h3
            className={`pr-4 text-base font-bold transition-colors sm:text-lg ${
              isOpen ? "text-emerald-700" : "text-gray-900"
            }`}
          >
            {faq.header}
          </h3>
        </div>

        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all ${
            isOpen
              ? "bg-gradient-to-r from-emerald-600 to-green-600 text-white"
              : "bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100"
          }`}
        >
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t border-emerald-100 bg-linear-to-r from-emerald-50/30 to-amber-50/30 px-6 py-5 sm:px-8">
          <p className="text-start text-sm leading-relaxed whitespace-pre-line text-gray-700 sm:text-base">
            {faq.text}
          </p>
        </div>
      </div>
    </div>
  );
}
