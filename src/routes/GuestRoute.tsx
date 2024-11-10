import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";
import ContentLayout from "../widgets/ContentLayout";

interface GuestRouteProps {
  children: React.ReactNode;
}

const GuestRoute = ({ children }: GuestRouteProps) => {
  const location = useLocation();

  // from이 로그아웃 페이지인 경우 홈으로 리다이렉트
  const from =
    location.state?.from?.pathname === "/auth/logout"
      ? "/"
      : location.state?.from?.pathname || "/";

  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  // 로그인 초기화 중일 때는 로딩 상태 표시
  if (!isInitialized) {
    return (
      <ContentLayout position="center" align="center" width="full">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </ContentLayout>
    );
  }

  // 로그인 초기화가 완료되고 인증된 사용자는 이전 페이지 또는 홈으로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // 인증되지 않은 사용자는 children 렌더링
  return <>{children}</>;
};

export default GuestRoute;
