import React from "react";
import { Outlet, useParams } from "react-router-dom";

const usePageParams = () => {
  const { pageId } = useParams<{ pageId: string }>();
  const id = parseInt(pageId!, 10);

  if (isNaN(id)) {
    throw new Error("Invalid book ID");
  }

  return { id: id };
};

const BookPageDetailPage = () => {
  const { id } = usePageParams();

  return (
    <>
      <h1>Page detail: {id}</h1>
      <Outlet />
    </>
  );
};

export default BookPageDetailPage;
