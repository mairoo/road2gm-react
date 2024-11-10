import React, { useState } from "react";
import { MdLock, MdMail } from "react-icons/md";

import { useSignInMutation } from "../../store/apis/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import Button from "../../widgets/Button";
import ContentLayout from "../../widgets/ContentLayout";
import InputGroup from "../../widgets/InputGroup";

const LoginPage = () => {
  // 1. react-router-dom 훅
  // 2. Redux 훅
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  // 3. RTK Query 훅
  const [signIn] = useSignInMutation();

  // 4. useState 훅
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  // 5. useRef 훅
  // 6. useMemo 훅
  // 7. useEffect 훅
  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await signIn({
        email,
        password,
        rememberMe,
      }).unwrap();
      dispatch(setCredentials({ ...response, rememberMe }));
      console.log("logged in");
    } catch (err) {
      console.error("Failed to login:", err);
    } finally {
      console.log("isAuthenticated", isAuthenticated);
    }
  };

  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)

  // 12. 메인 컴포넌트 렌더링 반환
  return (
    <ContentLayout position="top" align="center" width="1/2">
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            로그인
          </h2>
        </div>

        <div className="space-y-4">
          <InputGroup icon={MdMail} type="email" placeholder="이메일" />
          <InputGroup icon={MdLock} type="password" placeholder="비밀번호" />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input type="checkbox" className="rounded border-gray-300" />
              <span className="ml-2 text-sm text-gray-600">로그인 유지</span>
            </label>
            <button className="text-sm text-blue-600 hover:underline">
              비밀번호 찾기
            </button>
          </div>

          <Button
            preset="primary"
            fullWidth={true}
            size="large"
            rounded="medium"
          >
            로그인
          </Button>

          <Button
            preset="secondary"
            fullWidth={true}
            size="large"
            rounded="medium"
            className="flex items-center justify-center gap-2"
          >
            <MdMail className="h-5 w-5" />
            Google로 계속하기
          </Button>

          <div className="text-center text-sm text-gray-600">
            계정이 없으신가요?{" "}
            <button className="text-blue-600 hover:underline">회원가입</button>
          </div>
        </div>
      </div>
    </ContentLayout>
  );
};

export default LoginPage;
