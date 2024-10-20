import React, { useCallback, useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import DrawerHeading from "./DrawerHeading";
import { Link } from "react-router-dom";
import { MdCheck } from "react-icons/md";

const SlideMenu = ({
  menu,
}: {
  menu: {
    heading: string;
    items: { id: number; text: string; link: string; icon?: string }[];
  }[];
}) => {
  const [slides, setSlides] = useState<
    {
      heading: string;
      items: { id: number; text: string; link: string; icon?: string }[];
    }[]
  >([]);
  const [currentIndex, setCurrentIndex] = useState(slides.length > 1 ? 1 : 0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 메뉴 추가/삭제 변경 시 메뉴 구성 변경
  useEffect(() => {
    if (menu.length > 1) {
      // 연속으로 넘어가는 효과를 주기 위해 복제
      // 마지막 슬라이드 + 슬라이드 전체 + 첫 슬라이드
      setSlides([menu[menu.length - 1], ...menu, menu[0]]);
    } else {
      setSlides(menu);
    }
  }, [menu]);

  // 화면 이동 함수
  const goToSlide = useCallback(
    (index: number) => {
      if (slides.length > 1 && !isTransitioning) {
        // 화면전환 중에 재진입 불가
        setIsTransitioning(true);
        setCurrentIndex((_) => {
          console.log("goto slide", index);
          if (index < 0) return slides.length - 2;
          if (index >= slides.length) return 1;
          return index;
        });
      }
    },
    [slides.length, isTransitioning],
  );

  // 다음 슬라이드 함수
  const nextSlide = useCallback(() => {
    console.log("next slide", currentIndex);
    goToSlide(currentIndex + 1);
  }, [currentIndex, goToSlide]);

  // 이전 슬라이드 함수
  const prevSlide = useCallback(() => {
    console.log("prev slide", currentIndex);
    goToSlide(currentIndex - 1);
  }, [currentIndex, goToSlide]);

  // 화면 전환 중 상태일 때에만 트랜지션 상태 종료 처리
  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((prevIndex) => {
          if (prevIndex === 0) return slides.length - 2;
          if (prevIndex === slides.length - 1) return 1;
          return prevIndex;
        });
      }, 200); // 트랜지션 `duration-xxx` 값과 일치해야 한다.
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isTransitioning, slides.length]);

  // 스와이프 이벤트 핸들러
  const handlers = useSwipeable({
    onSwipedLeft: nextSlide,
    onSwipedRight: prevSlide,
    trackMouse: true,
  });

  if (slides.length === 0) {
    return (
      <div className="bg-danger-2 text-white text-center">메뉴가 없습니다.</div>
    );
  }

  return (
    <div className="w-full overflow-hidden" {...handlers}>
      <div
        className={`flex ${isTransitioning ? "transition-transform duration-200 ease-in-out" : ""}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="w-full flex-shrink-0">
            {/* 스크롤 가능하게 한 번 감싸줄 것 /*/}
            <div className="flex flex-col h-[200px] overflow-y-auto">
              <DrawerHeading className="border-green-600 bg-natural-1 text-natural-5">
                {slide.heading}
              </DrawerHeading>
              {[...Array(15)].map((_, i) => (
                <Link
                  to="/"
                  className="inline-flex gap-x-2 items-center px-3 py-1"
                  key={i}
                >
                  <MdCheck />
                  메뉴 {i + 1}
                </Link>
              ))}
            </div>
            {/* 서랍 메뉴 바닥 탭 - indicators */}
            <div className="bg-natural-1 text-natural-5 border-l-4 border-b">
              <div className="flex justify-around font-bold">
                <div className="flex-1 text-center border-t-green-600 border-t-4 py-1">
                  커뮤니티
                </div>
                <div className="flex-1 text-center border-t-gray-200 border-t-4 py-1">
                  학습
                </div>
                <div className="flex-1 text-center border-t-gray-200 border-t-4 py-1">
                  모임
                </div>
              </div>
              <div className="text-center text-sm text-gray-400">
                {window.location.hostname}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideMenu;
