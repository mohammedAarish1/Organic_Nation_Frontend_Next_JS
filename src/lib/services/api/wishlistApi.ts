// src/features/cart/cartApi.js
import { baseQueryWithRefresh } from "@/lib/baseQueryWithRefresh";
import { createApi } from "@reduxjs/toolkit/query/react";

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const wishlistApi = createApi({
  reducerPath: "wishlistApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Wishlist"],
  endpoints: (builder) => ({
    addToWishList: builder.mutation({
      query: (productId) => ({
        url: `/orders/add-to-wishlist/${productId}`,
        method: "POST",
        body: {},
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Wishlist"],
    }),
    removeFromWishList: builder.mutation({
      query: (productId) => ({
        url: `/orders/wish-list/remove-new/${productId}`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Wishlist"],
    }),
    getWishlistProducts: builder.query({
      query: () => "/orders/all/wish-list-new",
      providesTags: ["Wishlist"],
      transformResponse: (response) => {
        // Transform to match our new structure
        return response;
      },
    }),
    clearWishList: builder.mutation({
      query: () => ({
        url: `/orders/wish-list-new/clear`,
        method: "DELETE",
        body: {},
      }),
      invalidatesTags: ["Wishlist"],
    }),
  }),
});

export const {
  useAddToWishListMutation,
  useGetWishlistProductsQuery,
  useLazyGetWishlistProductsQuery,
  useRemoveFromWishListMutation,
  useClearWishListMutation,
} = wishlistApi;
