import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { baseQueryWithRefresh } from "../../baseQueryWithRefresh";
import { User } from "@/types";

// types/index.ts (add these alongside your User type)

export type GetCurrentUserResponse = {
  user: User;
  message: string;
};

export type VerifyOtpResponse = {
  success: boolean;
  message: string;
};

export type LogoutResponse = {
  message: string;
};

// export interface User {
//   id: string;
//   phone: string;
//   name?: string;
//   email?: string;
// }

// const baseQuery = fetchBaseQuery({
//   baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
//   credentials: 'include',
// });

// Auto refresh on token expiry
// const baseQueryWithRefresh: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
//   args,
//   api,
//   extraOptions
// ) => {
//   let result = await baseQuery(args, api, extraOptions);
//   if (result.error?.status === 401 && (result.error.data as any)?.code === 'TOKEN_EXPIRED') {
//     const refreshResult = await baseQuery({ url: '/api/auth/user/refresh-new', method: 'POST' }, api, extraOptions);

//     if (refreshResult.data) {
//       result = await baseQuery(args, api, extraOptions);
//     }
//   }

//   return result;
// };

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRefresh,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation<
      { message: string; success: boolean },
      { phoneNumber: string }
    >({
      query: (body) => ({ url: "/otp-auth/send-otp", method: "POST", body }),
    }),
    verifyOtp: builder.mutation<
      VerifyOtpResponse,
      { otp: string; phoneNumber: string }
    >({
      query: (body) => ({
        url: "/otp-auth/verify-otp-new",
        method: "POST",
        body,
      }),
      invalidatesTags: ["User"],
    }),
    getCurrentUser: builder.query<GetCurrentUserResponse, void>({
      query: () => "/auth/user",
      providesTags: ["User"],
    }),
    logout: builder.mutation<{ message: string }, void>({
      query: () => ({ url: "/auth/user/logout-new", method: "POST" }),
      // invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useVerifyOtpMutation,
  useGetCurrentUserQuery,
  useLazyGetCurrentUserQuery,
  useLogoutMutation,
} = authApi;
