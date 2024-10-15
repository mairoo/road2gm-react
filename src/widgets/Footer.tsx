import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

const Footer = ({
  children,
  ...rest
}: {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"footer">) => {
  const classes = className(rest.className);

  return (
    <footer {...rest} className={classes}>
      {children}
    </footer>
  );
};

export default Footer;
