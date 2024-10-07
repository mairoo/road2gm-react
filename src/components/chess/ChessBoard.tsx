import React, { useState } from "react";
import { Chess } from "chess.js";
import Square from "./Square";
import {
  MdArrowBack,
  MdArrowForward,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import Coords from "./Coords";
import Piece from "./Piece";

const ChessBoard = () => {
  // 좌표 순서 일차원 배열: a8, b8, c8, ... f1, g1, h1

  const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

  const COORDINATES = RANKS.map((rank) =>
    FILES.map((file) => ({ file, rank })),
  ).flat();

  const [coordinate, setCoordinate] = useState("");
  const [chess, setChess] = useState<Chess>(new Chess());

  return (
    <>
      {/* 보드 컨테이너 크기 지정 + relative */}
      <div className="w-full h-full md:w-[600px] md:h-[600px] relative">
        {/* 보드 배경 이미지 + 좌표축 */}
        <div className="bg-[url('https://road2gm.co.kr/assets/chess/boards/green.svg')] bg-no-repeat bg-cover">
          <Coords />
        </div>

        {/* 그리드 64칸 */}
        <div className="w-full h-full absolute top-0 left-0 grid grid-cols-8">
          {COORDINATES.map((square) => (
            <Square
              key={square.file + square.rank}
              file={square.file}
              rank={square.rank}
              onClick={() => {
                setCoordinate(square.file + square.rank);
                console.log("빈 칸 클릭");
              }}
            ></Square>
          ))}
        </div>

        {/* 기물 */}

        {chess
          .board()
          .map((line) =>
            line
              .filter((s) => s !== null)
              .map((i, j) => (
                <Piece
                  color={i.color}
                  type={i.type}
                  square={i.square}
                  key={j}
                />
              )),
          )}
      </div>
      <div className="mt-10">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-w px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdSkipPrevious />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-w px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdArrowBack />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-w px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdPlayArrow />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-w px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdArrowForward />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-w px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdSkipNext />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-w px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            flip
          </button>
        </span>
      </div>
      <div>
        <input value={coordinate} readOnly={true} />
      </div>
    </>
  );
};

export default ChessBoard;
