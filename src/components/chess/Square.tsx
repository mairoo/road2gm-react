import React from "react";

const Square = ({ file, rank }: { file: string; rank: number }) => {
  return (
    <div className="aspect-square text-gray-100 " key={file + rank}>
      {file}
      {rank}
    </div>
  );
};

export default Square;
