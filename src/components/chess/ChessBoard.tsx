import React from "react";
import Square from "./Square";

const ChessBoard = () => {
  // 좌표 순서 일차원 배열: a8, b8, c8, ... f1, g1, h1

  const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

  const COORDINATES = RANKS.map((rank) =>
    FILES.map((file) => ({ file, rank })),
  ).flat();

  return (
    <div className="mx-auto max-w-xl sm:px-6 lg:px-8 relative">
      <div className="bg-[url('https://road2gm.co.kr/assets/chess/boards/blue.svg')] bg-no-repeat bg-cover">
        <div className="grid grid-cols-8">
          {COORDINATES.map((square) => (
            <Square file={square.file} rank={square.rank}></Square>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChessBoard;
