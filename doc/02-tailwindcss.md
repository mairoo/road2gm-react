# CSS 스타일 방법 3가지

- 모듈 CSS: `Button.module.css`
- 스타일 컴포넌트: `styled.button`
- tailwindcss

# 일반 CSS 사용

## 패키지 설치

```bash  
npm install --save-dev style-loader css-loader postcss-loader mini-css-extract-plugin
```

- `style-loader`: CSS 내용을 `<style>` 태그로 HTML 문서에 주입한다.
- `css-loader`: CSS 파일을 JS 모듈로 불러와 접근 가능
- `mini-css-extract-plugin`: 별도 CSS 파일로 추출해서 관리한다. 당연히 `style-loader`와 `MiniCssExtractPlugin.loader`는 동시 사용할 수 없다.
  `style-loader` 패키지는 삭제해도 되지만 개발 의존성(devDependencies)이라서 운영 배포에는 영향 없으므로 그냥 남겨둔다.
- `postcss-loader`: tailwindcss 의존성

## `src/tailwind.css` 파일 생성

```css  
body {
    color: blue;
}
```

## `src/index.tsx` 파일 수정

```tsx  
import {createRoot} from 'react-dom/client';

// 아래 부분 추가  
import './tailwind.css';

// ... 생략  
```

여기까지 하고 서버를 재시작하면 CSS를 처리할 로더가 없다고 에러가 발생한다.

```
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders
```

## `webpack.config.js` 파일 수정 - 세 군데

```js  
// (1) 모듈 선언 추가
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

module.exports = {
    // ... 생략
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    prod ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader', 'postcss-loader',
                ],
            },
        ],
    },
    // ... 생략
    plugins: [
        new HtmlWebpackPlugin({template: './index.html'}),
        new MiniCssExtractPlugin(),
    ],
};
```  

# Tailwind 사용

## 패키지 설치

```bash  
npm install --save-dev tailwindcss autoprefixer postcss postcss-loader
```  

## `postcss.config.js`, `tailwind.config.js` 파일 생성

```bash  
npx tailwindcss init -p
```  

만들어진 두 파일의 확장자를 ts로 바꾼다.

`tailwind.config.ts` 파일에서 `content` 속성을 수정한다.

```ts  
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx}'],
    theme: {
        extend: {},
    },
    plugins: [],
};
```

## `src/tailwind.css` 파일 수정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## `src/index.tsx` 파일 수정

```tsx
// ... 생략

root.render(
    <StrictMode>
        // tailwind CSS 문법 사용
        <h1 className="text-3xl font-bold underline">Road2GM</h1>
    </StrictMode>
);
```

# Headless UI, 리액트 아이콘, classnames

```bash
npm install --save-dev @headlessui/react @tailwindcss/forms @tailwindcss/typography classnames
```

## tailwindcss 플러그인 적용

`tailwind.config.ts` 파일 수정

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx}'],
    theme: {
        extend: {},
    },
    // 아래 줄 추가
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

## `animate-shimmer` 적용

`tailwind.config.ts` 파일 수정

```ts
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,tsx}'],
    theme: {
        extend: {
            // 여기서부터 추가
            keyframes: {
                shimmer: {
                    '100%': {transform: 'translateX(100%)'},
                },
            },
            animation: {
                shimmer: 'shimmer 1.5s infinite',
            },
            // 여기까지 추가
        },
    },
    plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography')],
};
```

# tailwind 실무

https://medium.com/@imanshurathore/best-practises-for-tailwind-css-in-react-ae2f5e083980
