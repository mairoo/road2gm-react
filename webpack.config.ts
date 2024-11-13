import CompressionPlugin from "compression-webpack-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
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
    template: "./index.html", // .env에서 읽은 설정을 HTML 문서에 주입 가능
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
  new webpack.IgnorePlugin({
    resourceRegExp: /^\.\/locale$/,
    contextRegExp: /moment$/,
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
      threshold: 10240, // 10KB 이상인 파일만 압축
      minRatio: 0.8,
    }),
  );
}

const config: webpack.Configuration = {
  mode: prod ? "production" : "development",
  devtool: prod ? false : "eval-cheap-module-source-map", // 소스 맵 포함 시 번들 크기가 매우 크다.

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
    sideEffects: true, // 순수 함수 외의 모듈에서 부작용을 제거
    minimize: prod,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: [
              "console.log",
              "console.info",
              "console.debug",
              "console.warn",
            ],
            passes: 2,
            unsafe_math: true,
            unsafe_methods: true,
            collapse_vars: true,
            reduce_vars: true,
            module: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            unused: true,
          },
          mangle: {
            safari10: true,
            toplevel: true,
            properties: {
              regex: /^_/, // '_'로 시작하는 프로퍼티만 망글링
            },
          },
          format: {
            comments: false,
            ascii_only: true,
          },
        },
        extractComments: false,
      }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: {
      chunks: "all",
      maxInitialRequests: 5,
      maxAsyncRequests: 5,
      minSize: 20000,
      maxSize: 244000,
      cacheGroups: {
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
          name: "react-vendor",
          chunks: "all",
          priority: 40,
          enforce: true,
        },
        icons: {
          test: /[\\/]node_modules[\\/]react-icons[\\/]/,
          name: "icons",
          chunks: "async",
          priority: 35,
        },
        redux: {
          test: /[\\/]node_modules[\\/]@?redux.*[\\/]/,
          name: "redux",
          chunks: "async",
          priority: 30,
        },
        libs: {
          test: /[\\/]node_modules[\\/]/,
          name(module: any) {
            const packageName = module.context.match(
              /[\\/]node_modules[\\/](.*?)([\\/]|$)/,
            )[1];
            return `lib.${packageName.replace("@", "")}`;
          },
          chunks: "async",
          priority: 20,
          minSize: 100000,
        },
        chess: {
          test: /[\\/]node_modules[\\/](react-chessboard|chess\.js)[\\/]/,
          name: "chess-vendor",
          chunks: "async",
          priority: 40,
        },
        markdown: {
          test: /[\\/]node_modules[\\/](micromark|micromark-extension-gfm)[\\/]/,
          name: "markdown-vendor",
          chunks: "async",
          priority: 40,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          minSize: 30000,
        },
      },
    },
    runtimeChunk: "single",
    moduleIds: "deterministic",
    chunkIds: "deterministic",
  },
  module: {
    rules: [
      {
        test: /\.(tsx|ts|jsx|js|json)$/,
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
        exclude: /node_modules/,
        use: prod
          ? {
              loader: "babel-loader",
              options: {
                cacheDirectory: true,
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
                plugins: [
                  "@babel/plugin-transform-runtime",
                  "babel-plugin-transform-remove-console",
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
          {
            loader: "css-loader", // CSS 파일을 JS 모듈로 불러와 접근 가능
            options: {
              importLoaders: 1,
              modules: {
                auto: true,
                localIdentName: prod
                  ? "[hash:base64]"
                  : "[local]_[hash:base64:5]",
              },
            },
          },
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
