import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { MdChevronLeft, MdChevronRight, MdSearch } from "react-icons/md";
import { Link } from "react-router-dom";

import { useFetchBooksQuery } from "../../store/apis/bookApi";
import Card from "../../widgets/Card";

const BookPage = () => {
  // 1. react-router-dom 훅
  // 2. Redux 훅
  // 3. RTK Query 훅
  // 4. useState 훅
  // 5. useRef 훅
  // 6. useMemo 훅
  // 7. useEffect 훅
  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅
  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)
  // 12. 메인 컴포넌트 렌더링 반환
  const { data: books, isLoading, error } = useFetchBooksQuery();

  const list = new Array(10).fill(books).flat();

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = 10; // 전체 페이지 수 예시

  // 표시할 페이지 번호 계산
  const getPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(startPage + 4, totalPages);

    // 마지막 페이지가 totalPages에 도달하지 않았을 때 시작 페이지 조정
    if (endPage - startPage < 4) {
      startPage = Math.max(1, endPage - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    if ("status" in error) {
      const fetchError = error as FetchBaseQueryError; // FetchBaseQueryError 타입으로 좁히기
      const errorData = fetchError.data as { message?: string };

      return (
        <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
          <h3 className="font-bold">에러가 발생했습니다</h3>
          <p>{`상태 코드: ${fetchError.status}`}</p>
          <p>{`메시지: ${errorData?.message || "알 수 없는 에러"}`}</p>
        </div>
      );
    }
    return (
      <div className="p-2 bg-red-100 border border-red-400 text-red-700 rounded">
        <p>데이터를 불러오는 중 문제가 발생했습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-4 p-1 md:p-0">
      <div className="px-1 md:px-0">
        <label htmlFor="search" className="hidden">
          책 검색
        </label>
        <div className="mt-2 flex rounded-md shadow-sm">
          <div className="relative flex flex-grow items-stretch focus-within:z-10">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <MdSearch aria-hidden="true" className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="search"
              name="search"
              type="text"
              placeholder="책 검색"
              className="block w-full rounded-none rounded-l-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
          <button
            type="button"
            className="relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
          >
            찾기
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-6 px-1 md:px-0">
        {list.map((book, i) => (
          <Link to={`/book/${i}`} key={i}>
            <Card className="flex bg-gray-50 gap-x-2">
              {/* 썸네일 이미지: flex-shrink-0로 이미지 크기 고정, object-cover로 이미지 비율 유지 */}
              <div className="flex-shrink-0 border-r border-r-gray-200">
                <img
                  src={book.thumbnail}
                  alt={`${book.title} cover`}
                  className="w-[100px] h-[130px] object-cover"
                />
              </div>

              {/* 책 정보 */}
              <div className="flex flex-col flex-grow justify-center">
                <div className="space-y-1">
                  {/* 제목 3줄까지만 표시하고 이후 말줄임표 */}
                  <h2 className="font-bold text-gray-900 line-clamp-3">
                    {book.title}
                  </h2>

                  {/* 메타 정보 그리드 */}
                  <ul className="list-disc ml-4 gap-y-2 text-sm text-gray-900">
                    <li>{book.author}</li>
                    <li>{book.modified}</li>
                  </ul>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
      <div className="flex items-center justify-center w-full px-2 mb-4">
        <nav className="flex items-center gap-1 text-sm">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className="h-8 w-8 flex items-center justify-center rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdChevronLeft className="w-4 h-4" />
          </button>

          {getPageNumbers().map((number) => (
            <button
              key={number}
              onClick={() => setCurrentPage(number)}
              className={`h-8 min-w-8 px-0.5 flex items-center justify-center rounded-md border
              ${
                currentPage === number
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:bg-gray-100"
              }`}
            >
              {number}
            </button>
          ))}

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className="h-8 w-8 flex items-center justify-center rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <MdChevronRight className="w-4 h-4" />
          </button>
        </nav>
      </div>
    </div>
  );
};

export default BookPage;
