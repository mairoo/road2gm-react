import path from "path";

import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const prod = process.env.NODE_ENV === "production";

// TS2353 Error fix: 'devServer' does not exist in type 'Configuration'
const devServer: webpackDevServer.Configuration = {
  port: 3000,
  hot: true, // HMR on
  compress: true, // 압축 번들링
  open: true, // 서버 시작 시 브라우저 자동 열기
};

const config: webpack.Configuration = {
  mode: prod ? "production" : "development",
  devtool: prod ? false : "source-map", // 소스 맵 포함 시 번들 크기가 매우 크다.

  entry: {
    main: "./src/index.tsx", // 번들링 엔트리 포인트
  },
  output: {
    // 번들링 main.js 파일 저장되는 경로 (예, dist/main.js)
    path: path.resolve(__dirname, "dist"),
    clean: true, // dist-clean 후 빌드
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|json)$/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"], // ts-loader가 처리하는 확장자 명시
        },
        exclude: /node_modules/,
        use: prod ? "babel-loader" : "ts-loader",
      },
      {
        test: /\.css$/i,
        use: [
          prod ? MiniCssExtractPlugin.loader : "style-loader", // 배포 시 CSS 파일 추출 분리
          "css-loader", // CSS 파일을 JS 모듈로 불러와 접근 가능
          "postcss-loader", // tailwind 처리
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({ template: "./index.html" }),
    new MiniCssExtractPlugin(),
  ],
  devServer,
};

export default config;
