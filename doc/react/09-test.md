```
npm install --save-dev jest jest-environment-jsdom @types/jest @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

- `@testing-library/react`
리액트 컴포넌트 테스트를 위한 함소와 도구를 제공한다. 컴포넌트 렌더링, 화면에 표시된 요소 선택, 사용자 이벤트 발생시켜서 입력 테스트 등 작업을 할 수 있다.

- `@testing-library/jest-dom`
테스트를 위해 DOM 객체 접근할 수 있도록 도와준다.

- `@testing-library/user-event`
사용자가 실제로 컴포넌트와 상호작용하는 것처럼 시뮬레이션 테스트를 할 수 있는 도구를 제공한다. 일반적인 DOM 이벤트 외에도 키보드 입력, 포커스 이동 등을 시뮬레이션할 수 있다.

```
echo "import '@testing-library/jest-dom';" > src/setupTests.ts
```