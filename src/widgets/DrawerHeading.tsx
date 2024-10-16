import { ComponentPropsWithoutRef, ReactNode } from "react";
import className from "classnames";

const DrawerHeading = ({
  children,
  ...rest
}: { children?: ReactNode } & ComponentPropsWithoutRef<"div">) => {
  const classes = className(
    rest.className,
    "font-bold border-l-4 border-b px-2 py-1",
  );

  return (
    <div>
      <h1 {...rest} className={classes}>
        {children}
      </h1>
    </div>
  );
};

export default DrawerHeading;
