import React from "react";

const Main = () => {
  return (
    <main className="flex-grow bg-gray-100">
      {/* 화면 폭
        - 모바일 (기본값): w-full 전체 화면 폭, max-w-none 최대 폭 제한 없음
        - 태블릿 768px 이상: md:max-w-7xl 최대폭 제한
        - 모든 화면 크기에서 mx-auto: 컨테이너 가운데 정렬
         */}
      <div className="mx-auto w-full max-w-none md:max-w-7xl">
        <h2 className="text-xl font-semibold mb-4">Welcome to my website</h2>
        <p>
          This is the main content area. It will scroll if there's too much
          content.
        </p>
        {/* 스크롤 테스트를 위한 더미 컨텐츠 */}
        {[...Array(60)].map((_, i) => (
          <p key={i} className="my-2">
            This is paragraph {i + 1}
          </p>
        ))}
      </div>
    </main>
  );
};

export default Main;
