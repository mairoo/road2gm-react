import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthSlice, SetCredentialsPayload } from "../../types";
import storage from "../../utils/storage";

const initialState: AuthSlice = {
  accessToken: null,
  isAuthenticated: false,
  rememberMe: storage.getRememberMe(),
  // 초기 인증 체크가 완료 여부
  // [앱 시작/새로고침] : Redux 스토어 자체가 리셋됨
  // isInitialized: false
  //        ↓
  // [인증 체크/토큰 리프레시 시도]
  //        ↓
  // [결과와 관계없이 체크 완료]: 로그아웃이나 토큰 만료시에도 true 유지 (인증 체크는 완료된 상태)
  // isInitialized: true
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // 해당 슬라이스 내부에서 정의된 액션들을 처리
    // 자동으로 액션 생성자(action creators)를 생성
    // 일반적인 동기 액션을 처리할 때 사용
    setCredentials: (state, action: PayloadAction<SetCredentialsPayload>) => {
      const { data: data, rememberMe = false } = action.payload;

      if (!data?.accessToken) {
        // accessToken 유효성 검증
        throw new Error("Invalid access token");
      }

      state.accessToken = data.accessToken;
      state.isAuthenticated = true;
      state.rememberMe = rememberMe;
      state.isInitialized = true;

      storage.setRememberMe(rememberMe);
    },
    logout: (state) => {
      state.accessToken = null;
      state.isAuthenticated = false;
      state.isInitialized = true;

      // rememberMe 상태는 유지
      // storage rememberMe도 유지
    },
    clearAuth: (state) => {
      // 완전한 로그아웃을 위한 별도의 액션 추가 (예: "모든 기기에서 로그아웃" 기능)
      state.accessToken = null;
      state.isAuthenticated = false;
      state.rememberMe = false;
      state.isInitialized = true;

      storage.clearRememberMe();
      storage.clearLastRefreshTime();
    },
  },
  extraReducers: (_) => {
    // extraReducer의 addMatcher는 해당 조건이 충족되면 자동으로 상태를 변경
    // extraReducers는 "이 리듀서는 외부 액션을 처리한다"는 의도를 명확히 표현
    // 외부 액션이나 다른 슬라이스의 액션을 처리
    // RTK Query나 createAsyncThunk의 액션 처리
    // 자동으로 액션 생성자를 생성하지 않음
    // 수동으로 dispatch를 호출할 필요가 없음 - API 호출 성공/실패에 따라 자동으로 상태 관리
  },
});

export const { setCredentials, logout, clearAuth } = authSlice.actions;

export default authSlice.reducer;
