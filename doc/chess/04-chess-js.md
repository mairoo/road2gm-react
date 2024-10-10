# chess.js 라이브러리

FEN, PGN 파일 포맷 조작 및 수 유효성 검사 등을 처리한다.

## 설치
```
npm install chess.js
```

라이브러리 이름이 `chess`가 아니라 `chess.js`이다.

### 기본 사용법
```ts
import { Chess } from 'chess.js';


const chess = new Chess();

// fool's mate
chess.move('e4');
console.log(chess.fen());
chess.move('g5');
console.log(chess.fen());
chess.move('Nc3');
console.log(chess.fen());
chess.move('f5');
console.log(chess.fen());
chess.move('Qh5');
console.log(chess.fen());

console.log(chess.pgn());

console.log(chess.isGameOver());

// PGN 수 이력 이동 처리
console.log(chess.history({verbose: true}));
```