import React, {useState} from "react";

import {Link, Outlet} from "react-router-dom";
import {MdCheck, MdChevronLeft, MdChevronRight, MdList} from "react-icons/md";
import Button from "../widgets/Button";
import Drawer from '../widgets/Drawer';
import DrawerHeading from '../widgets/DrawerHeading';
import SlideMenu from '../widgets/SlideMenu';
import {DRAWER_MENU_ITEMS} from '../constants/menu';
import {useAppSelector} from '../store/hooks';
import Header from '../widgets/Header';
import ContainerFixed from '../widgets/ContainerFixed';
import Main from '../widgets/Main';
import Footer from '../widgets/Footer';

const BookLayout = () => {
  const { isMobile } = useAppSelector((state) => state.ui);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
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
      {/* 푸터는 모바일 화면의 경우 시작화면 등 일부 화면에서만 표시 */}
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
        <div className="bg-gray-200 text-gray-900 text-center pt-2 pb-32 md:pb-2">
          {window.location.hostname} &copy; {new Date().getFullYear()}. All
          rights reserved.
        </div>
      </Footer>
      {/* 좌측 하단 고정 위치에 서랍 메뉴 floating action button 렌더링 */}
      {isMobile && (
          <div className="fixed left-6 bottom-14">
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
              <SlideMenu menu={DRAWER_MENU_ITEMS} onClick={handleDrawerClose} />
            </Drawer>
          </div>
      )}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around py-1">
          <Button inline={true}>
            <MdChevronLeft className="w-8 h-8" />
            <span className="text-xs font-medium">이전글</span>
          </Button>
          <Button inline={true}>
            <MdList className="w-8 h-8" />
            <span className="text-xs font-medium">목록</span>
          </Button>
          <Button inline={true}>
            <span className="text-xs font-medium">다음글</span>
            <MdChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </nav>
    </>
  );
};

export default BookLayout;
