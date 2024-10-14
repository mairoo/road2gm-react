import React from "react";
import Header from "../widgets/Header";
import Main from "../widgets/Main";
import Footer from "../widgets/Footer";
import ContainerFixed from "../widgets/ContainerFixed";
import Button from "../widgets/Button";

import { MdCamera } from "react-icons/md";

const RootLayout = () => {
  // 헤더, 본문, 푸터 3단 레이아웃
  // flex flex-col: 세로 방향 flex 컨테이너
  // min-h-screen: 최소 높이를 화면 전체 높이로 지정
  // 헤더: 페이지 상단 위치
  // 본문: 내용이 많아지면 전체 화면으로 스크롤 생성 (중요! flex-grow: 남은 공간을 모두 차지)
  // 푸터: 내용이 적을 때는 화면 하단 고정, 내용이 많아 스크롤이 생기면 스크롤의 맨 아래에 위치
  return (
    <div className="flex flex-col min-h-screen">
      <Header className="bg-[#ebf2ea] shadow-sm shadow-green-600/20 z-10">
        <nav className="bg-gray-800">
          <ContainerFixed className="flex justify-between items-center">
            <div className="text-white font-bold text-xl">Road2GM</div>
            <div className="space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                마이페이지
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                로그인
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                회원가입
              </a>
            </div>
          </ContainerFixed>
        </nav>
      </Header>

      <Main>
        <ContainerFixed>
          <h2 className="text-xl font-semibold">Welcome to Road2GM</h2>
          <Button size="medium" preset="primary" rounded="medium" inline={true}>
            <MdCamera size={20} />
            <span>찰칵</span>
          </Button>
          <p>
            This is the main content area. It will scroll if there's too much
            content.
          </p>
          {/* 스크롤 테스트를 위한 더미 컨텐츠 */}
          {[...Array(10)].map((_, i) => (
            <p key={i} className="my-2">
              This is paragraph {i + 1}
            </p>
          ))}
        </ContainerFixed>
      </Main>
      <Footer>
        <div className="bg-[#ebf2ea] text-green-950 text-sm">
          <ContainerFixed className="md:py-1 md:px-0 p-1 space-y-2">
            <div className="flex flex-wrap gap-y-0.5 gap-x-4 md:gap-y-0 md:gap-x-8">
              <span>이용약관</span>
              <span>개인정보처리방침</span>
              <span>도움말</span>
              <span>제안 &middot; 제휴 &middot; 광고</span>
            </div>

            <div className="flex flex-col md:flex-row gap-y-0.5 md:gap-y-0 md:gap-x-8">
              <span className="font-bold">로드투지엠</span>
              <span>대표: OOO</span>
              <span>주소: 서울 서초구 서초대로 OO길 OO OO빌딩 000호</span>
              <span>사업자등록번호: 123-xx-1234</span>
              <span>통신판매업신고: 20xx-서울서초-0000</span>
            </div>
          </ContainerFixed>
        </div>
        <div className="bg-green-950 text-white text-center text-sm p-1">
          {window.location.hostname} &copy; {new Date().getFullYear()} . All
          rights reserved.
        </div>
      </Footer>
    </div>
  );
};

export default RootLayout;
