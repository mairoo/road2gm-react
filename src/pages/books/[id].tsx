import React from "react";
import { useParams } from "react-router-dom";

const useBookParams = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const id = parseInt(bookId!, 10);

  if (isNaN(id)) {
    throw new Error("Invalid book ID");
  }

  return { id: id };
};

const BookDetailPage = () => {
  const { id } = useBookParams();

  return (
    <>
      <h1>Book detail: {id}</h1>
    </>
  );
};

export default BookDetailPage;
