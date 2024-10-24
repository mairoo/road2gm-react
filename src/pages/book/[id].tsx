import React, { useRef } from "react";
import { useParams } from "react-router-dom";
import className from "classnames";
import { Section } from "../../types";
import { useToc } from "../../hooks/useToc";
import { flattenToc } from "../../utils/toc";
import { useScrollToCenter } from "../../hooks/useScroll";
import {useAppSelector} from '../../store/hooks';

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
  const { book, current, flattenedSections } = useAppSelector((state) => state.book);


  const { numberedToc } = useToc(book!, flattenedSections!);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const ListToc = ({
    chapters,
    currentId,
  }: {
    chapters: Section[];
    currentId: number;
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
        {book!.title}
      </h2>
      {/* 스크롤 가능한 컨테이너 추가 */}
      <div
        ref={scrollContainerRef}
        className="max-h-[500px] overflow-y-auto scroll-smooth"
      >
        {/* 넘버링이 적용된 목차 렌더링 */}
        <ListToc chapters={numberedToc.chapters} currentId={current!} />
      </div>
    </div>
  );
};

export default BookDetailPage;
