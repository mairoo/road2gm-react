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
import Piece from "./Piece";
import Coords from "./Coords";

const ChessBoard = ({ flipped = false }: { flipped?: boolean }) => {
  // 좌표 순서 일차원 배열: a8, b8, c8, ... f1, g1, h1

  const FILES = flipped
    ? ["h", "g", "f", "e", "d", "c", "b", "a"]
    : ["a", "b", "c", "d", "e", "f", "g", "h"];
  const RANKS = flipped ? [1, 2, 3, 4, 5, 6, 7, 8] : [8, 7, 6, 5, 4, 3, 2, 1];

  const [coordinate, setCoordinate] = useState("");
  const [chess, setChess] = useState<Chess>(new Chess());

  console.log(flipped);

  return (
    <>
      {/* 보드 컨테이너 크기 지정 + relative */}
      <div className="w-full h-full md:w-[600px] md:h-[600px] relative">
        {/* 1. 보드 배경 이미지 + 좌표축 */}
        <div className="bg-[url('https://road2gm.co.kr/assets/chess/boards/green.svg')] bg-no-repeat bg-cover">
          <Coords ranks={RANKS} files={FILES} />
        </div>

        {/* 2. 그리드 64칸 */}
        <div className="w-full h-full absolute top-0 left-0 grid grid-cols-8">
          {RANKS.map((rank) => {
            return FILES.map((file) => {
              return (
                <Square
                  key={file + rank}
                  file={file}
                  rank={rank}
                  onClick={() => {
                    setCoordinate(file + rank);
                    console.log(`${file}${rank} 클릭`);
                  }}
                ></Square>
              );
            });
          })}
        </div>

        {/* 기물 놓기 */}
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
                  flipped={flipped}
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
