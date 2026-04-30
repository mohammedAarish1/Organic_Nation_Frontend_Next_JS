import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL
    ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api`
    : "http://localhost:8000/api",
  credentials: "include",
  prepareHeaders: (headers) => {
    // Add any common headers here
    return headers;
  },
});

// Shared refresh logic
export const baseQueryWithRefresh: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  // Check for token expiration
  if (result.error?.status === 401) {
    const errorData = result.error.data as { code?: string; message?: string };
    if (
      errorData?.code === "TOKEN_EXPIRED" ||
      errorData?.message?.includes("token")
    ) {
      // console.log('Token expired, attempting refresh...');

      // Attempt to refresh the token
      const refreshResult = await baseQuery(
        { url: "/auth/user/refresh-new", method: "POST" },
        api,
        extraOptions,
      );

      if (refreshResult.data) {
        // console.log('Token refreshed successfully, retrying original request');
        // Retry the original request
        result = await baseQuery(args, api, extraOptions);
      } else {
        // console.log('Token refresh failed');
        // Optional: Dispatch logout action or redirect to login
      }
    }
  }

  return result;
};
