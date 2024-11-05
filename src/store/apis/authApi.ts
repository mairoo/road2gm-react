import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {ApiResponse, LoginRequest, LoginResponse} from "../../types";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
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
          url: "/auth/login",
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
