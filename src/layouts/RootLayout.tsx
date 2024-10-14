import React from "react";
import Header from "../widgets/Header";
import Main from "../widgets/Main";
import Footer from "../widgets/Footer";

const RootLayout = () => {
  // 헤더, 본문, 푸터 3단 레이아웃
  // flex flex-col: 세로 방향 flex 컨테이너
  // min-h-screen: 최소 높이를 화면 전체 높이로 지정

  return (
    <div className="flex flex-col min-h-screen">
      {/* 헤더: 화면 상단 위치 */}
      <Header />
      {/* 본문: 내용이 많아지면 전체 화면으로 스크롤 생성 */}
      <Main />
      {/* 푸터: 내용이 적을 때는 화면 하단 고정, 내용이 많아 스크롤이 생기면 스크롤의 맨 아래에 위치*/}
      <Footer />
    </div>
  );
};

export default RootLayout;
