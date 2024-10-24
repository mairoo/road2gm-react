import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Section } from "../../types";
import { printToc } from "../../utils/toc";
import { useScrollToCenter } from "../../hooks/useScroll";
import { useToc } from "../../hooks/useToc";

const useBookParams = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const id = parseInt(bookId!, 10);

  if (isNaN(id)) {
    throw new Error("Invalid book ID");
  }

  return { id: id };
};

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
          title:
            "11-06 사전 훈련된 워드 임베딩을 이용한 의도 분류(Intent Classification using Pre-trained Word Embedding)",
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
    {
      id: "chapter5",
      title: "실전 프로젝트",
      page: 70,
      level: 1,
      sections: [
        {
          id: "section5-1",
          title: "웹 애플리케이션",
          page: 71,
          level: 2,
        },
      ],
    },
    {
      id: "chapter6",
      title: "실전 프로젝트",
      page: 70,
      level: 1,
      sections: [
        {
          id: "section6-1",
          title: "웹 애플리케이션",
          page: 71,
          level: 2,
        },
      ],
    },
    {
      id: "chapter7",
      title: "실전 프로젝트",
      page: 70,
      level: 1,
      sections: [
        {
          id: "section7-1",
          title: "웹 애플리케이션",
          page: 71,
          level: 2,
        },
      ],
    },
    {
      id: "chapter8",
      title: "실전 프로젝트",
      page: 70,
      level: 1,
      sections: [
        {
          id: "section8-1",
          title: "웹 애플리케이션",
          page: 71,
          level: 2,
        },
      ],
    },
    {
      id: "chapter9",
      title: "실전 프로젝트",
      page: 70,
      level: 1,
      sections: [
        {
          id: "section9-1",
          title: "웹 애플리케이션",
          page: 99,
          level: 2,
        },
      ],
    },
  ],
};

const BookDetailPage = () => {
  const { id } = useBookParams();

  const currentSectionId = "section3-1";

  const { numberedToc, findNavigation } = useToc(tocData);
  const { containerRef, activeItemRef, scrollToCenter } = useScrollToCenter();

  // 사용 예시:
  const result1 = findNavigation("section1-1-1");
  console.log("section1-1-1의 이전/다음:", result1);

  const result2 = findNavigation("chapter1");
  console.log("chapter1의 이전:", result2);

  const result3 = findNavigation("section3-1-2");
  console.log("section3-1-2의 다음:", result3);

  console.log("넘버링이 적용된 목차:");
  printToc(numberedToc.chapters);

  useEffect(() => {
    scrollToCenter();
  }, []);

  const RenderSection = ({
    section,
    level = 0,
  }: {
    section: Section;
    level?: number;
  }) => {
    const isActive = section.id === currentSectionId;
    const hasActivePage = section.sections?.some(
      (subSection) =>
        subSection.id === currentSectionId ||
        (subSection.sections &&
          subSection.sections.some((s) => s.id === currentSectionId)),
    );

    return (
      <li className="relative">
        {/* 세로 선 */}
        {level > 0 && (
          <div
            className={`absolute left-0 top-0 h-full w-px
            ${hasActivePage ? "bg-blue-200" : "bg-gray-200"}`}
          />
        )}

        <div
          ref={isActive ? activeItemRef : null}
          className={`relative flex items-center py-0.5
            ${level > 0 ? "ml-4" : ""}
            ${isActive ? "text-blue-600" : "text-gray-700"}
            ${hasActivePage ? "text-blue-600" : ""}
            ${isActive ? "bg-blue-50 rounded-md" : ""}`}
        >
          {/* 가로선 */}
          {level > 0 && (
            <div
              className={`absolute left-0 top-1/2 w-2 h-px
              ${hasActivePage ? "bg-blue-200" : "bg-gray-200"}`}
            />
          )}

          <div
            className={`flex justify-between items-center w-full 
            ${level > 0 ? "ml-4" : ""}`}
          >
            <span className={`line-clamp-1 ${isActive ? "text-blue-600" : ""}`}>
              {section.title}
            </span>
            {section.page && (
              <span
                className={`ml-2 text-xs
              ${isActive ? "text-blue-600" : "text-gray-400"}`}
              >
                {section.page}
              </span>
            )}
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
    <div className="mx-auto bg-white">
      <h2 className="font-bold p-1 text-gray-800 border-b">{tocData.title}</h2>
      {/* 스크롤 가능한 컨테이너 추가 */}
      <div
        ref={containerRef}
        className="max-h-[500px] overflow-y-auto scroll-smooth"
      >
        <ul className="p-1 space-y-1">
          {tocData.chapters.map((chapter) => (
            <RenderSection key={chapter.id} section={chapter} />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookDetailPage;
