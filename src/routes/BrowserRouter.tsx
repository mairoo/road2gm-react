import React, { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";
import BookLayout from "../layouts/BookLayout";
import HomeLayout from "../layouts/HomeLayout";
import RootLayout from "../layouts/RootLayout";
import ErrorPage from "../pages/ErrorPage";
import Loading from "../widgets/Loading"; // 로딩 컴포넌트 필요
import GuestRoute from "./GuestRoute";
import PrivateRoute from "./PrivateRoute"; // 페이지 컴포넌트들을 lazy 로딩

// 페이지 컴포넌트들을 lazy 로딩
const HomePage = lazy(
  () => import(/* webpackChunkName: "home" */ "../pages/HomePage"),
);

const DevPage = lazy(
  () => import(/* webpackChunkName: "home" */ "../pages/DevPage"),
);

// Auth 관련 페이지들을 하나의 청크로 그룹화
const LoginPage = lazy(
  () => import(/* webpackChunkName: "auth" */ "../pages/auth/LoginPage"),
);
const LogoutPage = lazy(
  () => import(/* webpackChunkName: "auth" */ "../pages/auth/LogoutPage"),
);
const SignUpPage = lazy(
  () => import(/* webpackChunkName: "auth" */ "../pages/auth/SignUpPage"),
);
const Oauth2RedirectPage = lazy(
  () =>
    import(/* webpackChunkName: "auth" */ "../pages/auth/Oauth2RedirectPage"),
);

// Book 관련 페이지들을 하나의 청크로 그룹화
const BookPage = lazy(
  () => import(/* webpackChunkName: "book" */ "../pages/book"),
);
const BookDetailPage = lazy(
  () => import(/* webpackChunkName: "book" */ "../pages/book/[id]"),
);
const BookPageDetailPage = lazy(
  () => import(/* webpackChunkName: "book" */ "../pages/book/page/[id]"),
);

// 라우트 컴포넌트를 Suspense로 감싸는 헬퍼 함수
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loading />}>
    <Component />
  </Suspense>
);

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomeLayout />,
        children: [
          {
            index: true,
            element: withSuspense(HomePage),
          },
          {
            path: "dev",
            element: withSuspense(DevPage),
          },
        ],
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <GuestRoute>{withSuspense(LoginPage)}</GuestRoute>,
          },
          {
            path: "sign-up",
            element: <GuestRoute>{withSuspense(SignUpPage)}</GuestRoute>,
          },
          {
            path: "oauth2-redirect",
            element: (
              <GuestRoute>{withSuspense(Oauth2RedirectPage)}</GuestRoute>
            ),
          },
          {
            path: "logout",
            element: <PrivateRoute>{withSuspense(LogoutPage)}</PrivateRoute>,
          },
        ],
      },
      {
        path: "/book",
        element: <BookLayout />,
        children: [
          {
            index: true,
            element: withSuspense(BookPage),
          },
          {
            path: ":bookId",
            children: [
              {
                index: true,
                element: withSuspense(BookDetailPage),
              },
              {
                path: "page",
                children: [
                  {
                    path: ":pageId",
                    element: withSuspense(BookPageDetailPage),
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
