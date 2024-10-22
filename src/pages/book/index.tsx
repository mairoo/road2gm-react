import React from "react";
import { MdChevronLeft, MdChevronRight, MdSearch } from "react-icons/md";

const BookPage = () => {
  const books = [
    {
      id: 1,
      title: "The Design of Everyday Things",
      author: "Don Norman",
      publisher: "Basic Books",
      year: "2013",
      thumbnail: "https://placehold.co/100x130",
    },
    {
      id: 2,
      title: "Clean Code",
      author: "Robert C. Martin",
      publisher: "Prentice Hall",
      year: "2008",
      thumbnail: "https://placehold.co/100x130",
    },
  ];

  const list = new Array(10).fill(books).flat();

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
              id="email"
              name="email"
              type="email"
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
          <div
            key={i}
            className="flex bg-gray-50 gap-x-2 rounded-sm shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-100"
          >
            {/* 썸네일 이미지: flex-shrink-0로 이미지 크기 고정, object-cover로 이미지 비율 유지 */}
            <div className="flex-shrink-0">
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
                  <li>{book.publisher}</li>
                  <li>{book.year}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
      <nav className="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0 mb-4">
        <div className="-mt-px flex w-0 flex-1">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pr-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            <MdChevronLeft
              aria-hidden="true"
              className="mr-3 h-5 w-5 text-gray-400"
            />
            이전
          </a>
        </div>
        <div className="hidden md:-mt-px md:flex">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            1
          </a>
          {/* Current: "border-indigo-500 text-indigo-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" */}
          <a
            href="#"
            aria-current="page"
            className="inline-flex items-center border-t-2 border-indigo-500 px-4 pt-4 text-sm font-medium text-indigo-600"
          >
            2
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            3
          </a>
          <span className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500">
            ...
          </span>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            8
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            9
          </a>
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            10
          </a>
        </div>
        <div className="-mt-px flex w-0 flex-1 justify-end">
          <a
            href="#"
            className="inline-flex items-center border-t-2 border-transparent pl-1 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            다음
            <MdChevronRight
              aria-hidden="true"
              className="ml-3 h-5 w-5 text-gray-400"
            />
          </a>
        </div>
      </nav>
    </div>
  );
};

export default BookPage;
