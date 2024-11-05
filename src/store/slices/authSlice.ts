import { AuthSlice } from "../../types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { authApi } from "../apis/authApi";

const initialState: AuthSlice = { accessToken: null };

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    // 해당 슬라이스 내부에서 정의된 액션들을 처리
    // 자동으로 액션 생성자(action creators)를 생성
    // 일반적인 동기 액션을 처리할 때 사용
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    // extraReducers는 "이 리듀서는 외부 액션을 처리한다"는 의도를 명확히 표현
    // 외부 액션이나 다른 슬라이스의 액션을 처리
    // RTK Query나 createAsyncThunk의 액션 처리
    // 자동으로 액션 생성자를 생성하지 않음
    builder
      .addMatcher(authApi.endpoints.signIn.matchFulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addMatcher(authApi.endpoints.refresh.matchFulfilled, (state, action) => {
        state.accessToken = action.payload.accessToken;
      })
      .addMatcher(authApi.endpoints.signOut.matchFulfilled, (state) => {
        state.accessToken = null;
      });
  },
});

export const { setAccessToken, clearAccessToken } = authSlice.actions;

export default authSlice.reducer;
