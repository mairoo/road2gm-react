import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { RootState } from "./index";
import { clearAccessToken, setAccessToken } from "./slices/authSlice";
import { Mutex } from "async-mutex";
import { LoginResponse } from "../types";

const BASE_URL = "http://localhost:8080";

// 토큰 갱신 중복 방지를 위한 mutex
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  credentials: "include", // HTTP-only 쿠키를 위해 필요
});

const baseQueryWithReauth = async (
  args: string | FetchArgs,
  api: any,
  extraOptions: any,
) => {
  // mutex를 사용하여 동시에 여러 요청이 토큰 갱신을 시도하는 것을 방지
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    // 이미 다른 요청이 토큰을 갱신 중인지 확인
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();

      try {
        // refresh token으로 새로운 access token 요청
        const response = await baseQuery(
          { url: "/auth/refresh", method: "POST" },
          api,
          extraOptions,
        );

        if (response.data) {
          const { accessToken } = response.data as LoginResponse;

          // 새로운 access token을 store에 저장
          api.dispatch(setAccessToken(accessToken));
          // 원래 요청 재시도
          result = await baseQuery(args, api, extraOptions);
        } else {
          // refresh token도 만료된 경우
          api.dispatch(clearAccessToken());
        }
      } finally {
        release();
      }
    } else {
      // 다른 요청이 토큰을 갱신하는 동안 대기
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
