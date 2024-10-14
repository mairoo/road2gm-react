import React from "react";
import Header from "../widgets/Header";
import Main from "../widgets/Main";
import Footer from "../widgets/Footer";
import ContainerFixed from "../widgets/ContainerFixed";

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
        <h1 className="text-2xl font-bold">Road2GM</h1>
      </Header>

      <Main>
        <ContainerFixed>
          <h2 className="text-xl font-semibold mb-4">Welcome to Road2GM</h2>
          <p>
            This is the main content area. It will scroll if there's too much
            content.
          </p>
          {/* 스크롤 테스트를 위한 더미 컨텐츠 */}
          {[...Array(60)].map((_, i) => (
            <p key={i} className="my-2">
              This is paragraph {i + 1}
            </p>
          ))}
        </ContainerFixed>
      </Main>
      <Footer>
        <p>&copy; {new Date().getFullYear()} Road2GM. All rights reserved.</p>
      </Footer>
    </div>
  );
};

export default RootLayout;
