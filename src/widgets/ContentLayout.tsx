import className from "classnames";
import React, { ReactNode } from "react";

type LayoutPosition = "center" | "top" | "top-sm" | "top-lg";
type Align = "left" | "center" | "right";
type Direction = "row" | "col";
type Gap = "none" | "sm" | "md" | "lg";

interface LayoutProps {
  children: ReactNode;
  position?: LayoutPosition;
  align?: Align;
  className?: string;
  width?: "full" | "1/2" | "1/3" | "2/3" | "1/4" | "3/4";
  padding?: boolean;
  direction?: Direction;
  gap?: Gap;
  wrap?: boolean;
  grow?: boolean;
  stretch?: boolean;
}

const ContentLayout = ({
  children,
  position = "top",
  align = "left",
  className: additionalClassName = "",
  width = "1/2",
  padding = true,
  direction = "col",
  gap = "none",
  wrap = false,
  grow = false,
  stretch = false,
}: LayoutProps) => {
  const containerClasses = className(
    "flex",
    {
      "flex-col": direction === "col",
      "flex-row": direction === "row",
    },
    {
      "py-4 px-2 md:pt-12 md:px-0": position === "top-sm",
      "py-4 px-2 md:pt-32 md:px-0": position === "top",
      "py-4 px-2 md:pt-64 md:px-0": position === "top-lg",
      "justify-center min-h-screen": position === "center",
    },
    {
      "items-start": align === "left",
      "items-center": align === "center",
      "items-end": align === "right",
    },
  );

  const contentClasses = className(
    "flex",
    {
      "flex-col": direction === "col",
      "flex-row": direction === "row",
      "flex-wrap": wrap,
      "flex-nowrap": !wrap,
      "flex-grow": grow,
      "h-full": stretch,
    },
    {
      "gap-0": gap === "none",
      "gap-2": gap === "sm",
      "gap-4": gap === "md",
      "gap-6": gap === "lg",
    },
    { "p-4": padding },
    {
      "w-full": width === "full",
      "w-full md:w-1/2": width === "1/2",
      "w-full md:w-1/3": width === "1/3",
      "w-full md:w-2/3": width === "2/3",
      "w-full md:w-1/4": width === "1/4",
      "w-full md:w-3/4": width === "3/4",
    },
    {
      "justify-start": align === "left",
      "justify-center": align === "center",
      "justify-end": align === "right",
    },
    additionalClassName, // 외부에서 전달된 추가 클래스
  );

  return (
    <div className={containerClasses}>
      <div className={contentClasses}>{children}</div>
    </div>
  );
};

export default ContentLayout;
