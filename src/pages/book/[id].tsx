import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import className from "classnames";
import { Section } from "../../types";
import { useToc } from "../../hooks/useToc";
import { flattenToc } from "../../utils/toc";
import { useScrollToCenter } from "../../hooks/useScroll";

const useBookParams = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const id = parseInt(bookId!, 10);

  if (isNaN(id)) {
    throw new Error("Invalid book ID");
  }

  return { id: id };
};

const tocData = {
  title: "현대 소프트웨어 아키텍처의 이해",
  chapters: [
    {
      id: "ch1",
      title: "소프트웨어 아키텍처 기초",
      level: 1,
      number: "1",
      sections: [
        {
          id: "ch1-1",
          title: "아키텍처의 정의",
          level: 2,
          number: "1.1",
          page: 15,
        },
        {
          id: "ch1-2",
          title: "아키텍처의 중요성",
          level: 2,
          number: "1.2",
          page: 22,
          sections: [
            {
              id: "ch1-2-1",
              title: "비즈니스 가치",
              level: 3,
              number: "1.2.1",
              page: 24,
            },
            {
              id: "ch1-2-2",
              title: "기술적 가치",
              level: 3,
              number: "1.2.2",
              page: 28,
            },
          ],
        },
      ],
    },
    {
      id: "ch2",
      title: "아키텍처 패턴",
      level: 1,
      number: "2",
      sections: [
        {
          id: "ch2-1",
          title: "레이어드 아키텍처",
          level: 2,
          number: "2.1",
          page: 35,
        },
        {
          id: "ch2-2",
          title: "헥사고날 아키텍처",
          level: 2,
          number: "2.2",
          page: 42,
        },
        {
          id: "ch2-3",
          title: "마이크로서비스 아키텍처",
          level: 2,
          number: "2.3",
          page: 50,
        },
      ],
    },
    {
      id: "ch3",
      title: "설계 원칙",
      level: 1,
      number: "3",
      sections: [
        {
          id: "ch3-1",
          title: "SOLID 원칙",
          level: 2,
          number: "3.1",
          page: 65,
          sections: [
            {
              id: "ch3-1-1",
              title: "단일 책임 원칙",
              level: 3,
              number: "3.1.1",
              page: 67,
            },
            {
              id: "ch3-1-2",
              title: "개방-폐쇄 원칙",
              level: 3,
              number: "3.1.2",
              page: 72,
            },
            {
              id: "ch3-1-3",
              title: "리스코프 치환 원칙",
              level: 3,
              number: "3.1.3",
              page: 78,
            },
            {
              id: "ch3-1-4",
              title: "인터페이스 분리 원칙",
              level: 3,
              number: "3.1.4",
              page: 83,
            },
            {
              id: "ch3-1-5",
              title: "의존성 역전 원칙",
              level: 3,
              number: "3.1.5",
              page: 88,
            },
          ],
        },
        {
          id: "ch3-2",
          title: "DRY 원칙",
          level: 2,
          number: "3.2",
          page: 95,
        },
        {
          id: "ch3-3",
          title: "KISS 원칙",
          level: 2,
          number: "3.3",
          page: 100,
        },
      ],
    },
    {
      id: "ch4",
      title: "아키텍처 품질 속성",
      level: 1,
      number: "4",
      sections: [
        {
          id: "ch4-1",
          title: "성능",
          level: 2,
          number: "4.1",
          page: 110,
        },
        {
          id: "ch4-2",
          title: "보안",
          level: 2,
          number: "4.2",
          page: 118,
        },
        {
          id: "ch4-3",
          title: "가용성",
          level: 2,
          number: "4.3",
          page: 125,
        },
        {
          id: "ch4-4",
          title: "확장성",
          level: 2,
          number: "4.4",
          page: 132,
        },
      ],
    },
    {
      id: "ch5",
      title: "아키텍처 문서화",
      level: 1,
      number: "5",
      sections: [
        {
          id: "ch5-1",
          title: "문서화의 중요성",
          level: 2,
          number: "5.1",
          page: 140,
        },
        {
          id: "ch5-2",
          title: "문서화 템플릿",
          level: 2,
          number: "5.2",
          page: 145,
          sections: [
            {
              id: "ch5-2-1",
              title: "4+1 뷰",
              level: 3,
              number: "5.2.1",
              page: 148,
            },
            {
              id: "ch5-2-2",
              title:
                "어텐션을 이용한 텍스트 요약(Text Summarization with Attention mechanism)",
              level: 3,
              number: "5.2.2",
              page: 155,
            },
          ],
        },
      ],
    },
    {
      id: "ch6",
      title: "아키텍처 평가",
      level: 1,
      number: "6",
      sections: [
        {
          id: "ch6-1",
          title: "아키텍처 평가 방법",
          level: 2,
          number: "6.1",
          page: 165,
        },
        {
          id: "ch6-2",
          title: "ATAM",
          level: 2,
          number: "6.2",
          page: 172,
        },
        {
          id: "ch6-3",
          title: "CBAM",
          level: 2,
          number: "6.3",
          page: 180,
        },
      ],
    },
    {
      id: "ch7",
      title: "현대적 아키텍처 트렌드",
      level: 1,
      number: "7",
      sections: [
        {
          id: "ch7-1",
          title: "클라우드 네이티브",
          level: 2,
          number: "7.1",
          page: 190,
        },
        {
          id: "ch7-2",
          title: "서버리스",
          level: 2,
          number: "7.2",
          page: 198,
        },
        {
          id: "ch7-3",
          title: "이벤트 기반 아키텍처",
          level: 2,
          number: "7.3",
          page: 205,
        },
      ],
    },
  ],
};

const BookDetailPage = () => {
  const { id } = useBookParams();

  const currentSectionId = "ch5-2";

  const { numberedToc } = useToc(tocData);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ListToc = ({
    chapters,
    currentId,
  }: {
    chapters: Section[];
    currentId: string;
  }) => {
    const activeItemRef = useRef<HTMLLIElement>(null);

    useScrollToCenter(scrollContainerRef, activeItemRef, [currentId], {
      behavior: "smooth",
      offset: 0,
    });

    return (
      <ul className="text-sm space-y-1">
        {flattenToc(chapters).map((chapter) => {
          const isActive = chapter.id === currentId;

          return (
            <li
              key={chapter.id}
              ref={isActive ? activeItemRef : null}
              className={className(
                "px-1 py-2",
                isActive ? "text-white bg-natural-5" : "",
              )}
            >
              <span className="line-clamp-1">
                {chapter.number}. {chapter.title}
                {chapter.page && (
                  <span
                    className={`ml-2 text-xs ${isActive ? "text-white" : "text-gray-500"}`}
                  >
                    ({chapter.page})
                  </span>
                )}
              </span>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div className="mx-auto bg-white space-y-3 py-2">
      <h2 className="font-bold px-1 pb-3 text-gray-800 border-b">
        {tocData.title}
      </h2>
      {/* 스크롤 가능한 컨테이너 추가 */}
      <div
        ref={scrollContainerRef}
        className="max-h-[500px] overflow-y-auto scroll-smooth"
      >
        {/* 넘버링이 적용된 목차 렌더링 */}
        <ListToc chapters={numberedToc.chapters} currentId={currentSectionId} />
      </div>
    </div>
  );
};

export default BookDetailPage;
