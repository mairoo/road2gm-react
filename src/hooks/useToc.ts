import { useCallback, useMemo } from "react";
import { Section, TableOfContents } from "../types";
import { addNumbering, findPreviousAndNext } from "../utils/toc";

export const useToc = (tocData: TableOfContents, sections: Section[]) => {
  const numberedToc = useMemo(
    () => ({
      ...tocData,
      chapters: addNumbering(tocData.chapters),
    }),
    [tocData],
  );

  const findNavigation = useCallback(
    (currentId: number) => {
      return findPreviousAndNext(sections, currentId);
    },
    [sections],
  );

  return {
    numberedToc,
    findNavigation,
  };
};
