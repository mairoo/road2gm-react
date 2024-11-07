import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSignInMutation } from "../../store/apis/authApi";
import { useNavigate } from "react-router-dom";

const Oauth2RedirectPage = () => {
  const [signIn, { isLoading, error }] = useSignInMutation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    try {
      // 이미 로그인 되어 있으니까 사용자 정보 가지고 와서 그대로 리듀서에 저장만 해주고 리다이렉트 하자.
      console.log("logged in");

      navigate("/");
    } catch (err) {
      console.error("Failed to login:", err);
    }
  }, []);

  return <div>로그인 처리 중...</div>;
};

export default Oauth2RedirectPage;
