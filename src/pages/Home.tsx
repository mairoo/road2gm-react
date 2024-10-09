import React, { useMemo, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import _ from "lodash";

const Home = () => {
  const [game, setGame] = useState(new Chess());

  const onDrop = (
    sourceSquare: string,
    targetSquare: string,
    piece: string,
  ) => {
    // 객체 복사
    const gameCopy = _.cloneDeep(game);

    // 수를 두기
    try {
      gameCopy.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: piece[1].toLowerCase() ?? "q",
      });
    } catch (error) {
      console.debug(error);
      return false;
    } finally {
      setGame(gameCopy);
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

      <div className="md:w-96">
        <Chessboard
          boardOrientation="white"
          position={game.fen()}
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
      </div>
    </>
  );
};

export default Home;
