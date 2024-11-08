import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { useSignInMutation } from "../../store/apis/authApi";

const Oauth2RedirectPage = () => {
  // 1. react-router-dom 훅
  const navigate = useNavigate();

  // 2. Redux 훅
  const dispatch = useDispatch();

  // 3. RTK Query 훅
  const [signIn, { isLoading, error }] = useSignInMutation();

  // 4. useState 훅
  // 5. useRef 훅
  // 6. useMemo 훅
  // 7. useEffect 훅
  useEffect(() => {
    try {
      // 이미 로그인 되어 있으니까 사용자 정보 가지고 와서 그대로 리듀서에 저장만 해주고 리다이렉트 하자.
      console.log("logged in");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  }, []);

  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅
  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)

  // 12. 메인 컴포넌트 렌더링 반환
  return <div>로그인 처리 중...</div>;
};

export default Oauth2RedirectPage;
