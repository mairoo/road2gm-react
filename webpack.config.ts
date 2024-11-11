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
    path: path.resolve(__dirname, "dist"),
    filename: prod ? "[name].[contenthash].js" : "[name].js",
    chunkFilename: prod ? "chunks/[name].[chunkhash].js" : "chunks/[name].js",
    clean: true,
  },
  optimization: {
    minimize: prod,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ["console.log"],
            passes: 3,
            unsafe_math: true,
            unsafe_methods: true,
            collapse_vars: true,
            reduce_vars: true,
          },
          mangle: {
            safari10: true,
            toplevel: true,
          },
          format: {
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 2, // 초기 요청 수를 2개로 제한
      maxAsyncRequests: 3,
      minSize: 200000, // 최소 청크 크기 증가
      maxSize: 244000,
      cacheGroups: {
        // 단일 vendor 번들
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          priority: 20,
          chunks: "initial", // 초기 로드에만 포함
          enforce: true,
          reuseExistingChunk: true,
        },
        // 동적 임포트된 모듈
        async: {
          name: "async",
          test: /[\\/]node_modules[\\/]/,
          chunks: "async",
          priority: 10,
          reuseExistingChunk: true,
          minSize: 100000,
        },
        // 앱 코드
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: "runtime",
    },
    moduleIds: "deterministic",
    chunkIds: "deterministic",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|json)$/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"], // ts-loader가 처리하는 확장자 명시
        },
        exclude: /node_modules/,
        use: prod
          ? {
              loader: "babel-loader",
              options: {
                presets: [
                  [
                    "@babel/preset-env",
                    {
                      modules: false,
                      useBuiltIns: "usage",
                      corejs: 3,
                      targets: {
                        browsers: [">0.2%", "not dead", "not op_mini all"],
                      },
                    },
                  ],
                  ["@babel/preset-react", { runtime: "automatic" }],
                  "@babel/preset-typescript",
                ],
              },
            }
          : {
              loader: "ts-loader",
              options: {
                transpileOnly: true, // 개발 환경에서 타입 체크 속도 향상
                experimentalWatchApi: true,
              },
            },
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
      minify: prod
        ? {
            removeComments: true,
            collapseWhitespace: true,
            removeRedundantAttributes: true,
            useShortDoctype: true,
            removeEmptyAttributes: true,
            removeStyleLinkTypeAttributes: true,
            keepClosingSlash: true,
            minifyJS: true,
            minifyCSS: true,
            minifyURLs: true,
          }
        : false,
    }),
    new MiniCssExtractPlugin({
      filename: prod ? "css/[name].[contenthash].css" : "[name].css",
    }),
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
  stats: {
    chunks: true,
    modules: false,
    chunkModules: false,
    chunkOrigins: false,
  },
};

export default config;
