import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import {
  useGetCartDetailsMutation,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useMergeCartMutation,
  // useApplyCouponCodeMutation,
  useGetLoggedInCartQuery,
} from "../services/api/cartApi";
import {
  addToLocalCart,
  updateLocalCartQty,
  removeFromLocalCart,
  clearLocalCartState,
  selectCartItems,
  selectTotalCartItems,
  selectTotalCartAmount,
  selectTotalTax,
  selectCouponCodeApplied,
  selectDiscountProgress,
  selectIsGuestCart,
  selectSpecialDiscount,
  selectDiscountAmount,
  selectTotalMRP,
} from "../features/cart/cartSlice";
import { useAppSelector } from "../hooks";

export const useCart = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  // ✅ Get cart state
  const cartItems = useSelector(selectCartItems);
  const totalCartItems = useSelector(selectTotalCartItems);
  const totalMRP = useSelector(selectTotalMRP);
  const totalCartAmount = useSelector(selectTotalCartAmount);
  const totalTax = useSelector(selectTotalTax);
  const discountAmount = useSelector(selectDiscountAmount);
  const specialDiscount = useSelector(selectSpecialDiscount);
  const couponCodeApplied = useSelector(selectCouponCodeApplied);
  const discountProgress = useSelector(selectDiscountProgress);
  const isGuestCart = useSelector(selectIsGuestCart);

  const {
    data,
    error,
    isLoading: isLoadingLoggedInCart,
    refetch,
  } = useGetLoggedInCartQuery(undefined, {
    skip: !isAuthenticated, // ✅ Auto-skips when not authenticated
  });
  // ✅ Mutations
  const [getCartDetails, { isLoading: isLoadingCartDetails }] =
    useGetCartDetailsMutation();
  const [addToCartServer, { isLoading: isAddingToCart }] =
    useAddToCartMutation();
  const [updateQtyServer, { isLoading: isUpdatingQty }] =
    useUpdateQuantityMutation();
  const [removeFromCartServer, { isLoading: isRemovingFromCart }] =
    useRemoveFromCartMutation();
  const [clearCartServer, { isLoading: isClearingCart }] =
    useClearCartMutation();
  const [mergeCartServer] = useMergeCartMutation();
  // const [applyCoupon, { isLoading: isApplyingCoupon }] =
  //   useApplyCouponCodeMutation();

  // ============================================
  // ✅ WRAPPER FUNCTIONS - Handle auth logic
  // ============================================

  const addToCart = useCallback(
    async ({ productId, quantity, productName }) => {
      try {
        if (isAuthenticated) {
          const result = await addToCartServer({
            productId,
            quantity,
            productName,
          }).unwrap();
          if (result.success) {
            await getCartDetails(result.cart).unwrap();
          }
        } else {
          dispatch(addToLocalCart({ productId, quantity, productName }));
        }
        return { success: true };
      } catch (error) {
        console.error("Error adding to cart:", error);
        return { success: false, error };
      }
    },
    [isAuthenticated, addToCartServer, dispatch],
  );

  const updateQuantity = useCallback(
    async ({ productName, type }) => {
      try {
        if (isAuthenticated) {
          const result = await updateQtyServer({
            productName,
            action: type,
          }).unwrap();
          // if (result.success) {
          //   await getCartDetails(result.cart).unwrap();
          // }
        } else {
          dispatch(updateLocalCartQty({ productName, type }));
        }
        return { success: true };
      } catch (error) {
        console.error("Error updating quantity:", error);
        return { success: false, error };
      }
    },
    [isAuthenticated, updateQtyServer, dispatch],
  );

  const removeFromCart = useCallback(
    async (productName: { productName: string }) => {
      try {
        if (isAuthenticated) {
          const result = await removeFromCartServer(productName).unwrap();
          if (result.success) {
            // await getCartDetails(result.cart).unwrap();
          }
        } else {
          dispatch(removeFromLocalCart(productName));
        }
        return { success: true };
      } catch (error) {
        console.error("Error removing from cart:", error);
        return { success: false, error };
      }
    },
    [isAuthenticated, removeFromCartServer, dispatch],
  );

  const clearCart = useCallback(async () => {
    try {
      if (isAuthenticated) {
        await clearCartServer().unwrap();
      } else {
        dispatch(clearLocalCartState());
      }
      return { success: true };
    } catch (error) {
      console.error("Error clearing cart:", error);
      return { success: false, error };
    }
  }, [isAuthenticated, clearCartServer, dispatch]);

  const mergeCart = useCallback(async () => {
    try {
      // if (!isAuthenticated || cartItems.length === 0) {
      //   return { success: false, error: "Not authenticated or empty cart" };
      // }
      const localCart = cartItems.map((item) => ({
        productId: item.productId || item._id,
        productName: item.productName || item["name-url"],
        quantity: item.quantity,
      }));
      const result = await mergeCartServer({ cart: localCart }).unwrap();
      // Clear local storage
      //   await getCartDetails(localCart).unwrap();
      localStorage.removeItem("cart");

      // Refetch server cart
      // await refetchCart();

      return { data: result };
    } catch (error) {
      console.error("Error merging cart:", error);
      return { success: false, error };
    }
  }, [isAuthenticated, cartItems, mergeCartServer]);

  // const applyCouponCode = useCallback(
  //   async (couponData) => {
  //     try {
  //       await applyCoupon(couponData).unwrap();
  //       return { success: true };
  //     } catch (error) {
  //       console.error("Error applying coupon:", error);
  //       return { success: false, error: error.data?.error || error.message };
  //     }
  //   },
  //   [applyCoupon],
  // );

  // === REFRESH CART ===
  const refreshCart = useCallback(async () => {
    try {
      if (isAuthenticated) {
        await refetch();
      } else if (cartItems.length > 0) {
        const minimalCart = cartItems.map((item) => ({
          productName: item.productName || item["name-url"],
          quantity: item.quantity,
        }));
        await getCartDetails(minimalCart).unwrap();
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  }, [isAuthenticated, cartItems, getCartDetails]);

  const isLoading =
    isLoadingLoggedInCart ||
    isLoadingCartDetails ||
    isAddingToCart ||
    // isUpdatingQty ||
    // isRemovingFromCart ||
    isClearingCart;

  // ✅ Return ONLY what's needed
  return {
    // Cart data
    cartItems,
    totalCartItems,
    totalMRP,
    totalCartAmount,
    totalTax,
    discountAmount,
    specialDiscount,
    couponCodeApplied,
    discountProgress,
    isGuestCart,
    isAuthenticated,

    // Operations (already handle auth internally!)
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    mergeCart,
    // applyCouponCode,
    refreshCart,
    // fetchGuestCartDetails,

    // Loading states
    isLoading,
    isAddingToCart,
    isUpdatingQty,
    isRemovingFromCart,
    isClearingCart,
    // isApplyingCoupon,
  };
};
