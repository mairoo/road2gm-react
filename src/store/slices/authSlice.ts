import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Auth } from "../../types";
import storage from "../../utils/storage";

const initialState: Auth.State.AuthSlice = {
  accessToken: null,
  isAuthenticated: false,
  rememberMe: storage.getRememberMe(),
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // 해당 슬라이스 내부에서 정의된 액션들을 처리
    // 자동으로 액션 생성자(action creators)를 생성
    // 일반적인 동기 액션을 처리할 때 사용
    setCredentials: (state, action: PayloadAction<Auth.State.SetCredentialsPayload>) => {
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
      state.rememberMe = false;
      state.isInitialized = true;

      storage.clearRememberMe();
      storage.clearLastRefreshTime();
    },
    setInitialized: (state) => {
      state.isInitialized = true; // 인증 상태와 상관 없이 무조건 초기화 완료 처리 표현
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

export const { setCredentials, logout, setInitialized } = authSlice.actions;

export default authSlice.reducer;
