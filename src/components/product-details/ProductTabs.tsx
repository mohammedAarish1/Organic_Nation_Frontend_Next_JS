"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Info, Star, MessageSquare, Award, Package } from "lucide-react";

export default function ProductTabs() {
  const [showMobileTabs, setShowMobileTabs] = useState(false);
  const [activeMobileTab, setActiveMobileTab] = useState("description");

  const mobileTabs = [
    { id: "description", label: "Description", icon: Info },
    { id: "reviews", label: "Reviews", icon: Star },
    { id: "faqs", label: "FAQ's", icon: MessageSquare },
    { id: "whyus", label: "Why Us", icon: Award },
    { id: "additionalinfo", label: "Info", icon: Package },
  ];

  useEffect(() => {
    const checkSticky = () => {
      if (window.innerWidth < 768) {
        setShowMobileTabs(window.scrollY > 300);
      } else {
        setShowMobileTabs(false);
      }
    };

    window.addEventListener("scroll", checkSticky);
    return () => window.removeEventListener("scroll", checkSticky);
  }, []);

  const scrollToSection = useCallback(
    (id) => {
      const element = document.getElementById(id);
      if (element) {
        const offset = window.innerWidth < 768 && showMobileTabs ? 60 : 0;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
        setActiveMobileTab(id);
      }
    },
    [showMobileTabs],
  );

  return (
    <AnimatePresence>
      {showMobileTabs && (
        <motion.div
          initial={{ y: "-100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 left-0 z-50 overflow-x-auto border-b border-gray-200 bg-white shadow-lg lg:hidden"
        >
          <div className="flex justify-between gap-2 px-4 py-2">
            {mobileTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => scrollToSection(tab.id)}
                className={`flex flex-1 flex-col items-center rounded-lg p-2 text-sm font-medium transition-colors ${
                  activeMobileTab === tab.id
                    ? "border-b-2 border-orange-500 bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-800"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
