import { createSlice } from "@reduxjs/toolkit";

interface UiSlice {
  width?: number;
  height?: number;
  isMobile?: boolean;
}

const initialState: UiSlice = {};

const breakpoint = 640;

// createSlice 장점
// 코드 간소화: 액션 타입, 액션 생성자, 리듀서를 별도로 정의할 필요가 없다.
// 불변성 자동 처리: Immer 라이브러리로 상태를 직접 변경하는 것처럼 보이는 작성해도 실제로는 불변성을 유지한다.
// 타입 안전성: 타입스크립트와 함께 사용할 때 타입 추론이 잘 동작한다.
// 가독성 향상: 관련된 로직을 한 곳에 모아서 유지보수 관리할 수 있다.

// 비동기 작업이나 사이드 이펙트는 여기서 직접 처리할 수 없다
// 비동기 작업은 `createAsyncThunk` 또는 미들웨어를 사용해야 한다.

export const uiSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setViewportSize: (state, action) => {
      return {
        ...state,
        width: action.payload.width,
        height: action.payload.height,
        isMobile: action.payload.width < breakpoint,
      };
    },
  },
});

export const { setViewportSize } = uiSlice.actions;

export default uiSlice.reducer;
