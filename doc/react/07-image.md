# 리액트와 이미지 처리

직접 이미지 파일을 모듈로 불러와서 사용할 경우 로더를 설치하여 설정한다.

하지만 대부분의 경우 이미지는 별도의 CDN에서 처리하는 것이 효율적이고 편리하다.

# `url-loader`와 `file-loader`

패키지 설치

```bash
npm install --save-dev url-loader @svgr/webpack
```

* `file-loader`: 큰 파일
* `url-loader`: 작은 파일

`url-loader`의 장단점

* 이미지를 번들 파일에 포함하므로 큰 이미지가 포함되면 초기 로딩 시간이 늘어난다.
* 브라우저 캐시 사용 불가
* 메모리 사용 증가

`file-loader`의 장단점

* 초기 로딩 속도 증가
* 요청 용량 초과

`webpack.config.ts` 파일 수정

```
      {
        test: /\.(png|jpe?g|gif|svg|webp)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000, // 10000 바이트(약 10kb) 미만에만 인코딩 문자열 사용
              fallback: 'file-loader',
              name: 'image/[name].[ext]',
            },
          },
        ],
      },
```
