import React, { useMemo } from "react";
import { Chessboard } from "react-chessboard";

const Home = () => {
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

  return (
    <>
      <h1 className="text-3xl font-bold underline">Road2GM</h1>
      <Chessboard
        boardOrientation="black"
        customBoardStyle={{
          borderRadius: "4px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.5)",
        }}
        customDarkSquareStyle={{
          backgroundColor: "#779952",
        }}
        customLightSquareStyle={{
          backgroundColor: "#edeed1",
        }}
        customPieces={customPieces}
      />
    </>
  );
};

export default Home;
