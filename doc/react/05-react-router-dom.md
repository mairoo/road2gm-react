# 리액트 라우터

```bash
npm install react-router-dom
npm install --save-dev @types/react-router-dom
```

`webpack.config.ts` 파일에서 리액트 라우터 사용 시 오류 방지를 위해 두 줄 추가한다.

```ts
// ... 생략

// TS2353 Error fix: 'devServer' does not exist in type 'Configuration'
const devServer: webpackDevServer.Configuration = {
    port: 3000,
    hot: true, // HMR on
    compress: true, // 압축 번들링
    open: true, // 서버 시작 시 브라우저 자동 열기
    historyApiFallback: true, // (1) 추가: 리액트 라우터 - 새로고침 오류 방지
};

const config: webpack.Configuration = {

    // ... 생략
    output: {
        // 번들링 main.js 파일 저장되는 경로 (예, dist/main.js)
        path: path.resolve(__dirname, 'dist'),
        clean: true, // dist-clean 후 빌드
        publicPath: '/', // (2) 추가: 리액트 라우터 - 중첩 라우팅 지원 오류 방지
    },

    // ... 생략
};

// ... 생략
```