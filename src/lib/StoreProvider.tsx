"use client";
import { ReactNode, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore } from "./store";
import AuthProvider from "@/components/auth/AuthProvider";

// Inference of the store type based on the return type of makeStore
type Store = ReturnType<typeof makeStore>;

export default function StoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<Store | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return (
    <Provider store={storeRef.current}>
      <AuthProvider>{children}</AuthProvider>
    </Provider>
  );
}
