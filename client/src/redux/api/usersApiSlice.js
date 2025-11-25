import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../constant.js";  

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    resgister: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      })
    })
  }),
}); 

export const { useLoginMutation, useLogoutMutation, useResgisterMutation } = userApiSlice;