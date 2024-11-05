import { createApi } from "@reduxjs/toolkit/query/react";
import { ApiResponse, LoginRequest, LoginResponse } from "../../types";
import { baseQueryWithReauth } from "../baseQuery";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    signIn: builder.mutation<ApiResponse<LoginResponse>, LoginRequest>({
      query: (credentials) => {
        return {
          url: "/auth/sign-in",
          method: "POST",
          body: { ...credentials, grantType: "password" },
        };
      },
    }),
    refresh: builder.mutation<LoginResponse, void>({
      query: () => {
        return {
          url: "/auth/refresh",
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
  }),
});

export const { useSignInMutation, useRefreshMutation, useSignOutMutation } =
  authApi;

export { authApi };
