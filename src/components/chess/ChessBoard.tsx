import React, { useState } from "react";
import Square from "./Square";
import {
  MdArrowBack,
  MdArrowForward,
  MdPlayArrow,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

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
      {/* 보드 컨테이너 크기 지정 relative */}
      <div className="w-[600px] h-[600px] relative">
        {/* 보드 이미지 + 그리드 64칸 */}
        <div
          className="grid grid-cols-8
        bg-[url('https://road2gm.co.kr/assets/chess/boards/blue.svg')] bg-no-repeat bg-cover"
        >
          {COORDINATES.map((square) => (
            <Square
              key={square.file + square.rank}
              onClick={() => {
                setCoordinate(square.file + square.rank);
                console.log("square clicked");
              }}
            ></Square>
          ))}
        </div>

        {/* 좌표 */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full absolute left-0 top-0"
        >
          <text x="0.75" y="3.5" fontSize="2.8" fill="#999">
            1
          </text>
          <text x="0.75" y="15.75" fontSize="2.8" fill="#eee">
            2
          </text>
          <text x="0.75" y="28.25" fontSize="2.8" fill="#999">
            3
          </text>
          <text x="0.75" y="40.75" fontSize="2.8" fill="#eee">
            4
          </text>
          <text x="0.75" y="53.25" fontSize="2.8" fill="#999">
            5
          </text>
          <text x="0.75" y="65.75" fontSize="2.8" fill="#eee">
            6
          </text>
          <text x="0.75" y="78.25" fontSize="2.8" fill="#999">
            7
          </text>
          <text x="0.75" y="90.75" fontSize="2.8" fill="#eee">
            8
          </text>
          <text x="10" y="99" fontSize="2.8" fill="#eee">
            h
          </text>
          <text x="22.5" y="99" fontSize="2.8" fill="#999">
            g
          </text>
          <text x="35" y="99" fontSize="2.8" fill="#eee">
            f
          </text>
          <text x="47.5" y="99" fontSize="2.8" fill="#999">
            e
          </text>
          <text x="60" y="99" fontSize="2.8" fill="#eee">
            d
          </text>
          <text x="72.5" y="99" fontSize="2.8" fill="#999">
            c
          </text>
          <text x="85" y="99" fontSize="2.8" fill="#eee">
            b
          </text>
          <text x="97.5" y="99" fontSize="2.8" fill="#999">
            a
          </text>
        </svg>

        {/* 기물 */}
        <div
          className="bg-100% h-1/8 w-1/8 overflow-hidden absolute left-0 top-0 will-change-transform
           bg-[url('https://road2gm.co.kr/assets/chess/pieces/staunty/br.svg')]"
          draggable={true}
          onDragStart={(e) => {
            console.log("drag start piece", e);
            e.dataTransfer.effectAllowed = "move";
          }}
          onDragOver={(e) => {
            // Drop 이벤트를 발생시키려면 반드시 dragOver 이벤트에서 preventDefault() 무효화 처리를 해야 한다.
            e.preventDefault();
          }}
          onDrop={(e) => {
            console.log("dropped on piece", e);
            e.dataTransfer.effectAllowed = "move";
          }}
          onClick={() => {
            console.log("piece clicked");
          }}
        ></div>
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
