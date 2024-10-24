import { useCallback, useMemo } from "react";
import { TableOfContents } from "../types";
import { addNumbering, findPreviousAndNext } from "../utils/toc";

export const useToc = (tocData: TableOfContents) => {
  const numberedToc = useMemo(
    () => ({
      ...tocData,
      chapters: addNumbering(tocData.chapters),
    }),
    [tocData],
  );

  const findNavigation = useCallback(
    (currentId: string) => {
      return findPreviousAndNext(tocData, currentId);
    },
    [tocData],
  );

  return {
    numberedToc,
    findNavigation,
  };
};
