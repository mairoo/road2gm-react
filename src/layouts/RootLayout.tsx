import React, { useCallback, useEffect, useState } from "react";
import Header from "../widgets/Header";
import Main from "../widgets/Main";
import Footer from "../widgets/Footer";
import ContainerFixed from "../widgets/ContainerFixed";
import { setViewportSize } from "../store/slices/uiSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Link, Outlet } from "react-router-dom";
import Drawer from "../widgets/Drawer";
import DrawerHeading from "../widgets/DrawerHeading";
import { MdCheck } from "react-icons/md";
import SlideMenu from "../widgets/SlideMenu";

const RootLayout = () => {
  const drawerMenuItems = [
    {
      heading: "커뮤니티",
      items: [
        {
          text: "자유",
          link: "/",
        },
        {
          text: "질문",
          link: "/",
        },
        {
          text: "구인",
          link: "/",
        },
        {
          text: "구직",
          link: "/",
        },
        {
          text: "장터",
          link: "/",
        },
        {
          text: "공지",
          link: "/",
        },
      ],
    },
    {
      heading: "학습",
      items: [
        {
          text: "강좌",
          link: "/",
        },
        {
          text: "퍼즐",
          link: "/",
        },
        {
          text: "복기",
          link: "/",
        },

        {
          text: "오답노트",
          link: "/",
        },
      ],
    },
    {
      heading: "모임",
      items: [
        {
          text: "자유",
          link: "/",
        },
        {
          text: "대회",
          link: "/",
        },
      ],
    },
  ];

  // 1. URL 파라미터 가져오기

  // 2. 리덕스 스토어 객체 가져오기

  const dispatch = useAppDispatch();
  const { isMobile } = useAppSelector((state) => state.ui);

  // 3. 리액트 라우터 네비게이션 객체 가져오기
  // 4. RTK Query 객체 가져오기
  // 5. 리액트 훅 폼 정의
  // 6. 주요 상태 선언 (useState, useReducer 및 커스텀 훅) 및 함수 정의

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  const handleWindowResize = useCallback(() => {
    dispatch(
      setViewportSize({ width: window.innerWidth, height: window.innerHeight }),
    );
  }, [dispatch]);

  // 7. useEffect 호출
  useEffect(() => {
    // 최상단 레이아웃에서 윈도우 객체 뷰 포트의 크기가 변경되는 이벤트 리스너를 등록
    // 뷰 포트 크기가 변경될 때 가로 크기를 측정하여 반응형 모바일기기 여부 판단
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [handleWindowResize]);

  // 8. onValid 폼 제출 핸들러 정의
  // 9. 이벤트 핸들러 정의
  // 10. 출력 데이터 구성

  // 11. JSX 반환

  // 헤더, 본문, 푸터 3단 레이아웃
  // flex flex-col: 세로 방향 flex 컨테이너
  // min-h-dvh: 최소 높이를 화면 전체 높이로 지정
  // 헤더: 페이지 상단 위치
  // 본문: 내용이 많아지면 전체 화면으로 스크롤 생성 (중요! flex-grow: 남은 공간을 모두 차지)
  // 푸터: 내용이 적을 때는 화면 하단 고정, 내용이 많아 스크롤이 생기면 스크롤의 맨 아래에 위치
  return (
    <div className="flex flex-col min-h-dvh">
      <Header>
        <div className="bg-natural-3 py-2 px-2 md:px-0">
          <ContainerFixed>
            {/* justify-between: 가로방향 진행 축 정렬 배치 - 로고와 메뉴를 양 끝에 배치 */}
            {/* items-center: 세로방향 교차 축 정렬 배치 - 수직 중앙 정렬 */}
            <nav className="flex justify-between items-center">
              <div className="font-bold text-lg">
                <Link to="/">Road2GM</Link>
              </div>
              {/* 모바일 기기 사이즈인지 식별하여 불필요한 HTML DOM 객체가 중복되어 생성되지 않도록 한다. */}
              {isMobile && (
                <div className="flex gap-x-2 items-center">
                  <span>회원가입</span>
                  <span>로그인</span>
                </div>
              )}
              {!isMobile && (
                <div className="flex gap-x-4">
                  <Link to="#">마이페이지</Link>
                  <Link to="#">로그아웃</Link>
                  <Link to="#">회원가입</Link>
                  <Link to="#">로그인</Link>
                </div>
              )}
            </nav>
          </ContainerFixed>
        </div>
      </Header>
      <Main>
        <ContainerFixed>
          <Outlet />
        </ContainerFixed>
      </Main>
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
        <div className="bg-shade-1 text-gray-100 text-center pt-2 pb-24 md:pb-2">
          {window.location.hostname} &copy; {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </Footer>
      {/* 좌측 하단 고정 위치에 서랍 메뉴 floating action button 렌더링 */}
      {isMobile && (
        <div className="fixed bottom-6 left-6">
          <Drawer
            isOpen={drawerIsOpen}
            onOpen={handleDrawerOpen}
            onClose={handleDrawerClose}
            buttonColor="text-white"
            buttonBackgroundColor="bg-shade-3"
            modalBackgroundColor="bg-white"
          >
            {/* 스크롤 없는 고정 영역*/}
            <div className="border-b border-b-gray-300 flex flex-col">
              <DrawerHeading className="border-green-600 bg-natural-1 text-natural-5">
                고정 영역
              </DrawerHeading>
              {[...Array(5)].map((_, i) => (
                <Link
                  to="/"
                  className="inline-flex gap-x-2 items-center px-3 py-1"
                  onClick={handleDrawerClose}
                  key={i}
                >
                  <MdCheck />
                  메뉴 {i + 1}
                </Link>
              ))}
            </div>
            <SlideMenu menu={drawerMenuItems} />
          </Drawer>
        </div>
      )}
    </div>
  );
};

export default RootLayout;
