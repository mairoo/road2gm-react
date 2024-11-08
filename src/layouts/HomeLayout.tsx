import React, { useCallback, useState } from "react";
import { MdCheck } from "react-icons/md";
import { Link, Outlet } from "react-router-dom";

import Road2GMFooter from "../components/Road2GMFooter";
import Road2GMHeader from "../components/Road2GMHeader";
import { DRAWER_MENU_ITEMS } from "../constants/menu";
import { useAppSelector } from "../store/hooks";
import ContainerFixed from "../widgets/ContainerFixed";
import Drawer from "../widgets/Drawer";
import DrawerHeading from "../widgets/DrawerHeading";
import Main from "../widgets/Main";
import SlideMenu from "../widgets/SlideMenu";

const HomeLayout = () => {
  // 1. react-router-dom 훅

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
        <ContainerFixed className="flex flex-col flex-grow">
          <Outlet />
        </ContainerFixed>
      </Main>
      <Road2GMFooter />
      {/* 좌측 하단 고정 위치에 서랍 메뉴 floating action button 렌더링 */}
      {isMobile && (
        <div className="fixed left-6 bottom-6">
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
    </>
  );
};

export default HomeLayout;
