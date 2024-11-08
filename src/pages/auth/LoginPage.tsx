import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";

import { useSignInMutation } from "../../store/apis/authApi";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";

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
    <div className="mt-0 md:mt-[15%]">
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-md">
          <div className="p-6">
            <div className="space-y-1 mb-6">
              <h2 className="text-lg font-bold text-center text-gray-900">
                Road2GM
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    placeholder="이메일"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <MdEmail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <input
                    type="password"
                    placeholder="비밀번호"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-10 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <MdLock
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={20}
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 text-sm text-gray-600"
                >
                  로그인 상태 유지
                </label>
              </div>

              <div className="flex flex-col space-y-2">
                <button
                  type="submit"
                  className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                >
                  로그인
                </button>
                <button
                  type="button"
                  className="w-full py-2 px-4 bg-white hover:bg-gray-50 text-gray-900 font-medium rounded-md border border-gray-300 transition-colors"
                >
                  회원가입
                </button>
              </div>

              <div className="text-center text-sm">
                <a href="#" className="text-blue-600 hover:underline">
                  비밀번호를 잊으셨나요?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
