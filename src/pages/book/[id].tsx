import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import className from "classnames";
import { useScrollToCenter } from "../../hooks/useScroll";
import { useAppDispatch } from "../../store/hooks";
import { flattenToc } from "../../utils/toc";

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
      id: 1,
      title: "소프트웨어 아키텍처 기초",
      level: 1,
      number: "1",
      sections: [
        {
          id: 2,
          title: "아키텍처의 정의",
          level: 2,
          number: "1.1",
          page: 15,
        },
        {
          id: 3,
          title: "아키텍처의 중요성",
          level: 2,
          number: "1.2",
          page: 22,
          sections: [
            {
              id: 4,
              title: "비즈니스 가치",
              level: 3,
              number: "1.2.1",
              page: 24,
            },
            {
              id: 5,
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
      id: 6,
      title: "아키텍처 패턴",
      level: 1,
      number: "2",
      sections: [
        {
          id: 7,
          title: "레이어드 아키텍처",
          level: 2,
          number: "2.1",
          page: 35,
        },
        {
          id: 8,
          title: "헥사고날 아키텍처",
          level: 2,
          number: "2.2",
          page: 42,
        },
        {
          id: 9,
          title: "마이크로서비스 아키텍처",
          level: 2,
          number: "2.3",
          page: 50,
        },
      ],
    },
    {
      id: 10,
      title: "설계 원칙",
      level: 1,
      number: "3",
      sections: [
        {
          id: 11,
          title: "SOLID 원칙",
          level: 2,
          number: "3.1",
          page: 65,
          sections: [
            {
              id: 12,
              title: "단일 책임 원칙",
              level: 3,
              number: "3.1.1",
              page: 67,
            },
            {
              id: 13,
              title: "개방-폐쇄 원칙",
              level: 3,
              number: "3.1.2",
              page: 72,
            },
            {
              id: 14,
              title: "리스코프 치환 원칙",
              level: 3,
              number: "3.1.3",
              page: 78,
            },
            {
              id: 15,
              title: "인터페이스 분리 원칙",
              level: 3,
              number: "3.1.4",
              page: 83,
            },
            {
              id: 16,
              title: "의존성 역전 원칙",
              level: 3,
              number: "3.1.5",
              page: 88,
            },
          ],
        },
        {
          id: 17,
          title: "DRY 원칙",
          level: 2,
          number: "3.2",
          page: 95,
        },
        {
          id: 18,
          title: "KISS 원칙",
          level: 2,
          number: "3.3",
          page: 100,
        },
      ],
    },
    {
      id: 19,
      title: "아키텍처 품질 속성",
      level: 1,
      number: "4",
      sections: [
        {
          id: 20,
          title: "성능",
          level: 2,
          number: "4.1",
          page: 110,
        },
        {
          id: 21,
          title: "보안",
          level: 2,
          number: "4.2",
          page: 118,
        },
        {
          id: 22,
          title: "가용성",
          level: 2,
          number: "4.3",
          page: 125,
        },
        {
          id: 23,
          title: "확장성",
          level: 2,
          number: "4.4",
          page: 132,
        },
      ],
    },
    {
      id: 24,
      title: "아키텍처 문서화",
      level: 1,
      number: "5",
      sections: [
        {
          id: 25,
          title: "문서화의 중요성",
          level: 2,
          number: "5.1",
          page: 140,
        },
        {
          id: 26,
          title: "문서화 템플릿",
          level: 2,
          number: "5.2",
          page: 145,
          sections: [
            {
              id: 27,
              title: "4+1 뷰",
              level: 3,
              number: "5.2.1",
              page: 148,
            },
            {
              id: 28,
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
      id: 29,
      title: "아키텍처 평가",
      level: 1,
      number: "6",
      sections: [
        {
          id: 30,
          title: "아키텍처 평가 방법",
          level: 2,
          number: "6.1",
          page: 165,
        },
        {
          id: 31,
          title: "ATAM",
          level: 2,
          number: "6.2",
          page: 172,
        },
        {
          id: 32,
          title: "CBAM",
          level: 2,
          number: "6.3",
          page: 180,
        },
      ],
    },
    {
      id: 33,
      title: "현대적 아키텍처 트렌드",
      level: 1,
      number: "7",
      sections: [
        {
          id: 34,
          title: "클라우드 네이티브",
          level: 2,
          number: "7.1",
          page: 190,
        },
        {
          id: 35,
          title: "서버리스",
          level: 2,
          number: "7.2",
          page: 198,
        },
        {
          id: 36,
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
  const dispatch = useAppDispatch();

  const currentSectionId = 25;

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ListToc = ({ currentId }: { currentId: number }) => {
    const activeItemRef = useRef<HTMLLIElement>(null);

    useScrollToCenter(scrollContainerRef, activeItemRef, [currentId], {
      behavior: "smooth",
      offset: 0,
    });

    return (
      <ul className="text-sm space-y-1">
        {flattenToc(tocData.chapters).map((chapter) => {
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
        <ListToc currentId={currentSectionId} />
      </div>
    </div>
  );
};

export default BookDetailPage;
