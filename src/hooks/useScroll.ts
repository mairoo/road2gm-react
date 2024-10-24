import { RefObject, useEffect } from "react";

interface ScrollToCenterOptions {
  behavior?: ScrollBehavior;
  offset?: number;
}

export const useScrollToCenter = (
  containerRef: RefObject<HTMLElement>,
  targetRef: RefObject<HTMLElement>,
  deps: any[] = [], // useEffect 의존성 배열을 옵션으로 받음
  options: ScrollToCenterOptions = {},
) => {
  const { behavior = "smooth", offset = 0 } = options;

  useEffect(() => {
    // 함수가 useEffect() 내부에서만 사용되고
    // 다른 곳에서 재사용되지 않으므로
    // useCallback()이 불필요
    const scrollToCenter = () => {
      if (targetRef.current && containerRef.current) {
        const itemRect = targetRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();

        const scrollTop =
          targetRef.current.offsetTop -
          containerRef.current.offsetTop -
          containerRef.current.clientHeight / 2 +
          itemRect.height / 2 +
          offset;

        containerRef.current.scrollTo({
          top: scrollTop,
          behavior,
        });
      }
    };

    scrollToCenter();
  }, deps);

  // 수동으로 스크롤이 필요한 경우를 위해 함수 반환
  return {
    scrollToCenter: () => {},
  };
};
