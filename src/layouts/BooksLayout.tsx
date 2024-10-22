import React from "react";

import { Outlet } from "react-router-dom";
import { MdChevronLeft, MdChevronRight, MdList } from "react-icons/md";
import Button from "../widgets/Button";

const BooksLayout = () => {
  return (
    <div>
      <h1>books</h1>
      <Outlet />
      {[...Array(30)].map((_, i) => (
        <div key={i}>dummy {i}</div>
      ))}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
        <div className="flex items-center justify-around py-1">
          <Button inline={true}>
            <MdChevronLeft className="w-8 h-8" />
            <span className="text-xs font-medium">이전글</span>
          </Button>
          <Button inline={true}>
            <MdList className="w-8 h-8" />
            <span className="text-xs font-medium">목록</span>
          </Button>
          <Button inline={true}>
            <span className="text-xs font-medium">다음글</span>
            <MdChevronRight className="w-8 h-8" />
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default BooksLayout;
