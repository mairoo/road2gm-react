import React from "react";
import Header from "../widgets/Header";
import Main from "../widgets/Main";
import Footer from "../widgets/Footer";
import ContainerFixed from "../widgets/ContainerFixed";
import Button from "../widgets/Button";
import { MdMenu } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";

import type { RootState } from "../store";
import { decrement, increment } from "../store/slices/counterSlice";

const RootLayout = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const dispatch = useDispatch();

  // 헤더, 본문, 푸터 3단 레이아웃
  // flex flex-col: 세로 방향 flex 컨테이너
  // min-h-screen: 최소 높이를 화면 전체 높이로 지정
  // 헤더: 페이지 상단 위치
  // 본문: 내용이 많아지면 전체 화면으로 스크롤 생성 (중요! flex-grow: 남은 공간을 모두 차지)
  // 푸터: 내용이 적을 때는 화면 하단 고정, 내용이 많아 스크롤이 생기면 스크롤의 맨 아래에 위치
  return (
    <div className="flex flex-col min-h-screen">
      <Header>
        <div className="bg-teal-50 py-2 px-2 md:px-0">
          <ContainerFixed>
            {/* justify-between: 가로방향 진행 축 정렬 배치 - 로고와 메뉴를 양 끝에 배치 */}
            {/* items-center: 세로방향 교차 축 정렬 배치 - 수직 중앙 정렬 */}
            <nav className="flex justify-between items-center">
              <div className="font-bold text-lg">Road2GM</div>
              {/* 데스크탑 메뉴 */}
              <div className="hidden md:flex gap-x-4">
                <Button>마이페이지</Button>
                <Button>로그아웃</Button>
                <Button>회원가입</Button>
                <Button>로그인</Button>
              </div>
              {/* 모바일 메뉴 */}
              <div className="md:hidden flex items-center">
                <Button
                  className="text-lg focus:outline-none text-gray-900"
                  preset="outline"
                  rounded="small"
                >
                  <MdMenu />
                </Button>
              </div>
            </nav>
          </ContainerFixed>
        </div>
      </Header>
      <Main>
        <ContainerFixed>
          <h2 className="text-xl font-semibold">Welcome to Road2GM</h2>
          <p>
            <button
              aria-label="Increment value"
              onClick={() => dispatch(increment())}
            >
              Increment
            </button>
            <span>{count}</span>
            <button
              aria-label="Decrement value"
              onClick={() => dispatch(decrement())}
            >
              Decrement
            </button>
          </p>
          {/* 스크롤 테스트를 위한 더미 컨텐츠 */}
          {[...Array(10)].map((_, i) => (
            <p key={i} className="my-2">
              This is paragraph {i + 1}
            </p>
          ))}
        </ContainerFixed>
      </Main>
      <Footer className="bg-teal-50 text-sm text-cyan-900">
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
        <div className="bg-cyan-900 text-gray-100 text-center py-2">
          {window.location.hostname} &copy; {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </Footer>
    </div>
  );
};

export default RootLayout;
