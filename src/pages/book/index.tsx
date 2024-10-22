import React, {useState} from "react";
import { MdChevronLeft, MdChevronRight, MdSearch } from "react-icons/md";
import Card from '../../widgets/Card';

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

  return (
      <div className="flex flex-col gap-y-4 p-1 md:p-0">
        <div className="px-1 md:px-0">
          <label htmlFor="search" className="hidden">
            책 검색
          </label>
          <div className="mt-2 flex rounded-md shadow-sm">
            <div className="relative flex flex-grow items-stretch focus-within:z-10">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MdSearch aria-hidden="true" className="h-5 w-5 text-gray-400"/>
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
              <Card
                  key={i}
                  className="flex bg-gray-50 gap-x-2"
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
              </Card>
          ))}
        </div>
        <div className="flex items-center justify-center w-full px-2 mb-4">
          <nav className="flex items-center gap-1 text-sm">
            <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 flex items-center justify-center rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdChevronLeft className="w-4 h-4"/>
            </button>

            {getPageNumbers().map(number => (
                <button
                    key={number}
                    onClick={() => setCurrentPage(number)}
                    className={`h-8 min-w-8 px-0.5 flex items-center justify-center rounded-md border
              ${currentPage === number
                        ? 'bg-blue-500 text-white border-blue-500'
                        : 'hover:bg-gray-100'
                    }`}
                >
                  {number}
                </button>
            ))}

            <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="h-8 w-8 flex items-center justify-center rounded-md border disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <MdChevronRight className="w-4 h-4"/>
            </button>
          </nav>
        </div>
      </div>
  );
};

export default BookPage;
