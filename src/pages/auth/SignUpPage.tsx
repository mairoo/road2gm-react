import React from "react";
import { MdLock, MdMail, MdPerson } from "react-icons/md";
import Button from "../../widgets/Button";
import ContentLayout from "../../widgets/ContentLayout";
import InputGroup from "../../widgets/InputGroup";

const SignUpPage = () => {
  return (
    <ContentLayout position="top" align="center" width="1/2">
      <div className="w-full bg-white rounded-xl shadow-lg p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            회원가입
          </h2>
        </div>

        <div className="space-y-4">
          <InputGroup icon={MdMail} type="email" placeholder="이메일" />
          <InputGroup icon={MdPerson} type="text" placeholder="닉네임" />
          <InputGroup icon={MdLock} type="password" placeholder="비밀번호" />
          <InputGroup
            icon={MdLock}
            type="password"
            placeholder="비밀번호 확인"
          />

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
  );
};

export default SignUpPage;
