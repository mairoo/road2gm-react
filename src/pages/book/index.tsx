import React from "react";

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
      <div>검색창</div>
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
      <div className="flex justify-center">
        <span>페이지목록</span>
      </div>
    </div>
  );
};

export default BookPage;
