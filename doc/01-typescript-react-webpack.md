# Git 저장소 준비

## 이미 원격 저장소가 있는 경우

```bash
git clone git@github.com-mairoo:mairoo/road2gm-react.git
```

## 로컬 저장소 만들고 원격 저장소에 연결

```bash
mkdir road2gm-react
cd road2gm-react
git init
```

다중 계정을 위해서 Host alias 지정 (github.com-mairoo)

```bash
git remote add origin git@github.com-mairoo:mairoo/road2gm-react.git
git remote -v
git branch --set-upstream-to=origin/main main
```

# Node.js 프로젝트 생성

```bash
npm init -y
```  

# 패키지 설치

## 타입스크립트 컴파일 - ts-loader

```bash
npm install --save-dev typescript ts-loader source-map-loader sucrase
```  

`ts-loader`는 웹팩이 `tsconfig.json` 파일의 규칙에 따라 타입스크립트 코드를 컴파일한다.  
참고로 `ts-loader`가 타입스크립트의 유일한 로더는 아니다.

`source-map-loader`는 타입스크립트의 소스맵 출력을 사용하여 웹팩에 알려주고 기존의 타입스크립트 소스코드 디버깅 하듯이 최종 출력파일을 디버깅할 수도 있다.

`sucrase`는 `webpack.config.ts` 파일을 실행시키기 위해 필요하다. 사실 `tailwindcss` 패키지 설치 시 의존성 패키지로 설치되기도 한다.

```bash
npm install --save file-loader
```

`file-loader`는 이미지 파일 등을 불러오는데 사용한다. 이미지 전송은 CDN이나 s3 서비스 등을 이용할 경우 `file-loader`는 설치하지 않을 수 있다.

# 타입스크립트 컴파일 - babel-loader

개발 시 강력한 타입 검사로 `ts-loader`를 사용하고 운영 배포 시 `babel-loader`를 사용해서 빠른 컴파일 속도의 장점을 이용한다.

```bash
npm install --save-dev babel-loader @babel/core @babel/preset-react @babel/preset-typescript @babel/preset-env
```

`babel.config.json` 파일 생성

```json
{
  "presets": [
    [
      "@babel/preset-env"
    ],
    [
      "@babel/preset-react",
      {
        "runtime": "automatic"
      }
    ],
    [
      "@babel/preset-typescript"
    ]
  ]
}
```

## 리액트

```bash
npm install --save react react-dom
npm install --save-dev @types/react @types/react-dom
```  

## 웹팩

```bash  
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save-dev @types/webpack
```

* `webpack` : 웹팩 코어
    * 하나의 js 파일로 압축 및 최적화하여 번들
    * Babel을 쓰면 ES6/ES7 자바스크립트 코드도 사용 가능
* `webpack-cli` : 터미널에서 웹팩 커맨드를 실행할 수 있도록 하는 도구
* `webpack-dev-server` : 디스크에 저장되지 않는 메모리 컴파일을 사용하는 개발 서버
    * mode 명시 (production 또는 development)
    * HMR(Hot Module Replacement) 기능 사용 가능
* `html-webpack-plugin`: 템플릿을 토대로 번들링된 자바스크립트와 CSS 파일을 `index.html` 파일에 주입
    * `template`: 웹팩이 생성하는 HTML 파일을 위한 템플릿 HTML 파일
    * `filename`: 웹팩이 생성하는 HTML 파일의 이름
    * `minify`: HTML 파일 크기 최소화

# 프로젝트 루트 필수 파일 3가지

* `tsconfig.json`: 타입스크립트 설정 파일
* `webpack.config.js`: 웹팩 설정 파일
* `index.html`: 인덱스 HTML 문서

## `tsconfig.json` 파일 생성

```bash  
npx tsc --init

Created a new tsconfig.json with:                                                                                       
                                                                                                                     TS 
  target: es2016
  module: commonjs
  strict: true
  esModuleInterop: true
  skipLibCheck: true
  forceConsistentCasingInFileNames: true


You can learn more at https://aka.ms/tsconfig
```  

* `target`: `es2016` 타입스크립트 컴파일된 자바스크립트 코드가 호환되는 버전
* `jsx`: `react-jsx` - JSX 코드 처리 방식으로 리액트 17 이상 버전 지원
* `module`:
    * `esnext` (권장) - import 문법
    * `commonjs`: IE 호환 require 문법
* `moduleResolution`
    * `bundler` (권장): 타입스크립트에게 코드가 다른 툴에 의해 번들링 될 것이므로 규칙을 완화 (단, 모듈 es2015 이상)
    * `nodenext`, `node16`
    * `node10`, `node`, `classic`은 더 이상 사용 안 함
* `sourceMap`: true - 디버깅할 때 유용
* `"exclude": ["node_modules"]`

## `webpack.config.ts` 파일 생성

```ts
import path from 'path';

import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

import HtmlWebpackPlugin from 'html-webpack-plugin';

const prod = process.env.NODE_ENV === 'production';

// TS2353 Error fix: 'devServer' does not exist in type 'Configuration'
const devServer: webpackDevServer.Configuration = {
    port: 3000,
    hot: true, // HMR on
    compress: true, // 압축 번들링
    open: true, // 서버 시작 시 브라우저 자동 열기
};

const config: webpack.Configuration = {
    mode: prod ? 'production' : 'development',
    devtool: prod ? false : 'source-map', // 소스 맵 포함 시 번들 크기가 매우 크다.

    entry: {
        main: './src/index.tsx', // 번들링 엔트리 포인트
    },
    output: {
        // 번들링 main.js 파일 저장되는 경로 (예, dist/main.js)
        path: path.resolve(__dirname, 'dist'),
        clean: true, // dist-clean 후 빌드
    },
    module: {
        rules: [
            {
                test: /\.(tsx|ts|jsx|js|json)$/,
                resolve: {
                    extensions: ['.ts', '.tsx', '.js', '.json'], // ts-loader가 처리하는 확장자 명시
                },
                exclude: /node_modules/,
                use: prod ? 'babel-loader' : 'ts-loader',
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/i, // `file-loader` 사용 시 추가
                use: ['file-loader'],
            },
        ],
    },
    plugins: [new HtmlWebpackPlugin({template: './index.html'})],
    devServer,
};

export default config;
```

## `index.html` 파일 생성

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <title>Road2GM</title>
</head>
<body>
<noscript>애플리케이션 실행을 위해 반드시 자바스크립트를 허용해야 합니다.</noscript>
<div id='root'>앱 로딩 중 ...</div>
</body>
</html>
```

# 리액트 타입스크립트 코드 작성

## `src/index.tsx` 파일 생성

```tsx  
import React from 'react';
import {createRoot} from 'react-dom/client';

const container = document.getElementById('root');

if (container === null) {
    throw new Error('#root element not found');
}

const root = createRoot(container);

root.render(
    <React.StrictMode>
        <h1>Road2GM</h1>
    </React.StrictMode>
);
```  

# 테스트

## `package.json` 스크립트 명령어 추가

```
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    /* 아래 두 줄 추가 */
    "build": "NODE_ENV=production webpack",
    "dev": "NODE_ENV=development webpack serve"
  }
}
```

빌드는 `production` 모드로 실행하고 테스트 서버는 `development` 모드로 실행하도록 환경변수를 설정한다.

## 서버 실행 및 브라우저 확인

```bash  
npm run dev
```