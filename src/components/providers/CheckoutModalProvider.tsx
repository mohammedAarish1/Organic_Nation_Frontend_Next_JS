// lib/context/CheckoutModalContext.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

interface CheckoutModalContextType {
  isOpen: boolean;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CheckoutModalContext = createContext<
  CheckoutModalContextType | undefined
>(undefined);

export function CheckoutModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openCheckout = useCallback(() => {
    setIsOpen(true);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";
  }, []);

  const closeCheckout = useCallback(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <CheckoutModalContext.Provider
      value={{ isOpen, openCheckout, closeCheckout }}
    >
      {children}
    </CheckoutModalContext.Provider>
  );
}

// Custom hook for easy access
export function useCheckoutModal() {
  const context = useContext(CheckoutModalContext);
  if (!context) {
    throw new Error(
      "useCheckoutModal must be used within CheckoutModalProvider",
    );
  }
  return context;
}
