// src/components/providers/CartProvider.tsx
"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeCartFromStorage,
  syncServerCart,
} from "@/lib/features/cart/cartSlice";
import { useGetLoggedInCartQuery } from "@/lib/services/api/cartApi";
import { useAppSelector } from "@/lib/hooks";

export default function CartProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const dispatch = useDispatch();

  // Check if user is logged in (adjust based on your auth setup)
  const { user, isAuthenticated } = useAppSelector((state) => state.auth); // or however you track auth
  // Fetch logged-in user's cart (will skip if not logged in)
  // const { data: serverCart, isSuccess } = useGetLoggedInCartQuery(undefined, {
  //   skip: !isLoggedIn, // Only fetch if logged in
  // });

  useEffect(() => {
    if (isAuthenticated) {
      // User is logged in and we have server cart - sync it
      dispatch(syncServerCart(user?.cart.items || []));
    } else if (!isAuthenticated) {
      // User is guest - load from localStorage
      dispatch(initializeCartFromStorage());
    }
  }, [isAuthenticated, dispatch]);

  return <>{children}</>;
}
