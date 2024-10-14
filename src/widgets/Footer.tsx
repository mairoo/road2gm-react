import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

const Footer = ({
  children,
  ...rest
}: {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"footer">) => {
  const classes = className(
    rest.className,
    "bg-gray-800 text-white text-center",
  );

  return <footer className={classes}>{children}</footer>;
};

export default Footer;
