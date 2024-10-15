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
      <Header>
        <nav>navbar</nav>
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
      <Footer className="bg-teal-50 text-sm text-cyan-900 space-y-2">
        <ContainerFixed className="space-y-1">
          <div>
            광고 &middot; 제휴 &middot; 문의 권리침해신고센터 이용약관
            개인정보처리방침 청소년보호정책
          </div>
          <div className="font-bold">로드투지엠</div>
          <div>
            대표: OOO 사업자번호 : 123-45-12345 통신판매번호:
            제0000-서울서초-0000 주소: 서울 서초구 방배로 OO길 OO-O 1234호
            연락처: help@road2gm.co.kr (1234-5678)
          </div>
        </ContainerFixed>

        <div className="text-center">
          {window.location.hostname} &copy; {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </Footer>
    </div>
  );
};

export default RootLayout;
