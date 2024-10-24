import { createSlice } from "@reduxjs/toolkit";

import { BookSlice } from "../../types";
import { flattenToc } from "../../utils/toc";

const initialState: BookSlice = {};

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
