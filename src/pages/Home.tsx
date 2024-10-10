import React, { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import {
  MdArrowLeft,
  MdArrowRight,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlinePowerSettingsNew,
  MdRotateLeft,
} from "react-icons/md";

const Home = () => {
  const game = useMemo(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [orientation, setOrientation] = useState<"white" | "black">("white");

  const onDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string,
  ) => {
    if (game.isGameOver() || game.isDraw()) {
      return false;
    }
    try {
      game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
    } catch (error) {
      console.debug(error);
      return false;
    } finally {
      setGamePosition(game.fen());
    }
    return true;
  };

  const pieces = [
    "wP",
    "wN",
    "wB",
    "wR",
    "wQ",
    "wK",
    "bP",
    "bN",
    "bB",
    "bR",
    "bQ",
    "bK",
  ];
  const customPieces = useMemo(() => {
    const pieceComponents: { [key: string]: any } = {};
    pieces.forEach((piece) => {
      pieceComponents[piece] = ({ squareWidth }: { squareWidth: number }) => (
        <div
          style={{
            width: squareWidth,
            height: squareWidth,
            backgroundImage: `url(https://road2gm.co.kr/assets/chess/pieces/staunty/${piece}.svg)`,
            backgroundSize: "100%",
          }}
        />
      );
    });
    return pieceComponents;
  }, []);

  // 보드: 어두운 칸 / 밝은 칸
  // blue: #8ca2ad / #dee3e6
  // green: #86a666 / #ffffdd
  // brown: #b58863 / #f0d9b5

  return (
    <>
      <h1 className="text-3xl font-bold underline">Road2GM</h1>

      <div className="flex flex-col md:w-96">
        <Chessboard
          boardOrientation={orientation}
          position={gamePosition}
          onPieceDrop={onDrop}
          customBoardStyle={{
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
          }}
          customDarkSquareStyle={{
            backgroundColor: "#8ca2ad",
          }}
          customLightSquareStyle={{
            backgroundColor: "#dee3e6",
          }}
          customPieces={customPieces}
        />
        <div className="flex flex-row gap-x-4 m-4">
          <div className="flex-1">
            <button className="rounded bg-indigo-600 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MdKeyboardDoubleArrowLeft />
            </button>
          </div>
          <div className="flex-1">
            <button className="rounded bg-indigo-600 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MdArrowLeft />
            </button>
          </div>
          <div className="flex-1">
            <button className="rounded bg-indigo-600 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MdArrowRight />
            </button>
          </div>
          <div className="flex-1">
            <button className="rounded bg-indigo-600 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
          <div className="flex-1 text-center">
            <button
              className="rounded bg-indigo-600 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                setOrientation(orientation === "white" ? "black" : "white");
              }}
            >
              <MdRotateLeft />
            </button>
          </div>
          <div className="flex-1 text-center">
            <button
              className="rounded bg-indigo-600 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => {
                game.reset();
                setGamePosition(game.fen());
              }}
            >
              <MdOutlinePowerSettingsNew />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-x-4">
          <div className="flex-1">
            <button>PGN 내보내기</button>
          </div>
          <div className="flex-1">
            <button>PGN 불러오기</button>
          </div>
          <div className="flex-1">
            <button>FEN 내보내기</button>
          </div>
          <div className="flex-1">
            <button>FEN 불러오기</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
