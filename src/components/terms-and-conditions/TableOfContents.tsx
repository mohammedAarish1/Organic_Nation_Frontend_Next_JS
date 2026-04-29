"use client";

import { useState, useEffect } from "react";
import { Menu, ChevronUp, ChevronDown, ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const sections = [
  { id: "introduction", title: "Introduction" },
  { id: "terms", title: "Terms & Termination" },
  { id: "website-use", title: "Use of the Website" },
  { id: "products", title: "Products provided by Foodsbay India" },
  { id: "orders", title: "Order Placement & Acceptance" },
  { id: "payment", title: "Payment Policy" },
  { id: "shipping", title: "Shipping Policy" },
  { id: "returns", title: "Return & Refund Policy" },
  { id: "indemnification", title: "Indemnification" },
  { id: "jurisdiction", title: "Governing Law And Jurisdiction" },
  { id: "ip-rights", title: "Intellectual Property Rights" },
  { id: "agreement", title: "Entire Agreement" },
  { id: "submissions", title: "Submissions" },
  { id: "disclaimer", title: "Disclaimer" },
];

const TableOfContents = ({ activeSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = (event) => {
      if (!event.target.closest(".toc-container")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleSectionClick = (id) => {
    router.push(`/terms-and-conditions/${id}`);
    setIsOpen(false);
  };

  return (
    <div className="toc-container">
      {isMobile && (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 shadow-lg"
        >
          <Menu className="h-5 w-5" />
          <span className="font-medium">Sections</span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </button>
      )}

      <div
        className={` ${isMobile ? "fixed bottom-24 left-6 z-40 w-72" : "sticky top-8 w-full"} ${isMobile && !isOpen ? "hidden" : "block"} rounded-lg border border-gray-200 bg-white shadow-lg`}
      >
        <div className="border-b border-gray-200 p-4">
          <h3 className="font-semibold text-gray-900">Table of Contents</h3>
        </div>
        <nav className="scrollbar-hide max-h-[calc(100vh-200px)] overflow-y-auto">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleSectionClick(section.id)}
              className={`flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm transition-colors hover:bg-gray-50 ${activeSection === section.id ? "bg-gray-100 font-semibold text-gray-900" : "text-gray-700"} `}
            >
              <span>{section.title}</span>
              {activeSection === section.id && (
                <ChevronRight className="h-4 w-4 text-gray-900" />
              )}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default TableOfContents;
