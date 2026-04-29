// src/features/cart/cartApi.js
import { baseQueryWithRefresh } from "@/lib/baseQueryWithRefresh";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // Get cart with full product details
    getLoggedInCart: builder.query({
      query: () => "/cart/logged-in-user",
      providesTags: ["Cart"],
      transformResponse: (response) => {
        // Transform to match our new structure
        return {
          productDetails: response.productDetails || [],
          totals: response.totals || {},
          couponCodeApplied: response.couponCodeApplied,
        };
      },
    }),

    // Get cart details (for both logged-in and guest users)
    getCartDetails: builder.mutation({
      query: (cartItems) => ({
        url: "/cart/cart-details",
        method: "POST",
        body: { cartItems },
      }),
      transformResponse: (response) => {
        return {
          productDetails: response.productDetails || [],
          totals: response.totals || {},
        };
      },
    }),

    // Add item to cart
    addToCart: builder.mutation({
      query: ({ productId, quantity, productName }) => ({
        url: "/cart/add",
        method: "POST",
        body: { productId, quantity, productName },
      }),
      // Optimistic update
      // async onQueryStarted({ productId, quantity, productName }, { dispatch, queryFulfilled, getState }) {
      //   try {
      //     const { data } = await queryFulfilled;

      //     // Update cache optimistically
      //     dispatch(
      //       cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //         draft.items = data.items;
      //         draft.totalCartAmount = data.totalCartAmount;
      //         draft.totalTax = data.totalTaxes;
      //         draft.couponCodeApplied = data.couponCodeApplied;
      //       })
      //     );
      //   } catch {
      //     // Error handled by mutation
      //   }
      // },
      invalidatesTags: ["Cart"],
    }),

    // Update quantity
    updateQuantity: builder.mutation({
      query: ({ productName, action }) => ({
        url: `/cart/updateQuantity-new/${productName}`,
        method: "PUT",
        body: { action },
      }),
      // Optimistic update
      // async onQueryStarted({ productName, action }, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //       const item = draft.items.find(item => item.productName === productName);
      //       if (item) {
      //         if (action === 'increase') {
      //           item.quantity += 1;
      //         } else if (action === 'decrease') {
      //           item.quantity = Math.max(item.quantity - 1, 1);
      //         }
      //         // Recalculate totals optimistically (approximate)
      //         // Server will provide exact values
      //       }
      //     })
      //   );

      //   try {
      //     const { data } = await queryFulfilled;
      //     // Update with server response
      //     dispatch(
      //       cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //         draft.items = data.items;
      //         draft.totalCartAmount = data.totalCartAmount;
      //         draft.totalTax = data.totalTaxes;
      //         draft.couponCodeApplied = data.couponCodeApplied;
      //       })
      //     );
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
      invalidatesTags: ["Cart"],
    }),

    // Remove item from cart
    removeFromCart: builder.mutation({
      query: (productName) => ({
        url: `/cart/remove/${productName}`,
        method: "DELETE",
      }),
      // Optimistic update
      // async onQueryStarted(productName, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //       draft.items = draft.items.filter(item => item.productName !== productName);
      //     })
      //   );

      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(
      //       cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //         draft.items = data.items;
      //         draft.totalCartAmount = data.totalCartAmount;
      //         draft.totalTax = data.totalTaxes;
      //         draft.couponCodeApplied = data.couponCodeApplied;
      //       })
      //     );
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
      invalidatesTags: ["Cart"],
    }),

    // Clear cart
    clearCart: builder.mutation({
      query: () => ({
        url: "/cart",
        method: "DELETE",
      }),
      // Optimistic update
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   const patchResult = dispatch(
      //     cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //       draft.items = [];
      //       draft.totalCartAmount = 0;
      //       draft.totalTax = 0;
      //       draft.couponCodeApplied = [];
      //     })
      //   );

      //   try {
      //     await queryFulfilled;
      //   } catch {
      //     patchResult.undo();
      //   }
      // },
      invalidatesTags: ["Cart"],
    }),

    // Merge cart (when user logs in)
    mergeCart: builder.mutation({
      query: (cartItems) => ({
        url: "/cart/merge-new",
        method: "POST",
        body: cartItems,
      }),
      invalidatesTags: ["Cart"],
    }),

    // calculate shipping fee
    calculateShippingFee: builder.mutation({
      query: (payload) => ({
        url: "/delivery-charges/calculate-new",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Cart"],
    }),

    // calculate COD charges
    calculateCODCharges: builder.mutation({
      query: () => ({
        url: "/delivery-charges/calculate/cod-charges-new",
        method: "POST",
        body: {},
      }),
      invalidatesTags: ["Cart"],
    }),
    // Apply coupon code
    applyCouponCode: builder.mutation({
      query: (data) => ({
        url: "/validate/family/coupon-code",
        method: "POST",
        body: data,
      }),
      // async onQueryStarted(_, { dispatch, queryFulfilled }) {
      //   try {
      //     const { data } = await queryFulfilled;
      //     dispatch(
      //       cartApi.util.updateQueryData('getCart', undefined, (draft) => {
      //         draft.couponCodeApplied = data.couponCodeApplied;
      //         draft.totalCartAmount = data.totalCartAmount;
      //         draft.totalTax = data.totalTax;
      //         if (draft.discountProgress) {
      //           draft.discountProgress.discountAmount = data.discountAmount;
      //           draft.discountProgress.discountType = data.discountType;
      //           draft.discountProgress.discountPercentage = data.discountPercentage;
      //         }
      //       })
      //     );
      //   } catch {
      //     // Error handled by mutation
      //   }
      // },
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetLoggedInCartQuery,
  useGetCartDetailsMutation,
  useAddToCartMutation,
  useUpdateQuantityMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useMergeCartMutation,
  useApplyCouponCodeMutation,
  useCalculateShippingFeeMutation,
  useCalculateCODChargesMutation,
} = cartApi;
