import React from "react";
import { useParams } from "react-router-dom";

const usePageParams = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const id = parseInt(pageId!, 10);

  if (isNaN(id)) {
    throw new Error("Invalid book ID");
  }

  return { id: id };

};

const BookPageDetailPage = () => {
  // 1. react-router-dom 훅
  // 2. Redux 훅
  // 3. RTK Query 훅
  // 4. useState 훅
  // 5. useRef 훅
  // 6. useMemo 훅
  // 7. useEffect 훅
  // 8. 페이지 이동 네비게이션 핸들러 useCallback 훅
  // 9. 이벤트 핸들러 useCallback 훅
  // 10. 헬퍼 함수
  // 11. 렌더 메소드 (renderForm, renderError, renderList 등)
  // 12. 메인 컴포넌트 렌더링 반환

  const { id } = usePageParams();

  return (
    <>
      <h1>Page detail: {id}</h1>
    </>
  );
};

export default BookPageDetailPage;
