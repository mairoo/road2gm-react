import React, { useEffect, useState } from "react";

import { Link, Outlet, useLocation } from "react-router-dom";
import { MdCheck, MdChevronLeft, MdChevronRight, MdList } from "react-icons/md";
import Button from "../widgets/Button";
import Drawer from "../widgets/Drawer";
import DrawerHeading from "../widgets/DrawerHeading";
import SlideMenu from "../widgets/SlideMenu";
import { DRAWER_MENU_ITEMS } from "../constants/menu";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import ContainerFixed from "../widgets/ContainerFixed";
import Main from "../widgets/Main";
import Road2GMFooter from "../components/Road2GMFooter";
import Road2GMHeader from "../components/Road2GMHeader";
import className from "classnames";
import {setBook, setCurrent} from "../store/slices/bookSlice";

const tocData = {
  title: "현대 소프트웨어 아키텍처의 이해",
  chapters: [
    {
      id: 1,
      title: "소프트웨어 아키텍처 기초",
      level: 1,
      number: "1",
      sections: [
        {
          id: 2,
          title: "아키텍처의 정의",
          level: 2,
          number: "1.1",
          page: 15,
        },
        {
          id: 3,
          title: "아키텍처의 중요성",
          level: 2,
          number: "1.2",
          page: 22,
          sections: [
            {
              id: 4,
              title: "비즈니스 가치",
              level: 3,
              number: "1.2.1",
              page: 24,
            },
            {
              id: 5,
              title: "기술적 가치",
              level: 3,
              number: "1.2.2",
              page: 28,
            },
          ],
        },
      ],
    },
    {
      id: 6,
      title: "아키텍처 패턴",
      level: 1,
      number: "2",
      sections: [
        {
          id: 7,
          title: "레이어드 아키텍처",
          level: 2,
          number: "2.1",
          page: 35,
        },
        {
          id: 8,
          title: "헥사고날 아키텍처",
          level: 2,
          number: "2.2",
          page: 42,
        },
        {
          id: 9,
          title: "마이크로서비스 아키텍처",
          level: 2,
          number: "2.3",
          page: 50,
        },
      ],
    },
    {
      id: 10,
      title: "설계 원칙",
      level: 1,
      number: "3",
      sections: [
        {
          id: 11,
          title: "SOLID 원칙",
          level: 2,
          number: "3.1",
          page: 65,
          sections: [
            {
              id: 12,
              title: "단일 책임 원칙",
              level: 3,
              number: "3.1.1",
              page: 67,
            },
            {
              id: 13,
              title: "개방-폐쇄 원칙",
              level: 3,
              number: "3.1.2",
              page: 72,
            },
            {
              id: 14,
              title: "리스코프 치환 원칙",
              level: 3,
              number: "3.1.3",
              page: 78,
            },
            {
              id: 15,
              title: "인터페이스 분리 원칙",
              level: 3,
              number: "3.1.4",
              page: 83,
            },
            {
              id: 16,
              title: "의존성 역전 원칙",
              level: 3,
              number: "3.1.5",
              page: 88,
            },
          ],
        },
        {
          id: 17,
          title: "DRY 원칙",
          level: 2,
          number: "3.2",
          page: 95,
        },
        {
          id: 18,
          title: "KISS 원칙",
          level: 2,
          number: "3.3",
          page: 100,
        },
      ],
    },
    {
      id: 19,
      title: "아키텍처 품질 속성",
      level: 1,
      number: "4",
      sections: [
        {
          id: 20,
          title: "성능",
          level: 2,
          number: "4.1",
          page: 110,
        },
        {
          id: 21,
          title: "보안",
          level: 2,
          number: "4.2",
          page: 118,
        },
        {
          id: 22,
          title: "가용성",
          level: 2,
          number: "4.3",
          page: 125,
        },
        {
          id: 23,
          title: "확장성",
          level: 2,
          number: "4.4",
          page: 132,
        },
      ],
    },
    {
      id: 24,
      title: "아키텍처 문서화",
      level: 1,
      number: "5",
      sections: [
        {
          id: 25,
          title: "문서화의 중요성",
          level: 2,
          number: "5.1",
          page: 140,
        },
        {
          id: 26,
          title: "문서화 템플릿",
          level: 2,
          number: "5.2",
          page: 145,
          sections: [
            {
              id: 27,
              title: "4+1 뷰",
              level: 3,
              number: "5.2.1",
              page: 148,
            },
            {
              id: 28,
              title:
                "어텐션을 이용한 텍스트 요약(Text Summarization with Attention mechanism)",
              level: 3,
              number: "5.2.2",
              page: 155,
            },
          ],
        },
      ],
    },
    {
      id: 29,
      title: "아키텍처 평가",
      level: 1,
      number: "6",
      sections: [
        {
          id: 30,
          title: "아키텍처 평가 방법",
          level: 2,
          number: "6.1",
          page: 165,
        },
        {
          id: 31,
          title: "ATAM",
          level: 2,
          number: "6.2",
          page: 172,
        },
        {
          id: 32,
          title: "CBAM",
          level: 2,
          number: "6.3",
          page: 180,
        },
      ],
    },
    {
      id: 33,
      title: "현대적 아키텍처 트렌드",
      level: 1,
      number: "7",
      sections: [
        {
          id: 34,
          title: "클라우드 네이티브",
          level: 2,
          number: "7.1",
          page: 190,
        },
        {
          id: 35,
          title: "서버리스",
          level: 2,
          number: "7.2",
          page: 198,
        },
        {
          id: 36,
          title: "이벤트 기반 아키텍처",
          level: 2,
          number: "7.3",
          page: 205,
        },
      ],
    },
  ],
};

const BookLayout = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useAppSelector((state) => state.ui);

  const { pathname } = useLocation();
  const hasBottomNavbar = /^\/book\/\d+\/page(\/\d+)?$/.test(pathname);

  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerIsOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerIsOpen(false);
  };

  useEffect(() => {
    dispatch(setBook({ book: tocData }));
    dispatch(setCurrent({ current: 24 }));
  }, []);

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
