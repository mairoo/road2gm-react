import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import Drawer from "../widgets/Drawer";
import DrawerHeading from "../widgets/DrawerHeading";
import { MdCheck } from "react-icons/md";
import SlideMenu from "../widgets/SlideMenu";
import { DRAWER_MENU_ITEMS } from "../constants/menu";
import { useAppSelector } from "../store/hooks";
import ContainerFixed from "../widgets/ContainerFixed";
import Main from "../widgets/Main";
import Road2GMFooter from "../components/Road2GMFooter";
import Road2GMHeader from "../components/Road2GMHeader";

const HomeLayout = () => {
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
      <Road2GMHeader />
      <Main>
        <ContainerFixed>
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
