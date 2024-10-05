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
import Piece from "./Piece";

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
      <div className="w-full h-full md:w-[600px] md:h-[600px] relative">
        {/* 보드 배경 이미지 + 좌표 축 */}
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
        <Piece color="BLACK" role="ROOK" file="a" rank="8" />
        <Piece color="BLACK" role="KNIGHT" file="b" rank="8" />
        <Piece color="BLACK" role="BISHOP" file="c" rank="8" />
        <Piece color="BLACK" role="QUEEN" file="d" rank="8" />
        <Piece color="BLACK" role="KING" file="e" rank="8" />
        <Piece color="BLACK" role="BISHOP" file="f" rank="8" />
        <Piece color="BLACK" role="KNIGHT" file="g" rank="8" />
        <Piece color="BLACK" role="ROOK" file="h" rank="8" />
        <Piece color="BLACK" role="PAWN" file="a" rank="7" />
        <Piece color="BLACK" role="PAWN" file="b" rank="7" />
        <Piece color="BLACK" role="PAWN" file="c" rank="7" />
        <Piece color="BLACK" role="PAWN" file="d" rank="7" />
        <Piece color="BLACK" role="PAWN" file="e" rank="7" />
        <Piece color="BLACK" role="PAWN" file="f" rank="7" />
        <Piece color="BLACK" role="PAWN" file="g" rank="7" />
        <Piece color="BLACK" role="PAWN" file="h" rank="7" />

        <Piece color="WHITE" role="ROOK" file="a" rank="1" />
        <Piece color="WHITE" role="KNIGHT" file="b" rank="1" />
        <Piece color="WHITE" role="BISHOP" file="c" rank="1" />
        <Piece color="WHITE" role="QUEEN" file="d" rank="1" />
        <Piece color="WHITE" role="KING" file="e" rank="1" />
        <Piece color="WHITE" role="BISHOP" file="f" rank="1" />
        <Piece color="WHITE" role="KNIGHT" file="g" rank="1" />
        <Piece color="WHITE" role="ROOK" file="h" rank="1" />
        <Piece color="WHITE" role="PAWN" file="a" rank="2" />
        <Piece color="WHITE" role="PAWN" file="b" rank="2" />
        <Piece color="WHITE" role="PAWN" file="c" rank="2" />
        <Piece color="WHITE" role="PAWN" file="d" rank="2" />
        <Piece color="WHITE" role="PAWN" file="e" rank="2" />
        <Piece color="WHITE" role="PAWN" file="f" rank="2" />
        <Piece color="WHITE" role="PAWN" file="g" rank="2" />
        <Piece color="WHITE" role="PAWN" file="h" rank="2" />
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
