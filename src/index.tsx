import React from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.css";
import { RouterProvider } from "react-router-dom";
import browserRouter from "./routes/BrowserRouter";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("#root element not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <RouterProvider router={browserRouter} />
  </React.StrictMode>,
);
