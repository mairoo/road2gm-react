export interface Section {
  id: number;
  title: string;
  page?: number; // 출력 페이지 수 온라인 책은 의미가 없어서 선택적
  level: number;
  sections?: Section[]; // 재귀적 구조를 위한 선택적 배열
  number?: string; // 목차 넘버링
}

export interface TableOfContents {
  title: string;
  chapters: Section[];
}

export interface BookSlice {
  current?: number;
  book?: TableOfContents;
  flattenedSections?: Section[];
}
