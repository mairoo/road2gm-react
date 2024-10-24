import { Section, TableOfContents } from "../types";

export const flattenToc = (chapters: Section[]): Section[] => {
  const result: Section[] = [];

  function traverse(section: Section) {
    // 현재 섹션을 결과 배열에 추가
    result.push(section);

    // 하위 섹션이 있으면 재귀적으로 순회
    if (section.sections) {
      section.sections.forEach(traverse);
    }
  }

  chapters.forEach(traverse);
  return result;
};

export const addNumbering = (
  chapters: Section[],
  prefix: string = "",
): Section[] =>
  chapters.map((chapter, index) => {
    // 현재 레벨의 넘버 생성
    const currentNumber = prefix ? `${prefix}-${index + 1}` : `${index + 1}`;

    // 현재 챕터의 복사본 생성
    const numberedChapter = {
      ...chapter,
      number: currentNumber,
    };

    // 하위 섹션이 있으면 재귀적으로 넘버링
    if (numberedChapter.sections) {
      numberedChapter.sections = addNumbering(
        numberedChapter.sections,
        currentNumber,
      );
    }

    return numberedChapter;
  });

export const findPreviousAndNext = (
  tocData: TableOfContents,
  currentId: string,
) => {
  // 넘버링을 먼저 적용
  const numberedToc = {
    ...tocData,
    chapters: addNumbering(tocData.chapters),
  };

  // 모든 섹션을 평탄화
  const flattenedSections = flattenToc(numberedToc.chapters);

  // 현재 항목의 인덱스 찾기
  const currentIndex = flattenedSections.findIndex(
    (section) => section.id === currentId,
  );

  // 현재 항목을 찾지 못한 경우
  if (currentIndex === -1) {
    return {
      previous: null,
      next: null,
    };
  }

  // 이전 항목과 다음 항목 찾기
  const previous =
    currentIndex > 0 ? flattenedSections[currentIndex - 1] : null;
  const next =
    currentIndex < flattenedSections.length - 1
      ? flattenedSections[currentIndex + 1]
      : null;

  return {
    previous,
    next,
  };
};

export const printToc = (chapters: Section[], level = 0) => {
  chapters.forEach((chapter) => {
    console.log(`${" ".repeat(level * 2)}${chapter.number}. ${chapter.title}`);
    if (chapter.sections) {
      printToc(chapter.sections, level + 1);
    }
  });
};
