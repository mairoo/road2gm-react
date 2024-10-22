import { createBrowserRouter } from "react-router-dom";
import React from "react";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";
import ErrorPage from "../pages/ErrorPage";
import BookPage from "../pages/book";
import BookDetailPage from "../pages/book/[id]";
import BookPagesPage from "../pages/book/page";
import BookPageDetailPage from "../pages/book/page/[id]";
import BookLayout from "../layouts/BookLayout";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement 속성은 React Router v6.4에서 도입
    // 해당 라우트나 그 하위 라우트에서 발생하는 오류를 잡아낸다.
    // loader, action 함수에서 throw된 오류도 처리 가능하다. (하지만 RTK-Query 사용)
    errorElement: <ErrorPage />,
    children: [
      // children 배열로 두면 코드 분할(Code Splitting)과 지연 로딩(Lazy Loading)을 구현하기 쉽다.
      // 프로그래밍 방식으로 라우트를 조작하기 더 쉽다.
      // 복잡한 중첩 라우트 구조에서는 가독성이 떨어진다.
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/book",
        element: <BookLayout />,
        children: [
          {
            index: true,
            element: <BookPage />,
          },
          {
            path: ":bookId",
            element: <BookDetailPage />,
            children: [
              {
                path: "pages",
                children: [
                  {
                    index: true,
                    element: <BookPagesPage />,
                  },
                  {
                    path: ":pageId",
                    element: <BookPageDetailPage />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

export default BrowserRouter;
