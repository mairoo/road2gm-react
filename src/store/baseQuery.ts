import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { LoginResponse } from "../types";
import storage from "../utils/storage";
import { logout, setCredentials } from "./slices/authSlice";

const mutex = new Mutex();
let isRefreshing = false;
const REFRESH_TOKEN_EXPIRY_BUFFER = 60 * 1000; // 1분

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_ENDPOINT_URL,
  // prepareHeaders: HTTP-only 쿠키 사용으로 불필요
  credentials: "include", // 백엔드 통신 시 항상 쿠키 포함
});

export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!isRefreshing) {
      if (!mutex.isLocked()) {
        const release = await mutex.acquire();
        isRefreshing = true;

        try {
          const rememberMe = storage.getRememberMe();
          const lastRefreshTime = storage.getLastRefreshTime();

          if (rememberMe && (!lastRefreshTime || Date.now() - lastRefreshTime > REFRESH_TOKEN_EXPIRY_BUFFER)) {
            const refreshResult = await baseQuery(
              {
                url: "/auth/refresh",
                method: "POST",
                credentials: "include",
              },
              api,
              extraOptions,
            );

            if (refreshResult.data) {
              storage.setLastRefreshTime(Date.now());

              const refreshData = refreshResult.data as LoginResponse;

              api.dispatch(
                setCredentials({
                  data: refreshData,
                  rememberMe: true,
                  isInitialized: true,
                }),
              );

              // Retry the original request
              result = await baseQuery(args, api, extraOptions);
            } else {
              api.dispatch(logout());
            }
          } else {
            api.dispatch(logout());
          }
        } finally {
          isRefreshing = false;
          release();
        }
      } else {
        await mutex.waitForUnlock();
        result = await baseQuery(args, api, extraOptions);
      }
    } else {
      // If already refreshing, wait for it to complete and retry
      await new Promise((resolve) => setTimeout(resolve, 100));
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};
