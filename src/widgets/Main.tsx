import className from "classnames";
import React, { ComponentPropsWithoutRef, ReactNode } from "react";

const Main = ({
  children,
  ...rest
}: {
  children?: ReactNode;
} & ComponentPropsWithoutRef<"main">) => {
  const classes = className(rest.className, "flex-grow");

  return (
    <main {...rest} className={classes}>
      {children}
    </main>
  );
};

export default Main;
