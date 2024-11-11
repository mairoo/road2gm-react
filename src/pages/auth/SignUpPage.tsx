import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { MdError, MdLock, MdMail, MdPerson } from "react-icons/md";
import * as yup from "yup";

import { useSignUpMutation } from "../../store/apis/authApi";
import { useAppDispatch } from "../../store/hooks";
import Button from "../../widgets/Button";
import ContentLayout from "../../widgets/ContentLayout";
import ErrorModal from "../../widgets/ErrorModal";
import FormField from "../../widgets/FormField";
import InputGroup from "../../widgets/InputGroup";

// 에러 상태 타입 정의
interface ErrorState {
  isOpen: boolean;
  message: string;
}

// 폼 데이터 타입 정의
interface SignUpFormData {
  email: string;
  nickname: string;
  password: string;
  passwordConfirm: string;
}

// Yup 스키마 정의
const schema = yup.object().shape({
  email: yup
    .string()
    .email("유효한 이메일을 입력해주세요")
    .required("이메일은 필수입니다"),
  nickname: yup
    .string()
    .min(2, "닉네임은 2자 이상이어야 합니다")
    .max(10, "닉네임은 10자 이하여야 합니다")
    .required("닉네임은 필수입니다"),
  password: yup
    .string()
    .min(8, "비밀번호는 8자 이상이어야 합니다")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다",
    )
    .required("비밀번호는 필수입니다"),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "비밀번호가 일치하지 않습니다")
    .required("비밀번호 확인은 필수입니다"),
});

const SignUpPage = () => {
  // 1. react-router-dom 훅
  // 2. Redux 훅
  const dispatch = useAppDispatch();

  // 3. RTK Query 훅
  const [signUp] = useSignUpMutation();

  // 4. useState 훅
  const [error, setError] = useState<ErrorState>({
    isOpen: false,
    message: "",
  });

  // 5. useRef 훅
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(schema),
    mode: "onBlur",
    reValidateMode: "onSubmit", // 초기 검증 후 재검증은 제출 시에만 수행, 불필요한 검증 횟수 감소, 성능 최적화
  });

  // 6. useMemo 훅
  // 7. useEffect 훅
  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅

  const onSubmit = (data: SignUpFormData) => {
    console.log("Form data:", data);
    // TODO: dispatch signup action
  };

  const handleCancel = () => {
    // TODO: 취소 처리 로직
  };

  const closeErrorModal = () => {
    setError({ ...error, isOpen: false });
  };

  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)

  // 12. 메인 컴포넌트 렌더링 반환

  return (
    <>
      <ContentLayout position="top" align="center" width="1/2">
        <div className="w-full bg-white rounded-xl shadow-lg p-6">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-center text-gray-900">
              회원가입
            </h2>
          </div>

          <div className="space-y-4">
            <FormField error={errors.email}>
              <InputGroup
                type="email"
                icon={MdMail}
                placeholder="이메일"
                {...register("email")}
              />
            </FormField>
            <FormField error={errors.nickname}>
              <InputGroup
                type="text"
                icon={MdPerson}
                placeholder="닉네임"
                {...register("nickname")}
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
            <FormField error={errors.passwordConfirm}>
              <InputGroup
                type="password"
                icon={MdLock}
                placeholder="비밀번호"
                {...register("passwordConfirm")}
              />
            </FormField>
            <div className="flex gap-2">
              <Button
                preset="secondary"
                size="large"
                rounded="medium"
                className="flex-1"
              >
                취소
              </Button>
              <Button
                preset="primary"
                size="large"
                rounded="medium"
                className="flex-1"
              >
                회원가입
              </Button>
            </div>
          </div>
        </div>
      </ContentLayout>
      <ErrorModal
        isOpen={error.isOpen}
        message={error.message}
        onClose={closeErrorModal}
        title="회원가입 오류"
        icon={MdError}
        iconColor="#DC2626" // red-600
        iconSize={28}
      />
    </>
  );
};

export default SignUpPage;
