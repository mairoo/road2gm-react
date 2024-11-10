import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";
import ContentLayout from '../widgets/ContentLayout';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated, isInitialized } = useSelector(
    (state: RootState) => state.auth,
  );

  // 초기화 중일 때는 로딩 상태 표시
  if (!isInitialized) {
    return (
      <ContentLayout position="center" align="center" width="full">
        <div className="flex items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </ContentLayout>
    );
  }

  // 초기화가 완료되고 인증되지 않은 경우에만 로그인 페이지로 리다이렉트
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // 인증된 경우 children 렌더링
  return <>{children}</>;
};

export default PrivateRoute;
