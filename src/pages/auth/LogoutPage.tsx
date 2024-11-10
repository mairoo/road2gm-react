import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../../store/apis/authApi";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
import Button from "../../widgets/Button";
import ContentLayout from "../../widgets/ContentLayout";

const LogoutPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useAppDispatch();

  const [signOut] = useSignOutMutation();

  const handleLogout = async () => {
    await signOut();
    dispatch(logout());
    navigate("/");
  };

  const handleCancel = () => {
    navigate(from);
  };

  return (
    <ContentLayout position="top" align="center" width="1/2">
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-center text-gray-900">
            로그아웃
          </h2>
        </div>

        <div className="mb-6">
          <p className="text-center text-gray-600">
            정말 로그아웃 하시겠습니까?
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleCancel}
            preset="secondary"
            size="large"
            rounded="medium"
            className="flex-1"
          >
            취소
          </Button>
          <Button
            onClick={handleLogout}
            preset="danger"
            size="large"
            rounded="medium"
            className="flex-1"
          >
            로그아웃
          </Button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default LogoutPage;
