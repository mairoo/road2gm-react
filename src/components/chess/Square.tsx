import React, { ComponentPropsWithoutRef } from "react";

const Square = ({
  file,
  rank,
  onClick,
}: {
  file: string;
  rank: number;
  onClick: () => void;
} & ComponentPropsWithoutRef<"div">) => {
  return (
    <div className="aspect-square text-gray-100" onClick={onClick}>
      {file}
      {rank}
    </div>
  );
};

export default Square;
