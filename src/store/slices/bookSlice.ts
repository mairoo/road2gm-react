import { createSlice } from "@reduxjs/toolkit";

import { BookSlice } from "../../types";
import { flattenToc } from "../../utils/toc";

const initialState: BookSlice = {};

export const bookSlice = createSlice({
  name: "uiSlice",
  initialState,
  reducers: {
    setBook: (state, action) => {
      return {
        ...state,
        book: action.payload.book,
        flattenedSections: flattenToc(action.payload.book.chapters),
      };
    },
    setCurrent: (state, action) => {
      return {
        ...state,
        current: action.payload.current,
      };
    },
  },
});

export const { setBook, setCurrent } = bookSlice.actions;

export default bookSlice.reducer;
