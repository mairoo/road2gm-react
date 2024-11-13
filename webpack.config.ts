import CompressionPlugin from "compression-webpack-plugin";
import dotenv from "dotenv";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import TerserPlugin from "terser-webpack-plugin";
import webpack from "webpack";
import webpackDevServer from "webpack-dev-server";

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

// Webpack Plugin 타입 정의
type WebpackPlugin =
  | webpack.DefinePlugin
  | HtmlWebpackPlugin
  | MiniCssExtractPlugin
  | typeof BundleAnalyzerPlugin
  | CompressionPlugin;

const prod = process.env.NODE_ENV === "production";
const analyze = process.env.ANALYZE === "true";

// TS2353 Error fix: 'devServer' does not exist in type 'Configuration'
const devServer: webpackDevServer.Configuration = {
  port: 3000,
  hot: true, // HMR on
  compress: true, // 압축 번들링
  open: true, // 서버 시작 시 브라우저 자동 열기
  historyApiFallback: true, // 리액트 라우터 - 새로고침 오류 방지
};

const plugins = [
  // dotenv + Webpack.DefinePlugin = dotenv-webpack
  // 아래 코드 process.env.NODE_ENV 부분은 순환참조된 것이 아님.
  // 이 코드는 Webpack의 DefinePlugin을 사용하여 단순히 현재 실행 중인 노드 애플리케이션의 환경(process.env 객체)을 정의
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
].filter(Boolean) /* falsy 값 제거 */ as WebpackPlugin[];

if (analyze) {
  plugins.push(new BundleAnalyzerPlugin());
}

if (prod) {
  plugins.push(
    new CompressionPlugin({
      test: /\.(js|css|html|svg)$/,
      algorithm: "gzip",
    }),
  );
}

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
    usedExports: true, // tree shaking for react-icons ...
    sideEffects: false, // 순수 함수 외의 모듈에서 부작용을 제거
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
                      modules: false, // ES6 모듈 구문 유지하여 웹팩 Tree Shaking 기능을 보다 효과적으로 활용
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
  plugins,
  devServer,
  stats: {
    // 출력정보
    chunks: true,
    modules: false,
    chunkModules: false,
    chunkOrigins: false,
  },
};

export default config;
