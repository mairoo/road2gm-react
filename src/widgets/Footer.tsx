import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

const Footer = ({
  children,
  ...rest
}: {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"footer">) => {
  const classes = className(rest.className, "shadow-[0_-1px_3px_rgba(0,0,0,0.05)]");

  return (
    <footer {...rest} className={classes}>
      {children}
    </footer>
  );
};

export default Footer;
