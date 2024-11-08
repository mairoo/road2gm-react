import React from "react";
import { MdLogout } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useSignOutMutation } from "../../store/apis/authApi";
import { useAppDispatch } from "../../store/hooks";
import { logout } from "../../store/slices/authSlice";
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
    <ContentLayout position="top" align="center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg border border-gray-200">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <MdLogout className="w-5 h-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">로그아웃</h2>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className="text-gray-600">정말 로그아웃 하시겠습니까?</p>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={handleCancel}
            className="w-24 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            취소
          </button>
          <button
            onClick={handleLogout}
            className="w-24 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            로그아웃
          </button>
        </div>
      </div>
    </ContentLayout>
  );
};

export default LogoutPage;
