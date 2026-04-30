// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

// export const productsApi = createApi({
//   reducerPath: 'productsApi',
//   baseQuery: fetchBaseQuery({ baseUrl: API_BASE_URL }),
//   tagTypes: ['Products'],
//   endpoints: (builder) => ({
//     // Get all products
//     getProducts: builder.query<{ products: any[], categoryList: string[] }, void>({
//       query: () => '/products',
//       providesTags: ['Products'],
//     }),

//     // Get products by category
//     getProductsByCategory: builder.query<any[], string>({
//       query: (category) => `/products/${category}`,
//       providesTags: (result, error, category) => [{ type: 'Products', id: category }],
//     }),
//   }),
// });

// export const {
//   useGetProductsQuery,
//   useGetProductsByCategoryQuery
// } = productsApi;

import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/products", // or '/api/products' - whatever your endpoint is
      providesTags: ["Products"],
      transformResponse: (response) => {
        // Transform to match our new structure
        return response;
      },
    }),
    getCategories: builder.query({
      query: () => "/products/all/categories/list", // adjust to your actual endpoint
    }),
    getProductsbyCategory: builder.query({
      query: (categoryId) => `/categories/${categoryId}`, // adjust to your actual endpoint
    }),
    getProductReviews: builder.query({
      query: (productId) => `/api/reviews/${productId}`, // adjust to your actual endpoint
    }),
    getBlogs: builder.query({
      query: () => `/api/blogs`,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetCategoriesQuery,
  useGetProductsbyCategoryQuery,
  useGetProductReviewsQuery,
  useGetBlogsQuery,
} = productsApi;
