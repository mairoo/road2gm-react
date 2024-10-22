import React, { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

const Card = ({
  children,
  ...rest
}: { children?: ReactNode } & ComponentPropsWithoutRef<"div">) => {
  const classes = className(
    "rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-100",
    rest.className,
  );
  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
};

export default Card;
