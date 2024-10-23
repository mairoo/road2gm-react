import React from "react";
import Footer from "../widgets/Footer";
import ContainerFixed from "../widgets/ContainerFixed";
import className from "classnames";

const Road2GMFooter = ({ hasBottomNavbar = false }: { hasBottomNavbar?: boolean }) => {
  return (
    <Footer className="bg-natural-3 text-sm text-cyan-900">
      <ContainerFixed className="space-y-1 py-2 px-2 md:px-0">
        {/* 가로로 나열하다가 화면 차면 줄이 넘어감 */}
        <div className="flex flex-wrap gap-x-4 gap-y-0.5">
          <span>광고 &middot; 제휴 &middot; 문의</span>
          <span>권리침해신고센터</span>
          <span>이용약관</span>
          <span>개인정보처리방침</span>
          <span>청소년보호정책</span>
        </div>
        <div className="font-bold">로드투지엠</div>
        {/* 태블릿 이상: 가로로 나열, 모바일 세로로 나열 */}
        <div className="flex flex-col gap-y-0.5 md:flex-row md:gap-x-4">
          <span>대표: OOO</span>
          <span>사업자번호 : 123-45-12345</span>
          <span>통신판매번호: 제0000-서울서초-0000</span>
          <span>주소: 서울 서초구 방배로 OO길 OO-O OOOO호</span>
          <span>연락처: help@road2gm.co.kr (1234-5678)</span>
        </div>
      </ContainerFixed>
      <div
        className={className(
          "bg-gray-200 text-gray-900 text-center pt-2 md:pb-2",
          hasBottomNavbar ? "pb-[120px]" : "pb-24",
        )}
      >
        {window.location.hostname} &copy; {new Date().getFullYear()}. All rights
        reserved.
      </div>
    </Footer>
  );
};

export default Road2GMFooter;
