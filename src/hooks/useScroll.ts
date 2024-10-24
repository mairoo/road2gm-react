import { useCallback, useRef } from "react";

export function useScrollToCenter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeItemRef = useRef<HTMLDivElement>(null);

  const scrollToCenter = useCallback(() => {
    const container = containerRef.current;
    const activeItem = activeItemRef.current;

    if (!container || !activeItem) return;

    // 컨테이너의 스크롤 가능한 높이
    const containerHeight = container.clientHeight;
    // active 항목의 상대적 위치
    const activeItemTop = activeItem.offsetTop;
    // active 항목의 높이
    const activeItemHeight = activeItem.clientHeight;

    // 스크롤 위치 계산 (active 항목이 중앙에 오도록)
    const scrollPosition =
      activeItemTop - containerHeight / 2 + activeItemHeight / 2;

    // 부드러운 스크롤 적용
    container.scrollTo({
      top: scrollPosition,
      behavior: "smooth",
    });
  }, []);

  return {
    containerRef,
    activeItemRef,
    scrollToCenter,
  };
}
