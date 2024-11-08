import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSignInOAuth2Mutation } from "../../store/apis/authApi";
import { setCredentials } from "../../store/slices/authSlice";
import storage from "../../utils/storage";

const Oauth2RedirectPage = () => {
  // 1. react-router-dom 훅
  const navigate = useNavigate();

  // 2. Redux 훅
  const dispatch = useDispatch();

  // 3. RTK Query 훅
  const [signInOAuth2, { isLoading, isError, error }] =
    useSignInOAuth2Mutation();

  // 4. useState 훅
  // 5. useRef 훅
  // 6. useMemo 훅

  // 7. useEffect 훅
  useEffect(() => {
    const handleOAuth2Redirect = async () => {
      try {
        const response = await signInOAuth2().unwrap();
        dispatch(setCredentials({ ...response, rememberMe: true }));
        storage.setRememberMe(true);

        // 로그인 성공 후 리다이렉트
        navigate("/", { replace: true });
      } catch (error) {
        console.error("OAuth2 로그인 처리 중 오류 발생:", error);

        navigate("/auth/login", {
          replace: true,
          state: {
            error:
              "소셜 로그인 처리 중 오류가 발생했습니다. 다시 시도해 주세요.",
          },
        });
      }
    };

    (async () => {
      await handleOAuth2Redirect();
    })().catch(console.error);
  }, [dispatch, navigate, signInOAuth2]);

  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅
  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)

  // 12. 메인 컴포넌트 렌더링 반환

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">로그인 처리 중...</span>
          </div>
          <p className="mt-3">소셜 로그인을 처리하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-red-600">
          <p>로그인 처리 중 오류가 발생했습니다.</p>
          <p className="text-sm">
            {(error as any)?.data?.message || "알 수 없는 오류가 발생했습니다."}
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default Oauth2RedirectPage;
