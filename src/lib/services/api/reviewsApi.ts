// src/features/cart/cartApi.js
import { baseQueryWithRefresh } from "@/lib/baseQueryWithRefresh";
import { createApi } from "@reduxjs/toolkit/query/react";

// const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
export const reviewsApi = createApi({
  reducerPath: "reviewsApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["Reviews"],
  endpoints: (builder) => ({
    // Add a new review
    addReview: builder.mutation({
      query: (formData) => ({
        url: "/reviews",
        method: "POST",
        body: formData,
      }),
      transformResponse: (response) => {
        return response;
      },
      invalidatesTags: ["Reviews"],
    }),
  }),
});

export const { useAddReviewMutation } = reviewsApi;
