import { createApi } from "@reduxjs/toolkit/query/react";

import { ApiResponse, LoginRequest, LoginResponse } from "../../types";
import storage from "../../utils/storage";
import { baseQueryWithRetry } from "../baseQuery";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithRetry,
  endpoints: (builder) => ({
    signIn: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => {
        return {
          url: "/auth/sign-in",
          method: "POST",
          body: credentials,
        };
      },
    }),
    signInOAuth2: builder.mutation<ApiResponse<LoginResponse>, void>({
      query: () => {
        return {
          url: "/auth/oauth2/token",
          method: "POST",
        };
      },
    }),
    signOut: builder.mutation<void, void>({
      query: () => {
        return {
          url: "/auth/sign-out",
          method: "POST",
        };
      },
    }),
    refreshToken: builder.mutation<ApiResponse<LoginResponse>, void>({
      query: () => ({
        url: "/auth/refresh",
        method: "POST",
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          await queryFulfilled;
          storage.setLastRefreshTime(Date.now());
        } catch (error) {
          console.error("Token refresh failed:", error);
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignInOAuth2Mutation,
  useSignOutMutation,
  useRefreshTokenMutation,
} = authApi;

export { authApi };
