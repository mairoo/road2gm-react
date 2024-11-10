import {SerializedError} from "@reduxjs/toolkit";
import {FetchBaseQueryError} from "@reduxjs/toolkit/query";
import React, {useCallback, useEffect} from "react";
import {Outlet} from "react-router-dom";

import {useRefreshTokenMutation} from "../store/apis/authApi";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import {logout, setCredentials, setInitialized,} from "../store/slices/authSlice";
import {setViewportSize} from "../store/slices/uiSlice";
import storage from "../utils/storage";

/**
 * 루트 레이아웃 컴포넌트
 *
 * 주요 기능:
 * 1. 인증 상태 초기화 및 토큰 갱신
 * 2. 뷰포트 크기 감지 및 상태 관리
 * 3. 전체 레이아웃 구조 제공
 */
const RootLayout = () => {
  // 1. react-router-dom 훅

  // 2. Redux 훅
  const dispatch = useAppDispatch();

  const { accessToken, isInitialized } = useAppSelector((state) => state.auth);
  const [refreshToken] = useRefreshTokenMutation();

  // 3. RTK Query 훅
  // 4. useState 훅
  // 5. useRef 훅
  // 6. useMemo 훅

  // 7. useEffect 훅

  /**
   * 인증 초기화 핸들러
   * - 액세스 토큰이 없고 자동 로그인이 활성화된 경우에만 토큰 갱신 시도
   * - 초기화 완료 후 isInitialized를 true로 설정
   */
  useEffect(() => {
    const initializeAuth = async () => {
      // 토큰 갱신이 필요한 경우: 액세스 토큰이 없고, 자동 로그인이 활성화되어 있으며, 아직 초기화되지 않은 상태
      const needsTokenRefresh =
        !accessToken && storage.getRememberMe() && !isInitialized;

      if (needsTokenRefresh) {
        try {
          const result = await refreshToken().unwrap();

          dispatch(
            setCredentials({
              data: result.data,
              rememberMe: true,
            }),
          );
        } catch (err) {
          console.error("Refresh failed:", err);

          // FetchBaseQueryError 또는 SerializedError 타입으로 체크
          const error = err as FetchBaseQueryError | SerializedError;

          if ("status" in error && error.status === 401) {
            // Refresh Token 만료
            console.error("refresh token expired");
            dispatch(logout());
          } else {
            console.error("something went wrong");
            dispatch(logout());
          }
        }
      }

      if (!isInitialized) {
        // [앱 시작/새로고침] : Redux 스토어 자체가 리셋됨
        // isInitialized: false
        //        ↓
        // [인증 체크/토큰 리프레시 시도]
        //        ↓
        // [결과와 관계없이 체크 완료]: 로그아웃이나 토큰 만료시에도 true 유지 (인증 체크는 완료된 상태)
        // isInitialized: true
        dispatch(setInitialized());
      }
    };

    // Promise 경고 해결을 위한 .then() 체인 추가
    initializeAuth().catch((error) => {
      console.error("Failed to initialize auth:", error);
    });
  }, [accessToken, isInitialized]);

  /**
   * 뷰포트 크기 변경 감지
   * - 초기 로드 및 화면 크기 변경 시 실행
   * - 반응형 디자인을 위한 뷰포트 크기 상태 관리
   */
  useEffect(() => {
    // 최상단 레이아웃에서 윈도우 객체 뷰 포트의 크기가 변경되는 이벤트 리스너를 등록
    // 뷰 포트 크기가 변경될 때 가로 크기를 측정하여 반응형 모바일기기 여부 판단
    handleWindowResize();
    window.addEventListener("resize", handleWindowResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅

  // 9. 이벤트 핸들러 useCallback 훅

  /**
   * 윈도우 크기 변경 이벤트 핸들러
   */
  const handleWindowResize = useCallback(() => {
    dispatch(
      setViewportSize({ width: window.innerWidth, height: window.innerHeight }),
    );
  }, [dispatch]);

  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)
  // 12. 메인 컴포넌트 렌더링 반환

  // 인증 초기화 중일 때 로딩 표시
  if (!isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-dvh">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent" />
      </div>
    );
  }

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
