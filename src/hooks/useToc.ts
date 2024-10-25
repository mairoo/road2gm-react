import { useCallback, useMemo } from "react";
import { Section, TableOfContents } from "../types";
import { addNumbering, findPreviousAndNext } from "../utils/toc";

export const useToc = (tocData: TableOfContents, sections: Section[]) => {
  const numberedToc = useMemo(
    // useMemo: 특정 결과값을 재사용 할 때 사용x
    () => ({
      ...tocData,
      chapters: addNumbering(tocData.chapters),
    }),
    [tocData],
  );

  const findNavigation = useCallback(
    // useCallback: 특정 함수를 새로 만들지 않고 재사용

    // 함수 안에서 사용하는 상태, props 가 있다면 꼭, deps 배열안에 포함시켜야 한다.
    // deps 배열 안에 변수가 변경되어도 해당 훅이 재배치 되어 항상 최신의 값을 불러올 수 있다.
    //
    // 만약에 deps 배열 안에 함수에서 사용하는 값을 넣지 않게 된다면,
    // 함수 내에서 해당 값들을 참조할때 가장 최신 값을 참조할 것이라고 보장 할 수 없다.
    // props 로 받아온 함수가 있다면, 이 또한 deps 에 넣어주어야 한다.
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
