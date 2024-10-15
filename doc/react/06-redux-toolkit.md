# 리덕스 및 리덕스 툴킷

```bash
npm install redux react-redux @reduxjs/toolkit
```

`@types/react-redux` 패키지는 따로 설치 안 해도 된다.

# 설정
## 스토어 설정
`store/index.ts`

```
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {},
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
```

리덕스 스토어를 생성한다.

## 앱 최상단에 스토어 정보 연결
`index.ts`

```tsx
root.render(
    <React.StrictMode>
            <Provider store={store}>
                <RouterProvider router={browserRouter} />
            </Provider>
    </React.StrictMode>,
);

```

## `slices/counterSlice.ts` 파일 생성

```
import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

export default counterSlice.reducer;
```

## `store/index.ts` 파일을 수정해서 counterSlice 리듀서 연결
```
import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlice"; // (1) 추가

const store = configureStore({
  reducer: { counter: counterReducer }, // (2) 추가
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;

```

## 버튼 tsx 파일 결과 확인
```
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
```