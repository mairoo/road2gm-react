import className from "classnames";
import React, { useCallback, useState } from "react";
import { MdCheck, MdChevronLeft, MdChevronRight, MdList } from "react-icons/md";
import { Link, Outlet, useLocation } from "react-router-dom";

import Road2GMFooter from "../components/Road2GMFooter";
import Road2GMHeader from "../components/Road2GMHeader";
import { DRAWER_MENU_ITEMS } from "../constants/menu";
import { useAppSelector } from "../store/hooks";
import Button from "../widgets/Button";
import ContainerFixed from "../widgets/ContainerFixed";
import Drawer from "../widgets/Drawer";
import DrawerHeading from "../widgets/DrawerHeading";
import Main from "../widgets/Main";
import SlideMenu from "../widgets/SlideMenu";

const BookLayout = () => {
  // 1. react-router-dom 훅
  const { pathname } = useLocation();
  const hasBottomNavbar = /^\/book\/\d+\/page(\/\d+)?$/.test(pathname);

  // 2. Redux 훅
  const { isMobile } = useAppSelector((state) => state.ui);

  // 3. RTK Query 훅

  // 4. useState 훅
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  // 5. useRef 훅
  // 6. useMemo 훅
  // 7. useEffect 훅
  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅

  // 9. 이벤트 핸들러 useCallback 훅
  const handleDrawerOpen = useCallback(() => {
    setDrawerIsOpen(true);
  }, []);

  const handleDrawerClose = useCallback(() => {
    setDrawerIsOpen(false);
  }, []);

  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)
  // 12. 메인 컴포넌트 렌더링 반환

  return (
    <>
      <Road2GMHeader />
      <Main>
        <ContainerFixed>
          <Outlet />
        </ContainerFixed>
      </Main>
      <Road2GMFooter hasBottomNavbar={hasBottomNavbar} />
      {/* 좌측 하단 고정 위치에 서랍 메뉴 floating action button 렌더링 */}
      {isMobile && (
        <>
          <div
            className={className(
              "fixed left-6",
              hasBottomNavbar ? "bottom-14" : "bottom-6",
            )}
          >
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
          {hasBottomNavbar && (
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
              <div className="flex items-center justify-around py-1">
                <Button inline={true}>
                  <MdChevronLeft className="w-8 h-8" />
                  <span className="text-sm">이전글</span>
                </Button>
                <Button inline={true}>
                  <MdList className="w-8 h-8" />
                  <span className="text-sm">목록</span>
                </Button>
                <Button inline={true}>
                  <span className="text-sm">다음글</span>
                  <MdChevronRight className="w-8 h-8" />
                </Button>
              </div>
            </nav>
          )}
        </>
      )}
    </>
  );
};

export default BookLayout;
