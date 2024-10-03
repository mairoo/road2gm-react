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
      <div className="w-96 h-96 relative">
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
        <div>
          <div
            className="bg-100% h-1/8 w-1/8 overflow-hidden absolute left-0 top-0 will-change-transform
           bg-[url('https://road2gm.co.kr/assets/chess/pieces/staunty/br.svg')]"
            draggable={true}
            onDragStart={(e) => {
              console.log("drag start piece", e);
            }}
            onDragOver={(e) => {
              // Drop 이벤트를 발생시키려면 반드시 dragOver 이벤트에서 preventDefault() 무효화 처리를 해야 한다.
              e.preventDefault();
            }}
            onDrop={(e) => {
              console.log("dropped on piece", e);
            }}
            onClick={() => {
              console.log("piece clicked");
            }}
          ></div>
        </div>
      </div>
      <div className="mt-2">
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
