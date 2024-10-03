import React, { ComponentPropsWithoutRef } from "react";

const Square = ({
  onClick,
}: {
  onClick: () => void;
} & ComponentPropsWithoutRef<"div">) => {
  return (
    <div
      className="aspect-square"
      onClick={onClick}
      onDragStart={(e) => {
        console.log("drag start square", e);
        e.dataTransfer.effectAllowed = "move";
      }}
      onDragOver={(e) => {
        // Drop 이벤트를 발생시키려면 반드시 dragOver 이벤트에서 preventDefault() 무효화 처리를 해야 한다.
        e.preventDefault();
      }}
      onDrop={(e) => {
        console.log("dropped on square", e);
        e.dataTransfer.effectAllowed = "move";
      }}
    />
  );
};

export default Square;
