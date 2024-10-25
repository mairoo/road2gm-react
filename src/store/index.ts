import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./slices/uiSlice";
import { bookSlice } from "./slices/bookSlice";
import { bookApi } from "./apis/bookApi";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    book: bookSlice.reducer,
    [bookApi.reducerPath]: bookApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bookApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

// 스토어 자체에서 `RootState`, `AppDispatch` 타입을 추론한다.
export type RootState = ReturnType<typeof store.getState>;

// 추론된 타입: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
