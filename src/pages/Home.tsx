import React, { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import {
  MdArrowLeft,
  MdArrowRight,
  MdDelete,
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
  MdOutlineFileDownload,
  MdOutlineFileUpload,
  MdOutlinePowerSettingsNew,
  MdRotateLeft,
} from "react-icons/md";
import ReactMarkdown from "react-markdown";

const Home = () => {
  const game = useMemo(() => new Chess(), []);
  const [gamePosition, setGamePosition] = useState(game.fen());
  const [orientation, setOrientation] = useState<"white" | "black">("white");
  const [historyNumber, setHistoryNumber] = useState<number>(0);
  const [history, setHistory] = useState(game.history({ verbose: true }));

  const markdown = `
# 기본 마크다운 예제

이것은 **굵은** 텍스트이고, 이것은 *기울어진* 텍스트입니다.

- 목록 항목 1
- 목록 항목 2
  - 중첩된 항목

[링크 예제](https://www.example.com)
  `;

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
      setHistory(game.history({ verbose: true }));
      setHistoryNumber(historyNumber + 1);
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
      <h2 className="text-xl font-semibold">Welcome to Road2GM</h2>

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
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                if (historyNumber > 0 && history.length > 0) {
                  // 첫수
                  setGamePosition(history[0].before);
                }

                setHistoryNumber(0);
              }}
            >
              <MdKeyboardDoubleArrowLeft />
            </button>
          </div>
          <div className="flex-1">
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                if (historyNumber > 0 && history.length > 0) {
                  // 이전
                  setGamePosition(history[historyNumber - 1].before);
                  setHistoryNumber(historyNumber - 1);
                }
              }}
            >
              <MdArrowLeft />
            </button>
          </div>
          <div className="flex-1">
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                if (history.length > 0 && historyNumber < history.length) {
                  // 다음
                  setGamePosition(history[historyNumber].after);
                  setHistoryNumber(historyNumber + 1);
                }
              }}
            >
              <MdArrowRight />
            </button>
          </div>
          <div className="flex-1">
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                if (history.length > 0 && historyNumber < history.length) {
                  // 마지막
                  setGamePosition(history[history.length - 1].after);
                  setHistoryNumber(history.length);
                }
              }}
            >
              <MdKeyboardDoubleArrowRight />
            </button>
          </div>
          <div className="flex-1">
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                game.undo();
                setGamePosition(game.fen());
                setHistory(game.history({ verbose: true }));
                setHistoryNumber(history.length - 1);
              }}
            >
              <MdDelete />
            </button>
          </div>
          <div className="flex-1">
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                setOrientation(orientation === "white" ? "black" : "white");
              }}
            >
              <MdRotateLeft />
            </button>
          </div>
          <div className="flex-1 text-center">
            <button
              className="rounded bg-teal-700 px-2 py-1 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"
              onClick={() => {
                game.reset();
                setGamePosition(game.fen());
                setHistory(game.history({ verbose: true }));
                setHistoryNumber(0);
              }}
            >
              <MdOutlinePowerSettingsNew />
            </button>
          </div>
        </div>
        <div className="flex flex-row gap-x-4 text-center">
          <div className="flex-1">
            <button className="inline-flex items-center gap-x-1.5 rounded bg-teal-700 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
              <MdOutlineFileDownload />
              PGN
            </button>
          </div>
          <div className="flex-1">
            <button className="inline-flex items-center gap-x-1.5 rounded bg-teal-700 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
              <MdOutlineFileUpload />
              PGN
            </button>
          </div>
          <div className="flex-1">
            <button className="inline-flex items-center gap-x-1.5 rounded bg-teal-700 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
              <MdOutlineFileDownload />
              FEN
            </button>
          </div>
          <div className="flex-1">
            <button className="inline-flex items-center gap-x-1.5 rounded bg-teal-700 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700">
              <MdOutlineFileUpload />
              FEN
            </button>
          </div>
        </div>
        <div>
          <ReactMarkdown>{markdown}</ReactMarkdown>
        </div>
      </div>
    </>
  );
};

export default Home;
