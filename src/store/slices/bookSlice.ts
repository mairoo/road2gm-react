import { createSlice } from "@reduxjs/toolkit";

import { BookSlice } from "../../types";
import { flattenToc } from "../../utils/toc";

const initialState: BookSlice = {};

// createSlice 사용:
//
// 순수하게 클라이언트 측 상태만 필요한 경우
// 간단한 상태 토글이 필요한 경우
// 사용자 인터페이스 상태 관리
// 로컬 필터링/정렬 로직이 필요한 경우
export const bookSlice = createSlice({
  name: "bookSlice",
  initialState,
  reducers: {
    setTableOfContents: (state, action) => {
      return {
        ...state,
        tableOfContents: action.payload.tableOfContents,
        sections: flattenToc(action.payload.tableOfContents.chapters),
      };
    },
    setCurrentSectionId: (state, action) => {
      return {
        ...state,
        current: action.payload.currentSectionId,
      };
    },
  },
});

export const { setTableOfContents, setCurrentSectionId } = bookSlice.actions;

export default bookSlice.reducer;
