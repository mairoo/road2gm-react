import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

import { Mutex } from "async-mutex";

import { RootState } from "./index";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { logout, setCredentials } from "./slices/authSlice";
import { LoginResponse } from "../types";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // 백엔드 통신 시 항상 쿠키 포함
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        const state = api.getState() as RootState;

        if (state.auth.rememberMe) {
          // rememberMe 옵션 사용 시 토큰 갱신
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
            const refreshData = refreshResult.data as LoginResponse;

            // 스토어에 액세스 토큰 업데이트
            api.dispatch(
              setCredentials({
                data: refreshData,
                rememberMe: true,
              }),
            );

            result = await baseQuery(args, api, extraOptions); // 기존 실패 쿼리 재호출
          } else {
            api.dispatch(logout());
          }
        } else {
          // 토큰 갱신 없이 바로 로그아웃
          api.dispatch(logout());
        }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      const state = api.getState() as RootState;
      if (state.auth.accessToken) {
        result = await baseQuery(args, api, extraOptions);
      }
    }
  }
  return result;
};
