"use client";
import { useEffect } from "react";
import { useLazyGetCurrentUserQuery } from "@/lib/services/api/authApi";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [getCurrentUser] = useLazyGetCurrentUserQuery();

  useEffect(() => {
    getCurrentUser();
  }, []);

  return <>{children}</>;
}
