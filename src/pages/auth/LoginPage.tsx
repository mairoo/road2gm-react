import React, { useState } from "react";
import { MdEmail, MdLock } from "react-icons/md";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Login:", email, password);
  };

  return (
    <div className="flex justify-center p-8 md:mt-8 ">
      <div className="w-full max-w-md bg-gray-50 rounded-lg shadow-md">
        <div className="p-6">
          <div className="space-y-1 mb-6">
            <h2 className="text-lg font-bold text-center text-gray-900">
              로드투지엠 로그인
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
  );
};

export default LoginPage;
