import { Outlet } from "react-router-dom";
import React from "react";

const RootLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default RootLayout;
