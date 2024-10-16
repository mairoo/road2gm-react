import React from "react";
import InfiniteSwipeSlide from "../../widgets/InfiniteSwipeSlide";

const BooksPage = () => {
  const images = [
    { width: 800, height: 400, color: "orange" },
    { width: 800, height: 400, color: "blue" },
    { width: 800, height: 400, color: "green" },
  ];

  return (
    <div className="container mx-auto p-4">
      <div className="container mx-auto p-4">
        <InfiniteSwipeSlide images={images} />
      </div>
    </div>
  );
};

export default BooksPage;
