# prettier 적용

## 패키지 설치

```bash
npm i --save-dev --save--exact prettier
```

`--save-exact` 옵션은 패키지 버전에 따라 변화되는 내용으로 계속 불필요한 수준의 에러가 발생할 수 있으므로 공통된 조건으로 포맷팅하기 위해 자동 업데이트를 막는다. 프로젝트 협업 시 유용한 옵션이다.

## `.prettier.json` 파일 추가

```json
{
  "tabWidth": 2,
  "singleQuote": true,
  "semi": true,
  "arrowParens": "always",
  "trailingComma": "es5",
  "useTabs": false
}
```

## Webstorm 적용

Settings에서 Languages & Frameworks | JavaScript | Prettier에 들어가서 Automatic Prettier configuration 허용한다.