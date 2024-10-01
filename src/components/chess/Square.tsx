import React, { ComponentPropsWithoutRef } from "react";

const Square = ({
  onClick,
}: {
  onClick: () => void;
} & ComponentPropsWithoutRef<"div">) => {
  return <div className="aspect-square text-gray-100" onClick={onClick} />;
};

export default Square;
