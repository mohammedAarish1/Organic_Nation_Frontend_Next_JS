import { API_BASE_URL } from "@/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_BASE_URL,
  }),
  tagTypes: ["ContactUs"],
  endpoints: (builder) => ({
    addNewQuery: builder.mutation({
      query: (data) => ({
        url: "/api/user-query/submit-contact-details",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response;
      },

      invalidatesTags: ["ContactUs"],
    }),
  }),
});

export const { useAddNewQueryMutation } = contactUsApi;
