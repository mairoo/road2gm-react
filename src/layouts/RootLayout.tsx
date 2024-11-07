import React, { useCallback, useEffect } from "react";
import { Outlet } from "react-router-dom";

import { useAppDispatch } from "../store/hooks";
import { setViewportSize } from "../store/slices/uiSlice";

const RootLayout = () => {
  // 1. react-router-dom 훅

  // 2. Redux 훅
  const dispatch = useAppDispatch();

  // 3. RTK Query 훅
  // 4. useState 훅
  // 5. useRef 훅
  // 6. useMemo 훅

  // 7. useEffect 훅
  useEffect(() => {
    // 최상단 레이아웃에서 윈도우 객체 뷰 포트의 크기가 변경되는 이벤트 리스너를 등록
    // 뷰 포트 크기가 변경될 때 가로 크기를 측정하여 반응형 모바일기기 여부 판단
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅

  // 9. 이벤트 핸들러 useCallback 훅
  const handleWindowResize = useCallback(() => {
    dispatch(
      setViewportSize({ width: window.innerWidth, height: window.innerHeight }),
    );
  }, [dispatch]);

  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)
  // 12. 메인 컴포넌트 렌더링 반환

  return (
    // 헤더, 본문, 푸터 3단 레이아웃
    // flex flex-col: 세로 방향 flex 컨테이너
    // min-h-dvh: 최소 높이를 화면 전체 높이로 지정
    // 헤더: 페이지 상단 위치
    // 본문: 내용이 많아지면 전체 화면으로 스크롤 생성 (중요! flex-grow: 남은 공간을 모두 차지)
    // 푸터: 내용이 적을 때는 화면 하단 고정, 내용이 많아 스크롤이 생기면 스크롤의 맨 아래에 위치
    <div className="flex flex-col min-h-dvh">
      <Outlet />
    </div>
  );
};

export default RootLayout;
