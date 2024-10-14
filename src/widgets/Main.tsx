import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

const Main = ({
  children,
  ...rest
}: {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"main">) => {
  // - 화면 폭
  //   - 모바일 (기본값): w-full 전체 화면 폭, max-w-none 최대 폭 제한 없음
  //   - 태블릿 768px 이상: md:max-w-7xl 최대폭 제한
  // - 가운데 정렬
  //   - 모든 화면 크기: mx-auto
  const classes = className(rest.className, "flex-grow");

  return <main className={classes}>{children}</main>;
};

export default Main;
