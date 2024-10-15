import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/uiSlice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer },
  devTools: process.env.NODE_ENV !== "production",
});

// 스토어 자체에서 `RootState`, `AppDispatch` 타입을 추론한다.
export type RootState = ReturnType<typeof store.getState>;

// 추론된 타입: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
