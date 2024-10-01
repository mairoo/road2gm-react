import { createBrowserRouter } from "react-router-dom";
import React from "react";
import Root from "../layouts/Root";
import Home from "../pages/Home";

const BrowserRouter = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <Home />,
      },
    ],
  },
]);

export default BrowserRouter;
