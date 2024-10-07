import React from "react";
import ChessBoard from "../components/chess/ChessBoard";

const Home = () => {
  return (
    <>
      <h1 className="text-3xl font-bold underline">Road2GM</h1>
      <ChessBoard flipped={true} />
    </>
  );
};

export default Home;
