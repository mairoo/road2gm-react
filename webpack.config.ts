import CompressionPlugin from "compression-webpack-plugin";
import dotenv from "dotenv";

import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

const prod = process.env.NODE_ENV === "production";

// TS2353 Error fix: 'devServer' does not exist in type 'Configuration'
const devServer: webpackDevServer.Configuration = {
  port: 3000,
  hot: true, // HMR on
  compress: true, // 압축 번들링
  open: true, // 서버 시작 시 브라우저 자동 열기
  historyApiFallback: true, // 리액트 라우터 - 새로고침 오류 방지
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
    publicPath: "/", // 리액트 라우터 - 중첩 라우팅 지원 오류 방지
  },
  optimization: {
    minimize: prod,
    minimizer: [
      new TerserPlugin({
        // JS 코드 최소화
        terserOptions: {
          compress: {
            drop_console: prod, // 프로덕션에서 console.log 제거
          },
        },
      }),
    ],
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 20, // 초기 요청 수 제한
      maxAsyncRequests: 20, // 동적 요청 수 제한
      minSize: 40000, // 최소 청크 크기 증가
      maxSize: 244000, // 권장 최대 크기로 설정
      cacheGroups: {
        // React 관련 라이브러리
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types)[\\/]/,
          name: 'vendor.react',
          priority: 20,
          enforce: true,
        },
        // Redux 관련 라이브러리
        redux: {
          test: /[\\/]node_modules[\\/](@reduxjs|redux|react-redux)[\\/]/,
          name: 'vendor.redux',
          priority: 19,
          enforce: true,
        },
        // 라우터 관련 라이브러리
        router: {
          test: /[\\/]node_modules[\\/](react-router|react-router-dom|@remix-run)[\\/]/,
          name: 'vendor.router',
          priority: 18,
          enforce: true,
        },
        // 폼 관련 라이브러리
        forms: {
          test: /[\\/]node_modules[\\/](react-hook-form|yup|@hookform)[\\/]/,
          name: 'vendor.forms',
          priority: 17,
          enforce: true,
        },
        // 마크다운 관련 라이브러리
        markdown: {
          test: /[\\/]node_modules[\\/](react-markdown|remark-.*|unified|mdast-.*|micromark.*|unist-.*|vfile.*|hast-.*|property-information)[\\/]/,
          name: 'vendor.markdown',
          priority: 16,
          enforce: true,
        },
        // 체스 관련 라이브러리
        chess: {
          test: /[\\/]node_modules[\\/](react-chessboard|chess.js)[\\/]/,
          name: 'vendor.chess',
          priority: 15,
          enforce: true,
        },
        // UI 컴포넌트 라이브러리
        ui: {
          test: /[\\/]node_modules[\\/](@headlessui|react-icons|react-swipeable)[\\/]/,
          name: 'vendor.ui',
          priority: 14,
          enforce: true,
        },
        // 나머지 vendor 패키지들
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          priority: -20,
          enforce: true,
          reuseExistingChunk: true,
        },
        // 공통 모듈
        common: {
          name: 'common',
          minChunks: 2,
          priority: -30,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: 'single',
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
    // dotenv + Webpack.DefinePlugin = dotenv-webpack
    new webpack.DefinePlugin({
      "process.env": JSON.stringify(dotenv.config().parsed),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    }),
    new HtmlWebpackPlugin({
      template: "./index.html",
      // .env에서 읽은 설정을 HTML 문서에 주입 가능
      title: process.env.SITE_TITLE,
      meta: {
        viewport: "width=device-width, initial-scale=1",
        "theme-color": process.env.SITE_THEME_COLOR!,
      },
      favicon: process.env.SITE_FAVICON,
      minify: prod,
    }),
    new MiniCssExtractPlugin(),
    ...(prod
      ? [
          new CompressionPlugin({
            // Gzip 압축
            test: /\.(js|css|html|svg)$/,
            algorithm: "gzip",
          }),
        ]
      : []),
  ],
  devServer,
};

export default config;
