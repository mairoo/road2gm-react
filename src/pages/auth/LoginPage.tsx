import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { MdLock, MdMail } from "react-icons/md";
import * as yup from "yup";

import { useSignInMutation } from "../../store/apis/authApi";
import { useAppDispatch } from "../../store/hooks";
import { setCredentials } from "../../store/slices/authSlice";
import Button from "../../widgets/Button";
import ContentLayout from "../../widgets/ContentLayout";
import FormErrorMessage from "../../widgets/FormErrorMessage";
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
      // 비밀번호 제외 특수문자
      //
      // ' " (따옴표): SQL 인젝션 위험
      // \ (백슬래시): 이스케이프 문자로 인한 문제
      // ; (세미콜론): SQL 인젝션 위험
      // < > (꺾쇠 괄호): XSS 공격 위험
      // | (파이프): 명령어 인젝션 위험
      // ` (백틱): 명령어 인젝션 위험
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
            <div>
              <InputGroup
                type="email"
                {...register("email")}
                icon={MdMail}
                placeholder="이메일"
              />
              <FormErrorMessage error={errors.email} />
            </div>
            <div>
              <InputGroup
                type="password"
                {...register("password")}
                icon={MdLock}
                placeholder="비밀번호"
              />{" "}
              <FormErrorMessage error={errors.password} />
            </div>
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
