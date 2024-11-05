import { LoginRequest, LoginResponse } from "../../types";
import { baseApi } from "../baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    signIn: builder.mutation<LoginResponse, LoginRequest>({
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
