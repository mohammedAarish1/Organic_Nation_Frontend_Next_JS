// src/features/cart/cartApi.js
import { baseQueryWithRefresh } from "@/lib/baseQueryWithRefresh";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Orders"],
  endpoints: (builder) => ({
    // ========= 1) Add new order ==============
    addOrder: builder.mutation({
      query: (checkoutData) => ({
        url: "/orders",
        method: "POST",
        body: checkoutData,
      }),
      transformResponse: (response) => {
        return response;
      },
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
      invalidatesTags: ["Orders"],
    }),
    // ========= 2) initiate the payment when paying online ========
    initiatePayment: builder.mutation({
      query: (payload) => ({
        url: "/phonepe/payment",
        method: "POST",
        body: payload,
      }),
      transformResponse: (response) => {
        const redirectUrl =
          response?.data?.instrumentResponse?.redirectInfo?.url;
        if (redirectUrl) {
          window.location.href = redirectUrl;
        }
        // return response;
      },

      invalidatesTags: ["Orders"],
    }),
    getSingleOrderDetails: builder.query({
      query: (orderId) => `/orders/${orderId}`,
      providesTags: ["Orders"],
      transformResponse: (response) => {
        return response;
      },
    }),
    getAllOrders: builder.query({
      query: () => `/orders/all`,
      providesTags: ["Orders"],
      transformResponse: (response) => {
        return response;
      },
    }),
    checkDeliveryAvailability: builder.query({
      query: (pinCode) => `/delivery/check-availability/${pinCode}`,
      // providesTags:['Orders'],
      transformResponse: (response) => {
        return response;
      },
    }),
    addReturnItem: builder.mutation({
      query: (formData) => ({
        url: "/orders/add-return-item",
        method: "POST",
        body: formData,
        formData: true,
      }),
      transformResponse: (response) => {
        return response;
      },
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
      invalidatesTags: ["Orders"],
    }),
    getAllReturns: builder.query({
      query: () => `/orders/all/return-items`,
      providesTags: ["Orders"],
      transformResponse: (response) => {
        return response;
      },
    }),
    cancelOrder: builder.mutation({
      query: (orderId) => ({
        url: `/orders/${orderId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
    cancelReturn: builder.mutation({
      query: (returnId) => ({
        url: `/orders/cancel-return/${returnId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
});

export const {
  useAddOrderMutation,
  useInitiatePaymentMutation,
  useGetSingleOrderDetailsQuery,
  useGetAllOrdersQuery,
  useLazyCheckDeliveryAvailabilityQuery,
  useAddReturnItemMutation,
  useGetAllReturnsQuery,
  useCancelReturnMutation,
  useCancelOrderMutation,
} = ordersApi;
