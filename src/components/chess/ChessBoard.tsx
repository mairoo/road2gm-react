import React, { useState } from "react";
import Square from "./Square";
import {
  MdArrowBack,
  MdArrowForward,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";
import Coords from "./Coords";

const ChessBoard = () => {
  // 좌표 순서 일차원 배열: a8, b8, c8, ... f1, g1, h1

  const FILES = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const RANKS = [8, 7, 6, 5, 4, 3, 2, 1];

  const COORDINATES = RANKS.map((rank) =>
    FILES.map((file) => ({ file, rank })),
  ).flat();

  const [coordinate, setCoordinate] = useState("");

  return (
    <>
      {/* 보드 컨테이너 크기 지정 + relative */}
      <div className="w-full h-full md:w-[400px] md:h-[400px] relative">
        {/* 보드 배경 이미지 + 좌표 */}
        <div className="bg-[url('https://road2gm.co.kr/assets/chess/boards/blue.svg')] bg-no-repeat bg-cover">
          <Coords />
        </div>

        {/* 그리드 64칸 */}
        <div className="w-full h-full absolute top-0 left-0 grid grid-cols-8">
          {COORDINATES.map((square) => (
            <Square
              key={square.file + square.rank}
              onClick={() => {
                setCoordinate(square.file + square.rank);
                console.log("빈 칸 클릭");
              }}
            ></Square>
          ))}
        </div>

        {/* 기물 */}
        <div className="w-full h-full absolute left-0 top-0">
          <div
            className="bg-100% h-1/8 w-1/8 overflow-hidden cursor-grab will-change-transform
           bg-[url('https://road2gm.co.kr/assets/chess/pieces/staunty/br.svg')] translate-x-[700%]"
            draggable={true}
            onDragStart={(e) => {
              console.log("기물 드래그 시작", e);

              e.dataTransfer.effectAllowed = "move";
            }}
            onDragOver={(e) => {
              // Drop 이벤트를 발생시키려면 반드시 dragOver 이벤트에서 preventDefault() 무효화 처리를 해야 한다.
              e.preventDefault();
            }}
            onDrop={(e) => {
              console.log("기물에 드롭", e);
              e.dataTransfer.effectAllowed = "move";
            }}
            onClick={() => {
              console.log("기물 클릭");
            }}
          ></div>
        </div>
      </div>
      <div className="mt-10">
        <span className="isolate inline-flex rounded-md shadow-sm">
          <button
            type="button"
            className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdSkipPrevious />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdArrowBack />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdPlayArrow />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdArrowForward />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
          >
            <MdSkipNext />
          </button>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
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
