import React from "react";
import ContainerFixed from "../widgets/ContainerFixed";
import { Link } from "react-router-dom";
import Header from "../widgets/Header";
import { useAppSelector } from "../store/hooks";

const Road2GMHeader = () => {
  const { isMobile } = useAppSelector((state) => state.ui);

  return (
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
                <Link to="/auth/login">로그인</Link>
              </div>
            )}
            {!isMobile && (
              <div className="flex gap-x-4">
                <Link to="#">마이페이지</Link>
                <Link to="#">로그아웃</Link>
                <Link to="#">회원가입</Link>
                <Link to="/auth/login">로그인</Link>
                <Link to="http://localhost:8080/oauth2/authorization/google">구글</Link>
              </div>
            )}
          </nav>
        </ContainerFixed>
      </div>
    </Header>
  );
};

export default Road2GMHeader;
