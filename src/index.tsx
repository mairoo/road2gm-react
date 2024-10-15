import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";

import browserRouter from "./routes/BrowserRouter";
import store from "./store";

import "./tailwind.css";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("#root element not found");
}

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  </React.StrictMode>,
);
