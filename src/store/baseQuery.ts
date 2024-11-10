import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import { ApiResponse, Auth } from "../types";
import storage from "../utils/storage";
import { RootState } from "./index";
import { logout, setCredentials } from "./slices/authSlice"; // ===== 인터페이스, 타입 정의 =====

// ===== 인터페이스, 타입 정의 =====
interface RefreshTokenResult {
  success: boolean;
  data?: ApiResponse<Auth.LoginResponse>;
  error?: FetchBaseQueryError;
}

// ===== 상수 설정 =====
// 토큰 갱신 재시도 간격 (밀리초)
const RETRY_DELAY = 100;
// 리프레시 토큰 만료 버퍼 시간 (1분)
// 마지막 리프레시 시도 후 1분이 지나야 다시 시도할 수 있음
const REFRESH_TOKEN_EXPIRY_BUFFER = 60 * 1000;

// ===== 동시성 제어를 위한 설정 =====
// Mutex: 여러 요청이 동시에 토큰을 갱신하는 것을 방지하는 잠금장치
// 한 번에 하나의 토큰 갱신만 실행되도록 보장
const mutex = new Mutex();
// 현재 토큰 갱신 작업이 진행 중인지 추적
let isRefreshing = false;

// ===== API 기본 설정 =====
// fetchBaseQuery: RTK Query의 기본 API 호출 도구
const baseQuery = fetchBaseQuery({
  // API 서버의 기본 주소 설정
  baseUrl: process.env.API_ENDPOINT_URL,

  // 요청 헤더 준비 함수
  // 모든 API 요청 전에 실행되어 인증 토큰을 헤더에 추가
  prepareHeaders: (headers, { getState }) => {
    const accessToken = (getState() as RootState).auth.accessToken;

    // 액세스 토큰이 있으면 Authorization 헤더에 추가
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },

  // credentials: "include" 설정으로 쿠키 포함
  // 백엔드와 통신할 때 자동으로 쿠키를 포함시킴 (리프레시 토큰 등)
  credentials: "include",
});

// ===== 토큰 갱신 핵심 로직 =====
const handleTokenRefresh = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: {},
  release: () => void,
): Promise<RefreshTokenResult> => {
  try {
    // 1. 토큰 갱신 가능 여부 확인
    const rememberMe = storage.getRememberMe();
    const lastRefreshTime = storage.getLastRefreshTime();

    // 자동 로그인이 활성화되어 있고,
    // 마지막 갱신으로부터 일정 시간이 지났는지 확인
    const canRefresh =
      rememberMe &&
      (!lastRefreshTime ||
        Date.now() - lastRefreshTime > REFRESH_TOKEN_EXPIRY_BUFFER);

    // 갱신이 불가능하면 로그아웃 처리
    if (!canRefresh) {
      api.dispatch(logout());
      return { success: false };
    }

    // 2. 리프레시 토큰으로 새 액세스 토큰 요청
    const refreshResult = await baseQuery(
      {
        url: "/auth/refresh",
        method: "POST",
        credentials: "include",
      },
      api,
      extraOptions,
    );

    // 갱신 실패 시 로그아웃
    if (!refreshResult.data) {
      api.dispatch(logout());
      return { success: false, error: refreshResult.error };
    }

    // 3. 새로운 토큰으로 로그인 상태 업데이트
    const refreshData = refreshResult.data as ApiResponse<Auth.LoginResponse>;
    api.dispatch(
      setCredentials({
        data: refreshData.data,
        rememberMe: true,
      }),
    );

    // 4. 원래 실패했던 API 요청을 새 토큰으로 재시도
    const retryResult = await baseQuery(args, api, extraOptions);
    return {
      success: true,
      data: retryResult.data as ApiResponse<Auth.LoginResponse>,
    };
  } catch (error) {
    console.error("Refresh error:", error);
    return { success: false, error: error as FetchBaseQueryError };
  } finally {
    // 작업 완료 후 상태 정리
    isRefreshing = false;
    release(); // mutex 잠금 해제
  }
};

// ===== API 요청 처리 메인 함수 =====
// RTK Query의 모든 API 요청이 이 함수를 통해 처리됨
export const baseQueryWithRetry: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 다른 요청이 토큰을 갱신 중이면 완료될 때까지 대기
  await mutex.waitForUnlock();

  // 1. 일반 API 요청 실행
  let result = await baseQuery(args, api, extraOptions);

  // 2. 401 에러(인증 실패)가 아니면 결과 즉시 반환
  if (!result.error || result.error.status !== 401) {
    return result;
  }

  // 3. 다른 요청이 이미 토큰 갱신 중이면 잠시 대기 후 재시도
  if (isRefreshing) {
    await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY));
    return baseQuery(args, api, extraOptions);
  }

  // 4. 토큰 갱신 시도 (다른 갱신 작업이 없을 때만)
  if (!mutex.isLocked()) {
    isRefreshing = true;
    const release = await mutex.acquire(); // mutex 잠금
    const refreshResult = await handleTokenRefresh(
      args,
      api,
      extraOptions,
      release,
    );

    // 갱신 성공 시 새로운 결과 반환
    if (refreshResult.success && refreshResult.data) {
      return { data: refreshResult.data };
    }
  }

  // 5. 토큰 갱신 실패 시 원래의 에러 결과 반환
  return result;
};
