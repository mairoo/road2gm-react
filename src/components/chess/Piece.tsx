import React from "react";
import className from "classnames";

const Piece = ({
  color,
  role,
  file,
  rank,
}: {
  color: string;
  role: string;
  file: string;
  rank: string;
}) => {
  // tailwind가 동적 클래스 이름을 지원하지 않는 이유
  // 수많은 CSS 클래스가 있어서 최적화를 위해 애플리케이션에서 사용하지 않는 클래스는 모두 제거하고 정적 CSS 파일을 생성한다.
  // 이 때 동적 클래스 이름은 모두 누락이 되므로 실제 실행하면 속성이 없다.
  // 해결 방법은 정적 클래스 이름만 사용하도록 코드를 수정하거나 `tailwind.config.js` 파일에서 safelist를 두는 것이다.

  const IMAGE: { [key: string]: { [key: string]: string } } = {
    BLACK: {
      KING: "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/bk.svg)]",
      QUEEN:
        "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/bq.svg)]",
      ROOK: "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/br.svg)]",
      BISHOP:
        "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/bb.svg)]",
      KNIGHT:
        "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/bn.svg)]",
      PAWN: "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/bp.svg)]",
    },
    WHITE: {
      KING: "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/wk.svg)]",
      QUEEN:
        "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/wq.svg)]",
      ROOK: "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/wr.svg)]",
      BISHOP:
        "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/wb.svg)]",
      KNIGHT:
        "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/wn.svg)]",
      PAWN: "bg-[url(https://road2gm.co.kr/assets/chess/pieces/staunty/wp.svg)]",
    },
  };

  const FILE: { [key: string]: string } = {
    a: "",
    b: "translate-x-[100%]",
    c: "translate-x-[200%]",
    d: "translate-x-[300%]",
    e: "translate-x-[400%]",
    f: "translate-x-[500%]",
    g: "translate-x-[600%]",
    h: "translate-x-[700%]",
  };

  const RANK: { [key: string]: string } = {
    8: "",
    7: "translate-y-[100%]",
    6: "translate-y-[200%]",
    5: "translate-y-[300%]",
    4: "translate-y-[400%]",
    3: "translate-y-[500%]%",
    2: "translate-y-[600%]",
    1: "translate-y-[700%]",
  };

  return (
    <div
      className={className(
        "bg-100% h-1/8 w-1/8 overflow-hidden cursor-grab absolute left-0 top-0",
        IMAGE[color][role],
        FILE[file],
        RANK[rank],
      )}
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
        console.log(`${file}${rank} 기물 자리에 드롭`);
        e.dataTransfer.effectAllowed = "move";
      }}
      onClick={() => {
        console.log("기물 클릭");
      }}
    ></div>
  );
};

export default Piece;
