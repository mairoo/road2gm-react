import React from "react";

import { Outlet } from "react-router-dom";

const BooksLayout = () => (
  <div>
    <h1>books</h1>
    <Outlet />
  </div>
);

export default BooksLayout;
