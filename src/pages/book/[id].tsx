import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface Section {
  id: string;
  title: string;
  page: number;
  level: number;
  sections?: Section[]; // 재귀적 구조를 위한 선택적 배열
}

interface TableOfContents {
  title: string;
  chapters: Section[];
}

const useBookParams = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const id = parseInt(bookId!, 10);

  if (isNaN(id)) {
    throw new Error("Invalid book ID");
  }

  return { id: id };
};

const BookDetailPage = () => {
  const { id } = useBookParams();

  const currentPage = 52; // 예시로 52페이지 설정
  const activeItemRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 페이지 로드 시 active 항목으로 스크롤
  useEffect(() => {
    if (activeItemRef.current && containerRef.current) {
      const container = containerRef.current;
      const activeItem = activeItemRef.current;

      // 컨테이너의 스크롤 가능한 높이
      const containerHeight = container.clientHeight;
      // active 항목의 상대적 위치
      const activeItemTop = activeItem.offsetTop;
      // active 항목의 높이
      const activeItemHeight = activeItem.clientHeight;

      // 스크롤 위치 계산 (active 항목이 중앙에 오도록)
      const scrollPosition =
        activeItemTop - containerHeight / 2 + activeItemHeight / 2;

      // 부드러운 스크롤 적용
      container.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, []);

  const tocData = {
    title: "프로그래밍 완벽 가이드",
    chapters: [
      {
        id: "chapter1",
        title: "시작하기",
        page: 1,
        level: 1,
        sections: [
          {
            id: "section1-1",
            title: "프로그래밍 기초",
            page: 2,
            level: 2,
            sections: [
              {
                id: "section1-1-1",
                title: "컴퓨터의 이해",
                page: 3,
                level: 3,
              },
            ],
          },
        ],
      },
      {
        id: "chapter2",
        title: "기본 개념",
        page: 20,
        level: 1,
        sections: [
          {
            id: "section2-1",
            title: "변수와 데이터",
            page: 21,
            level: 2,
          },
        ],
      },
      {
        id: "chapter3",
        title: "심화 학습",
        page: 45,
        level: 1,
        sections: [
          {
            id: "section3-1",
            title: "객체지향 프로그래밍",
            page: 46,
            level: 2,
            sections: [
              {
                id: "section3-1-1",
                title: "클래스와 객체",
                page: 47,
                level: 3,
              },
              {
                id: "section3-1-2",
                title: "상속과 다형성",
                page: 52,
                level: 3,
              },
            ],
          },
        ],
      },
      {
        id: "chapter4",
        title: "실전 프로젝트",
        page: 70,
        level: 1,
        sections: [
          {
            id: "section4-1",
            title: "웹 애플리케이션",
            page: 71,
            level: 2,
          },
        ],
      },
    ],
  };

  const RenderSection = ({
    section,
    level = 0,
  }: {
    section: Section;
    level?: number;
  }) => {
    const isActive = section.page === currentPage;
    const hasActivePage = section.sections?.some(
      (subSection) =>
        subSection.page === currentPage ||
        (subSection.sections &&
          subSection.sections.some((s) => s.page === currentPage)),
    );

    return (
      <li className="relative">
        {level > 0 && (
          <div
            className={`absolute left-0 top-0 h-full w-px
            ${hasActivePage ? "bg-blue-200" : "bg-gray-200"}`}
          />
        )}

        <div
          ref={isActive ? activeItemRef : null}
          className={`relative flex items-center py-2
            ${level > 0 ? "ml-4" : ""}
            ${isActive ? "text-blue-600 font-semibold" : "text-gray-700"}
            ${hasActivePage ? "text-blue-600" : ""}
            ${isActive ? "bg-blue-50 rounded-lg" : ""}`}
        >
          {level > 0 && (
            <div
              className={`absolute left-0 top-1/2 w-3 h-px
              ${hasActivePage ? "bg-blue-200" : "bg-gray-200"}`}
            />
          )}

          {isActive && (
            <div className="absolute -left-1.5 top-1/2 w-3 h-3 rounded-full bg-blue-500 transform -translate-y-1/2" />
          )}

          <div
            className={`flex justify-between items-center w-full 
            ${level > 0 ? "ml-4" : ""}`}
          >
            <span className={`${isActive ? "text-blue-600" : ""}`}>
              {section.title}
            </span>
            <span
              className={`ml-2 text-sm
              ${isActive ? "text-blue-600" : "text-gray-400"}`}
            >
              {section.page}
            </span>
          </div>
        </div>

        {section.sections && section.sections.length > 0 && (
          <ul className="ml-4">
            {section.sections.map((subSection) => (
              <RenderSection
                key={subSection.id}
                section={subSection}
                level={level + 1}
              />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold p-6 text-gray-800 border-b">
        {tocData.title}
      </h2>
      {/* 스크롤 가능한 컨테이너 추가 */}
      <div
        ref={containerRef}
        className="max-h-[600px] overflow-y-auto scroll-smooth"
      >
        <ul className="p-6 space-y-4">
          {tocData.chapters.map((chapter) => (
            <RenderSection key={chapter.id} section={chapter} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetailPage;
