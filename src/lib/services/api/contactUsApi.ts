import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactUsApi = createApi({
  reducerPath: "contactUsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000",
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
