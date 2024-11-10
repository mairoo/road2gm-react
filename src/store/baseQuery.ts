import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { ApiResponse, LoginResponse } from "../types";
import storage from "../utils/storage";
import { logout, setCredentials } from "./slices/authSlice"; // 상수 정의

// 상수 정의
const RETRY_DELAY = 100; // ms
const REFRESH_TOKEN_EXPIRY_BUFFER = 60 * 1000; // 1분

// 타입 정의
interface RefreshTokenResult {
  success: boolean;
  data?: ApiResponse<LoginResponse>;
  error?: FetchBaseQueryError;
}

// Mutex 인스턴스 생성
const mutex = new Mutex();
let isRefreshing = false;

// 기본 쿼리 설정
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.API_ENDPOINT_URL,
  // prepareHeaders: HTTP-only 쿠키 사용으로 불필요
  credentials: "include", // 백엔드 통신 시 항상 쿠키 포함
});

// 토큰 갱신 처리 함수
const handleTokenRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
  release: () => void,
): Promise<RefreshTokenResult> => {
  try {
    const rememberMe = storage.getRememberMe();
    const lastRefreshTime = storage.getLastRefreshTime();

    // 1. 리프레시 토큰 전송 가능 여부 확인
    const canRefresh =
      rememberMe &&
      (!lastRefreshTime ||
        Date.now() - lastRefreshTime > REFRESH_TOKEN_EXPIRY_BUFFER);

    if (!canRefresh) {
      api.dispatch(logout());
      return { success: false };
    }

    // 2. 리프레시
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions,
    );

    if (!refreshResult.data) {
      api.dispatch(logout());
      return { success: false, error: refreshResult.error };
    }

    // 3. 리프레시 성공 시 로그인 처리
    const refreshData = refreshResult.data as ApiResponse<LoginResponse>;
    storage.setLastRefreshTime(Date.now());

    api.dispatch(
      setCredentials({
        data: refreshData.data,
        rememberMe: true,
      }),
    );

    // 4. 원래 요청 재시도
    const retryResult = await baseQuery(args, api, extraOptions);
    return {
      success: true,
      data: retryResult.data as ApiResponse<LoginResponse>,
    };
  } catch (error) {
    return { success: false, error: error as FetchBaseQueryError };
  } finally {
    isRefreshing = false;
    release();
  }
};

// 재시도 로직이 포함된 기본 쿼리 함수
export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 다른 리프레시 작업이 진행 중이면 대기
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  // 401 에러가 아니면 즉시 결과 반환
  if (!result.error || result.error.status !== 401) {
    return result;
  }

  // 이미 리프레시 중이면 잠시 대기 후 재시도
  if (isRefreshing) {
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    return baseQuery(args, api, extraOptions);
  }

  // mutex가 잠겨있지 않은 경우에만 토큰 리프레시 시도
  if (!mutex.isLocked()) {
    isRefreshing = true;
    const release = await mutex.acquire();
    const refreshResult = await handleTokenRefresh(
      args,
      api,
      extraOptions,
      release,
    );

    if (refreshResult.success && refreshResult.data) {
      return { data: refreshResult.data };
    }
  }

  // 리프레시 실패 또는 mutex가 잠겨있는 경우 원래 결과 반환
  return result;
};
