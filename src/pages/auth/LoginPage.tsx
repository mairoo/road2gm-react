import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { MdLock, MdMail } from "react-icons/md";
import { SiFacebook, SiGoogle, SiKakaotalk, SiNaver } from "react-icons/si";
import * as yup from "yup";

import { useSignInMutation } from "../../store/apis/authApi";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import Button from "../../widgets/Button";
import ContentLayout from "../../widgets/ContentLayout";
import FormField from "../../widgets/FormField";
import InputGroup from "../../widgets/InputGroup"; // 폼 데이터 타입 정의

// 폼 데이터 타입 정의
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

// Yup 스키마 정의
const schema = yup.object().shape({
  email: yup
    .string()
    .required("이메일을 입력해주세요.")
    .email("올바른 이메일 형식이 아닙니다."),
  password: yup
    .string()
    .required("비밀번호를 입력해주세요.")
    .min(8, "비밀번호는 8자 이상이어야 합니다.")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()_\-+])[A-Za-z\d@$!%*?&#^()_\-+]+$/,
      "비밀번호는 소문자, 대문자, 숫자, 특수문자(@$!%*?&#^()_-+)를 모두 포함해야 합니다.",
    ),
  rememberMe: yup.boolean().required().default(true),
});

const LoginPage = () => {
  // 1. react-router-dom 훅
  // 2. Redux 훅
  const dispatch = useAppDispatch();

  // 3. RTK Query 훅
  const [signIn] = useSignInMutation();

  // 4. useState 훅

  // 5. useRef 훅
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: true,
    },
    mode: "onBlur",
    reValidateMode: "onSubmit" // 초기 검증 후 재검증은 제출 시에만 수행, 불필요한 검증 횟수 감소, 성능 최적화
  });

  // 6. useMemo 훅
  // 7. useEffect 훅
  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅
  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await signIn({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      }).unwrap();
      dispatch(setCredentials({ ...response, rememberMe: data.rememberMe }));
    } catch (err) {
      console.error("Failed to login:", err);
    }
  };

  const socialLogins = [
    { icon: SiNaver, bg: "#03C75A", label: "네이버 로그인" },
    {
      icon: SiKakaotalk,
      bg: "#FEE500",
      label: "카카오 로그인",
      textColor: "#191919",
    },
    { icon: SiGoogle, bg: "#4285F4", label: "구글 로그인" },
    { icon: SiFacebook, bg: "#4267B2", label: "페이스북 로그인" },
  ];

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

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField error={errors.email}>
              <InputGroup
                type="email"
                icon={MdMail}
                placeholder="이메일"
                {...register("email")}
              />
            </FormField>
            <FormField error={errors.password}>
              <InputGroup
                type="password"
                icon={MdLock}
                placeholder="비밀번호"
                {...register("password")}
              />
            </FormField>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  {...register("rememberMe")}
                  className="rounded border-gray-300"
                />
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

            <div className="grid grid-cols-4 gap-4">
              {socialLogins.map(({ icon: Icon, bg, label, textColor }) => (
                <button
                  key={label}
                  type="button"
                  className="flex items-center justify-center p-4 rounded-lg transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  style={{ backgroundColor: bg }}
                  aria-label={label}
                >
                  <Icon
                    className="h-6 w-6"
                    style={{ color: textColor || "#ffffff" }}
                  />
                </button>
              ))}
            </div>

            <div className="text-center text-sm text-gray-600">
              계정이 없으신가요?{" "}
              <button className="text-blue-600 hover:underline">
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </ContentLayout>
  );
};

export default LoginPage;
