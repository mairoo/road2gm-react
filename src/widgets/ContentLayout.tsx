import className from "classnames";
import React, { ReactNode } from "react";

type LayoutPosition = "center" | "top" | "top-sm" | "top-lg";
type Align = "left" | "center" | "right";

interface LayoutProps {
  children: ReactNode;
  position?: LayoutPosition;
  align?: Align;
  className?: string;
  isFullWidth?: boolean; // 추가 예시 prop
}

const ContentLayout = ({
  children,
  position = "top",
  align = "left",
  className: additionalClassName = "",
  isFullWidth = false,
}: LayoutProps) => {
  const classes = className(
    "flex flex-col", // 공통 클래스
    {
      // 위치에 따른 조건부 클래스
      "py-4 px-2 md:pt-12 md:px-0": position === "top-sm",
      "py-4 px-2 md:pt-32 md:px-0": position === "top",
      "py-4 px-2 md:pt-64 md:px-0": position === "top-lg",

      "items-start": align === "left",
      "items-center": align === "center",
      "items-end": align === "right",

      // 추가 조건부 클래스 예시
      "w-full": isFullWidth,
    },
    additionalClassName, // 외부에서 전달된 추가 클래스
  );

  return <div className={classes}>{children}</div>;
};

export default ContentLayout;
