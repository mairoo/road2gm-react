import React from "react";

const Coords = ({ ranks, files }: { ranks: number[]; files: string[] }) => {
  return (
    <svg viewBox="0 0 100 100">
      {ranks.map((rank, index) => {
        return (
          <text
            x="0.5"
            y={3 + index * 12.5}
            fontSize="2.8"
            fill={index % 2 === 0 ? "#7a9db2" : "#c5d5dc"}
            key={rank}
          >
            {rank}
          </text>
        );
      })}
      {files.map((file, index) => {
        return (
          <text
            x={10 + index * 12.5}
            y="99"
            fontSize="2.8"
            fill={index % 2 === 0 ? "#7a9db2" : "#c5d5dc"}
            key={file}
          >
            {file}
          </text>
        );
      })}
    </svg>
  );
};

export default Coords;
