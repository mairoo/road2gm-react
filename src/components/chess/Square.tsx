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
    <div
      className="aspect-square"
      onClick={onClick}
      draggable={true}
      onDragStart={(e) => {
        console.log(`${file}${rank} 칸 드래그 시작`, e);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        // Drop 이벤트를 발생시키려면 반드시 dragOver 이벤트에서 preventDefault() 무효화 처리를 해야 한다.
        // Drop 안 되면 되돌아가는 건 e.preventDefault()로 처리가 가능하다.
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log(`${file}${rank} 칸에 드롭`);
        e.dataTransfer.effectAllowed = "move";
      }}
    />
  );
};

export default Square;
