import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import { RootState } from "../store";

interface PublicRouteProps {
  children: React.ReactNode;
  restricted?: boolean;
}

const GuestRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const from = location.state?.from?.pathname || "/";

  // 인증된 사용자는 이전 페이지 또는 홈으로 리다이렉트
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  // 그 외의 경우 children 렌더링
  return <>{children}</>;
};

export default GuestRoute;
