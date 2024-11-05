import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Book } from "../../types"; // createApi 사용:

// createApi 사용:
//
// 서버 데이터를 다루는 경우
// 데이터 캐싱이 필요한 경우
// 자동화된 데이터 동기화가 필요한 경우
// CRUD 작업이 주요 기능인 경우

const bookApi = createApi({
  reducerPath: "bookApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:8080" }),
  endpoints: (builder) => ({
    fetchBooks: builder.query<Book[], void>({
      query: () => {
        return {
          url: "/books",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useFetchBooksQuery } = bookApi;

export { bookApi };
